/**
 * Created by ChengYa on 2016/6/18.
 */

//判断手机类型
window.onload = function () {
    //alert($(window).height());
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
    } else if (u.indexOf('iPhone') > -1) {//苹果手机
        //屏蔽ios下上下弹性
        $(window).on('scroll.elasticity', function (e) {
            e.preventDefault();
        }).on('touchmove.elasticity', function (e) {
            e.preventDefault();
        });
    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
    }
    //预加载
    loading();
}

var date_start;
var date_end;
date_start = getNowFormatDate();
//加载图片
var loading_img_url = [
    "./pages/1.png",
    "./pages/2.png",
    "./pages/3.png",
    "./pages/4.png",
    "./pages/5.png",
    "./pages/6.png",
    "./pages/7.png",
    "./pages/8.png",
    "./pages/9.png",
    "./pages/10.png",
    "./pages/11.png", 
    "./pages/12.png",
    "./pages/13.png",
    "./pages/14.png",
    "./pages/15.png",
    "./pages/16.png",
    "./pages/17.png",
    "./pages/18.png",
    "./pages/19.png",
    "./pages/20.png",
    "./pages/21.png",
    "./pages/22.png",
    "./pages/23.png",
    "./pages/24.png",
    "./pages/25.png",
    "./pages/26.png",
    "./pages/27.png",
    "./pages/28.png",
    "./pages/29.png",
    "./pages/30.png",
    "./pages/31.png",
    "./pages/32.png",
    "./pages/33.png",
    "./pages/34.png",
    "./pages/35.png",
    "./pages/36.png",
    "./pages/37.png",
    "./pages/38.png",
    "./pages/39.png",
    "./pages/40.png",
    "./pages/41.png",
    "./pages/42.png",
    "./pages/43.png",
];

//加载页面
function loading() {
    var numbers = 0;
    var length = loading_img_url.length;

    for (var i = 0; i < length; i++) {
        var img = new Image();
        img.src = loading_img_url[i];
        img.onerror = function () {
            numbers += (1 / length) * 100;
        }
        img.onload = function () {
            numbers += (1 / length) * 100;
            $('.number').html(parseInt(numbers) + "%");
            console.log(numbers);
            if (Math.round(numbers) == 100) {
                $('.loading').hide();
                date_end = getNowFormatDate();
                var loading_time = date_end - date_start;
                //预加载图片
                $(function progressbar() {
                    //拼接图片
                    $('.shade').hide();
                    var tagHtml = "";
                    for (var i = 1; i <= 44; i++) {
                        if (i == 1) {
                            tagHtml += ' <div id="first" style="background:url(pages/' + i + '.png) center top no-repeat;background-size:100%"></div>';
                        } else if (i == 44) {
                            tagHtml += ' <div id="end" style="background:url(pages/' + i + '.png) center top no-repeat;background-size:100%"></div>';
                        } else {
                            tagHtml += ' <div style="background:url(pages/' + i + '.png) center top no-repeat;background-size:100%"></div>';
                        }
                    }
                    $(".flipbook").append(tagHtml);
                    var w = $(".graph").width();
                    $(".flipbook-viewport").show();
                });
                //配置turn.js
                function loadApp() {
                    var w = $(window).width();
                    var h = $(window).height();
                    $('.flipboox').width(w).height(h);
                    $(window).resize(function () {
                        w = $(window).width();
                        h = $(window).height();
                        $('.flipboox').width(w).height(h);
                    });
                    $('.flipbook').turn({
                        // Width
                        width: w,
                        // Height
                        height: h,
                        // Elevation
                        elevation: 50,
                        display: 'single',
                        // Enable gradients
                        gradients: true,
                        // Auto center this flipbook
                        autoCenter: true,
                        when: {
                             turning: function (e, page, view) {
                                if (page == 1) {
                                    $(".btnImg").css("display", "none");
                                    $(".mark").css("display", "block");
                                    $(".yes").css("display", "none");
                                } else {
                                    $(".yes").css("display", "none");
                                    $(".btnImg").css("display", "block");
                                    $(".mark").css("display", "none");
                                }
                                if (page == 44) {
                                    $(".nextPage").css("display", "none");
                                    $(".yes").css("display", "block");

                                } else {
                                    $(".yes").css("display", "none");
                                    $(".nextPage").css("display", "block");
                                }
                            },
                            turned: function (e, page, view) {
                                console.log(page);
                                var total = $(".flipbook").turn("pages");//总页数
                                if (page == 1) {
                                    //console.log('page');
                                    $(".return").css("display", "none");
                                    $(".btnImg").css("display", "none");
                                    $(".yes").css("display", "none");
                                } else {
                                    $(".previousPage").css("display", "block");
                                    $(".return").css("display", "block");
                                    $(".btnImg").css("display", "block");
                                }
                                if (page == 2) {
                                    $(".catalog").css("display", "block");
                                } else {
                                    $(".catalog").css("display", "none");
                                }
                            }
                        }
                    })
                }
                yepnope({
                    test: Modernizr.csstransforms,
                    yep: ['js/turn.js'],
                    complete: loadApp
                });
            }
            ;
        }
    }
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "";
    var seperator2 = "";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + "" + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}


