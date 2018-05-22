window.CD = function() {
    var e = 128,
        t = [],
        n = $('#__CONTAINER_FOR_FUN');

    var div = null;
    var divx1,
        divy1, 
        divx2, 
        divy2;

    var wX1 = 0,
        wY1 = parseFloat($('body').width() * 0.3), 
        wX2 = $('body').width(), 
        wY2 = wX2 + wY1;

    if (!n.length) return ! 1;

    var r = function(n, r, i) {
        var s = 0,
            o = 0,
            u = 0,
            a = r * n,
            f = (r + 1) * n,
            l = i * n,
            c = (i + 1) * n;
        for (var h = a; h < f; h++) for (var p = l; p < c; p++) {
            var d = t[h * e + p];

            s += d[0],
            o += d[1],
            u += d[2]
        }

        var v = n * n;

        return "rgb(" + Math.round(s / v) + ", " + Math.round(o / v) + ", " + Math.round(u / v) + ")"
    },
    i = function(e, t, i, s, o) {
        var u = [],
            a = Math.pow(2, e),
            f = 512 / a,
            l = e === 0 ? 1 : 2;
        var num = 0;
        var id = 'id_' + new Date().getTime();

        for (var c = 0; c < l; c++) {
            for (var h = 0; h < l; h++) {
                var p = r(f / 4, o / f + c, s / f + h);
                id = id + num;
                num ++;
                u.push('<div id="', id, '" data-level="', e, '" data-size="', f, '" data-row="', c, '" data-col="', h, '" class="l', e, '" style="background:', p, ";top:", o + f * c, "px;left:", s + f * h, 'px;"></div>')
            }
        }
        n.append(u.join(""));
/*        addEvent(id);*/
    },
    s = document.createElement("canvas");

    if (s.getContext) {
        var o = s.getContext("2d"), u = new Image, a = [];
        var insertCssText = function(e) {
            var t = document.createElement("style");
            return t.type = "text/css",
            t.styleSheet ? t.styleSheet.cssText = e: t.appendChild(document.createTextNode(e)),
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(t)
        }

        for (var f = 0; f <= 7; f++) {
            var l = 512 / Math.pow(2, f),
            c = l / 2;
            a.push("div.l", f, " {position:absolute;width:", l, "px;height:", l, "px;border-radius:", c, "px;}")
        }

        insertCssText(a.join(""));

        var h = false;

        function touchs(e){
            //阻止浏览器默认滚动事件
            e.preventDefault();

            if(e.type=="touchmove" || e.type=="touchstart"){
                if (!h) {
                    h = true;
                    var t = $(this),
                    n = t.attr("data-level") | 0,
                    r = t.attr("data-row") | 0,
                    s = t.attr("data-col") | 0,
                    o = parseInt(t.css("left")),
                    u = parseInt(t.css("top"));
                    if (n >= 6) return false;

                    t.animate({
                        opacity: 0
                    }, 150, '', 
                    function(){
                        t.remove();
                        i(n + 1, r, s, o, u);
                    });
                }
            } else if (e.type=="touchend") {
                h = false;
            }
        }

        $(document).bind("touchmove",function(e){
            var target = e.originalEvent.targetTouches[0];
            var _x= target.pageX;
            var _y= target.pageY;

            if (_x > wX1 && _x < wX2 && _y > wY1 && _y < wY2) {
                move(_x, _y)
            }
        })

        $(document).bind("touchend",function(e){
            div = null;
        })

        function splitBoll(){
            var t = div,
                n = t.attr("data-level") | 0,
                r = t.attr("data-row") | 0,
                s = t.attr("data-col") | 0,
                o = parseInt(t.css("left")),
                u = parseInt(t.css("top"));
                
            if (n >= 6) return false;

            t.remove();
            i(n + 1, r, s, o, u);
            div = null;

            t.animate({
                opacity: 0
            }, 50, '', 
            function(){
                 
            });
        }

        function move(_x, _y){
            console.log(_x, _y)
            if (div) {
                if ( _x < divx1 || _x > divx2 || _y < divy1 || _y > divy2) { 
                    splitBoll();
                }
            } else {
                for (var index = 0; index < $('#__CONTAINER_FOR_FUN div').length; index++) {
                    var tar = $($('#__CONTAINER_FOR_FUN div')[index]),
                        x1 = tar.offset().left,  
                        y1 = tar.offset().top,  
                        x2 = x1 + tar.width(),  
                        y2 = y1 + tar.height();

                    if ( _x > x1 && _x < x2 && _y > y1 && _y < y2) { 
                        div =  tar;
                        divx1 = x1;
                        divy1 = y1; 
                        divx2 = x2; 
                        divy2 = y2;

                        if(tar.attr('data-level') <=5 ){
                            splitBoll();
                        }

                        break;
                    }  
                }
            }
        }

        u.onload = function() {
            o.drawImage(u, 0, 0);
            var n = o.getImageData(0, 0, e, e);
            for (var r = 0; r < e * e * 4; r += 4) {
                var s = n.data[r],
                a = n.data[r + 1],
                f = n.data[r + 2];
                t.push([s, a, f])
            }
            i(0, 0, 0, 0, 0)
        },
        u.src = "data:image/png;base64,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"
    } else n.css("color", "red").html("请使用支持Canvas(Chrome、Firefox、Safari、Opera、IE9+)的浏览器浏览本页!")
}
