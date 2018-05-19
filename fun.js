window.onload = function() {
    var e = 128,
        t = [],
        n = $('#__CONTAINER_FOR_FUN');

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
        var id = 'id_' + new Date().getTime();

        for (var c = 0; c < l; c++) {
            for (var h = 0; h < l; h++) {
                var p = r(f / 4, o / f + c, s / f + h);

                u.push('<div id="', id, '" data-level="', e, '" data-size="', f, '" data-row="', c, '" data-col="', h, '" class="l', e, '" style="background:', p, ";top:", o + f * c, "px;left:", s + f * h, 'px;"></div>')
            }
        }
        n.append(u.join(""));
        addEvent(id);
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
        function addEvent(id){
            _n = document.querySelectorAll('#' + id);

            for(var i = 0; i < _n.length; i++){
                (function(i){
                    _n[i].addEventListener('touchstart',touchs,false);
                    _n[i].addEventListener('touchmove',touchs,false);
                    _n[i].addEventListener('touchend',touchs,false); 
                })(i);
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
        u.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAgAElEQVR4Xux9B3hc5ZX2O73PqDerWMWWbMmWq1ww4II7xQYTWIrpCRAICST5NwmbZLPZQEJ2k2xCsoEkdHA3LhgbV9x777aK1TVq03v5n3PuvaOR3CSbAMkyuw62dGfm3u+c75T3vOd8smg0GsU/0Ut6HJlMdtmnutQjX+n63i7Plb47/jsv9129uaa399Lb62T/VxSgN3p+NSWIF/ClhH05Bej53dL39BT4VwrQW7W9huuutLi9sRr0lZdTgKsJ7nK/v9r7ruEx+/yWfzoL0JcV+KwEcDXr0tOy9Fbh+vIs13rtVwogrtzVzH9vF7g38cVXCtDb1fw7X3c1C9Cbne33++FyueB2u5GSkgKdTsd3HQ6Hcf78eezatQs1NTXsPlJTU3HLLbcgLy8vdh1d+1kp37Us1/9pCxC/YJfy75daULouFAph27ZtaGpqQltbG//p6OhAVlYWbrrpJgwePBi1tbV45513cOHCBVYGlUrFf9LS0jB27Fi+jq7/SgGuRW37+J5L5bmUJPZmh8df4/P50NjYiEOHDmHjxo3weDyQy+WQrADt5LKyMgwYMADNzc04cuQIkpOTkZGRwcKn9589exaJiYmYMGECpkyZgqSkJCgUim4BZh8f77ou/6e3ACz8aBSRaJR3YigURjQS5gWnP/QzmVwOlUoNtVoNhVzAD3qa5WAwiMrKSixbtgy/+c1vWMg333wzxo0bh379+rGAjx49ilWrVrGCZGdn46c//SmGDx8Og8EQ+74TJ05g8eLF7B7mzJmDqVOnIiEhgRWp5+vzcA3/JxSAhOzxeNHW1s470263wetxIxAIwGZ3QKvVsUBLS0thMRsvqQBk0t966y0sXLgQY8aMwVNPPYX+/ftDq9XyDpYswY4dO7B582Z0dnbiX//1X1kR6PtJgch1aDQaVFdX48MPP8QHH3yAX//616ioqGBL8X9OAeJNM+87AiXph/QPRvLo39IP6GdR/jXQtVtkPe27DHC53LzDqqurcKGmGg6HDaGgHw5bO1qtVnjdbkRCId7lTqcbUZkMGZlZ6F9QBHNCAjRaAzKzslE0cCBKSkuhUyrw5pt/w/bt22AymfH440+gsLAIWp2Wb1V60edRLGC1WjkoJKXS6/X860gkErMCpAwUQ/zqV7/C6NGjcd9997GluBxgJCzNxY7ss7AQX6gFuJwCRC+pAFHWCeE90l+E5acd1mmzo7mpAdaWZjQ1NuD0yROou1CNzo5WREIBKBUyRMJBBPx+RMnsIwqZXIZgMIxIJAqlWgOtTo+oTIFwVIaklDQMKC7B8NGjoVHpsPqjNdDpdbj11tm4ccKNPTar5DaEH0uuhVVVLu9m3kn4JDhyBa+//jpf/8ADD3Bg2BuwKv6L/+EVQBKn9FDR2H4SVYM1gf4uWgHRKpDwEJHB5XbD5rDxrjt16jROHj2IqnNn0GZtgqOjDZGQH2ajHiaDHlqNBmr+o4VcQRYkyrEACUgmo0AuAJfbBbfLA4fLhVAkCpPJhPTMLLR5AKXaiNtvvx0PPzyflUcwU1HhP+J9y7rZg4sseuwHJOhz585h6dKlnEFMmzYNJSUlrMh0P5QuUjpJf79SoPpPogBddiAqmnYy9GwESAFE0xdvFSQBHDl6HFu3bsHBfbtw/MBe+FwdSDQZOOpOTU6CUqkU/W8IkXidkgTFny3aFLF4RO8hn85mOxSAvaMdK3eexPgJN+KxRx/D3V/7mmiJBAXocgF8x5eXeo/fnDp1Cm+//TaOHTvGaSNlBk6nkwPGuXPnorCwkOOFv3e94At1AV27WzSdMd8uCiXm90jktNtkaG1tx/atO3Bw/06cP30MrU11iIYDSE9NhkalEsytTAYF72yZ4HfZLosSEGUU71LjNjErXCwijwKBQBBnqioxcGgF5n7tftxxx1xBAaIRKVjpEruoRFfy5XQXFAxu2rQJ3//+91ng48ePR25uLgNKlGa2t7dzhkEZQn5+/mWV6h/eAkghneA4RYsaK+NGwbte/FVHWztOnTyBnVs/xf49u+B2tEMhC0GlAJRyGcwmC5QqFQucAi5K+6SXoAjCv7oJW4w7u/vVrn+RSY+Ew7DZ2xDWJmHWHffg4Uce55TP43HzhfSdpHjChws3fDUFIAFv3boV7733HmbOnImBAwfCbDZzpmC327Fnzx7GGIYMGYJ58+aJbkpQZuFrem9prmaSvkALQHl4TETCDo8KgZ6YBvB/aLe0WFux49PN2LV1I44f2gu/x4EEixlJiQkwGHQcxIVDYpYg7Xjpo3vs/K5vFARGriEWXNLuF5WF3Yy4znKEcfZCC0pHjMf8x59GxaiRqK6uRHt7J8wWM4oHFvE9x5Ssh4B6KgT5fcIUGhoaMH36dLYC8UI9efIkPv74Y1YCUgByB4RRxL8+K2X4whRAeIBYzhdno8m0CmacdkRbayu2b9+OBW/9GY3Vp5GWZEJ+fgGC4agYwVNEzzF9zIzQZxO4wzrFzl9QLMklSDuVd6tcFjP5fE9h+n7B7rBXlyug12pw8tRp+BUGjJ8yG9974QVs37YVJ06eQl7//rj/vnv7pACk1PRdZEl6viRFWLlyJVuCzMxMzhIILOqNdbnajr/o+74oQoigAKKw44QnKIWgAFXnz2Hh+29h05oV0CgjSE6ywGgwIuCPUH7Fu5d8sQzCH+F9ck7vJPchLWgsqIwzofw7hRAryBiDENxHWBSQZNbloO+KoMPhgC+qwOBh47B9x16EAn7MmXMHXvy3H4nCkTxBdxN9Nci5uwsS3rtmzRq2AoQnvPTSS0hPT/9nVIB4g0wmtwv02bd7N9Z+9CG2rF8Ni0EFk8EItVoj7OKwYLejIgokA4kIgjDFILCnm+zJwolP2UhZBCBK2vwCREz+PxoNQyFXQa2So62jHRcarHBHtBg6vAIdHe0oLR2M559/gQV0KTj3SjvySuDOkiVLsH79ek5FCVGkSmNPC/BZxAKfmwu49C6IT6KEoI8M74ljR7Bi8fvYu30TAl4H0tNSoVZrRTMrADj88Pz/9HcRGRTsfFwcESfVuOAyJmgpYKP3xEmKPjscEhRAFiWLEEan3Y5AVAZLSiYGDBqBirHjsGPndrS3tWH69BmYPXt2zKTHsg+OacR77aEJVxI+ub5XX30V+/fvZ+yBAkWj0dgtTviHigEubwLFZZcJ/jYQCKGl1YqlH7yNHRvXwG1rRW5ONkIRwX/zH9rhkgJcZ0TccxF7loTZAgTDcLo96HR5kZFXhCkzbsOcOfNg0Gmxbv06bN36KdQqNR577DG2AuTXKZ2jAI/wCNrBPX391WBdwgb+/Oc/8+dQQYnKxvQZ8Tv+H0YBLit8CesXA65IOIKW5hYsWrAA6z98DypZCKlpqZBBAZlCCNQk4Uubifw1va7FFF4Kdo1fVPpMgo1t7TY4gnKMmzgVM2bNwtgxY2OADxWTKFBbvXoViotLuMZP5V2qCr722mt44oknMGLECA7grhYHSPCx1+vFc889x1wDwgGef/75y3qRa3nuzz0IvLoCCH7/Qk0Ntmxajzf/8AqSLUZYaOdodYgq5FCQb+/mogXTej274GoKQArncjrR2NCMvLIKzH/kcYwYPoJTNulFn0E5/alTJ/ER1Qp0OhY2VQLXrVuHJ598kmFe2sFXUwCHw8H8gZdffhmHDx/G/PnzWYEKCgr+MRXgcmDIpRaipaUZG9auxpoPF8LRUoeU1DQuzIAgWQVF6F1rcCnB9TX1iRfg5SwIKVgwEIDD4URYm4BHn3gG48bfgASLJU4VwRmD0+3G2TNnudRMMDL58L1793KpmGr+5eXlVy30UD2DFOAvf/kLl6mHDRvGfwghLC4uvggHuFbL97lYgKshYbHfRwGvz4utW9bj4w8X4dSRvcjNyoJSo4VMoeSgkM3cF9S7QqAQCfh8bQOm3X4vps+8DeVDhnC2wgBSLIkR/mZtsQppZDjMzB/iDkyaNAmTJ0/mAs/lhEbrQf6ezD75f6pHSCwj+jxyBRRPEBj0WZj9eCX4zLOAqwk/tvsiUQSCQRw/fgQL3v4zzhzdhwSjASZLkpgNCEjhZwd6Xt5OXM6VcNwRjaKy8iwSsooxe849+Nrd90CtUXYpQCx/5HwkBkWTG3jxxRfZLdx4442YOHEiw73Sd8WXiXumqHSNzWZjV0DkEmIdEW+AUsF/GgUIhkLoaO/Az3/yXTTVnIFOrUJCUrKQfjGqK2J7n4MGXE4BhAKUgA6eq2rGmJun48lnv4Pc7HTRKEkAgqBckgLQ38mMU8GHKn7kEu6++27mANKOJiGSYkjxRE8FIKSQXi0tLdi5cydaW1sxY8YMjgf+4RTgcmbvzJlTWPDemziyazMMei0MJqJiSSVVgRkU96+/qym4kgLQghNfsLqqGjpLGibNvBNPff3rXYWfOMSJA1WpfB2NcmGHMgLC9okdTGadYgRyB0QepZ1tsVhi5ef499L31tfXM/mU6GhUExg0aNA/pgL0VIKqqipsWPcR1ix/D0a1EgajAQqVCmHeHTHHKu6qaw3xrvy+y0Xl8dmF5H8UCiU8LifsLi+SM/pj/mPPYNiIYQxLx0eolyKEUHTPz7thA9544w12B6NGjeJKH5FACCeQEETpniQrQXEEIYKkNHfddRdTzC5CNK+zMvj3iwGkG+sRwLW0WLF2zSp8snopPB2N6Jedw0In4RM3jzB9sQzTTYKftSfomU30BIEk7aOfUxKqVqlgs3XC7vQhs3AoHnz0cQweNAgWs7kbhC1lLBJVhIRZU12FZcuW4Fcv/QKPPPYE5t51F8rLh3GwJwE8UmmcVoBcAKWX1FRCLOQZ02dg0uRJyMzIjCnc5SqPfd0un7kCSDCrVIwBEycED0mLsXLlKny46C1cOHuE0yPyj1fLkfv6UJ/V9QIflaAocNAnl0XhdDpw6NhZ3HHvo7h9zp0YPnwYlCqlSGAVbQB5MHEDEG1t3cdr8NtXfoGOpjoMqRiHe+9/CDNn3cquRS7S0OmeBUREhkDAz/HD6tWrUVVdhd/8+r+5JKxUC9VDGZFjYwt8bUBYzM5+5tVAscoblYi7YtmXtLqj04kfff/baKg+ibRkI0wmC6dMX8ZXTCkJcEIUclIA5uhF4PU4cb7GitE3TMWd996PG24gdDCOIhhHFtuwaTNWLF2AQ9vXYfzIUhw9V4+UfgWYNO1WTJ4yHf36ZUCtFBdLyHvxwaJFWLRwIdRKJb773Rc4XtBpdbGKlZAZx9VRrsMN/N0sQCzdE6k+HZ0dWP/JZrzz+m+giHqRm53VVXr/gjTgSkgiCV1KQ2mtyQ1wfMAyisLa3AooNCgsKcdNU2Zh0pQp0GrUvIMZJwiH0dTcirffeB37dmyCKupFTnYW2jo64PKFoNYnICunEGVDhwk5PnUOeb1wu5xYvOgDNDZZMX7CTfjxT34iEka6YiMBRZeYk182CyDZsphQowiEgjhfeR6/+69fo6nqCCwGLRKTkhAICrv/s05teqNPV0MUWQFEk8z3KDKUybLJCaEMBTkmCITkSMsegNlz56F0SDkLU6NWccS/YsUqrF78DmytdcjNyWLWgkIWhdvjgc3uhj8YQXJqBsyWRP7MYJAo6wE01FbD6Q2hbPgYPPvc91BQkCcWlIS8SCSexVzr9YAln70F6KEAUVkENpsDu3fvwq//40fol2qA0aBn4obEAu6NwD7Lay6187sFgV2bTSg3E1GEmEKkERQQyOVQEPEEETgdDrS325GRV4ypt87FqNFjkZycBJvDjlde+gXqzhyCSadAcnoG/H4fiLugUipBT0+8wo4OGzxeL4LhEBRKBXcm5fbLwpnKWvgiatzxtYdx3333IDEhMcZdi6+L9OQ49nWd/j4KEHcXtGanTp7CkgXvYf2q91AyoBA6vR7B0JfL91/SHUh9COEwwn4/5ydQKCFTqKCUUcMHVSkpgwmisbYRKmMiRo6fhOLSctRcqMXWtYuQYFAzAugLCOBOl7XroqIJnyNQ2EKBIJQKBWz2TjR32CE3ZOD3r/6JW8qVSkUs64xxkq8zPfq7KIBgPIUKjtfjx6ebN+Lt138PWcgGs5nMnZKJnD1jl6uZ5b5qd1+uv5QCUICukAFOhxON1k4EgiGYDVpkJidCodFypC/GbQgG/AgFQ5Ap1JAptQgEIlDIPBwXKBQq4XklwmoPoXFsId0sXYcoVEo5rO0dOHOhDc88/yJmzJiGzIz0ixyAQIq59tffXQFOHDuJj1ctwyerF6Ion/rh1WKKFN9UIQbRPajc1/5YvXvnpRROKD4Ru0yOgN/HnTudTi+GjBgPsyUBrY21OHP8IFKSk2BJsECt0yKMKJQyGULBAPz+IELhKBQyBbQGFZNKSUuEkoEQVbCwL2pqJPtCayLjrietRgWb3Y6T52oweOREfPvb30F5+VABLe3hA750CiBEqETVjmDFssVY//Fy1FWfQEFuHsJRhQj1xNV4RXl93hag5/dR9Y9MccDn515+u92BNrsLmbmFuP+hryM7Owcnjx3C0sXvwWfvgFGvhSXBzEogiFgQMH8OogjFU9RjfQnSbu/x/KwQomGPytgN+GkeQYsVbW7gRz/5OaZMngK9ntJBoUIqCP76TMBnawFiz0Ts2ija2jrxp//5JQ7v24LkRAPUCh0HUEIPQIxYc8XtGr9MwqaJ+8lFPqTrM7uaTq7csScRQmMbMhJFR0cnmpqb4Q1GkTOgFI99/SmMHTMGiYlJTPYgrt4Hb72O2qoz0KvkyM7IhEyjEh0fmXq6T6Kr07PGxMTiFfREeAahfig+UVzVW+hcpGxDzlZl/fZ9eOKp7+HOu+5CcXGhwH7+UqaBcQrgD/ixdt1GLHjrVdhaqlEysBC+gMDk5Uofo2VXN9U9FaCbH+2hABKpWNhL3Rf54m8Sv1wehVohh8fpQXOTFfUtjTAnpaGgZAjGjJuA6TOmITWlH7TKMBQyqlQq4A+rUH+hCiuWLsbmDWsR8NgxaGARwgoFYxsCRT3IdDZWAMlqx7GOJQWI3VecAkhKoWQmVBi79x1EecVU3HnPv2DWrOmCFkUFS8KK8nkCQVc00+IOpbYsh92FV371c5w6sgNq4vclpzK5MwZfXIMFkFxnTCnEB+8yqtJuE7uMRKPKey3WWi5sQpoEQn6eGjLJz/v8ERgsKcgrKkbFuLEYMHAQMrP6ITM9GXKaKBIJCruaAja5CsGIGg31Ddiy8RN8tHIx4HMiKTkRaq3QqcQqGOObd1e/Xug9GwnuUkIYrW1WhBQWzLztbjz86OPQqJVC04u4IGRprvXVJxdwpQqaEOMIoqFmhhMnTuGVl16ELOhAssUMmYzwcvElCqNXC9H1Fv5bt9pSPNVb8ocx8yq8UVgkiT4uCJ8ido/bA7fPxwGbSmNAXkExyspHYEBJKYpLipCUYOGeQ65lhAOIMowjPB9HOEojZAoNzpw8iRVLP8DHK5YgLyedW8XCEdq5AmtICtF786zdhChqOe9weRjnLjRj5NjJePzrz6KoKF+4E26K4fala5U/WePe860uWTHr8dV0Y7W1dXj7zTewcc1CZKcnIS0lBR5fgHcP+7drUYDYgkj7/+Lgh7t74nB4YW0EgxoJhTnHjoRD8Pj8cLh98AXDyMkvxLARY3HjxMkYNmwIFBS1004P+oBwEJApABmZLuams/+lekCUgCClDh63FyePHsYLz38baUk6JCclQKnUsItjNyRKvls3ci+0QXB15DLlMOnVOHj0OFKzijDvvscxb94ckZEkRhiflwLEy/pSesMNFeEo9u7bh6effAwp2ghystJhMBoREgcz8d64BgUQN7Kwz+MYwd3uiXYpI3RyrjyS4FWchoXhdjlwobYenXYf1EYL+g8owYjRY3HbbbORm9sfBqMO0UgAIb+HwT6BkSQIgBSAi5qUzklWR/AjkMkUaGnuwLeeew5tzVVITjAiLTUV0bAQhVBLmfCKL95cfcMKcQR9vwpqOXjWYERlwPjJs/CDH/4QEU4txQC3Fwp1uW/skwXojQIcOXYcS5Ysxau//TVumzIaZpMBIVqMWAQv3m0vs5f4ILAb4iFFQHHoGlXsJItI6JrTbuN5Ah5fEGq9GSkZ2RhYWsq1+EGDy2BJSIbFYoIKQSiiQllaCNriE23JkQiRN1sZEQDi71Ko4fSEsPDtd7By5SIg4kMe4f5hIRXu2ih9U4CuNEnICfweN1z+EHKLh+EnP3sZep4gIsY8n2cQeCkliC/mrFi5Cm+88Vcc3LUFMyePhVajhT8Y7Ja9ScMAYi1dV9oQUhcxB0SS8ojNnHFJloIguzDgdrlgczrg9vqh0uhgsiQiPSsbAwYORlHxYKRnZSEzIw3JiWbe6bwzwwG2ErHUNB6ZE+UvJWwUC0g+l3+mUMMfluHorl3439deRXtrPbLSUyiHuySZ+VpkRUugVsrQ2NKGqNqCb333xxg5ovwiTuHV7crFV/TaAvSESi+VDdCcnb/+9S94582/QCf3oLiwAAqlEiEeyiS8WIgcvNBOunrwInyP0AgipD8iSUOA1phQQoCJz+8DcSn9wTDpAbRGCwu8eFAZigYMQFFhITLSM6irjH08KKoPUWQfd1/80VKXMbWOkzshF0L3KfACqLhFLiaW3csVbI47G2rxP//zW5w+eRhGvQoavbHb0DPpe/qqAFLsYNRrUFVTi/pWJ26ZdQ+eeeZJbh2/3krqdSuA4I+Fx2uxWvHan17F6uULMLw0F0q5WmjhFvvzJaoXwSOkBOxfr/KKlWXFBk4KrhhDiISZRubx+GB3ONDW3oGIUo20rFwMKC7FiNGjUVExGv2ysqHTaoFoCAj5qZND9BPSF4u+VhIp3xPtbNrrcgTDSkRIX4jvT/dMrl8m5zSShEllXPp7xOfBa398FXt2bEYw4EECzf2LPd/FsPfVnltQ71iuB71WhfqmZpyraYI+MQevv/4aN4xI84x683mXuuY6FEBYuHgF2LZ9B97+659w7MB2TLphFJxun5gTS6CPsLskX90bICgmrSiJgxZc2H9nz56H0+PnnZ7WLw8FA0owdGg5yocNQ3ZOLpRKFZQcwPshi0omXjDLMWskWpGYx5crIFMlCBeEfTxXsKrqAlrbmtDWTsMl/fy8JqMRRhO1q6uQlJyA7JxsJKVkYeFbb2LjmhVob2tiDEFIzwXLcS1xmkRKUUDBz+0L+FHXaMWuQ6fx/gdLcMMNNyAxURgcca2vXivARV8gpVy8ekLCu2jREixf+Caaa05h1Ijh8FIJVRzPJQhbuE6CXXmdpfiYg0KhEibwBOKcBqcNYYRDQThcbvaFpsRUFAwoQ0lpGXLz+qFfZhYHnCaTgYcz6vUGTtOiIS8Lk9Mq2pFSYYbNuVR+oa5jBbuPmguNOH3mDKzWFub289QwpQyhQICheo1KDYNZD7VGx7MDaFRNfkEBcvuXYPEH72L18oVoaahGyYAiBoNjkLSoeBIu0WuBiWtLvotwiZbWDixbtws/fPEnuPvueRhSVtrrj7ouC8Dik0CW+DRMFCyJ7ve//R22rPsQEU878vMLEaBJGzHsvkdkLX6WCGWwuIlqJVwl+Hpu96cmC18AHq8bdqcL7TYPbJ4Abr39DgwbMRq5ObnQ6WmPROH3+XkWMA+JQhRmSxLycvoh0WLkPn8pEekiLItIjUIFp8uDC7W12LZtB9+BxZKAxKRkGIxmaHQaRvVpDAWROVQaJWRycg1haDRq7ghOTE7DkgXvY8mCd9BQcxajhw9BMCLMKJYyGQnj743EYvcqMZPkMmiUCrS12bBk7Q48/o1v4sEHH8SYMaN783GXvaZPFuBSCkCLSQtOrJaXf/4zHNu/Axa9HGazBeHusJ04Wq1nHh+nGDFoV8jDKZemANLr8UCp0SAso4RNC7XBgq/dfSfycvNAeLnH42C2rtcbRDgcAXUdOV12JFrMGD58BPplZQJhf9f3S8GkhNQp1MzVo52/e/cBlAwagMKCAlgsiQiEaKBkhBk7RGwloZNEyfzTxBKa5afWamA0GrBuzRosfPdNVJ4+hvEVwxAIC9PKBAUQJhn19hVbOnE8Lrk9lULOg6nWbd2PR77xLO69918wcuSI3n7kJa+7dgUQP453aCCAM+fO4g//9RJaG6qQlZbCwA8/dizspWCxq58/Pj8WQkERbBXn9dCOJZJkR6cdOp0e0++4C2NvmoT+BQMglwm7T1pcybuwxRBJmzKE4Pe5odGYBT5dxMOCFK4VLQx9J0f1FM3JEJYpEAhp4HC24vDhQzh57ATamlsQ8PngcLpBTR5ut4uBweTURKRlZiE7Nxe5ebkYNmIU6mtrsfj9d7Fv51ZUDB+MIAWqMZsfs219ElhMZYijIKMaix27D57EA19/FnPmzkP5UOIIXPvrM1EAGme2ectmLHzrT/DY25CVkYFAMNBDAS7tQsjcSwrACZ9cCVkkiEgwhI4OO6w2Fx558mmMG38jp5SN9fWwtrTA2tTIAiHyJWUESpkKGrUaeoMORrMZyalpSMtMRVJyMswmI8wGPTQaGjMjOR2e4IwIoXkKFTo6HTh1+iw+/mQT9u7agbq6egQ8XqhCQSipOYTKfIxmCsEvzSzwqFTIKSnB7FmzcPsdcxD0ufHh4oXYsmEtivIyACXVP7qyJGFD9F1YhJdI42rI0h09dgo3zZ6Hf7n/YQ4Er+d1fQogBjYOpwOLFn2AzR8tRtDnRFpaeje+/+Xo12TmuNjBeZ3g+ylQU0TDoMGQHQ4PEjPz8G///gtoNEps2rARy5Yth9PthMrpQiQYEHc1VfYEnCBIbeVqDcwUCJqMSMvKwOixozFr1iyeOEKfzbiu6GQjKg3XBrZu24FFi5Zi+7Y90HgcxFuCSsnxNwtdQgIEWxVlEKnF4cKAYeV4/JlvYtIt0+F12/DhkoXY8PFHSGAsQOA/SN8Vq2L0QgviKh6c9fDkskiELUAabbMAACAASURBVFBlVSVKx9yCBx56DBMnTo5HmfusC31SgPhPjyG7AOz2Tvz19T/h4Pb1iAS9SExO6dbtc1kFiMEpgmsQAl45aN9U11yANwSMnTgDz3/3/8HndePdt97CH3/3e3gcnUjT6qGmlJBnB3HvDq9zWKVBSK5A2O2C3eVBev8c3HH3XXjm288hKdkCOYE/FBCKfASZUg2Xx49NWz7Fu+++i4+Xr8GQzFQkG/WcY5PoQwRcMX4VQTAQBHEdaHZgW4cNJcOH4xvffx7jJ07j6aUfLlmAtatXQh0NwmA0QaYUTgPh6qDkNvuqAEQWDQY51qJ5CvV1tRgwfALum/84Jk0iBbgGsyLdS1+qgYL2iy/e/UKA097RgT/85mVUHd/PdXODyRzTlZ7NjFJccHENUvhkOVkAAGfOV0GmMeLuB2hA870wGPVYsWQx/vjLX6KzshLJGemcojF+HwWC/gDv+NyiQjb/zRcuYPeuvUjMysC8h+bj2e9/F4j6gYBfmAco0jaYyxdV40J9AzatX4ufPv+vGNgvnQXMQazkw7kdS0hRaSgUjZ5vaW1DweBBeOTZpzD11nkI+h1YvuQDrP5wGRShAExmCyuAQN+ieIOfvleYQLwFkEWiCIaCPPSSqOXNTY3ILxuD+x58DBMnTeH45VpffbYA3RUgglAUaG6x4uWffBfO1gaey69iXyu8Lq8AF0fEvJtFIlVlTS20pmTc/9iTmD5jNmTwYdkHC/Daf/8eofYO6Kler1TyYoZCQXRY25BfXIR/+cbTuGXOXGbsPDv/YTjdLtz94AP4/r/9CFFFhHJK0IISSkNBJFf91AbUNzSx6f7uM89jcHY6jDSCNvYUcuY4kGIPGzMGc+fPx4q33sHGTz9FYkY6nnzmG5g1915Ewx4sWfgeli9ZDHUkAFNCAsctgrmJCohyXxRAXCJ5lJpryAVQSduP9tYOmLMK8dDjtDazPn8LwHgeW4AIHG4PTp85i1+8+BzMGgUMel03iLd7zt2lFN3LyVJVS6Bh03sqq2uhNyXh/se+ganTb0Mk7MWS997D67/7A2QuJ/RGk1i7F/IHj8cJnd6EybfegUmzbkUkGsZ/UInW5cSc++/FD//9RaFAQxZAmi4m+TG1SVCAtR/hh89+GwOzMrjaFgsXZYDH5ebgcsjo0Zj9tXuxesH72Lx1OxLS0/D4k49jzr0PQh71Y9nSxUwVg88BU4IJcoWKu4roCQUL0FeXLUwdoZoHBaGRYBAupxtBlQnzn3gat91xJ1TcnHptr2uwAGLLlBgANltbsWvXbrzyH99HYb90JCSY+LCF3rwE0kS8paBhzQKCWnWhDiqtEXPvuR9z590HmSyARe++hz//5vdQul3Qm8zsLnhB5YA/FIDXH0JaZj/k9c+HwaDBzrUbIDObcPsD/4IXfvA9wYEFAnF4gHifKhOaWqz4dMM6/OBb30ZeUgI0ag0CYcBPeb8MoL5cnVbDWUVmdn801NWwm0rLy8X8bzyGu+9/CEqEsGL5Eny4bDGCzk4YE4zcEyBV7gme6r0NiNlQPuGEG2miYT7qhs47ckd1eODRp3DH3HnQarsPku7N2sc+vU8xgFjYkRid9GDnzldyy/f//s8vUDG0BCnJiVz+vWqVSlSgLgUQl4Z7KyOoq29ECErcMHkanvrmd6DXK7Dg3ffwh5d/A4W9E8akRFYAIlwIzRnCPB868YOPc1NGEXQFkFtWijnzH8QTzzwNhD0AL6REGRXp+WojOu0O7N2xFd99+hkkKOVQK9W8e5VyOccC9B2RSBhBrx9uwibMRnQ4XcgbVIL7v/E4vnb/w1DLwli1YikrgNfWBoPFHHNTwoJ3nTHQeyHJWOg0OocsAcUeHrcTPoUJDzzyNG6bcyf3EFzrq28WIC4mkthOBw4e4skXi955DVNuHI2MtBSuAVxNAeKBoBjJRiz5ksbT4U5ufwj5g4bhxz97CWlpSVj0/gf4r5/9Ar6mBqRlpEGlUTPq5w+EkGjQY0hWOpNPqto7UdfejtaWNgwfNwZ3P/QQ7nnoYUQDdhEHoDSQwnqB/gW1nusAJw4fxnOPPQG/rRMmnR4FGWkoy0iDyxfE8cYmtLhc7Ba0kMPj96Kl0478QYPw0JOP4a77H4ZGEcHqlcvZBTjam2FMMEOlFCxAVybUd1Hx3GJqpOVDK4NMdJGZUjD/8Wcw69a5XPS61td1K8C+/Qfw2mt/wYJ338D0m0ciOysV/kBXnf1yN3YpBZDseTQUEkayeHzQJabjly+9hOy8gTxB+5WXX8beffsxqn8ext0wASazGfWnjuOmjGRUFOZxir/jbDX+sHEbztntuOueuZj/0MOYNGU6EHQI/p9Z1TSwQgF5NAgZBWoKFVf+Xnj6mzh2+CjGZmfh7tHDMLG4gLmE2ypr8MnpszjS0saj7HJz87Dt8FEoTSY8880nMefu+6BRR7FuzSqsXLoYbY3VMFoSBQW4iLzaO3EJXUIUaEcYGKM1C9OhEh3tMGfl475HnsTUGbdeTxLQN1Jot7oOP0MUe/fux59f+wsWvvsWpt00HDn90riHjn8bVzzq+chdOIJQ9Ynh5DIFEzfDAT9sDhe8UQ3+7cc/Rtmw0TxD742//Blrln+IwsRkpGZlw6DVIcHvxvyygUgyGvi7G70+HAqFcM7tQtm4cZgw8RYMHTIc8DuEbLwLkRHMMglIoUVTczv+65f/ieUfrsYNSRY8OKoc44r6wx8Ko9HmxOqjJ7HsyAnICJqePBGVdXXQJifivkcfwcTJMyCL+vDxqg85DXTbmmEwWSCXi9ND4uocvRO/ECxSnBQIh1gB6EWNIrY2K5LyBuH+R76BKVNnXg8M0FcFiEF3ooAjIAvw+mt/w/vvvIUZN5MCCBagJ2m0p0voqnZJXIGumhkjb5Ew1wGaOj145tsvYOKUaXA5Hdi++RMc2LIeuSnJ6HS4EXB70d9kxJ2lAyELhhGkTZNgRrAwF0er65BaMAiFJWXISE0Hgh5EiRBCAL1AvEdUSQGEHHKFDh0OL1YsX4T331+AsakWzCkdgDylSrBoKjV21zXio9Pn4YUMc2+dAm8oBFVCCobfNBkDi4fA5+nk3b929QoegqHW6oVJ5lx6EEimvUMBhM3F1xLGQSCQOEmFFKDd2gJT1gA89PhTmDHr1t7q0yWv67ULEAQmtj3RwolULYoB/va3t/DWG3/DjJuGIScrpZsLuDwKKNwPe+G4TjGpQKeSR9Ha1oHKWivuf/QJzJ13Lww6HWrOHkNz9TGUlxSgvaUNbdY2GNQaFCUnQhOKQmHQI5RkQqdWjaNHzqNo0AjkFw6AVsXnz3AaSOcNCJC+DFGNghE/mUoLbyCKkyeOY+mC9zEkOxETCrOhaelEyO2FzKBHYziMao+XySbl5QVwUmamT0FecTkSktJhba7FsoXvY/MnHyM5QQtQXYMzFYHX1LcGDmFDcFsCo4DCcTY0P4jORVSn5OHrT32LaxDX8+qjAog5LPEomdcnHID43nsf4He//S2mTRiCvH5pver9v1Si2IVnCeSHttY2nDlfg5umzsLXn/42MjLScWDvTixYsAC33jwKBXlZUGtVPKvX7vRAr9VCk2hGc0cn1i1cBXO/Qsy75z4MH1qKaNAtjKQJUZFKOGMgRkyhPJoqhko1INPhr3/8H6giNhQXZiElMRVhlxuOgI9Op2J8gIZanjtXgzXb9sOSkcvTvRMT0nFw304s/eBdHNm/BwMH5CAYijBtjV9EIRM2di9fwoX0diajRMG1CY/Xg2MnziC9YAiefvY5Pk/gel69VgAe3ha7efqXQIykqtm6T9bjO99+DjeNLEZ+bgbvLD6U+QoY9UXrIPoEifxJ+4ZMfkNjM8wZefj+D/4N+VlZqDpyCPWnTyMpKREaBmsEeDQQjiLRYkGdtRVnGuqh0Otx06RpKB1UjESTjpm/YSacECNJQJuiPIaeum0VTBINBohw4sSeXbuhUUSRnp4KmUqFg7v2IexywaDT8BRztVyDUCSI+sYWPkSiYHAJbpg6Ax+tXIG1q5bD2lCDkoFFgu+OGyrcN8BW4CGEg8LsYXov5ftEivlo4x7MmjMPjz/xdUyaNPF65N/7GKCLoMh6KZ7fK+Mhx0ePH8N9996LgnQjCvIyuRGEOALS66opYWxnkJnrooRRtc/hsON8Ywe++68vYmTpEARbWhBpa4ExNxdyMuU+L+8y2im65CScPl+JyvpaZA8bglEjxyPRpIUCYlBKMCNokBMVaEIIBL2orm5EU1MzOjvbEAr6oCG/TXMB1SokJiUiNTUZ5/YegElvgEmrgYY3M+EDEQQUCri8Xj6LOH34cCxeuAhH9u7kWCMtNUWYfRijH0gxQO/kRXEQ+f1wkKYPUNEryjC7td2OFRsP4OcvvYy5c+egpHhg7z7wMlf12gJ0FSf4kUTalkDyqG9owCOPPAJ78wXk56QyDYsGIXXLfcVuVrqPnoYh3hrIY02VQqUv6Pdh+97DuO/hJzB18jSk6wxoPHEEmSUDkahRw0DVQ56fJ0NYqcLJ8+dQ396KwTdOQEZmf2gUIUSDRBmPIhAl5lIYHm8AHrcLTnsbTp46B2trKzOJaJQLnfadlpaGyqoqLr2OKB8Mo9fPuIBJo4GRBkSRXw8FENFo4JPJYfd4UO12Y+H776KtvgZJZmraIJKaYPEF7mH3KkC3+RCXMA00kyhMFoSAK5kcGpUCHo8LFxrbcLLegTfffBPjx45FQgKNr7/2V68V4Epf0Wmz4X//98949933kKyPYvTQIgRCROei3FWIFWRRFq3wMT0w8YvdgdAHQMEZjV05ePAoCgYNxZ333I+xFeOwauEiJKnkKMrJ5HFzZHFkKiWcDc04WVcHp0aNSbNmQ6bWIuJ3Iehx8fHxNocb9U1NaGxuRYu1jUe/0LiaftnZGDJkKAaVlPDkT6oj/Oa3v8PmzRtx44TRmHnzRLiqL8CoUqJ/Tg4xxiGPRtg3y1MzEMnNx9Kli7Bm2UIowx7kZWfBR5NCxJifuI493T/T23uGBNK6kAsNChQ0Mm0UPJoMWlTX1qGysR1lYybjpf/8D+Tl5Xb1J1yjDnwmCkBETGtrG370ox9hx6Y1SLOoMXniOKZR+YPiub38wPGS7xqdEN/LL62UQAiVsR90OV04c6EBU2beim99+7tQqAzYt3UToj43tMS3oMheLkdVZQ30KckYPHo0hpaPwvFj+3D61Hl4vQGerGGzexCOhqBSq5CSmsq8P2oWoYMduNbu9fKAZ6/Xxwc+1NZUclBLdLTasyfhbmvlAJDSlowkC9KzciAzJeB0Yz1e/o+fQB70Icms54IYBYBdcIMY0MV0P65XXXSmfIUIaZM1IsUnPEQui0DF/RVBVNY2IapLxs9/+VuUDxnM7CcBP7l6f8Xl9KPPCnCpjiD6GUGwhw8fwdtv/g3rP14Ji06OspJCmC3UISNjuFZKHSVOplAeFxaDnQrbSbEyKO4QKg7RwKS9h47BkpaNO++dj0cefRxtLS0I+lxMDulob2MASKZQIDkjC5nZuTBojVi7ehlsLh8y++VgQFERHzTJmI9SDq1OB7PJzE0jBCfTzD86Aczn8cHp9KCxuYGGtmLwwCIUlAyFz+Nmxk8k5GN0z6A3wReKYs/+fVi66H3UnT/J491oBF6YqWNSI2nMEQiZvbgRBNcg2f4uIjyZfir88MBoOppWAejUauw9dg4qYwpm3XEnnn7qaej1Gp4gInzC56QAlwN3JN4EmaydO3dgxYcfYvP6T2DUAklmLRLMNBbWxIURZtbGM3Li+P/xSKMwmFEYkkD+jzp7O5xeFJSU4/n/9/9QWDAQavaLTuYGEkauN9IMfmrY0CESkmH75g2oqm/gCuH4cTcgMcEi5OI9XFAwREfHu2HrtPGM/prqGm4Ry8nJwlAe06qBXJxmTr0JNM/v5MnzOHbiGHbv2Izj+3YhPcnC9HA5P2PXCDxBxl0RlOQBhZ+INyLxBYhGTuvDcLUMSiXNIwRq6lpQZXVh/M1T8M1vfhMjhpWLh2lLVvRzVoCLUL1YX77AEiJ+/V//9jY+3bIRjrZGWHQq9MtI5qYNJnGIbV60CDFlkFp24qyAZLaYjxeJoLnZCk8gjAm3TMfs2+9Ebv9CmExmKFXSAoSFRk/KCmRqNNc1YtPWzUwNKx0yDHnZOdDr9LHzd4i4SsIkgIuyFjL/58+fQ2NTHXKzs1FaOoQx/2jAwfUCXyCK9g4HWlqasHTxEhw7tAdeRyvSE01IS89AIETtapdw7t0UTvD8HBZyy3nXiaW0+2mT8WgYrlXQwdVO7Dh0HqMnTMID8+fjrrl3xFlzaT5A3xLMeHfQZxdwKV/SzS2IoQ3tql2792Pp0uXYtXMrrI1VSDZqUV46kCnVFOBRiuMLBHnH8GdI1Kb49i3xC5VyBUJ+P9rb2lFdb8WkmTNxy8zbMKpiHJITk2O3RSNVeD4P9QJCh2PHDuHAwYM4d64WeoMRuf3zuH+fTHGz1QqDycQK09rSgqaGOsYDps64BaVlw5CQmMQjWmQg5hEdHVOJNR+txqIF76O28gz6Z6ViQAHNFjDCT5QtUXmlhhZh73eZeb5JcV6gdLaQ1DklPYBSJWOLQ3FG9YUmfLrnBFILCvD73/0Bt0yZzFYhFidJb7p2+fceB5C+63IxQJdiSLEtMVjdsNkdfPTagf0H8OHypag+fxKhgBtmoxbpyQnMIKbxqFpxFLp09DuRSmhxhNhAwB1ofQkWdTtcaLM7oTFYkJHdH3mFRRgwsADZ/bKRmZ7Bpl5n0HI/gD8Q5YYR2t31NWc5PSUUkMid1vZWpKdlIjnBzEQWUhCVNhEmswnhkBedne2oq29GQ30d6mqqUHn2FGoqzyIY9CIrNRkalUaYA9jtCDthJYTIn8s5QiooniLK1DDCB6QBFAJIyKwedpHhEJpaWnD+ghXuoByDykfhe99/AcPLy2E2mroqROwiu5hU15gE9E0BesYAwoN2Vz8B0JP0XlgEr8+PxqZmHDt2FHv27Ebl+XOwNjfA73aA+vqVMprUJeNgjyyySqGERqfl6Jw6b+jnDN3ytA9wOzj5a5oB4CezqVAiKTGF83dWqIQERgnp3lQaPYM7NKdApQhzkyW1d9FnUZGFZhdFI0LKReNc7U4/gsEAvG477J3taGu1wmXrgN/rYj4eIiEo1UqYjXR+oFww+aIwOYoXJSE0qAjH0/PvueBEXcWCMnCNn8bWhIhlHGQom4pbLj+dVOpFv7xCjBozDlOnTceNN46HQS8AVHGRQ7cJZF8iBZBYI/H2SbLpUZyvrEFlZTWfotHS3IjW1hZ0tLUyMEOLGw35EQ4FuBZA5o4GJlJHjDBqhcAhUgRARaeHh0Nwe9x8tGs0IodGq4Fao4GCMH0oYwOYaTilXKnDgOIilJWVIinRwk0kSpUaTpeDB0JS5ZGaQxqbmlBz/ixCPhfURHyMkDsJMwxrNBg4hiAyKe1UjtOFQEbw63Q5nTVMlks69IpZy8KupzY3+h29n52DnJ6PjsdT8syiTpcPCq0RWZk5mDRlMiZNvDmu+bMrkIxvMhMyqWsVP7fgXUzQvtLHXcoFdL9eQgqFHhzh/wRatGQSpevJ3Dc1W3Ghtg6NzU3c9mTv6EBrazM6Wq1w2DqY/eJzOxmV8we9HJ0bdTro9VoYdVoYqQFEp2VloVSUcnmvx4ugP4IAKRPN7bfaUWd1YtDQMtx9z/08woVbx+XkCjxsCcJR2s0yVogPF7yPoMOK9GQzTBYLp4kUp9Dn89RwCNAzj7ngHkaaCkrXCH2JxOAlChcJRsHXRHiXuzw0mUyYMEIdzJYEai/LRHIaTRcj12NBTnYuxowdh/y8XBgMui5aOpsXKaUU3KHEyvoSKkB80UuICbqUtOtvAqdfNIcSbi76x2AwJAxpbmpEU6sVjfV1qK+tQ31dHWz2DqjlMoT8Pvi8LgT8XkSDQXhpUkjAy6SJaCgCpVIGCwVogQA84TBunnobvvnsCygoLJJAWvHkDWlhhTaun//4Bzh8YCeVDqHVm+F2eeFwuZibz9T1iJwZvuyWuN4vNI9wIsNTxIU/aqWCMw5qItVSLcFk4S7itPR0jlf69ctCdnY/ni+oo3GzPKpWIbSk03SSblChpADClv/CFODajc3l33kpI8TgUigMn88LLwta2NlE+AwE/VyL9Hv9cDgJB7DBbu9gEEepomEKCtjbbbC2NcLjdvOgKCr4pKak4Be/egWlQ8rYtEe5S0g8bl6hRDgqg629BS/98hVGMftl9uN4IjkpmbudeIaA18cxAjlzEhK5KAKg+FBzuYLPAaLgk1rVpNnD9HNKN5VKNbsoim3o3ECtVsfWiwpP1zvp41rl0mcXcK1fdKn3Xc6dxJNIYuihKKh4UJUQM58vwDufzvEh/JyaRcmn19bW40JdNU8BDfiD8PkDOH/+LH76wxcwavRoaLRaRAMegY5E5xMrNfB4Qzh6YAdWrN8h7NSUVD7O1ajVYWj5UB4EQWcHk/8n9yEIWDjSnoI72v10xBwJMzbBS3zwrnqHyEYSImgxqLsOJ36dAvlSKkD8M8WURBwYEa8AwtAmGY9kc3S28a6trq5B1flqNFk7YbfbEAj6kJ3TD3n5BVi36VNMHF6IUSNHon/RQOhUxLiRI6qIwusLoKGhFdu3boJHaUFhQT6ioQA+2bAFnU3tPD20rKwYA4sLkZKcikTu+hGykm73K4qUG15FP83/iclYCpK7x0Q9Zx9erYR+nXKPvf0LVQDpLnrSxrqXkaV1FH1gtwUnNxGC3WbHti0bcejEaezauxfV1XUwWbKRkpCKfrkpmDJlPGbPnIEtB05i9Qd/xcD+mbj9tltRNKAEkKkQ8jtx+uRR7Nl/ELW2AA9lLsnP43rDmo07cfboBVitTXC7rUhN0eLWWbNww7hxPJ+Hd3uM9iWG5DGSa8/dTjFGV+5+pfj7KwWQLKQ4I0cY4CgtqBAEUTn20MGDWLFqJWxeP0YMH4Ew5KiqqUdrgwMJCanQqEMYOqIY026bCYfThy2bNqGl/gLMWjUK8vpzLt7a0Q6HxwOV0YSSYaOQlZ4Gi8mA5uYmbPxkC5pqbNDrjZBrIlDrIuifkwVbSwOGlZXyaeJ6EROI6WY8y7l7GeArBbhSLNCzkTQ+ChbWUTKbQGurFXv27MWBQ0fgDgVx0+RJGJCXjzabDQePnMCJvSeRlNwPclUQJUOLMGXmNLjsPgR9DvjdTriI5+cJwGlzcDpnSbIgLT0VJlMqj5QzmLVotbZgw0cbYK3thCUxBcnpicjJS0bZwDxs2LINzfW1yM/JwtSpU5CamiGc+9PVDNllZuPAMinpvogUcwUK/Wdl7i/1OV+YC7ganhBzA7EEUqiv0yColqYmLsOerbrAdO1BZWUYPXYc9GoNauvrcfDgYRwgwqYlEzJVCMVDB2Dy9Gnwun0I+11w2mh8rB8KfQIPXlCpNDCbTTAZ9PB5AgiFAzAm6NHeZsW6FWvRVm+HwUiwcxoGDcnHuIpyHDhyAtu3bkVnSyOGlAzAzFmz+SBoHkcT1wkkxHq9C/KutiZ/D0X4B1KAME8Dra66gE3r1uPAyVMoG12BiZMncx2+pcMDpVoDu60dlWfO4MDOg9CrExGRezGwtBCTp09nIOnIgYM4fnA/R+7T7rgbGZlpCFFRyhtAMBCCXCFw8EwWA9ramrF+5Vo4WnwM9iWkmlFSPgDjb74JqmgQtRfqsX7tWuzcvAHfevobGDZ8OJJpOMYlUI+Ye7hSs0wcJtdbpblepfgHUoAo6Mj55cuW4433luAH//5jjBs/lse4tdk8XOencW40Q6fm3Hns374fek0SoAyjrKw/JkwYha0HjiHSVoO2hjqEVUYMuulWpKWnQUV9DoQGEi4gF/iOZrMBHW1WbPp4MwJOGaovnIPOosKYG0dh+uzZaG/uQIJWjZqaaixdvRb2urN46qmnMHz48K8UoFdaGRfN81+7TQ/vmuknsV0O7N2Ndes34Ex1HSbOug1jx4+GVqWFzxdGgI9aA/cIeFwu1FZWY//23TAaslDfXANzsg6jx5Qj5LahJDMBNfVWnG92ICUjBzK/HYbENGTm5iMlLY3nEdLNmIwGdLa3YdvGrfDYoqitPQ9DghYVE0ZhyvRbYG3pENg9sgjaO9qwbMEiTBlfgYqRI5CclhZLDyWsXqCFdp2T83nt8KvJ4guzAAINLJYIdgVM4k+l3wUDBOCcw4qVq2G1OVE8dBgmz5jOKJzfR1z+EA9+IADGaFAx9l9FTRtLV0Ep18LhbIZaCwwYWITxwwejrvo8ahpbEYiqkZeVAYe1DurkbPQfPAx5BQVMQyeCltGoh729HTs2b4OjLQBrK50lZMCIscNww8Sb0N7ayRQznU7DkPPajzcg6mxDxYihDDTF4wPSpHERIri+6s3VJNrH339xChA3QzR+rrpwUIJAqQ74/WhoqMOKFStR2WBF2cgKzJg9i3Nvh9MjVtQICIowbKxAEE6XE5Vna/Dp2k1QysIoyE9BSooFFlMibhpfgfcWLkRruw3paenISEmG2+OCMSMf/QoHMUbvdnv4Doi9RAqw89PtsLcFYLO1IyHFiKEjSzFq3Hh0dtiYuElBH9XyiVr+ybJFKMzNwswZ05CSQiSVOKpWHO7T+/7APkrzGi7/QhUgltZx9xTN0OmqdhG619zUhG2fbsXCFR/h7ocexZhx4/hI9Y42J9RGKv1S7z0dpuBlNg9Nzzpx9Bjqqqqhk8uQlZmMu+6ahaHDhiEcVqCtuRGHDh+En5pJonI02nywpGWiaHApEhNSeNCUcCdhwQJ0dGL31l1w26Po7GyFOUmHsuGDMKJiHDo7bczbJ4iPjpnJzDTj9Vdfg8/WgRvHjsSkqbeIvYCiLYvltH1pEL0GifbxLV8OBZBQU5FFQy3cNZXnsX37bmzZeQAzCO8+sQAAFH5JREFU583DkOFDoFZp4XZ6mTfQ3NTMhSGqAThtNj5rlzopqThEDN4Ug5bPCBhQkIV+/XKQlJrNZ/yuXbMCh46fgdqSjum3zYElwQC/L8L1Ahr+zAfFywCdUQ9bpx0Ht++Fvc0Pm92KhGQDSkeUonzEaHTaOsSxscL5wZbEBJw+eQaHdm2DJurHs9/6JoR5Z/EKIEjnKwsg7jMh6xFso8gO579fqDyH1R+vRXV9E4aOGY+KcWOgVmvhD4RZ6G6HHfUXarmbh6wAVdM0OgPMJi2fr+OwOXCmqhYWjQzZ6Yno3y8DWRnpCEGBRQsXocMbRf6QERg5eiTokAsSPpFLmK5Fp5tFo9AZdHDaHTi85xA6rR50dDQjKc2EISOHYlDZMDgcHfz9XLGNRqAiIgoi2L1tKy6cPY3bp0/CwBLi7htED3f99K0+bu5eXf6FWQBB9vS/0gkd1FAa4obQJQsX42TlBWQVFGLOvDuhUKiZ1ycQMwJ8jdft5cCP+P08rFlvgo6mcypkCHh8qG1sxOljh9FQfQbpySaMH1fB0f6+fcehTUpHfkkpzEY9l5iZoSM2jnL8EY1Ap9fy0fBH9h2GzephF5CUbkHZiDIMHDSY000mffCDcOsskhKNOH3yNI4dOAiLMow75t6BlJQ0MegTLIGACfUOGOqVBK/zoi9OAWK7vwvepd194sQR/OWN91BUNgy3zJiBrMw0WNvcIuOWUgcCasBsXqJT0fnERO+OEiU7TL+LQq9RI92kwt/efAcfvPM3mEx6zH/i6ygqHoQwdNCbE6DTGxD0+KDgk0FidkgkW0Sh0+vgsNtwaO8BOKw+uNwOJGdYMKi8BIUDB8Ll9DCKKBl1UgFq1nA6XKg6ew4n9mzD/AfuYVq5ktBBiQYmtP9cp9g+u7d/YQoQnyZJQ1Sbmlvwx1dfRVL+QNwwYTzysrPR3GIHlCooeNGI708dxApxCndYOMVLpKLTEA0eFm3Uwet24uUXf4L9u/ejZOhwPPrcsyguKWBJ+zxeJpbSJGBh/wq4g5CbE39PzgUem60De7buQEcznXwSQEZOCgaVFyM3Px8upxeRSEhsmReGQFBHkMWih8vZiVVLP8SYoYN4mndK6sW4wGcnwuv7pC+JAkTR1NSII8eOYeO2XZhz51ykZeUgGAGCIfHAKLHJVDiHR3Ad1D1EObtwtEqImcB0gMOFyvN4/fe/g06TDI1ah6y8bIy4YRRKigextSBGj8Dti+vY4M8i5RKUQafXo7O9A3u374EylICG5iokpuoxrGIYCopKuC2e4gZpXC6PHKBj3w1aeP0eHNq9D0b4UDFqJHLz+n9lAa6kp2S69+/bj0937kJCTiFuGC8EfW6PX6i188aUDlKUWDSSAsgQlgNquYIPf2yorcWurdvw0YqlNDkaBr0R5RWjMPuuuUhNy4Df7+02yTzeI/P5A0TtigJGkw62jnZsWbcZR3Yfgz/kxsjxIzBt9kzoDYnw8XE4whAMoRWcyKE0FYYUMgJ7pw1nD+/D8EEDUFI8gF1OLP7/ygWIeb+oFeFACCtWrsTy1R/jjvlPoGzwQAZ7vB46bjZedYRTR2NCYyhWBplKAZ1GA1tHG04cOYqa8+f4nKDli5Zw0+iM2+/Ak995gXN/OjdYOFW0S/Rd7dvCEGmyMWYTmXI7Nq1djz/++tcoGlSMufd+DVNnzYTTGRQaQPk0NDmUPAtIxmBUOBrmUS5anQab165FXooFpSVFyMzOFo+b6+WJmddn2Xv97i/QBYj9ceIs/Dff+Bv+9PpfMHPefNx3zxzozYmwu31ikihh6LG2i5gnIGCIzL4v5Menn6znVvJBJQMwYWQpHn74ETg9Xtw6Zy4efPRRNLU6xSNdxdST3YdINBHlQj2IRDOj7IJg6CMH9+NnP/gO5txzP2bPmYu8/Hy0t7ogk0eY98coZCAg9BvSGYKIcK8iFZO2bd4GuB0oLsjFCD7aRQSBvjwxYN/7AnqtWle7MHaWjlAU2L9vL5YsXYyP1m/BK7/9PUqGDoOPSJ6+AB+6wOc5inU24tr7I2EO+Khhw+Vw4OPlyzjaHjRkKAaXDoZRJcObb78Dnz+EIeVDUTG+AlarDZGIQNpgThE3coQFtq5aA4VagQj19dNQZh7NHuBG0B0b16LihpuRm1/EFoloaLTzyeVQh9Ohvfu4nWzoiJE8UZzumfiC9XUNaKurRnZaIiaMH/OVAnTTCWnusPhDp8OO02dO49333ufJW1NumYKSQYPR5iCChh9yaeI2+9oIzIk0dyCKc6dOY/e27dAZ9BhZMRJZ2bnQUDuYUoHdu3aipbkF2Xk5GD1+HDwuH1PGKX0LEAAUEoo51ElEfQhEQZerFNAq1XxCCQ2TaLO28wjZ3PwCjuYp9RS6lKJ8hoG1pRl7du6Evb0T026djfTMLD6anskroTBqT59AglaBcRUjoOW5gXEHUF9tk3wOv/8CXUBcwUw0vxRZHzx4AB9v2IK0jAyMrKhA3sBSpnSTOaZgkfrrdFo1wpEQKinfPnwUnW1tGD9lIvILCpndEwiQH1aiqaERVefPIiE5AaPHjYPb5eOmEYovNEoVVBTxqzQ4cewYTp84xr2AOpMBCiiR3T8XBUUFSLYk4MCBozAnJSM5JYX5/IwAyiJsNWg2wfkzp3H80GFMnjkd/XJyuULJ546qtThz6AC00QDGjS5HYiL1Fgit31+W1xemAN0a0mITkwSUfNnSZdi5dy+0ZgtunTsXiclZ3G3LWD3R+OXAsaMncOzQYZ6hP2r0KJSOGgGvO8R9/gK1ijj6Cpw8fhSBgBc5/fPgtLngsXfyBM+M9DTkpppR1+7AO395HZ+uWw2PswM6owk+XwiFg4dixuzZuOvOuTh4/Bw0egOPijeaTGwtBPqfMA7PaevE5vXrUD56NHLz8rk5hDMElRZH9+6EJuzFzeNGIjktU+ANfoUEdqfTUwlYAEqFkSf090XvvYtVH30En0qHhx55EqOGD0aCxcDTQ7dv3491az7GwEHFuGXaZJQUF6G2ycZHqtC7hbYtJVJTTTh88BAO7tuP2upKKKMRBF02eAJBJKVnMnlj29ad2Lh+Lax1lTBp5PD6QqCxvMEoMPKGm/C9n/2SkUKyOnSQpCUhCYGQj6uAHELK5Mw1XLdqKVcVC4tKYDYncJzgD4VwdN8OmNVRzJh0Ex9ywR3OXymAOEiafCn31wmdtdI8PFpwqrefP3sW23dsR01DE7yBEEfaNGpGa7BgcFkZiooLYUlMhNdLY2dEholUfJPLkZ5mxKkTZ5its+jN12DSyqETj7P30bwgpZbnDPl9HgT9frYYySmpaG9vg8fj52bNouKBSExJw50PPoYRFeN5OjmNa5PGvtK8ICKGLF/4LnLy+6N4cBnS0jI5xmjvbMW54weRkWDCzFtu4Rayr2oBovOLtXz12A2SMlA+7nI6UVtVhQt1tfhk/QacOHUalpQ0PPGtbyE7pz/31lEtgEAZYWeJDbT0FwWQkmTmyWHL3n8Xb/7+Feg0MqhUWk7fKAB0egLcc5ienoYRI0dh+MhRSEpM4MBvz95dPJ2cGlSpLfwb33sRM26/HVn9stDZ4RIHPEWh1ajZNS18522kpWeitHwYsnP7w+f1obGhHi2155CdmoSbJkyIQQ9fngjgGtrDP6vgJY4SKMKkUo1EyPnFQisf8ESB2ydrP8La9ZsQkKvxn7/7b5r7zEARBYdyeQRh0GminNdxAEb/S7V+Yu6uWrQAb7/6Cgd9ERq6qCYalxwerw/WDgcmT56KO+beibKyIWhqqqVDWnH8xDFs274Nu3bsgt/jxsPffA5fe+A+lJeXo9nqEhh+MioAqSGXhbDgzXdhMidg6MiRKBxYDI/bj+rK8wg6WpGbkYLyoeVfKcC1KI908q6zvQ17DhxGZVMr5t33Nbh9hMaRD6Y/EYSjSkSCMnEAQ4RxA3OiGg21TVi1eCHe/MOvIA8HEYzKeDiETk1HzoXQ6vBwy/joURWcMaxZswK5uQXIKxwAm92OlcuWorqmBjPn3IUHH36IaegNVodwtpmMqoZqKOVhLHz7fahVGgyrGIVBQ4fC7Q7g1PGj0Ed9yM/KEFvSu1WGLzpR7YvIDr6wLKC3yiCxaU8fP4njZyrR6Q9j6LgKnDldjZA/wIdM0rSGqFIJrcHMJ4dpNTou52ZlW+DodGLt0oV47Vc/4XbwENHH1SpoVYTfR6AzGDBy3M2wtgmRvFoWgDekwJDycsbw/V4PPvp4A26eOh0PPvIQJk+dhnqrgzuDuSytV0OliGDBuwuZWFIxrgIjx46CxxfE1k82IVkrQ0lRPvoXDhAnOnQNiby4E+rzdw7/IAoAnDh+HPsOn8DJ81VQhu2wKNyw6FUc+dupNEtpn9aAiFwDuVLNp4SmpqaizebHzh17sGH1cqgQBh29o1YreSgVCZCCwbE3TuQ5Aju2bEaAhk8GwE0eQ4aUcXC5bPlKzLh9Du5/aD7+f3tnF9PkGcXxP/14WwuUgh8oChZRmVCdiICIuItNI34kbotzJm4xu1my63mz3Xm13exuS3a5m21uDM0MMbhh4gcOdBIdiPNrfNRWoFBKW2gp7cvyPw8tzM1EXMYk8U2aKBYDfc77nOc95/x//+21tfD4RhVxHGw/kz00hYaTDTJGzopjVc12+PwhtJ4/j5cKlqOkeC2yFy9NBcCMPEz9H0/DXnraG2au73vuAyA5N3D9ejsuX7uBjq5OpI8/wGJbRISd0ZiOOHcAPQ2LbBZ5BmeLmO7lWfZMPPCEcON2n2DilmTZBN9CUqiFHgF6Gjy+Eezes084wcO+fpxv/hmaxYaSUpc899+7fwdXWq7g0Dvv4fDRo9hcXoZ+H82n5MgppFHyo5t+bITX48a26q3YUlmBzt970XPrN1SVlUpvgukhdT0O1noCpWc+UsICCAB1XKS5c8v1TnT33seS2F0g5od3MIRYwoBlS+wIBKOyI2TbrTLSRbpm+iITBv3j6H4UhmcoikyaOfN4STKZwQSDDjwcHEbV9lrs378fTmcB6usbkEkYVEYmhoYVL4BWrcc++BBvvH0ExaXF8M0KAM2iniouNTdLraGqYjNcmzbipwvXoIf82FlTiXXri6TFnEK7JMNnOhCeLI//71PCcx8AyTNA49kmdNzrw4BvEA9vnoVxbAD+UAwORw42rMnDxfY/YLNqcGQtklbtvZ4BpGsmlK5fJfWDrgdetHe6kZ2RLnV+ofPqxLjFMRaJwlVWht11dchZulwUw62/XBZ3EiqAWVZ+//gJ7H3zLRQUFsA/FMRUGieI6SvAADCi/Wob7nR1oKpsoxSmvm44g8Il2aipqUaB05ky20geaiUcnhAAc93G/837F0gAAN/VN8DrC8Fmz4HPcx/h3lYER3xSlGHvPzvDDEfmIhFpEMcWIc8/pmPFshzEJqdwtcONxpYHoEeUOJroLBVwcFulEDMhTllZyjE8oSM8FhZ0HT0MyRb66JPPULtrjzSaohSPpJEgSpSdUgPfvX0LXR03sKGkBM5CJxpP/4C6V2qwvrgYGXbHiwB41ihN7gDfflMP79AonOuLsc65Eg/d3ejvH4DX7cbAoz4YJoOwWQzi+s16e3giApPRgoyMLBhMZoSjCYTjVmneBPzEz40KHi4eG0ckMi5sIT5WmjRNniLMmkVZ2ZvMKCvbggOHD2NlQaG0iNmNTA6mJOFOnr4e0TLQd8hqtSD0qBsH9+7FirwVApCeGTud8QIOhULiucSfiUYVLpdLCGHzeS2QHWAK35+sR1//MIpKXdj1aq1w/0YCYQSGhxDw94vmnx8yT/dclLGJqJR9eaAz87nfZkF2zjKZ5QuN+BEOBoTdNxEbx/hYRCp3zMV0I6UxFDt9CvpkxNriEuTmrZJWMgNFtm76DDGRiBkU3cWDaG9rg8fjFXOHCtdabC2vkNL1tHggNRJGXK3P54PH48G5c+ckRVVXV2Pnzp0vAuDx6E8qB86casDdbjeWrV6LA6/vQyAYkdYqT/OaaUqmhGnvl7Sg48Joptn8afrupsEsaFq1Jgr5yLKwNBVVp9GoGP1SYBKbPB3RuAHBwJhYtslMqkCtlYLIOD0SphvS8NWXX2DE60bllpdx+MghWK3pgqaV2ZMpiPyci88gIXi6r68PTU1NqKysRF1dHTZt2pQimc/XLrAAdgD1UTQ1nsGFlqsw2uw48fFxDMenEI5MyvQNBSWp8/L0kCZFm4rIrRQ/SYCjunuVEkkNdCrYo9zJAn1WSh+BVvOVYODwz0qPIENdbAWbjDAaTEjXjLAYE7jd48Pnn55A6ZpVOHbsXSxfyRnA6UibouNnXODTrW1tkrrEN0HX0dzcjPLycuzYsQNFRUXIz8+fr7VXD7JzRcXO6083o6yDu7cXFy9ewq83O1Bc6kJ2bp7U3kn45jg4c7e4ieu69AeIjFWndE22cTW1S5TrpMr9cZoxTg+HynjajF5dSJ/T9C82mYxG9fekboCVR6YPAisTk1GMBYZxquE0ctKtOLi/Drt3vQYTNenTlV/OKFBM6nb3CEGE6SVJDx8ZGZE0QcMqBY9U3zdf14IJgIlIBL29vejs6sKjQR80a7p482Zk2qGxGKNpMuoVGR+XDl4gEJBhUTJ5eeeSNUwZGBdRM5vl33jgojUb70YuEl8c8ODFwLEJ3tUOzWKSVMGpX04VxwimjExgMj4hdu60t+v3erCtohzbqqqQn18wq+bD74uL7JxCk9zcXFgsf13k+Sj4PCmgnvsAmFEQKeI49Xp3bncJUj2NY11mTc4CzMux6IQsNCeDSREX3Lxmkbt9NDgqB0B+jV5B9sxMQdFzwbkj8HDHl/j06hz30sR+xuFwSAAQBE3mMBVFPDDGxB85IbsDq4HO1QWyhduzHH//rGfVc5LK4P8DCPVPQbCAAkDtp4+jVuSXYhdYn0zdvdzCRY/HSwjfCSUs1RMy7k2ruGcVac9uY7NVndrnU/SXJA8k+c5Z9idzMo+enyTwJw6vf/cRhGLyAAAAAElFTkSuQmCC"
    } else n.css("color", "red").html("请使用支持Canvas(Chrome、Firefox、Safari、Opera、IE9+)的浏览器浏览本页!")
}