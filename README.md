# 김청훈 - 원티드 프리온보딩 챌린지 23년 1월 프론트엔드 코스 사전과제

안녕하세요.
원티드 프리온보딩 챌린지 23년 1월 프론트엔드 코스를 신청한 김청훈 입니다.
좋은 경험을 통하여 많이 배우고 싶습니다.
잘 부탁 드립니다!

---

## 개요 추가

1. [API Test 참고 및 사전과제 가이드](#API-Test-참고-및-사전과제-가이드)
2. [Demo 실행 방법](#Demo-실행-방법)

- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a
- a

---

## 1. API Test 참고 및 사전과제 가이드

https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api

### 1-1. 요건 사항

- [x] /auth 경로에 로그인 / 회원가입 기능을 개발
  - [x] 최소한 이메일, 비밀번호 input, 제출 button을 갖도록 구성
  - [x] 이메일과 비밀번호의 유효성을 확인
    - [x] 이메일 조건 : 최소 @, . 포함
    - [x] 비밀번호 조건 : 8자 이상 입력
    - [x] 이메일과 비밀번호가 모두 입력되어 있고, 조건을 만족해야 제출 버튼이 활성화 되도록 해주세요
  - [x] 로그인 API를 호출하고, 올바른 응답을 받았을 때 루트 경로로 이동시켜주세요

---

## 2. Demo 실행 방법

1. Git hub Repository Code Download
2. `npm install`
3. `yarn start`

---

## 3. git hub page 배포 링크 (API TEST 서버는 따로 실행 필요)

https://clean-teach.github.io/wanted-pre-onboarding-challenge-fe-1/

---

## 설치 패키지 및 개발 환경

- `create-react-app`
- `typescript`
- `styled-components`
- `react-router-dom`
- `recoil`
- `react-hook-form`
- `axios`
- `react-query`

---

## 트리 구조

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
