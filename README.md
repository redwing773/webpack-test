# gitlab  
# 에듀클라우드TF 포털 구축 대비 webpack 적용 검토

## 현재 구조
- **html 폴더에서 html 작업**
- **src 폴더에서 css,js, sprite images 작업**
- **dist폴더(위 src의 작업물이 빌드됨)는 webpack으로 빌드된 파일들**
- **sprite images는 빌드 후 생성된 이미지를 S3에 직접 올리고 후 이미지 주소 수정 필요**

- known issue
    1. jquery 플러그인이 jquery를 쓰는 모든 js파일에 추가됨  
    2. babel 동작

### 배포용
**/dist/**  
|-- css/common.css - 기본 스타일  
|-- css/swiper.css - swiper css  
|-- js/common.js - 기본 js  
|-- js/jquery.js - jquery 플러그인
|-- js/swiper.js - swiper 플러그인
|-- js/ui.js - init  

### 개발용
**/src/**  
|-- assets/images - sprite 하기 위한 이미지들
|-- assets/spritesmith-generated - 생성된 sprite 이미지 위치
|-- css/common.css - index.js에서 호출하여 common.css로 변환  
|-- css/swiper.css - module1.js에서 호출하여 swiper.css로 변환  
|-- js/index.js - 기본js index.js로 변환  
|-- js/module1.js - swiper module 호출 및 실행하며 swiper.js 로 변환  
|-- js/module2.js - module 추가용 swiper.js 로 합쳐져서 변환  

설치현황
- jquery, css-loader, html-webpack-plugin, swiper(4.5.1), sass-loader, file-/url-loader, webpack server, webpack-spritesmith, babel

---
## npm으로 세팅 방법
0. **node.js 선 설치 필수**  
1. git clone https://gitlab.etoos.com/AE210208/webpack-test

2. clone 받은 위치 CLI에서 npm install  
3. npm install이 완료되면 CLI에서 명령어 'npm run dev' 입력(build 역할 및 수정 시 실시간 빌드)  
4. 작업이 완료되면 npm run prod입력 -> /dist 폴더의 css/js 및 html파일을 깃에 업로드  
**mac에서 npm install 등으로 설치 시 에러가 뜨면 대부분 권한 문제로 sudo 키워드를(관리자권한 - PC 비밀번호 입력 뜸) 맨 앞에 붙여서 실행**  

<!-- | `구분` | npm install 이후 webpack 명령 실행시 에러 나오면 수행 |
|:---|:---|
| `공통` | npm i webpack --global|
| `공통` | npm i webpack webpack-cli -global|
| `공통` | npm i webpack webpack-cli --save-dev|
| `windows` | vscode의 setting.json에서 "terminal.integrated.defaultProfile.windows" 를<br>"Git Bash 또는 cmd"로 변경.(기본값은 'power shell') | -->

4. build가 정상적으로 수행 되면 이후 명령어는 'npm run dev'로 빌드&서버실행 한번에 수행 - http://localhost:9000/  
5. **서버  종료 시 CLI 에서 cntl + c(또는 cnrl + z) 두번 입력** - 서버종료가 정상적으로 되지 않을 경우 활성포트가 남아있어 웹팩 서버 실행이 되지 않아 강제로 해당 포트 프로세스를 종료시켜야 함  
<!-- |sudo npm i --save jquery  |
|sudo npm i -D css-loader style-loader  |
|sudo npm install --save-dev html-webpack-plugin  |
|sudo npm install swiper@4.5.1  |
|sudo npm i -D sass sass-loader|
|sudo npm i -D file-loader url-loader|
|sudo npm install --save-dev webpack-spritesmith  | -->

**참고.**  
- npm으로 설치 시 나타나는 '1 critical severity vulnerability' 이 메시지는 취약점 관련 메시지로 오류는 아니므로 일단은 무시

---
## 활용법(CLI 입력)
- npm run dev : 개발 및 작업물 확인용 - 실행 시 개발용으로 빌드해 주며 프로세스가 끝나지 않고 상주하며 수정사항 발생 시 바로 빌드해서 반영해 준다. 또한 개발용 이라 css, js가 압축이 안되어 있어 디버깅에 용이
- npm run prod : 배포용(개발 또는 운영에 넘기는 용도) - 실행 시 배포용으로 파일을 빌드해 준다(css,js가 압축됨)
- /dist 폴더는 빌드할 떄마다 새로 생성되니 지워도 무방

---
## 이미지 sprite 사용법
1. /src/assets/images/icons에 스프라이트 만들 이미지를 낱개로 넣음(경로 변경 가능 - 원본 이미지는 기존 이미지들과 이름 겹치지 않게 작명)
2. webpack 실행하여 /src/sprite.scss 에서 자동생성된 믹스인 구문 확인 후 사용  
(ex> common.scss에 임포트(@import '../assets/spritesmith-generated/sprite.scss';) 후  
.icon01 {@include sprite($icon01);} 와 같은 식으로 사용 - icon01은 원본이미지의 파일명)
3. webpack.config.js 에서 관련 소스수정(new SpritesmithPlugin 부분, 별도 sprite 이미지를 작업하고 싶으면 해당 인스턴스 추가 생성)
4. /src/assets/spritesmith-generated/ 폴더에 스프라이트 된 이미지를 이미지 서버에 업로드(EX> S3서버 같은)
5. /dist 폴더에 자동생성되는 해쉬값 png파일은 무시(안 지우면 쌓일테니 지우는 걸 추천)