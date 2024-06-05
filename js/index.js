/**
 * Created by llairen on 2016/12/3.
 */

$(document).ready(function () {
// 模拟图片数据
    var dataPic = {'data':[{'src':'2.JPG'},{'src':'4.JPG'},{'src':'6.JPG'},{'src':'74.jpg'},{'src':'75.jpg'},{'src':'12.JPG'},{'src':'14.JPG'},{'src':'16.JPG'},{'src':'76.jpg'},{'src':'77.jpg'},{'src':'66.jpg'},{'src':'67.jpg'},{'src':'78.jpg'},{'src':'79.jpg'},{'src':'80.jpg'},{'src':'81.jpg'},{'src':'82.jpg'},{'src':'22.JPG'},{'src':'24.JPG'},{'src':'26.JPG'},{'src':'83.jpg'},{'src':'69.jpg'},{'src':'70.jpg'},{'src':'84.jpg'},{'src':'85.jpg'},{'src':'88.jpg'},{'src':'89.jpg'},{'src':'90.jpg'},{'src':'91.jpg'},{'src':'68.jpg'},{'src':'92.jpg'},{'src':'93.jpg'},{'src':'42.JPG'},{'src':'44.JPG'},{'src':'46.JPG'},{'src':'96.jpg'}]};

   window.onscroll=function () {
       imgLocation();
       $(window).on('scroll', function () {
           var parent = $('#container');
           if (isSide()) {
               $.each(dataPic.data, function (i, v) {

               var box = $('<div>').addClass('box').appendTo(parent);
                   $('<img>').attr('src','./images/'+$(v).attr('src')).appendTo(box);

               });
               imgLocation();
           }
       });
   }

});

function isSide() {

    var abox = $('.box');
    var viewH = $(window).height();
    var scrollT = $(window).scrollTop();
    var top = abox.last().get(0).offsetTop;
    return (top < viewH + scrollT)?true:false;
}

function imgLocation() {
    var parent = $('#container');
    var aBox = $('.box');

    var width = aBox.eq(0).outerWidth();
    var cols = Math.floor($(window).width()/width);


    parent.css({
        'width': (cols*width)+'px',
        'margin': '0 auto'
    });

    var boxHeightArr = [];
    aBox.each(function (index, value) {

        var heigth = aBox.eq(index).height();

        if (index < cols) {
            boxHeightArr.push(heigth);
        } else {
            var minH = Math.min.apply(null, boxHeightArr);

            var minIndex = $.inArray(minH, boxHeightArr);

            $(value).css({
                'position': 'absolute',
                'top': minH,
                'left': aBox.eq(minIndex).position().left
            });

            boxHeightArr[minIndex] += aBox.eq(index).height();
        }
    })
}
