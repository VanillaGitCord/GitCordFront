# GitCord

Introduction
---
GitCord는 하나의 방에 여러 유저들이 모여 토의하여 코드를 작성하고,
채팅과 음성 채팅을 통해 소통할 수 있는 웹 어플리케이션입니다.
코드 에디터와 화이트 보드 기능을 가지고 있으며,
코드 에디터로 간단한 코드를 작성하고 서로에게 실시간으로 공유하며
화이트 보드를 통해서 막힌 부분에 대해서 그림을 통해 보다 쉽게 설명할 수 있습니다.

Installation
---
Client
```
  git clone https://github.com/VanillaGitCord/GitCordFront.git
  npm install
  npm start
```

Server
```
  git clone https://github.com/VanillaGitCord/GitCordBack.git
  npm install
  npm run dev
```

Skill
---
Clinet
  - React를 사용하여 컴포넌트 기반 UI 구성
  - React router를 사용하여 routing 구현
  - Redux를 사용하여 Flux 아키텍쳐 기반으로 구성
  - lodash의 throlle 기능을 사용하여 이벤트 제어
  - socket.io-client를 사용하여 실시간 통신 기능 구현
  - simple-peer (webRtc)를 사용하여 캠, 음성 채팅 기능 구현
  - styled-components를 사용하여 컴포넌트 별 스타일 구성
  - codeMirror를 사용하여 코드 에디터 기능을 구현
  - HTML canvas를 사용하여 드로잉 보드 기능을 구현

Server
  - argon2를 사용하여 보안 강화
  - Node.js 프레임 워크 Express
  - json web token를 사용하여 토큰을 활용한 로그인 기능 구현
  - mongoDB Atlas
  - mongoose
  - socket.io를 사용하여 실시간 통신 기능 구현

Features
---
- 로컬 회원 가입 / 로그인 기능
- 구글 소셜 로그인
- 캠 기능 (방장만 가능)
- 마이크 기능 및 음소거 기능
  (모든 유저는 마이크 기능을 사용할 수 있으며, 방장은 마이크와 함께 캠을 끌 수 있습니다)
- 코드 에디터 기능 (자바스크립트 지원)
- 채팅 기능
- 코드 저장하기 기능
- 저장한 코드 불러오기 기능
- 채팅 기능
- 방 URL 클립보드 copy 기능
- 화이트 보드 기능 (color picker & All clear 내장)

Chanllenge
---
- 대부분의 기능이 socket을 이용한 실시간 데이터 송수신이 필요했습니다.
  socket.io와 Redux를 활용하여 데이터 flow를 관리하는 부분에서 문제들이 있었습니다.

  예를 들면 방장이 떠나게 될 경우, 기존 방 내에 있는 참여자들도 같이 channel 선택창으로
  이동한 후 다시 방장이 룸을 만들 경우 방이 만들어지고 바로 퇴장을 당하는 문제가 있었습니다.
  해당 문제는 socket.io의 로직이 비동기적으로 동작된다는 점이 문제가 됬고,
  redux의 dispatch 함수가 socket.io의 on emit 로직보다 더 빨리 실행되는게 문제의 원인이었습니다.

  문제 해결을 위해 방장이 나갈 경우 redux에서 상태값에 변화를 주면 해당 방에 그 상태 값을 통해
  퇴장 전 로딩 컴포넌트를 띄우고 해당 컴포넌트에서 useEffect를 통해 다시 redux의 상태값을
  초기 상태로 되돌리는 방식으로 flow를 형성하여 문제를 해결했습니다.

- 
