"undefined" === typeof DOMLoader && (DOMLoader = {});
DOMLoader.script = function () {
  this.loaded = {};
  this.loading = {};
  return this;
};
DOMLoader.script.prototype.add = function (b) {
  var a = this;
  "string" === typeof b && (b = { src: b });
  var c = b.srcs;
  "undefined" === typeof c && (c = [{ src: b.src, verify: b.verify }]);
  var e = document.getElementsByTagName("head")[0],
    d = function (b, d) {
      if (!(a.loaded[b.src] || (d && "undefined" === typeof window[d]))) {
        a.loaded[b.src] = !0;
        if (a.loading[b.src]) a.loading[b.src]();
        delete a.loading[b.src];
        b.callback && b.callback();
        "undefined" !== typeof l && l();
      }
    },
    k = [],
    m = function (c) {
      "string" === typeof c && (c = { src: c, verify: b.verify });
      if (/([\w\d.])$/.test(c.verify))
        if (((c.test = c.verify), "object" === typeof c.test))
          for (var f in c.test) k.push(c.test[f]);
        else k.push(c.test);
      a.loaded[c.src] ||
        ((f = document.createElement("script")),
        (f.onreadystatechange = function () {
          ("loaded" !== this.readyState && "complete" !== this.readyState) || d(c);
        }),
        (f.onload = function () {
          d(c);
        }),
        (f.onerror = function () {}),
        f.setAttribute("type", "text/javascript"),
        f.setAttribute("src", c.src),
        e.appendChild(f),
        (a.loading[c.src] = function () {}));
    },
    g = function (a) {
      if (a) d(a, a.test);
      else for (var e = 0; e < c.length; e++) d(c[e], c[e].test);
      for (var f = !0, e = 0; e < k.length; e++) {
        var l = k[e];
        if (l && -1 !== l.indexOf(".")) {
          var l = l.split("."),
            m = window[l[0]];
          "undefined" !== typeof m &&
            (2 === l.length
              ? "undefined" === typeof m[l[1]] && (f = !1)
              : 3 === l.length && "undefined" === typeof m[l[1]][l[2]] && (f = !1));
        } else "undefined" === typeof window[l] && (f = !1);
      }
      !b.strictOrder && f
        ? b.callback && b.callback()
        : setTimeout(function () {
            g(a);
          }, 10);
    };
  if (b.strictOrder) {
    var f = -1,
      l = function () {
        f++;
        if (c[f]) {
          var d = c[f],
            e = d.src;
          a.loading[e]
            ? (a.loading[e] = function () {
                d.callback && d.callback();
                l();
              })
            : a.loaded[e]
            ? l()
            : (m(d), g(d));
        } else b.callback && b.callback();
      };
    l();
  } else {
    for (f = 0; f < c.length; f++) m(c[f]);
    g();
  }
};

DOMLoader.script = new DOMLoader.script();
