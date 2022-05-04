// module1.js
 
import $ from 'jQuery';
import Swiper from 'swiper';
import '../css/swiper.css';

(function () {
    $(document).ready(function() {
        $('#container > p').text('jQuery 를 불러와 사용하고 있습니다.')
         var swiper = new Swiper('.swiper', {
          });
    });
})();

console.log('module1.js swiper 입니다');