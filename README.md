# 에듀클라우드TF 포털 구축 대비
# webpack 세팅

## 현재 구조
- **html 작업은 dist폴더에서 작업**
- **scss,js,image** (sprite 사용 시에만, 다른 이미지는 기존대로 S3로 업로드 예정)는 src폴더에서 작업 후 번들링(webpack 실행) 후 **dist폴더에 있는 파일이 개발/운영** 에 올라가야 함
    sprite된 이미지도 s3에 올린 후 scss에서 주소 수정 필요

- 수정예정 사항 : 현재 dist에 spr된 이미지가 dist 바로 밑에 생성되고 있어 수정예정

### 배포용(/dist/ - base url)
**/dist/**  
|-- html/main.html(메인 html)
|-- html/header.html(헤더 html)
|-- html/footer.html(푸터 html)
|-- css/common.css - 기본 스타일  
|-- css/swiper.css - swiper css  
|-- js/common.js - 기본 js  
|-- js/swiper.js - swiper 플러그인  
|-- js/ui.js - init  

### 개발용(src폴더)  
**/src/**  
|-- css/base.css - index.js에서 호출하여 index.css로 변환  
|-- css/swiper.css - module1.js에서 호출하여 swiper.css로 변환  
|-- js/index.js - 기본js index.js로 변환  
|-- js/module1.js - swiper module 호출 및 실행하며 swiper.js 로 변환  
|-- js/module2.js - module 추가용 swiper.js 로 합쳐져서 변환  

설치현황
- jquery, css-loader, html-webpack-plugin, swiper(4.5.1), sass-loader, file-/url-loader, webpack server, webpack-spritesmith, babel

---
## npm으로 세팅 방법
0. **node.js 선 설치 필수**  
1. git clone http://github.etoos.com/AE210208/webpack-test  
2. clone 받은 위치 CLI에서 npm install  
3. npm install이 완료되면 CLI에서 명령어 'webpack' 입력(build 역할)  
**mac에서 npm install 등으로 설치 시 에러가 뜨면 대부분 권한 문제로 sudo 키워드를(관리자권한 - PC 비밀번호 입력 뜸) 맨 앞에 붙여서 실행**  

| `구분` | npm install 이후 webpack 명령 실행시 에러 나오면 수행 |
|:---|:---|
| `공통` | npm i webpack --global|
| `공통` | npm i webpack webpack-cli -global|
| `공통` | npm i webpack webpack-cli --save-dev|
| `windows` | vscode의 setting.json에서 "terminal.integrated.defaultProfile.windows" 를<br>"Git Bash"로 변경.(기본값은 'power shell') |

4. build가 정상적으로 수행 되면 이후 명령어는 'npm run dev'로 빌드&서버실행 한번에 수행 - http://localhost:9000/  
5. **서버  종료 시 CLI 에서 ctl + z 두번 입력** - 서버종료가 정상적으로 되지 않을 경우 활성포트가 남아있어 웹팩 서버 실행이 되지 않아 강제로 해당 포트 프로세스를 종료시켜야 함  
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
## 이미지 sprite 사용법
1. /src/assets/images/icons에 스프라이트 만들 이미지를 낱개로 넣음(경로 변경 가능 - 원본 이미지는 기존 이미지들과 이름 겹치지 않게 작명)
2. webpack 실행하여 /src/sprite.scss 에서 자동생성된 믹스인 구문 확인 후 사용  
(ex> common.scss에 임포트(@import '../assets/spritesmith-generated/sprite.scss';) 후  
.icon01 {@include sprite($icon01);} 와 같은 식으로 사용 - icon01은 원본이미지의 파일명)
3. webpack.config.js 에서 관련 소스수정(new SpritesmithPlugin 부분, 별도 sprite 이미지를 작업하고 싶으면 해당 인스턴스 추가 생성)
4. /src/assets/spritesmith-generated/ 폴더에 스프라이트 된 이미지를 이미지 서버에 업로드(EX> S3서버 같은)
5. /dist 폴더에 자동생성되는 해쉬값 png파일은 무시(안 지우면 쌓일테니 지우는 걸 추천)

---
## CLI 입력 가능 명령
- webpack : 빌드만 수행
- npm run build : 위 webpack과 같음
- npm run dev : webpack 과 webpack server 함께 실행하며 먼저 실행되는 webpack이 성공 시 다음 명령 수행(webpack 과정에서 에러가 발생하면 이후 서버실행은 진행하지 않음)