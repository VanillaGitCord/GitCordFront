import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import Peer from "simple-peer";

import {
  STREAM,
  SIGNAL,
  USER_JOINED,
  USER_LEFT,
  RECEIVING_RETURNED_SIGNAL,
  SENDING_SIGNAL,
  RETURNING_SIGNAL
} from "../../../constants/socketEvents";

const CamWindowContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 33%;
  background-color: #ffffff;
  z-index: 9;

  .cam-video {
    width: 600px;
    height: 600px;
  }

  .participant {
    display: none;
  }
`;

let localStream;

const Video = ({ peer, isOwner }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on(STREAM, stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video
      ref={ref}
      playsInline
      autoPlay
      className={`cam-video ${isOwner || "participans"}`}
    />
  );
}

function CamWindow({
  currentUser,
  participants,
  socket
}) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);

  window.addEventListener("beforeunload", () => {
    peers && peers.forEach(peer => {
      peer.removeAllListeners("signal");
      peer.destroy();
    });
  });

  const createPeer = useCallback((userToSignal, isUserOwner, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on(SIGNAL, signal => {
      socket.emit(SENDING_SIGNAL, { userToSignal, isUserOwner, callerID, signal })
    });

    return peer;
  }, []);

  const addPeer = useCallback((incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });

    peer.on(SIGNAL, signal => {
      socket.emit(RETURNING_SIGNAL, { signal, callerID })
    });

    peer.signal(incomingSignal);

    return peer;
  }, []);

  useEffect(() => {
    if (isStreaming) return;

    const user = participants.find(participant => participant.email === currentUser.email);

    if (!user) return;

    if (currentUser && participants.length) {
      setIsStreaming(true);

      navigator.mediaDevices.getUserMedia({ video: user.isOwner , audio: true }).then(stream => {
        localStream = stream;
        userVideo.current.srcObject = stream;
        userVideo.current.className = user.isOwner ? "owner cam-video" : "participant cam-video";

        const peers = [];
        const participantsWithoutMe = participants.filter(participant => participant.email !== currentUser.email);

        participantsWithoutMe.forEach(userInfo => {
          const peer = createPeer(userInfo.socketId, userInfo.isOwner, socket.id, stream);

          peersRef.current.push({
            peerID: userInfo.socketId,
            peer
          });

          peers.push({
            peerID: userInfo.socketId,
            isOwner: userInfo.isOwner,
            peer
          });
        });

        setPeers(peers);

        socket.on(USER_JOINED, payload => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          const isPeerExist = peersRef.current.some(peerObj => peerObj.peerID === payload.callerID);

          if (!isPeerExist) {
            peersRef.current.push({
              peerID: payload.callerID,
              peer
            });

            setPeers(peers => [...peers, { peerID: payload.socketId, isOwner: payload.isUserOwner, peer }]);
          }
        });

        socket.on(RECEIVING_RETURNED_SIGNAL, payload => {
          const item = peersRef.current.find(p => p.peerID === payload.id);

          item.peer.signal(payload.signal);
        });

        socket.on(USER_LEFT, targetUser => {
          peersRef.current = peersRef.current.filter((peerObj) => (
            peerObj.peerID !== targetUser.socketId
          ));

          setPeers(peers => {
            const targetPeer = peers.find(peerObj => peerObj.peerID === targetUser.socketId);
            const restPeers = peers.filter(peerObj => peerObj.peerID !== targetUser.socketId);

            if (targetPeer) {
              targetPeer.peer.removeAllListeners("signal");
              targetPeer.peer.destroy();
            }

            return [...restPeers];
          });
        });
      });
    }
  }, [currentUser, isStreaming, participants]);

  useEffect(() => {
    return () => {
      socket.off(RECEIVING_RETURNED_SIGNAL);
      socket.off(USER_LEFT);
      localStream && localStream.getTracks().forEach(val => val.stop());
      peers && peers.forEach(peer => {
        peer.removeAllListeners("signal");
        peer.destroy();
      });
    }
  }, []);

  return (
    <CamWindowContainer>
      <video
        ref={userVideo}
        autoPlay
        playsInline
      />
      {peers.map((peerObj) => {
        return (
          <Video
            key={peerObj.peerID}
            isOwner={peerObj.isOwner}
            peer={peerObj.peer}
          />
        );
      })}
    </CamWindowContainer>
  );
}

export default React.memo(CamWindow);
