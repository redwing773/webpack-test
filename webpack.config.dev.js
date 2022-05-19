// webpack.config.dev.js
// webpack 명령은 기본적으로 이 설정으로 시작

const webpack = require('webpack');
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // node_modules 에서 불러옴
const SpritesmithPlugin = require('webpack-spritesmith');
const MobileSpritesmithPlugin = require('webpack-spritesmith');
 
module.exports = {
    mode : 'development',
    // mode : 'production',
    devtool: "inline-source-map",
    // devtool: 'source-map',
    entry: {
        common : './src/js/common.js',
        ui : './src/js/ui.js',
        // module : ['./src/js/module1.js','./src/js/module2.js'], // 배열 사용
        // newtest : './src/js/module2.js',
    },

    output: {
        path: path.resolve(__dirname,'dist'),//폴더가 없으면 만들기
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
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            },

            // {
                
            //     test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]?[hash]'
            //         }
            //     }],
            // },

            {
                test: /\.(svg)$/,
                use: {
                  loader: 'url-loader',
                  options: {
                    name: '[name].[ext]',
                    publicPath: '/',
                    limit: 10000,
                  }
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  // outputPath:'assets/images',
                  // publicPath:'../assets/images/',
                },
            },
            {
              test: /\.(js)$/,
              loader: 'babel-loader',
            },
        ]
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          default: {
            test: /[\\/]node_modules[\\/]/,
            name: "lib",
            chunks: "all",
          },
        }
      },
    },
    

    plugins : [
        // new HtmlWebpackPlugin({ filename: 'html/[name].html' }),

        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
        
        new SpritesmithPlugin({
            src: {
              cwd: path.resolve(__dirname,'src/assets/images/icons'),// 이미지 원본파일 위치
              glob: '*.png', //확장자 설정
            },
            target: {
              image: path.resolve(__dirname,'src/assets/spritesmith-generated/sprite1.png'),//생성될 위치와 파일명
              css: path.resolve(__dirname,'src/assets/spritesmith-generated/sprite1.scss'),//생성될 위치와 파일명
            },
            apiOptions: {
              cssImageRef: 'https://acaimg.etoos.com/cs/pc/gate/images/cnt/recruit/bansu_2023/cont1_right_spr.png',//참조될 위치와 파일명(ex>https://img.etoos.com/enp/front/main/web/images/sprites/sprite_common.png)
            },
        }),

        new SpritesmithPlugin({ //다른 스프라이트 이미지 생성
          src: {
            cwd: path.resolve(__dirname,'src/assets/images/imgs2'),// 이미지 원본파일 위치
            glob: '*.png', //확장자 설정
          },
          target: {
            image: path.resolve(__dirname,'src/assets/spritesmith-generated/sprite2.png'),//생성될 위치와 파일명
            css: path.resolve(__dirname,'src/assets/spritesmith-generated/sprite2.scss'),//생성될 위치와 파일명
          },
          apiOptions: {
            cssImageRef: 'https://img.etoos.com/enp/front/main/web/images/sprites/sprite_common.png', //참조될 위치와 파일명(ex> s3 이미지 올리는 저장소에 올린 주소)
          },
        }),

        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
        })


    ],

    devServer: {
        port: 9000,
        static: {
            directory: path.resolve(__dirname,'dist/'),
            
          },
    },


};
