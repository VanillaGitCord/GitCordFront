import React, { useEffect, useRef, useState } from "react";
import { useStore } from "react-redux";
import { MdVideocam, MdVideocamOff } from "react-icons/md";
import styled from "styled-components";
import Peer from "simple-peer";

import { socket } from "../../../../config/socketConfig";

import MainIcon from "../../../publicComponents/MainIcon/MainIcon";

const CamWindowContainer = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 20%;
  height: 20%;
  background-color: #ffffff;

  .cam-image {
    position: absolute;
    top: 5%;
    right: 5%;
  }
`;

function CamWindow() {
  const [peers, setPeers] = useState([]);
  const user = useStore((state) => state.userReducer.user);
  const { roomId, participants, owner }  = useStore((state) => state.roomReducer);
  const myUserId = participants.find(participant => participant.email === user.email);
  console.log(socket.id, myUserId);
  const video = useRef();

  useEffect(() => {
    if (owner === user.email) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
        // 내 화면을 video에 붙인다.
        // 방장이면 자기 화면을 붙이고 아니면 안 붙인다...
        video.current.srcObject = stream;
        connectPeerToAllParticipants(stream);
      });
    } else {
      navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
        // 여기선 대신 방장인 사람의 것을 붙인다.
        video.current.srcObject = stream;
        connectPeerToAllParticipants(stream);
      });
    }

    function connectPeerToAllParticipants(stream) {
      const peers = [];
      participants.forEach(user => {
        // 이미 참가한 참가자들에게 signal을 보낸다
        const peer = createPeer(user.socketId, user.email, stream);
        peers.push({
          peerID: userEmail,
          owner: owner === userEmail,
          peer
        });
      });
      setPeers(peers);

      // 누군가 참가하면 이곳을 본다.
      socket.current.on("user joined", payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer
        });

        setPeers(users => [...users, peer]);
      });

      socket.current.on("receiving returned signal", payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });
    }
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on("signal", signal => {
      socket.emit("sending signal", { userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socket.current.emit("returning signal", { signal, callerID: user.email });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <CamWindowContainer>
      <div>
        <video ref={video}></video>
      </div>
    </CamWindowContainer>
  );
}

export default CamWindow;
