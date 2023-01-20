# 김청훈 - 원티드 프리온보딩 챌린지 23년 1월 프론트엔드 코스 사전과제

안녕하세요.
원티드 프리온보딩 챌린지 23년 1월 프론트엔드 코스를 신청한 김청훈 입니다.
좋은 경험을 통하여 많이 배우고 싶습니다.
잘 부탁 드립니다!

<br/>

---

## 개요

1. [Demo 실행 방법](#demo-실행-방법)
   1. [git hub page 배포 링크 (API TEST 서버는 따로 실행 필요)](<#git-hub-page-배포-링크-(API-TEST-서버는-따로-실행-필요)>)
2. [API Test 참고 및 사전과제 가이드](#API-Test-참고-및-사전과제-가이드)
   1. [요건 사항](#요건-사항)
3. [설치 패키지 및 개발 환경](#설치-패키지-및-개발-환경)
4. [프로젝트 트리 구조](#프로젝트-트리-구조)
5. [과제 진행 시 주안점](#과제-진행-시-주안점)
6. [한계점 및 개선 사항](#한계점-및-개선-사항)

<br/>

---

## demo 실행 방법

1. API Test Server 실행

   1. 위의 [API Test 참고 및 사전과제 가이드](#1.-API-Test-참고-및-사전과제-가이드) 참고

2. 과제 프로젝트 실행
   1. Git hub Repository Code Download
   2. `npm install`
   3. `yarn start`

### git hub page 배포 링크 (API TEST 서버는 따로 실행 필요)

https://clean-teach.github.io/wanted-pre-onboarding-challenge-fe-1/

<br/>

---

## API Test 참고 및 사전과제 가이드

https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api

### 요건 사항

- [x] /auth 경로에 로그인 / 회원가입 기능을 개발
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성
  - [x] 이메일과 비밀번호의 유효성을 확인
    - [x] 이메일 조건 : 최소 @, . 포함
    - [x] 비밀번호 조건 : 8자 이상 입력
    - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화
  - [x] 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동
    - [x] 응답으로 받은 토큰은 로컬 스토리지에 저장
    - [ ] 다음 번에 로그인 시 토큰이 존재한다면 루트 경로로 리다이렉트
    - [ ] 어떤 경우든 토큰이 유효하지 않다면 사용자에게 알리고 로그인 페이지로 리다이렉트
- [x] Todo List API를 호출하여 Todo List CRUD 기능을 구현
  - [x] 목록 / 상세 영역으로 나누어 구현
  - [x] Todo 목록을 볼 수 있습니다.
  - [x] Todo 추가 버튼을 클릭하면 할 일이 추가
  - [x] Todo 수정 버튼을 클릭하면 수정 모드를 활성화하고, 수정 내용을 제출하거나 취소
  - [x] Todo 삭제 버튼을 클릭하면 해당 Todo를 삭제
- [x] 한 화면 내에서 Todo List와 개별 Todo의 상세를 확인
  - [x] 새로고침을 했을 때 현재 상태가 유지
  - [x] 개별 Todo를 조회 순서에 따라 페이지 뒤로가기를 통하여 조회
- [x] 한 페이지 내에서 새로고침 없이 데이터가 정합성을 갖추도록 구현
  - [x] 수정되는 Todo의 내용이 목록에서도 실시간으로 반영

<br/>

---

## 설치 패키지 및 개발 환경

- `create-react-app` : 미리 셋팅된 리액트 환경을 이용하기 위해서 선택
- `typescript` : 안전한 코딩을 하기 위하여 사용
- `styled-components` : 컴포넌트 단위 스타일링을 위하여 사용
- `react-router-dom` : URL 별로 화면을 분류 하기 위하여 사용
- `recoil` : 편리한 전역변수 관리를 위하여 사용
- `react-hook-form` : 반복되는 form 관리 작업의 편의를 위하여 사용
- `axios` : GET, PUT, POST, DELETE 등의 메서드로 편리하게 비동기 API 요청 작업을 하기 위하여 사용
- `react-query` :
  - API 비동기 요청과 로딩 상태, 응답 상태 관리에 대한 코드를 축약 해서 사용 할 수 있다.
  - data를 캐시에 저장해두기 때문에 화면을 떠났다가 돌아와도 data를 다시 로딩하지 않는다.

<br/>

---

## 프로젝트 트리 구조

- presentational & container 디자인 패턴 으로 폴더를 정리 하였습니다.

```
|   App.tsx
|   index.tsx
|   react-app-env.d.ts
|
+---api
|       api.ts
|
+---atoms
|       atoms.ts
|
+---components
|   +---layouts
|   |       HeaderContainer.tsx
|   |       HeaderPresentational.tsx
|   |
|   +---pages
|   |   +---auths
|   |   |       LoginContainer.tsx
|   |   |       LoginPresentational.tsx
|   |   |       SignUpContainer.tsx
|   |   |       SignUpPresentational.tsx
|   |   |
|   |   \---todos
|   |           TodoListContainer.tsx
|   |           TodoListPresentational.tsx
|   |
|   \---todos
|           CreateTodoContainer.tsx
|           CreateTodoPresentational.tsx
|           TodoItemContainer.tsx
|           TodoItemPresentational.tsx
|           TodoViewContainer.tsx
|           TodoViewPresentational.tsx
|
+---hooks
|   +---auth
|   |       signIn.ts
|   |       signUp.ts
|   |
|   \---todo
|           createTodo.ts
|
+---router
|       Router.tsx
|
+---styles
|       GlobalStyle.tsx
|       styled.d.ts
|       theme.ts
|
+---types
|       apiPropsTypes.ts
|       atomsTypes.ts
|       authComponentTypes.ts
|       todoComponentTypes.ts
|
\---utils
        function.ts
        regexp.ts
        strings.ts
```

<br/>

---

## 과제 진행 시 주안점

- 실무에서 필요한 업무 능력이 무엇인지 배우고 이를 실습해보는 과정에서 깊게 이해하고 싶었습니다.

<br/>

---

## 한계점 및 개선 사항

- react-query 를 셋팅까지 다 해놓고, 착오로 사용 하지 않았기 때문에 추 후 적용이 필요 합니다.
