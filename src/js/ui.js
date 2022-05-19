// ui.js
import $ from 'jQuery';
import Swiper from 'swiper';
 
// import $ from 'jQuery';
(function () {
    $(document).ready(function() {
        //swiper
        var swiper = new Swiper('.swiper', {
        });
        var swiper = new Swiper('.swiper2', {
            direction : 'vertical',
        });
         
    });
})();

console.log('ui.js 입니다');

$('#header').load('/html/header.html #header');
$('#footer').load('/html/footer.html #footer');

import '/src/js/module2.js'