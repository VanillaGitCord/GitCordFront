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
`;

const StyledVideo = styled.video`
  height: 40%;
  width: 50%;
`;

const Video = ({ peer }) => {
  const ref = useRef();
  const className = peer.owner ? "owner" : "participant";

  useEffect(() => {
    peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <StyledVideo playsInline autoPlay ref={ref} className={className} />
  );
}

function CamWindow({ currentUser, participants }) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);

  const createPeer = useCallback((userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on("signal", signal => {
      socket.emit("sending signal", { userToSignal, callerID, signal })
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
    debugger;
    if (isStreaming) return;
    if (currentUser && participants.length) {
      setIsStreaming(true);
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        userVideo.current.srcObject = stream;
        console.log("stream Start", participants);

        const peers = [];
        const participantsWithoutMe = participants.filter(participant => participant.email !== currentUser.email);
        debugger;
        participantsWithoutMe.forEach(userInfo => {
          // 상대의 socket.id, 나의 socket.id, 나의 stream
          const peer = createPeer(userInfo.socketId, socket.id, stream);
          peersRef.current.push({
            peerID: userInfo.socketId,
            peer
          });
          peers.push({ peerID: userInfo.socketId, peer });
        });
        setPeers(peers);

        socket.on("user joined", payload => {
          debugger;
          console.log("user joined event!    ", payload);
          const peer = addPeer(payload.signal, payload.callerID, stream);
          const isPeerExist = peersRef.current.some(peerObj => peerObj.peerID === payload.callerID);

          if (!isPeerExist) {
            peersRef.current.push({
              peerID: payload.callerID,
              peer
            });
            setPeers(peers => [...peers, { peerID: payload.socketId, peer }]);
          }
        });

        socket.on("receiving returned signal", payload => {
          debugger;
          console.log("receiving returned signal event!    ", payload);
          const item = peersRef.current.find(p => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });

        socket.on("user left", targetUser => {
          debugger;
          console.log("user left!!!", targetUser);
          peersRef.current = peersRef.current.filter((peerObj) => (
            peerObj.peerID !== targetUser.socketId
          ));
          setPeers(peers => {
            console.log("지운다!!!!!");
            const targetPeer = peers.find(peerObj => peerObj.peerID === targetUser.socketId);
            console.log(targetPeer);
            const restPeers = peers.filter(peerObj => peerObj.peerID !== targetUser.socketId);
            if (targetPeer) targetPeer.peer.destroy();
            return [...restPeers];
          });
        });
      });
    }
  }, [currentUser, isStreaming, participants]);

  console.log(peers);
  console.log(peersRef.current);

  return (
    <CamWindowContainer>
      <video ref={userVideo} autoPlay playsInline className="cam-video" />
      {peers.map((peerObj, index) => {
        return (
          <Video key={index} peer={peerObj.peer} className="participant owner" />
        );
      })}
    </CamWindowContainer>
  );
}

export default CamWindow;
