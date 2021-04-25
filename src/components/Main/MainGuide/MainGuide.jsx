import styled from "styled-components";
import React from "react";

import ModalBackground from "../../publicComponents/ModalBackground/ModalBackground";

const MainGuideContainer = styled.div`
  font-weight: bold;
  font-size: 1rem;
  color: #ffffff;

  .back-button-guide {
    position: fixed;
    width: 15%;
    top: 10%;
    left: 3%;
    border-bottom: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    text-align: right;
  }

  .title-guide {
    position: fixed;
    width: 10%;
    top: 5%;
    left: 10%;
    border-bottom: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    text-align: right;
  }

  .share-button-guide {
    position: fixed;
    width: 23%;
    top: 7%;
    right: 19%;
    border-bottom: 1px solid #ffffff;
    border-right: 1px solid #ffffff;
  }

  .user-list-guide {
    position: fixed;
    width: 15%;
    top: 20%;
    left: 17%;
    border-bottom: 1px solid #ffffff;
    text-align: right;
  }

  .editor-guide {
    position: fixed;
    width: 15%;
    bottom: 5%;
    left: 50%;
    border-bottom: 1px solid #ffffff;
    border-left: 1px solid #ffffff;
    text-align: right;
  }

  .chat-guide {
    position: fixed;
    width: 20%;
    bottom: 15%;
    right: 17%;
    border-bottom: 1px solid #ffffff;
    text-align: left;
  }
`;

function MainGuide() {
  return (
    <ModalBackground>
      <MainGuideContainer>
        <span className="back-button-guide">
          채널 페이지로 이동하는 버튼입니다.
        </span>
        <span className="title-guide">
          방 제목입니다.
        </span>
        <span className="share-button-guide">
          공유하기 버튼입니다.<br />
          누르신 후 나오는 모달의 복사하기 아이콘을 누르세요.
        </span>
        <span className="user-list-guide">
          입장한 유저들의 리스트입니다.
        </span>
        <span className="editor-guide">
          코드를 작성하는 에디터입니다.<br />
          입장한 유저들 모두 사용 가능합니다.
        </span>
        <span className="chat-guide">
          채팅창입니다.<br />
          채팅을 입력하시면 위 채팅창에 올라갑니다.
        </span>
      </MainGuideContainer>
    </ModalBackground>
  );
}

export default MainGuide;
