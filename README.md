# 에듀클라우드TF 포털 구축 대비
# webpack 세팅

## 현재 구조

### 배포용(/dist/ - base url)
**/dist/**  
|-- html/index.html(현재 파일)  
|-- css/index.css - 기본 스타일  
|-- css/swiper.css - swiper css  
|-- js/index.js - 기본 js  
|-- js/swiper.js - swiper 플러그인 및 init  

### 개발용(src폴더)  
**/src/**  
|-- css/base.css - index.js에서 호출하여 index.css로 변환  
|-- css/swiper.css - module1.js에서 호출하여 swiper.css로 변환  
|-- js/index.js - 기본js index.js로 변환  
|-- js/module1.js - swiper module 호출 및 실행하며 swiper.js 로 변환  
|-- js/module2.js - module 추가용 swiper.js 로 합쳐져서 변환  

설치현황
- jquery, css-loader, html-webpack-plugin, swiper(4.5.1), sass-loader, file-/url-loader

---
## npm으로 세팅 방법

1. git clone http://github.etoos.com/AE210208/webpack-test
2. **git에 올라가 있는 repositiory에는 웹팩의 설정파일들이 포함되어 있지만 git파일 갯수 제한으로 'node_modules'는 제외 되어 있어 webpack 설치를 통해 node_modules 추가가 필요**  
sudo npm i webpack --global  
sudo npm i webpack webpack-cli -global  
sudo npm i webpack webpack-cli --save-dev  
sudo npm i --save jquery  
sudo npm i -D css-loader style-loader  
sudo npm install --save-dev html-webpack-plugin  
sudo npm install swiper@4.5.1  
sudo npm i -D sass sass-loader
sudo npm i -D file-loader url-loader
<!-- npm install --save-dev webpack-spritesmith   -->

3. 세팅이 완료되면 CLI에서 명령어 'webpack' 을 통해 웹팩을 실행 후 사용

참고.  
- sudo 명령어는 mac에서 쓰는 관리자권한 명령어이므로 window에서는 제외
- npm으로 설치 시 나타나는 '1 critical severity vulnerability' 이 메시지는 취약점 관련 메시지로 오류는 아니므로 일단은 무시하도록 한다