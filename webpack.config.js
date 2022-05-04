// webpack.config.js
// webpack 명령은 기본적으로 이 설정으로 시작
 
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // node_modules 에서 불러옴
 
module.exports = {
    mode : 'development',
    // 웹팩 v4부터는 mode 필수
    entry: {
        common : './src/js/common.js',
        ui : './src/js/ui.js',
        swiper : ['./src/js/module1.js','./src/js/module2.js'], // 배열 사용
    },
    output: {
        path: path.resolve('dist'),//폴더가 없으면 만들기
        filename: 'js/[name].js',// 위에 지정한 entry 키의 이름에 맵핑되어 파일이 생성됨
    },
    // 로더를 지정하기 위한 module 정의
    module: {
        rules: [
            //module.rules 를 사용해 여러개의 로더 지정이 가능.
            {
                // test : 변환 할 파일을 지정
                // 정규 표현식으로 문자열 .css 확장자로 끝나는 것을 찾음.
                test: /\.css$/,
                
                // use : 해당 파일에 적용할 로더의 이름
                // 로더에서 모듈 로딩 순서는 배열의 요소 오른쪽에서 왼쪽으로 로딩하며 진행
                // MiniCssExtractPlugin 사용
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
    
                // exclude 는 제외할 폴더나 파일
                // 다른 모듈을 사용해서 컴파일하지 않도록 지정(안전성 확보)
                exclude: /node_modules/
            },
            // 추가 rule
            // {
            //     test: /\.vue$/,
            //     use: ['vue-loader']
            // },
            {
                test: /\.scss$/,
                use: ['css-loader', 'sass-loader']
            },
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }]
            }


        ]
    },
    plugins : [
        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({ filename: 'css/[name].css' })
    ],
    devServer: {
        port: 9000,
        static: {
            directory: path.resolve('dist/'),
            
          },
    },


};



// module.exports = {
//     mode : 'development',
//     // 웹팩 v4부터는 mode 필수
//     // mode 는 production, development, none 3가지 옵션이 존재
//     // mode 의 production 은 각 설정마다 내장된 최적화 옵션을 자동으로 설정하여 준다
//     entry: {
//         test : './src/js/test.js',
//         // 'module.chunk' : ['./src/js/module1.js','./src/js/module2.js']
//         // 배열 사용(오른쪽부터 왼쪽으로 읽어감)
//     },
//     output: {
//         // filename 으로 생성된 번들링을 어느 경로에 생성할 지를 설정
//         // __dirname 은 node 에서 제공하는 node 파일의 경로를 담고 있는 변수
//         // __이 붙어 있는 변수들은 항상 무엇인가를 담고있는 특별한 변수들임
//         // path 에는 절대 경로 설정(절대값으로 static(정적)으로 사용)
//         path: path.resolve(__dirname, 'dist/js'),
         
//         // bundling 된 결과 파일의 이름
//         filename: '[name].js'
//          // 위에 지정한 entry 키의 이름에 맵핑되어 파일이 생성됨
//     }
// };


// webpack.config.js
 
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
 
// module.exports = {
//     mode : 'development',
//     entry : {
//          app : './src/js/index.js',
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist/js'),//폴더가 없으면 만들기
//         filename: '[name].js',// 위에 지정한 entry 키의 이름에 맵핑되어 파일이 생성됨
//     },
//     plugins : [
//          new HtmlWebpackPlugin(),
//         //  new webpack.ProgressPlugin(),
//         //  new webpack.optimize.UglifyJsPlugin()
//          // ...
//      ]
// }