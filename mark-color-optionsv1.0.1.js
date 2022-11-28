if (!window.markCollection || !window.markCollection._colorOptions) {
    const u = {
        color: "red",
        isVisible: !1,
        onready: null,
        iframeProperties: {
            iframe: null,
            document: null,
            window: null,
            panel: null
        },
        colorShades: [],
        basicColors: [],
        recentColors: []
    };
    {
        const g = u;
        var o = window.markCollection;
        const w = [];
        function n(t, o) {
            w.push({
                eventName: t,
                callback: o
            });
        }
        o = o && "object" == typeof o ? window.markCollection : {}, g.onready = () => {
            o._colorOptions.isReady = !0, $(document).trigger("_coloroptionsisready");
        }, o._colorOptions = {
            ready(t) {
                "function" == typeof t && (this.isReady ? t(this) : ($(document).one("_coloroptionsisready", () => {
                    t(this);
                }), n("ready", t)));
            },
            enableColorShades(e = !0) {
                var t = u.iframeProperties.panel;
                const r = $(t).find("> .content > .color-shades").first(), o = [ $(r).prev()[0], $(r)[0] ];
                o.forEach(t => {
                    var o = $(r).attr("style") ? $(r).attr("style") : "";
                    $(t).css("cssText", o + " display: " + (e ? "flex" : "none") + " !important;");
                });
            },
            enableRecentColors(e = !0) {
                var t = u.iframeProperties.panel;
                const r = $(t).find("> .content > .recent-colors").first(), o = [ $(r).prev()[0], $(r)[0] ];
                o.forEach(t => {
                    var o = $(r).attr("style") ? $(r).attr("style") : "";
                    $(t).css("cssText", o + " display: " + (e ? "flex" : "none") + " !important;");
                });
            },
            enableBasicColors(e = !0) {
                var t = u.iframeProperties.panel;
                const r = $(t).find("> .content > .basic-colors").first(), o = [ $(r).prev()[0], $(r)[0] ];
                o.forEach(t => {
                    var o = $(r).attr("style") ? $(r).attr("style") : "";
                    $(t).css("cssText", o + " display: " + (e ? "flex" : "none") + " !important;");
                });
            },
            setColor(t) {
                m(t);
            },
            setBasicColors(t) {
                v(t);
            },
            setRecentColors(t) {
                p(t);
            },
            getColorShades() {
                return t = u, o = t.iframeProperties.panel, o = $(o).find("> .content > .color-shades").first(), 
                r(t.color, $(o).find("> .item").length);
                var t, o;
            },
            getRecentColors() {
                return u.recentColors;
            },
            getPickerPosition() {
                var t = g.iframeProperties.iframe;
                return t ? {
                    x: (t = t.getBoundingClientRect()).left,
                    top: t.top
                } : null;
            },
            setTheme(t = "light") {
                var o = g.iframeProperties.document;
                $(o).find("body").attr("data-theme", t);
            },
            addStyle(t) {
                var o, e;
                g.iframeProperties && g.iframeProperties.document && (o = g.iframeProperties.document, 
                "object" == typeof t && $(t).is("link[href]") ? o.getElementsByTagName("head")[0].appendChild(t) : "string" == typeof t && ((e = document.createElement("link")).setAttribute("rel", "stylesheet"), 
                e.setAttribute("type", "text/css"), e.setAttribute("href", t), o.getElementsByTagName("head")[0].appendChild(e)));
            },
            on(t, o) {
                var e = g.iframeProperties.iframe, r = g.iframeProperties.panel;
                if ("function" == typeof o) {
                    switch (t) {
                      case "ready":
                        if ("function" != typeof o) return;
                        this.isReady ? o(this) : $(document).one("_coloroptionsisready", () => {
                            o(this);
                        });
                        break;

                      case "input":
                        var i = $(r).find("> .top-nav").first();
                        $(i).on("colorchange", {
                            eventName: "input",
                            get value() {
                                return g.color;
                            },
                            get w3color() {
                                return window.w3color(g.color);
                            },
                            handler: o
                        }, o);
                        break;

                      case "draw":
                        $(e).on("open", {
                            eventName: "draw",
                            handler: o
                        }, o);
                        break;

                      case "hide":
                        $(e).on("close", {
                            eventName: "hide",
                            handler: o
                        }, o);
                    }
                    n(t, o);
                }
            },
            off(t, o) {
                var e = g.iframeProperties.iframe, r = g.iframeProperties.panel, i = function(t, o) {
                    const e = [];
                    if ("function" == typeof o) for (var r in w) (i = w[r]).eventName == t && i.callback == o && e.push(i.callback); else for (var r in w) {
                        var i;
                        (i = w[r]).eventName == t && e.push(i.callback);
                    }
                    return e;
                }(t, o);
                switch (t) {
                  case "ready":
                    for (var n in i) $(document).off("_coloroptionsisready", i[n]);
                    break;

                  case "input":
                    var s = $(r).find("> .top-nav").first();
                    for (n in i) $(s).off("colorchange", i[n]);
                    break;

                  case "draw":
                    for (var n in i) $(e).off("open", i[n]);
                    break;

                  case "hide":
                    for (var n in i) $(e).off("close", i[n]);
                }
                var a = t, c = o;
                if ("function" == typeof c) for (var l = 0; l < w.length; l++) (d = w[l]).eventName == a && d.callback == c && (w.splice(l, 1), 
                --l); else for (var d, l = 0; l < w.length; l++) (d = w[l]).eventName == a && (w.splice(l, 1), 
                --l);
            },
            _getProperties(t) {
                if (t == o) return {
                    globalData: u,
                    input: t => {
                        var o = g.iframeProperties.panel, o = $(o).find("> .top-nav").first();
                        $(o).on("colorchange", {
                            eventName: "input",
                            get value() {
                                return g.color;
                            },
                            get w3color() {
                                return window.w3color(g.color);
                            },
                            handler: t
                        }, t), n(event_name, t);
                    },
                    showPicker(t) {
                        e(t);
                    },
                    hidePicker() {
                        i();
                    },
                    setPickerPosition(t, o) {
                        var e = g.iframeProperties.iframe;
                        e && ($(e).css({
                            "-webkit-transform": "none",
                            "-ms-transform": "none",
                            transform: "none"
                        }), $(e).css({
                            left: t + "px",
                            top: o + "px"
                        }));
                    },
                    setPickerPositionTo(t, o = !1) {
                        var e;
                        [ t, o = !1 ] = [ t, o ], e = u.iframeProperties.iframe, 
                        t && ($(e).show(), a(e), pos = s(t, e, 5), $(e).css({
                            "-webkit-transform": "none",
                            "-ms-transform": "none",
                            transform: "none"
                        }), pos ? o ? $(e).animate({
                            left: pos[0] + "px",
                            top: pos[1] + "px"
                        }) : $(e).css({
                            left: pos[0],
                            top: pos[1]
                        }) : $(e).css({
                            "-webkit-transform": "translate(-50%,-50%)",
                            "-ms-transform": "translate(-50%,-50%)",
                            transform: "translate(-50%,-50%)",
                            left: "50%",
                            top: "50%"
                        }));
                    }
                };
            },
            isReady: !1,
            get version() {
                return "version 1.0";
            }
        }, o.w3color = "function" == typeof window.w3color ? window.w3color : void 0, 
        window.markCollection = o;
    }
    function d(t, o, e) {
        return e < 0 && (e += 6), 6 <= e && (e -= 6), e < 1 ? (o - t) * e + t : e < 3 ? o : e < 4 ? (o - t) * (4 - e) + t : t;
    }
    function r(t, o = 5) {
        for (var e, r, i, n = {
            r: (n = (t = window.w3color(t)).toRgb()).r <= 2 ? 0 : n.r,
            g: n.g <= 2 ? 0 : n.g,
            b: n.b <= 2 ? 0 : n.b
        }, s = t.toHsl(), a = 1 / (o + 1), c = [], l = 1; l < o + 1; l++) {
            n = (e = s.h, r = s.s, {
                r: 255 * d(r = 2 * (i = l * a) - (i = i <= .5 ? i * (r + 1) : i + r - i * r), i, (e /= 60) + 2),
                g: 255 * d(r, i, e),
                b: 255 * d(r, i, e - 2)
            });
            c.push("rgb(" + n.r + ", " + n.g + "," + n.b + ")");
        }
        return c;
    }
    function s(t, o, e = 8) {
        var r, i, n, s, a = t.getBoundingClientRect(), c = o.getBoundingClientRect(), l = {
            left: [ [ [ "left", "right" ], [ "top", "top" ] ], [ [ "left", "right" ], [ "center", "center" ] ], [ [ "left", "right" ], [ "bottom", "bottom" ] ] ],
            top: [ [ [ "left", "left" ], [ "top", "bottom" ] ], [ [ "center", "center" ], [ "top", "bottom" ] ], [ [ "right", "right" ], [ "top", "bottom" ] ] ],
            right: [ [ [ "right", "left" ], [ "top", "top" ] ], [ [ "right", "left" ], [ "center", "center" ] ], [ [ "right", "left" ], [ "bottom", "bottom" ] ] ],
            bottom: [ [ [ "left", "left" ], [ "bottom", "top" ] ], [ [ "center", "center" ], [ "bottom", "top" ] ], [ [ "right", "right" ], [ "bottom", "top" ] ] ],
            corner: [ [ [ "right", "left" ], [ "top", "bottom" ] ], [ [ "right", "left" ], [ "bottom", "top" ] ], [ [ "left", "right" ], [ "top", "bottom" ] ], [ [ "left", "right" ], [ "bottom", "top" ] ], [ [ "right", "left" ], [ "bottom", "top" ] ], [ [ "left", "right" ], [ "bottom", "top" ] ], [ [ "right", "left" ], [ "top", "bottom" ] ], [ [ "left", "right" ], [ "top", "bottom" ] ] ]
        };
        for (r in l) for (var d in l[r]) {
            var d = l[r][d], f = (i = a, n = c, s = f = void 0, f = (d = d)[0], 
            d = d[1], s = [], "left" == f[0] && "right" == f[1] ? s[0] = i.right : "right" == f[0] && "left" == f[1] ? s[0] = i.left - n.width : "right" == f[0] && "right" == f[1] ? s[0] = i.left + i.width - n.width : "center" == f[0] && "center" == f[1] ? s[0] = i.left + i.width / 2 - n.width / 2 : s[0] = i.left, 
            "top" == d[0] && "bottom" == d[1] ? s[1] = i.bottom : "bottom" == d[0] && "top" == d[1] ? s[1] = i.top - n.height : "bottom" == d[0] && "bottom" == d[1] ? s[1] = i.bottom - n.height : "center" == d[0] && "center" == d[1] ? s[1] = i.top + i.height / 2 - n.height / 2 : s[1] = i.top, 
            s), d = [ f[0], f[1], f[0] + c.width, f[1] + c.height ];
            if (0 <= d[0] && 0 <= d[1] && d[2] <= window.innerWidth && d[3] <= window.innerHeight) return "left" == r ? f[0] += e : "right" == r ? f[0] -= e : "top" == r ? f[1] += e : "bottom" == r && (f[1] -= e), 
            f;
        }
        return null;
    }
    function a(t) {
        var e = 0, r = $("body").first().find("*");
        r.each(t => {
            var o = r[t], t = isNaN(parseInt($(o).css("z-index"))) ? 0 : parseInt($(o).css("z-index"));
            e < t && (e = t + 1);
        }), $(t).css("z-index", String(e + 1));
    }
    function f(t) {
        const o = u;
        var e = o.iframeProperties.panel, e = $(e).find("> .content > .color-shades").first(), i = r(t, $(e).find("> .item").length);
        $(e).find("> .item").each((t, o) => {
            var e = i[t].split("(")[1].split(")")[0].split(","), r = e.map(function(t) {
                return 1 == (t = parseInt(t).toString(16)).length ? "0" + t : t;
            }), e = e.map(function(t) {
                return parseFloat(t);
            }), e = .6 <= function(t, o, e) {
                var r, i, n, s, a, c = [];
                for (c[0] = t / 255, c[1] = o / 255, c[2] = e / 255, r = c[0], i = c[0], 
                n = s = 0; n < c.length - 1; n++) c[n + 1] <= r && (r = c[n + 1]), 
                c[n + 1] >= i && (i = c[n + 1], s = n + 1);
                return 0 == s && (a = (c[1] - c[2]) / (i - r)), 1 == s && (a = 2 + (c[2] - c[0]) / (i - r)), 
                2 == s && (a = 4 + (c[0] - c[1]) / (i - r)), isNaN(a) && (a = 0), 
                (a *= 60) < 0 && (a += 360), t = (r + i) / 2, {
                    h: a,
                    s: r == i ? 0 : t < .5 ? (i - r) / (i + r) : (i - r) / (2 - i - r),
                    l: t
                };
            }(e[0], e[1], e[2]).l ? "black" : "white", r = "#" + r.join("");
            $(o).find("> .color").css("background-color", i[t]), $(o).find("> p").text(r), 
            $(o).find("> p").css("color", e), $(o).attr("title", r), $(o).attr("data-value", r);
        }), o.colorShades = i;
    }
    function v(e) {
        const t = u;
        var o = t.iframeProperties.panel, o = $(o).find("> .content > .basic-colors").first();
        $(o).find("> .item").each((t, o) => {
            t = e[t];
            t && ($(o).find("> .color").css("background-color", t), $(o).attr("title", t), 
            $(o).attr("data-value", t));
        }), t.basicColors = e;
    }
    function p(e) {
        const t = u;
        var o = t.iframeProperties.panel, o = $(o).find("> .content > .recent-colors").first();
        $(o).find("> .item").each((t, o) => {
            $(o).removeAttr("data-value"), $(o).removeAttr("title", ""), $(o).find("> .color").css("background-color", "");
        }), $(o).find("> .item").each((t, o) => {
            t = e[t];
            t && ($(o).find("> .color").css("background-color", t), $(o).attr("title", t), 
            $(o).attr("data-value", t));
        }), t.recentColors = e;
    }
    function m(t, o = !0) {
        const e = u;
        var r = e.iframeProperties.panel, r = $(r).find("> .top-nav").first(), i = window.w3color(t), n = function(o) {
            var e, r, t = -1 < o.indexOf(",") ? "," : " ";
            for (e in -1 < (o = o.substr(5).split(")")[0].split(t)).indexOf("/") && o.splice(3, 1), 
            o) {
                let t = o[e];
                -1 < t.indexOf("%") && (r = t.substr(0, t.length - 1) / 100, e < 3 ? o[e] = Math.round(255 * r) : o[e] = r);
            }
            let i = (+o[0]).toString(16), n = (+o[1]).toString(16), s = (+o[2]).toString(16), a = Math.round(255 * +o[3]).toString(16);
            return 1 == i.length && (i = "0" + i), 1 == n.length && (n = "0" + n), 
            1 == s.length && (s = "0" + s), 1 == a.length && (a = "0" + a), "#" + i + n + s + a;
        }(i.toRgbaString()), s = e.color;
        $(r).find("> .output").text(i.opacity < 1 ? n : i.toHexString()), o && f(i.toRgbString()), 
        s != (e.color = t) && $(r).trigger("colorchange"), $(r).trigger("input");
    }
    function e(t) {
        const o = u;
        var e = o.iframeProperties.panel, r = o.iframeProperties.iframe, i = o.isVisible;
        $(r).stop(), $(r).fadeIn(300), $(r).css({
            width: $(e).outerWidth(),
            height: $(e).outerHeight()
        }), r.contentWindow.focus(), a(r), !(pos = t ? s(t, $(r)[0], 5) : null) || (!1 ? {
            width: window.screen.width,
            height: window.screen.height
        } : {
            width: window.screen.availWidth,
            height: window.screen.availHeight
        }).width <= 500 ? $(r).css({
            "-webkit-transform": "translate(-50%,-50%)",
            "-ms-transform": "translate(-50%,-50%)",
            transform: "translate(-50%,-50%)",
            left: "50%",
            top: "50%"
        }) : ($(r).css({
            "-webkit-transform": "none",
            "-ms-transform": "none",
            transform: "none"
        }), $(r).css({
            left: pos[0] + "px",
            top: pos[1] + "px"
        })), o.isVisible = !0, i || $(r).trigger("open");
    }
    function i(t = !0) {
        const o = u;
        var e = o.iframeProperties.iframe, r = o.isVisible;
        t ? ($(e).stop(), $(e).fadeOut(300, () => {
            $(e).css("z-index", 0);
        })) : ($(e).stop(), $(e).hide()), o.isVisible = !1, r && $(e).trigger("close");
    }
    function h() {
        const t = u;
        $(window).on("mousedown touchstart", t => {
            i();
        }), $([ window, t.iframeProperties.window ]).blur(() => {
            t.iframeProperties.document.hasFocus() || i();
        }), $(window).scroll(() => {
            var t;
            t = u, $(t.iframeProperties.iframe).is(":visible") && i(!1);
        });
    }
    function c(n) {
        const r = u;
        var s = document.createElement("iframe");
        const i = function(t) {
            return t.replace(/((?<=\<img.+)src\s*=\s*("|').+?("|')|(?<=\<img.+)src\s*=\s*.+?(?=\s|\>))/g, "");
        }(`
            <div class="panel col"><div class="top-nav row"><p>Color Options</p><p class="output">#00000</p></div><div class="col content"><p>Basic Colors:</p><div class="flex-table basic-colors"><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div></div><p>Recent Colors:</p><div class="flex-table recent-colors"><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div><div class="item"><div class="color"></div></div></div><p>Color shades:</p><div class="color-shades"><div class="item"><div class="color"></div><p>#00000</p></div><div class="item"><div class="color"></div><p>#00000</p></div><div class="item"><div class="color"></div><p>#00000</p></div><div class="item"><div class="color"></div><p>#00000</p></div><div class="item"><div class="color"></div><p>#00000</p></div><div class="item"><div class="color"></div><p>#00000</p></div></div></div></div>
        `), a = "mark-color-options";
        $(s).hide(), $(s).attr("id", a), $(s).attr("title", "HSL Color Picker"), 
        $(s).attr("allowtransparency", "true"), $(s).css({
            outline: "none",
            border: "none",
            position: "fixed"
        }), $(s).on("load", () => {
            var o = s.contentWindow.document, e = $(o).find("body").first(), t = document.createElement("link");
            t.setAttribute("rel", "stylesheet"), t.setAttribute("type", "text/css"), 
            t.setAttribute("href", "https://firebasestorage.googleapis.com/v0/b/sigma-icon-355712.appspot.com/o/Important%20File%2FCss%2FMarkColorOptions.css?alt=media&token=65728095-e63b-46a5-ba59-ad3ef6cc3476"), 
            o.getElementsByTagName("head")[0].appendChild(t), $(e).addClass(a), 
            $(e).append(i), $(o).ready(() => {
                var t = $(e).find("> .panel");
                r.iframeProperties.iframe = s, r.iframeProperties.document = o, 
                r.iframeProperties.window = s.contentWindow, r.iframeProperties.panel = $(t)[0], 
                $(t).ready(() => {
                    function o() {
                        $(s).css({
                            width: $(t).outerWidth() + "px",
                            height: $(t).outerHeight() + "px"
                        });
                    }
                    var e, r, i;
                    e = $(t)[0], r = t => {
                        o();
                    }, i = [ e.offsetWidth, e.offsetHeight ], setInterval(() => {
                        var t, o = [ e.offsetWidth, e.offsetHeight ];
                        for (t in i) i[t] != o[t] && ("function" == typeof r && r(o), 
                        i[t] = o[t]);
                    }, 30), o(), n();
                });
            });
        }), $("html").append(s);
    }
    function l() {
        const t = u;
        var o;
        e = u, o = e.iframeProperties.panel, $(e.iframeProperties.window).on("mousedown touchdown", e => {
            var t = $(o).find("[data-autofocus]");
            $(t).each((t, o) => {
                o.contains(e.target) ? ($(o).attr("data-focus", "true"), $(o).trigger("focus")) : ($(o).is("[data-focus]") && $(o).trigger("blur"), 
                $(o).removeAttr("data-focus"));
            });
        }), $(e.iframeProperties.window).blur(() => {
            var t = $(o).find("[data-autofocus]");
            $(t).each((t, o) => {
                $(o).is("[data-focus]") && $(o).trigger("blur");
            }), $(t).removeAttr("data-focus");
        }), h();
        {
            const i = u;
            var e = i.iframeProperties.panel;
            const n = $(e).find("> .content > .basic-colors").first();
            e = $(e).find("> .top-nav").first(), $(n).find("> .item").each((t, o) => {
                $(o).click(() => {
                    m($(o).attr("data-value"));
                });
            }), $(e).on("colorchange", () => {
                const r = window.w3color(i.color).toRgbaString();
                $(n).find("> .item").removeAttr("data-focus"), $(n).find("> .item").each((t, o) => {
                    var e;
                    $(o).attr("data-value") && (e = window.w3color($(o).attr("data-value")).toRgbaString(), 
                    r == e && $(o).attr("data-focus", !0));
                });
            }), v([ "lightsalmon", "crimson", "red", "orangered", "lime", "forestgreen", "cyan", "teal", "dodgerblue", "blue", "navy", "violet" ]);
        }
        {
            const a = u;
            var e = a.iframeProperties.panel, r = a.iframeProperties.iframe;
            const c = $(e).find("> .content > .recent-colors").first();
            function s(t, o = 0) {
                for (var e = t[o], r = o; 1 <= r; r--) t[r] = t[r - 1];
                t[0] = e;
            }
            e = $(e).find("> .top-nav").first(), $(c).find("> .item").each((t, o) => {
                $(o).click(() => {
                    var t = $(o).attr("data-value");
                    t && m(t);
                });
            }), $(e).on("input", () => {
                const r = window.w3color(a.color).toRgbaString();
                $(c).find("> .item").removeAttr("data-focus"), $(c).find("> .item").each((t, o) => {
                    var e;
                    $(o).attr("data-value") && (e = window.w3color($(o).attr("data-value")).toRgbaString(), 
                    r == e && $(o).attr("data-focus", !0));
                });
            }), $(r).on("close", () => {
                const t = a.color, o = window.w3color(t), e = a.recentColors, r = new Option().style;
                r.color = o.toRgbString();
                for (var i = 0; i < e.length; i++) {
                    const n = new Option().style;
                    if (n.color = e[i], n.color == r.color) return void s(e, i);
                }
                e.push(r.color), e.splice($(c).find("> .item").length + 1), s(e, e.length - 1);
            }), $(r).on("open", () => {
                p(a.recentColors);
            });
        }
        {
            const l = u, d = (e = l.color, r = l.iframeProperties.panel, $(r).find("> .content > .color-shades").first());
            r = $(r).find("> .top-nav").first(), $(d).find("> .item").each((t, o) => {
                $(o).click(() => {
                    m($(o).attr("data-value"), !1);
                });
            }), $(r).on("colorchange", () => {
                const t = l.color, i = new Option().style;
                i.color = t, $(d).find("> .item").removeAttr("data-focus"), $(d).find("> .item").each((t, o) => {
                    var e = $(o).attr("data-value");
                    const r = new Option().style;
                    r.color = e, i.color == r.color && $(o).attr("data-focus", !0);
                });
            }), f(e);
        }
        m(t.color), "function" == typeof t.onready && t.onready();
    }
    $(document).ready(() => {
        var t, o;
        t = () => {
            c(() => {
                l();
            });
        }, o = window.markCollection, "function" == typeof window.w3color && (o.w3color = window.w3color), 
        "function" == typeof o.w3color ? t() : jQuery.ajax({
            dataType: "script",
            cache: !0,
            url: "https://firebasestorage.googleapis.com/v0/b/sigma-icon-355712.appspot.com/o/Important%20File%2FJs%2FW3Color.js?alt=media&token=58b453b5-6cd7-4867-9f48-c9775299a403"
        }).done(function() {
            o.w3color = window.w3color, "function" == typeof t && t();
        }).fail(function() {
            console.error("Importing w3color error");
        });
    });
}