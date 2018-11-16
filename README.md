# React TypeScript Tutorial

React.js 를 JavaScript 에서 작성한 굴레를 벗어나, TypeScript 을 이용하여 연습 해 보겠습니다.

## What Is TypeScript?

타입스크립트(TypeScript)는 Microsoft 에서 제작하였으며, JS 에서 못 했던 변수의 **타입**을 명시할 수 있습니다.

순수 자바스크립트에서 변수나 함수 종류에 따른 에러를 짐작하기 힘들었지만, 적어도 이에 따른 명시가 있으면 어떤 부분에서 오류가 걸렸는지 짐작이 가능하게 해 줍니다.

실제로 VS Code 도 이로 대부분 작성 되었으며, Angular 2 프레임워크의 주요 언어입니다. 물론 React 이외에 Vue 도 TypeScript 으로도 작성할 수 있습니다.

TypeScript 은 C, Java 언어를 공부하신 분들은 익숙할 것입니다. 그리고 공부할 양은 그렇게 많지 않아서 쉽게 접근하실 수 있습니다.

## Before Tutorial

React.js 를 `create-react-app` 을 이용하여 App 을 생성하는 방법을 기준으로 설명 하겠습니다.

처음으로 CMD 창에 아래와 같은 명령어를 입력하셔서, TypeScript 으로 개발하기 위한 Library 를 설치합니다.

```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

그 다음, `create-react-app` 명령어를 이용해서 Application 을 만들어 주는데, 맨 마지막에 `--scripts-version=react-scripts-ts` 을 꼭 써 주시길 바랍니다.

```
create-react-app [App 이름] --scripts-version=react-scripts-ts
```

Application 을 생성하고, `package.json` 파일로 들어가면 dependency 는 다음과 같이 구성 되어 있습니다. 

Web Browser 에서 실제로 작동하는 JavaScript 의존성은 dependencies 에 포함 되어 있고, 개발 언어를 TypeScript 로만 하여 이를 JS 컴파일에 치환시켜 주는 의존성은 devDependencies 에 포함 되어 있습니다. 

```
...
"dependencies": {
    "react": "^16.6.0",
    "react-dom": "^16.6.0",
    "react-scripts-ts": "3.1.0"
},
"scripts": {
    "start": "react-scripts-ts start",
    "build": "react-scripts-ts build",
    "test": "react-scripts-ts test --env=jsdom",
    "eject": "react-scripts-ts eject"
},
"devDependencies": {
    "@types/jest": "^23.3.9",
    "@types/node": "^10.12.2",
    "@types/react": "^16.4.18",
    "@types/react-dom": "^16.0.9",
    "typescript": "^3.1.6"
}
...
```

이로써 TypeScript 로 React App을 개발하기 위한 준비 과정은 모두 마쳤습니다. 여기서는 React Application 을 실행하는 작업들은, `react-scrips` 을 이용하지 않고, `react-stripts-ts` 를 이용하여 이뤄집니다.

그러나 React 관련 라이브러리를 새로 추가하여 적용 할 때, TypeScript 제공 여부를 확인하셔야 됩니다. (예를 들어 `react-router-dom` 인 경우, `@types/react-router-dom`.)

대부분 TypeScript 을 제공하는 경우에, NPM Library Package 이름 앞에 @types 가 붙게 됩니다. 이를 devDependencies 에 의존성 추가를 하면 되는데 install or add 명령어 맨 마지막에 `--save-dev`를 추가하시면 됩니다.

## Examples Of Study

- Chapter 01. 간단한 계산기 Application 만들기

- Chapter 02. No Server 전화 번호부 만들기

- Chapter 03. AJAX(axios) 를 이용한 음악 목록 만들기

    - Server 는 django REST Framework 를 사용 했습니다.
  
    - AJAX 라이브러리는 axios 를 사용 했습니다.

- Chapter 04. Redux 를 이용한 음악 목록 주고 받기(예정)

## Thanks To

- TypeScript 패키지 추가하기 - https://facebook.github.io/create-react-app/docs/adding-typescript

- React + TypeScript 시작하기 - https://levelup.gitconnected.com/typescript-and-react-using-create-react-app-a-step-by-step-guide-to-setting-up-your-first-app-6deda70843a4

## Author

- 강인성([tails5555](https://github.com/tails5555))