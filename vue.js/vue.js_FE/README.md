# vue.js_FE

참고

설치
https://medium.com/witinweb/vue-cli-%EB%A1%9C-vue-js-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-browserify-webpack-22582202cd52

구글맵
https://alligator.io/vuejs/vue-google-maps/
npm install vue2-google-maps --save : vue2 구글맵 설치

npm install --save axios (axios 모듈 추가 / api 서버 연동을 위한 http 통신 모듈)

BootStrap / ScrollActive / VueFullPage / VueMaterial / bCarousel / VueGoogleMap / vue-concise-slider 사용

vue-cli 전역 설치
npm install -g vue-cli

프로젝트 생성
vue init webpack (템플릿 이름) vue.js_FE(프로젝트 이름)

프로젝트 디렉토리로 이동 후 npm install(패키지 설치)

npm run dev 개발모드
npm run build 배포

-----------------------------------------------------------------------

로컬로 개발 할 때 cors 이슈 문제 해결

https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
확장 프로그램 이용
-> api 서버에서 cors 모듈을 사용해도 로컬호스트 요청은 cors 이슈 발생.
크롬 --allow-file-access --allow-cross-origin-auth-prompt 추가해도 이제는 막힌듯
