"undefined" === typeof DOMLoader && (DOMLoader = {});
DOMLoader.script = function () {
  this.loaded = {};
  this.loading = {};
  return this;
};
DOMLoader.script.prototype.add = function (config) {
  var that = this;
  "string" === typeof config && (config = { src: config });
  var srcs = config.srcs;
  "undefined" === typeof srcs && (srcs = [{ src: config.src, verify: config.verify }]);
  var doc = document.getElementsByTagName("head")[0],
    testElement = function (element, test) {
      if (!(that.loaded[element.src] || (test && "undefined" === typeof window[test]))) {
        that.loaded[element.src] = true;
        if (that.loading[element.src]) that.loading[element.src]();
        delete that.loading[element.src];
        element.callback && element.callback();
        "undefined" !== typeof getNext && getNext();
      }
    },
    batchTest = [],
    addElement = function (element) {
      "string" === typeof element && (element = { src: element, verify: config.verify });
      if (/([\w\d.])$/.test(element.verify))
        if (((element.test = element.verify), "object" === typeof element.test))
          for (var key in element.test) batchTest.push(element.test[key]);
        else batchTest.push(element.test);
      that.loaded[element.src] ||
        ((script = document.createElement("script")),
        (script.onreadystatechange = function () {
          ("loaded" !== this.readyState && "complete" !== this.readyState) || testElement(element);
        }),
        (script.onload = function () {
          testElement(element);
        }),
        (script.onerror = function () {}),
        script.setAttribute("type", "text/javascript"),
        script.setAttribute("src", element.src),
        doc.appendChild(script),
        (that.loading[element.src] = function () {}));
    },
    onLoad = function (element) {
      if (element) testElement(element, element.test);
      else for (var n = 0; n < srcs.length; n++) testElement(srcs[n], srcs[n].test);
      for (var istrue = true, n = 0; n < batchTest.length; n++) {
        var test = batchTest[n];
        if (test && -1 !== test.indexOf(".")) {
          var test = test.split("."),
            level0 = window[test[0]];
          "undefined" !== typeof level0 &&
            (2 === test.length
              ? "undefined" === typeof level0[test[1]] && (istrue = false)
              : 3 === test.length && "undefined" === typeof level0[test[1]][test[2]] && (istrue = false));
        } else "undefined" === typeof window[test] && (istrue = false);
      }
      !config.strictOrder && istrue
        ? config.callback && config.callback()
        : setTimeout(function () {
            onLoad(element);
          }, 10);
    };
  if (config.strictOrder) {
    var ID = -1,
      getNext = function () {
        ID++;
        if (srcs[ID]) {
          var element = srcs[ID],
            src = element.src;
          that.loading[src]
            ? (that.loading[src] = function () {
                element.callback && element.callback();
                getNext();
              })
            : that.loaded[src]
            ? getNext()
            : (addElement(element), onLoad(element));
        } else config.callback && config.callback();
      };
    getNext();
  } else {
    for (ID = 0; ID < srcs.length; ID++) addElement(srcs[ID]);
    onLoad();
  }
};

DOMLoader.script = new DOMLoader.script();
