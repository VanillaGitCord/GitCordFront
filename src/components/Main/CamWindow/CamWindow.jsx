import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Peer from "simple-peer";

import { socket } from "../../../config/socketConfig";

const CamWindowContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 225px;
  background-color: #ffffff;
  z-index: 9;

  .cam-video {
    width: 300px;
    height: 225px;
  }

  .participant {
    display: none;
  }

  .owner {
    display: none;
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
    peer.peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });
  }, []);

  return (
    <StyledVideo playsInline autoPlay ref={ref} className={className} />
  );
}

function CamWindow() {
  const [peers, setPeers] = useState([]);
  const currentUser = useSelector((state) => state.userReducer.user);
  const { roomId, participants, owner }  = useSelector((state) => state.roomReducer);
  const myUserId = participants && participants.find(participant => participant.email === currentUser.email);
  console.log(socket.id, myUserId, currentUser);
  const peersRef = useRef([]);
  const video = useRef();

  useEffect(() => {
    console.log(currentUser.email);
    if (currentUser && participants && owner) {
      if (owner === currentUser.email) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
          // 내 화면을 video에 붙인다.
          // 방장이면 자기 화면을 붙이고 아니면 안 붙인다...
          video.current.srcObject = stream;
          video.current.class = "owner";
          connectPeerToAllParticipants(stream);
        });
      } else {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
          // 여기선 대신 방장인 사람의 것을 붙인다.
          video.current.srcObject = stream;
          //video.current.style.display = "none";
          video.current.class = "participant";
          connectPeerToAllParticipants(stream);
        });
      }
    }

    function connectPeerToAllParticipants(stream) {
      const peers = [];
      participants && participants.forEach(user => {
        if (user.email !== currentUser.email) return;
        // 이미 참가한 참가자들에게 signal을 보낸다
        const peer = createPeer(user.socketId, user.email, stream);
        peers.push({
          peerID: user.email,
          owner: owner === user.email,
          peer
        });
      });
      setPeers(peers);

      // 누군가 참가하면 이곳을 본다.
      socket.on("user joined", payload => {
        // 유저당 하나의 peer만 가져야한다. 들어오면 겹치게 해서는 안된다.
        const peer = addPeer(payload.signal, payload.callerID, stream);
        const newPeer = {
          owner: owner === currentUser.email,
          peer
        };

        console.log(peersRef.current);

        peersRef.current.push({
          peerID: payload.callerID,
          peer
        });

        setPeers(users => [...users, newPeer]);
      });

      socket.on("receiving returned signal", payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });
    }

    return () => {
      socket.off("user joined");
      socket.off("receiving returned signal");
    }
  }, [currentUser, participants, owner, video, peersRef]);

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
      socket.emit("returning signal", { signal, callerID: currentUser.email });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  console.log("peers!!!!!!", peers);
  return (
    <CamWindowContainer>
      <video ref={video} autoPlay playsInline className="cam-video" />
      {peers.map((peer, index) => {
        return (
          <Video key={index} peer={peer} className="participant owner" />
        );
      })}
    </CamWindowContainer>
  );
}

export default CamWindow;
