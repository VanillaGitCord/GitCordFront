import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import styled from "styled-components";
import Peer from "simple-peer";

import { socket } from "../../../config/socketConfig";

const CamWindowContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #ffffff;
  z-index: 9;

  .cam-video {
    width: 100px;
    height: 100px;
  }

  .participant {
    display: none;
  }
`;

let localStream;

const Video = ({ peer, isOwner }) => {
  const ref = useRef();
  const className = isOwner ? "owner" : "participant";

  useEffect(() => {
    peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <video
      ref={ref}
      playsInline
      autoPlay
      className={`cam-video ${className}`}
    />
  );
}

function CamWindow({ currentUser, participants }) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);

  const createPeer = useCallback((userToSignal, isUserOwner, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on("signal", signal => {
      socket.emit("sending signal", { userToSignal, isUserOwner, callerID, signal })
    });

    return peer;
  }, []);

  const addPeer = useCallback((incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });

    peer.on("signal", signal => {
      socket.emit("returning signal", { signal, callerID })
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

          peers.push({ peerID: userInfo.socketId, isOwner: userInfo.isOwner, peer });
        });

        setPeers(peers);

        socket.on("user joined", payload => {
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

        socket.on("receiving returned signal", payload => {
          const item = peersRef.current.find(p => p.peerID === payload.id);

          item.peer.signal(payload.signal);
        });

        socket.on("user left", targetUser => {
          peersRef.current = peersRef.current.filter((peerObj) => (
            peerObj.peerID !== targetUser.socketId
          ));

          setPeers(peers => {
            const targetPeer = peers.find(peerObj => peerObj.peerID === targetUser.socketId);
            const restPeers = peers.filter(peerObj => peerObj.peerID !== targetUser.socketId);

            if (targetPeer) targetPeer.peer.destroy();

            return [...restPeers];
          });
        });
      });
    }
  }, [currentUser, isStreaming, participants]);

  useEffect(() => {
    return () => {
      socket.off("receiving returned signal");
      socket.off("user left");
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
