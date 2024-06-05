/**
 * Created by llairen on 2016/12/1.
 * author : zml
 * qq     : 793190036
 * email  : zhanmengle@163.com
 */
window.onload=function () {

    // 模拟图片数据
    var dataPic = {'data':[{'src':'2.JPG'},{'src':'4.JPG'},{'src':'6.JPG'},{'src':'74.jpg'},{'src':'75.jpg'},{'src':'12.JPG'},{'src':'14.JPG'},{'src':'16.JPG'},{'src':'76.jpg'},{'src':'77.jpg'},{'src':'66.jpg'},{'src':'67.jpg'},{'src':'78.jpg'},{'src':'79.jpg'},{'src':'80.jpg'},{'src':'81.jpg'},{'src':'82.jpg'},{'src':'22.JPG'},{'src':'24.JPG'},{'src':'26.JPG'},{'src':'83.jpg'},{'src':'69.jpg'},{'src':'70.jpg'},{'src':'84.jpg'},{'src':'85.jpg'},{'src':'88.jpg'},{'src':'89.jpg'},{'src':'90.jpg'},{'src':'91.jpg'},{'src':'68.jpg'},{'src':'92.jpg'},{'src':'93.jpg'},{'src':'42.JPG'},{'src':'44.JPG'},{'src':'46.JPG'},{'src':'96.jpg'}]};
    waterFall('container','box');

    // 窗口滚动调用函数
    window.onscroll= function () {
        if (loadmore()) {
            var parent = document.getElementById('container');
            for (var i=0; i<dataPic.data.length; i++) {
                var box = document.createElement('div');
                box.className ='box';
                var img = document.createElement('img');
                img.src = './images/'+dataPic.data[i].src;

                box.appendChild(img);
                parent.appendChild(box);
            }
            waterFall('container', 'box');
        }

    };

    window.onscroll();
};

// 瀑布流fn
function waterFall(parent, childName) {
    var parentObj = document.getElementById(parent);
    var aBox = getChildElement(parentObj, childName);
    var img_w = aBox[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/img_w || document.body.clientWidth/img_w) ;
    parentObj.style.cssText = 'width:'+(img_w*cols)+'px; margin: 0 auto;';

    var arrHeight = [];

    for (var i=0; i<aBox.length; i++) {
        var height = aBox[i].offsetHeight;
        if (i<cols) {
            arrHeight[i]=height;
        } else {
            var minHeith = Math.min.apply(null, arrHeight);
            var minHindex = getMinHeight(arrHeight, minHeith);
            aBox[i].style.position = 'absolute';
            aBox[i].style.top = minHeith+'px';
            aBox[i].style.left= aBox[minHindex].offsetLeft+'px';
            arrHeight[minHindex] += aBox[i].offsetHeight;
        }
    }
}

// 是否需要加载更多
function loadmore() {
    var parent = document.getElementById('container');
    var aBox = getChildElement(parent, 'box');

    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var clientHeight = document.documentElement.clientHeight;
    // var lastEleCen = aBox[aBox.length-1].offsetTop + (aBox[aBox.length-1].offsetHeight/2);
    var lastEleCen = aBox[aBox.length-1].offsetTop;

    return (lastEleCen < scrollTop + clientHeight)?true:false;
}

// 求数组中的一个值。
function getMinHeight(arr, min) {
    for (var i in arr) {
        if (arr[i] == min) {
            return i;
        }
    }
}

// 获取子元素
function getChildElement(parent, className) {
    var childEle = parent.getElementsByTagName('*');
    var aBox = [];
    for (var i=0;i<childEle.length; i++) {
        if (childEle[i].className == className) {
            aBox.push(childEle[i]);
        }
    }
    return aBox;
}