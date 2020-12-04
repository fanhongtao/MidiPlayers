"undefined" === typeof MIDI && (MIDI = {});
"undefined" === typeof MIDI.Player && (MIDI.Player = {});
(function () {
  var b = MIDI.Player,
    a = [];
  b.cid = void 0;
  b.renderScreen = function (a) {
    var e = Piano.height,
      d = (Piano.Animation.scrollTop / Piano.stretchY) >> 0,
      k = Math.max(0, (((d + e) / e) >> 0) - 1),
      m = k * e;
    0 === k % 2
      ? ((CanvasRender[0].style.top = -d + m + "px"),
        (CanvasRender[1].style.top = -d + e + m + "px"))
      : ((CanvasRender[1].style.top = -d + m + "px"),
        (CanvasRender[0].style.top = -d + e + m + "px"));
    if (b.cid !== k + 1 || "undefined" === typeof a)
      (d = ((d / e) >> 0) * e),
        MIDI.Player.renderGraphics(k % 2, d),
        MIDI.Player.renderGraphics((k + 1) % 2, d + e);
    b.cid = k + 1;
  };
  b.renderGraphics = function (c, e) {
    if (b.replayer) {
      c || (c = 0);
      e || (e = 0);
      var d = CanvasRender[c].getContext("2d"),
        k = b.data,
        m = Piano.colorMap,
        g = MIDI.pianoKeyOffset,
        f = Piano.blackKeys,
        l = Piano.stretchX,
        n = l / 2,
        r = n / 2,
        q = Piano.stretchY,
        p = MusicTheory.number2float,
        s = d.canvas.height,
        t = 0,
        v = !1;
      d.canvas.height = s;
      for (var w = 0, F = 0; w < k.length; w++) {
        var B = k[w][0].event,
          F = F + k[w][1] / q,
          x = F - e;
        switch (B.type) {
          case "channel":
            switch (B.subtype) {
              case "noteOn":
                if (v) break;
                var u = B.noteNumber - g;
                a[u] = [x, u * l];
                t++;
                break;
              case "noteOff":
                var u = B.noteNumber - g,
                  y = a[u];
                if (!y) break;
                var t = Math.max(0, --t),
                  x = ((x - y[0]) >> 0) + 0.5,
                  y = (y[0] >> 0) + 0.5,
                  z = p[u % 12],
                  z = z + 7 * ((u / 12) >> 0),
                  z = z * l;
                if (y > s) {
                  if (!t) return;
                  v = !0;
                }
                delete a[u];
                if (0 > y + x) continue;
                var E = "#000000" === m[u].hex;
                d.beginPath();
                d.fillStyle = m[u].hsl;
                d.strokeStyle = E ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,1)";
                f[u % 12]
                  ? ((z += r),
                    (u = (z >> 0) + 0.5),
                    (z = n >> 0),
                    d.fillRect(u, y, z, x),
                    d.strokeRect(u, y, z, x))
                  : ((u = (z >> 0) + 0.5),
                    (z = l >> 0),
                    (E = Math.min(x / 2, z / 2, 5)),
                    d.moveTo(u + E, y),
                    d.lineTo(u + z - E, y),
                    d.quadraticCurveTo(u + z, y, u + z, y + E),
                    d.lineTo(u + z, y + x - E),
                    d.quadraticCurveTo(u + z, y + x, u + z - E, y + x),
                    d.lineTo(u + E, y + x),
                    d.quadraticCurveTo(u, y + x, u, y + x - E),
                    d.lineTo(u, y + E),
                    d.quadraticCurveTo(u, y, u + E, y),
                    d.fill(),
                    d.stroke());
                break;
            }
          case "meta":
            switch (B.subtype) {
              case "setTempo":
                MIDI.Player.tempo = 6e7 / B.microsecondsPerBeat;
            }
        }
      }
    }
  };
})();

"undefined" === typeof Piano && (Piano = {});
var scale = 0.36;
Piano.stretchX = 19;
Piano.stretchY = 10;
Piano.createKeyGlyphs = function () {
  function b(a) {
    var b = document.createElement("canvas"),
      c = b.getContext("2d"),
      e = a(c),
      f = e[0] * scale,
      l = e[1] * scale,
      n = e[3] * scale;
    b.width = e[2] * scale;
    b.height = n;
    c.scale(scale, scale);
    c.translate(-f / scale, -l / scale - 3);
    a(c);
    return { src: b.toDataURL(), canvas: b };
  }
  var a,
    c = b(function (b) {
      b.save();
      b.save();
      b.beginPath();
      b.moveTo(49.9, 34.1);
      b.lineTo(10, 34.1);
      b.bezierCurveTo(7.1, 34.1, 4.7, 36.5, 4.7, 39.4);
      b.lineTo(4.7, 240.7);
      b.bezierCurveTo(4.7, 243.6, 7.1, 245.9, 10, 245.9);
      b.lineTo(49.9, 245.9);
      b.bezierCurveTo(52.8, 245.9, 55.1, 243.6, 55.1, 240.7);
      b.lineTo(55.1, 39.4);
      b.bezierCurveTo(55.1, 36.5, 52.8, 34.1, 49.9, 34.1);
      b.closePath();
      b.beginPath();
      b.moveTo(50.4, 235.4);
      b.bezierCurveTo(50.4, 238.3, 48, 240.7, 45.1, 240.7);
      b.lineTo(5.2, 240.7);
      b.bezierCurveTo(2.3, 240.7, 0, 238.3, 0, 235.4);
      b.lineTo(0, 34.1);
      b.bezierCurveTo(0, 31.2, 2.3, 28.9, 5.2, 28.9);
      b.lineTo(45.1, 28.9);
      b.bezierCurveTo(48, 28.9, 50.4, 31.2, 50.4, 34.1);
      b.lineTo(50.4, 235.4);
      b.closePath();
      a = b.createLinearGradient(25.2, 240.2, 25.2, 28.4);
      a.addColorStop(0, "rgb(255, 255, 255)");
      a.addColorStop(0.9, "rgb(226, 226, 226)");
      a.addColorStop(0.93, "rgb(143, 143, 143)");
      a.addColorStop(0.96, "rgb(60, 60, 60)");
      b.fillStyle = a;
      b.fill();
      b.restore();
      b.restore();
      return [0, 40, 51, 202];
    }),
    e = b(function (b) {
      b.save();
      b.save();
      b.beginPath();
      b.moveTo(67.2, 162.7);
      b.bezierCurveTo(67.2, 164.7, 65.7, 166.4, 63.7, 166.4);
      b.lineTo(39.7, 166.4);
      b.bezierCurveTo(37.7, 166.4, 36.1, 164.7, 36.1, 162.7);
      b.lineTo(36.1, 3.7);
      b.bezierCurveTo(36.1, 1.6, 37.7, 0, 39.7, 0);
      b.lineTo(63.7, 0);
      b.bezierCurveTo(65.7, 0, 67.2, 1.6, 67.2, 3.7);
      b.lineTo(67.2, 162.7);
      b.closePath();
      b.fillStyle = "rgb(1, 1, 1)";
      b.fill();
      b.beginPath();
      b.moveTo(39, 36.5);
      b.lineTo(64.7, 36.5);
      b.lineTo(64.7, 163.5);
      b.lineTo(39, 163.5);
      b.lineTo(39, 36.5);
      b.closePath();
      a = b.createLinearGradient(51.8, 163.5, 51.8, 34.7);
      a.addColorStop(0.02, "rgb(30, 30, 30)");
      a.addColorStop(0.07, "rgb(75, 75, 75)");
      a.addColorStop(0.19, "rgb(119, 119, 119)");
      a.addColorStop(0.87, "rgb(75, 75, 75)");
      a.addColorStop(1, "rgb(30, 30, 30)");
      b.fillStyle = a;
      b.fill();
      b.beginPath();
      b.moveTo(62.7, 146.9);
      b.bezierCurveTo(62.7, 148.3, 61.6, 149.4, 60.2, 149.4);
      b.lineTo(43.4, 149.4);
      b.bezierCurveTo(42, 149.4, 40.9, 148.3, 40.9, 146.9);
      b.lineTo(40.9, 38.8);
      b.bezierCurveTo(40.9, 37.5, 42, 36.3, 43.4, 36.3);
      b.lineTo(60.2, 36.3);
      b.bezierCurveTo(61.6, 36.3, 62.7, 37.5, 62.7, 38.8);
      b.lineTo(62.7, 146.9);
      b.closePath();
      a = b.createRadialGradient(19.6, 136.4, 0, 19.6, 136.4, 110.2);
      a.addColorStop(0.4, "rgb(5, 5, 5)");
      a.addColorStop(0.59, "rgb(60, 60, 60)");
      a.addColorStop(0.64, "rgb(119, 119, 119)");
      b.fillStyle = a;
      b.fill();
      b.beginPath();
      b.moveTo(62.7, 61.6);
      b.bezierCurveTo(62.7, 61.9, 61.6, 62.2, 60.2, 62.2);
      b.lineTo(43.4, 62.2);
      b.bezierCurveTo(42, 62.2, 40.9, 61.9, 40.9, 61.6);
      b.lineTo(40.9, 34.9);
      b.bezierCurveTo(40.9, 34.5, 42, 34.2, 43.4, 34.2);
      b.lineTo(60.2, 34.2);
      b.bezierCurveTo(61.6, 34.2, 62.7, 34.5, 62.7, 34.9);
      b.lineTo(62.7, 61.6);
      b.closePath();
      a = b.createLinearGradient(51.8, 61.8, 51.8, 34.4);
      a.addColorStop(0, "rgb(119, 119, 119)");
      a.addColorStop(0.58, "rgb(80, 80, 80)");
      a.addColorStop(0.87, "rgb(40, 40, 40)");
      b.fillStyle = a;
      b.fill();
      b.beginPath();
      b.moveTo(59.6, 148.4);
      b.lineTo(44.2, 148.4);
      b.bezierCurveTo(43, 148.4, 41.9, 147.3, 41.9, 146);
      b.lineTo(41.9, 37.9);
      b.bezierCurveTo(41.9, 37.4, 42.1, 36.9, 42.3, 36.5);
      b.bezierCurveTo(41.5, 36.9, 40.9, 37.8, 40.9, 38.8);
      b.lineTo(40.9, 146.9);
      b.bezierCurveTo(40.9, 148.3, 41.9, 149.4, 43.1, 149.4);
      b.lineTo(58.6, 149.4);
      b.bezierCurveTo(59.3, 149.4, 60, 148.9, 60.4, 148.3);
      b.bezierCurveTo(60.2, 148.4, 59.9, 148.4, 59.6, 148.4);
      b.closePath();
      b.save();
      b.transform(0.913, 0, 0, -1, 159.9, 643.1);
      a = b.createRadialGradient(-151.2, 506.6, 0, -151.2, 506.6, 108.2);
      a.addColorStop(0, "rgb(223, 223, 223)");
      a.addColorStop(0.81, "rgb(119, 119, 119)");
      a.addColorStop(1, "rgb(60, 60, 60)");
      b.fillStyle = a;
      b.fill();
      b.restore();
      b.beginPath();
      b.moveTo(43.1, 149.4);
      b.lineTo(41.1, 163.5);
      b.lineTo(39, 163.5);
      b.lineTo(39, 160.6);
      b.lineTo(41.8, 149.3);
      b.lineTo(43.1, 149.4);
      b.closePath();
      a = b.createLinearGradient(41, 163.3, 41, 101.3);
      a.addColorStop(0.02, "rgb(30, 30, 30)");
      a.addColorStop(0.07, "rgb(75, 75, 75)");
      a.addColorStop(0.19, "rgb(119, 119, 119)");
      a.addColorStop(0.87, "rgb(75, 75, 75)");
      a.addColorStop(1, "rgb(30, 30, 30)");
      b.fillStyle = a;
      b.fill();
      b.beginPath();
      b.moveTo(60.5, 149.4);
      b.lineTo(62.5, 163.5);
      b.lineTo(64.7, 163.5);
      b.lineTo(64.7, 160.6);
      b.lineTo(61.9, 149.3);
      b.lineTo(60.5, 149.4);
      b.closePath();
      b.save();
      b.transform(-1.005, 0, 0, -1, 5206.5, 643.1);
      a = b.createLinearGradient(5120.3, 479.8, 5120.3, 541.7);
      a.addColorStop(0.02, "rgb(30, 30, 30)");
      a.addColorStop(0.07, "rgb(63, 63, 63)");
      a.addColorStop(0.19, "rgb(95, 95, 95)");
      a.addColorStop(0.87, "rgb(63, 63, 63)");
      a.addColorStop(1, "rgb(30, 30, 30)");
      b.fillStyle = a;
      b.fill();
      b.restore();
      b.restore();
      b.restore();
      return [35, 40, 32, 127];
    });
  return { whiteKey: c, blackKey: e };
};

Piano.Glyphs = Piano.createKeyGlyphs();
Piano.drawKeyLabel = function (b, a) {
  if (
    (MIDI.Player.playing || "preview" !== Piano.visualize) &&
    Piano.domKeys[b] &&
    0 <= b &&
    88 >= b
  )
    if (a) {
      var c = Piano.colorMap[b].hsl,
        e = document.getElementById("note" + b);
      e &&
        -1 === e.className.indexOf("force") &&
        ((e.className += " force"),
        (e.style.color = ""),
        (e.style.textShadow = ""),
        (e.style.backgroundColor = c));
    } else
      (e = document.getElementById("note" + b)) &&
        -1 !== e.className.indexOf("force") &&
        ((e.className = e.className.replace(" force", "")),
        (e.style.background = ""),
        (e.style.color = "rgba(0,0,0,0)"),
        (e.style.textShadow = "none"));
};

Piano.domKeys = {};
Piano.drawKeyboard = function () {
  function b(b, k, m, g) {
    for (var f = { 0: !0, 2: !0, 6: !0 }, l = k.length, n = 0, r = 0; r < b; r++) {
      var q = r,
        p = document.createElement("div"),
        s = "black" === m,
        n = k[q % l] + 12 * Math.floor(q / l);
      Piano.keys[n] = g;
      var t = Piano.colorMap[n].hsl,
        v = g + Piano.offsetLeft;
      if (s)
        var s = canvas.black,
          w = a;
      else (s = canvas.white), (w = c);
      s.drawImage(w, v, 7);
      s.fillStyle = t;
      s.fillRect(v, 0, w.width, 7);
      p.style.width = w.width - 1 + "px";
      p.style.height = "21px";
      p.style.paddingTop = w.height - 26 + 3.5 + "px";
      t = Piano.keySignature[n % 12];
      t = "solfege" === Piano.labelType ? MusicTheory.Solfege[t].syllable : t;
      p.style.marginTop = "7px";
      p.style.left = g + Piano.offsetLeft + "px";
      p.style.color = "rgba(0,0,0,0)";
      p.style.textShadow = "none";
      p.className = m;
      p.name = n;
      p.innerHTML = t;
      p.id = "note" + n;
      Event.add(p, "mousedown", Piano.mouseDown);
      Event.add(p, "mouseup", Piano.mouseUp);
      Event.add(p, "mouseover", Piano.mouseOver);
      Event.add(p, "mouseout", Piano.mouseOut);
      Piano.domKeys[n] = p;
      document.getElementById("keys").appendChild(p);
      g = "white" !== m && f[q % l] ? g + 2 * e : g + e;
    }
    Event.add(canvas.black.canvas, "mousedown", Piano.mouseDown);
    Event.add(canvas.black.canvas, "mouseup", Piano.mouseUp);
    Event.add(canvas.black.canvas, "mousemove", Piano.mouseOver);
  }
  document.getElementById("keys").innerHTML = "";
  var a = Piano.Glyphs.blackKey.canvas,
    c = Piano.Glyphs.whiteKey.canvas,
    e = c.width + 1;
  b(52, [0, 2, 3, 5, 7, 8, 10], "white", 14);
  b(36, [1, 4, 6, 9, 11], "black", 14 + c.width - a.width / 2);
};

Piano.mouseIsActive = !1;
Piano.mousePlay = function (b, a) {
  var c = parseInt(b);
  Piano.inversion = 0;
  Piano.mouseIsActive = !0;
  Piano.clearNotes();
  a.shiftKey ? Piano.chordOn(c) : Piano.noteOn(c);
};

Piano.mouseStop = function (b, a) {
  var c = parseInt(a);
  b.shiftKey ? (Piano.clearNotes(), Piano.chordOff(c)) : Piano.noteOff(c);
};

Piano.mouseUp = function (b) {
  var a = this.name || getNote(this, b);
  Piano.mouseIsActive = !1;
  Piano.mouseStop(b, a);
};
Piano.mouseDown = function (b) {
  var a = this.name || getNote(this, b);
  Piano.mousePlay(a, b);
};
Piano.mouseOver = function (b) {
  if (!1 != Piano.mouseIsActive)
    if ("undefined" == typeof this.name) {
      var a = getNote(this, b);
      this.currentNote !== a &&
        ((this.currentNote = a), Piano.mouseStop(b, this.currentNote), Piano.mousePlay(a, b));
    } else Piano.mousePlay(this.name, b);
};

Piano.mouseOut = function (b) {
  if (Piano.mouseIsActive) {
    var a = this.name || getNote(this, b);
    Piano.mouseStop(b, a);
  }
};

var getNote = function (b, a) {
  var c = Event.proxy.getCoord(a),
    e = Event.proxy.getBoundingBox(b),
    c = ((c.x - e.x1) / (Piano.Glyphs.whiteKey.canvas.width + 1)) >> 0,
    e = c % 7,
    d = 0;
  0 < e && (d += 1);
  2 < e && (d += 1);
  3 < e && (d += 1);
  5 < e && (d += 1);
  return c + (d + 5 * ((c / 7) >> 0));
};

Piano.songViewToggle = function (b) {
  "postview" === Piano.visualize
    ? ((b.id = "view-theory"), (b.title = "Music Theory Mode"), MIDI.UI.enableSongView())
    : ((b.id = "view-song"), (b.title = "Piano Player Mode"), MIDI.UI.enableTheoryView());
};

Piano.files = (function () {
  for (var b = {}, a = MIDI_FILES.split(";"), c = 0; c < a.length; c++) b[a[c]] = null;
  return b;
})();

Piano.fileBrowserKeyboard = function (b) {
  27 === b.keyCode && Piano.fileBrowserToggle();
};

Piano.fileBrowserToggle = function () {
  var b = document.getElementById("file-browser");
  0 !== parseInt(b.style.opacity)
    ? ((b.style.opacity = 0),
      setTimeout(function () {
        b.style.display = "none";
      }, 500),
      Event.remove(document, "keydown", Piano.fileBrowserKeyboard))
    : ((b.style.display = "block"),
      setTimeout(function () {
        b.style.opacity = 1;
      }, 1),
      Event.add(document, "keydown", Piano.fileBrowserKeyboard),
      b.getElementsByTagName("input")[0].focus(),
      Piano.fileBrowserUpdate());
};

Piano.fileBrowser = function () {
  function b(a, b) {
    var c = a.parentNode.getElementsByClassName("selected");
    if (c) for (var d = 0; d < c.length; d++) c[d].className = "";
    a.className = "selected";
    c = a.getAttribute("data-src");
    if (-1 !== c.indexOf(".mid")) {
      d = c.split("/").pop().replaceAll("%20", " ");
      loader.message("loading: " + d);
      var e = MIDI.Player.playing;
      e && MIDI.UI.togglePlayer();
      Piano.midifile = c;
      Piano.loadFile(Piano.midifile, function () {
        e && MIDI.UI.togglePlayer();
        Piano.Animation.scrollTop = 0;
        Piano.fileBrowserToggle();
        MIDI.Player.renderScreen();
        b && b(Piano.midifile);
        loader.stop();
      });
    }
  }
  Piano.fileBrowserUpdate = function (a) {
    a = (a || "").toLowerCase().trim();
    var c = k.getElementsByTagName("div"),
      d = -1,
      e = !!c.length,
      n = 0,
      r;
    for (r in Piano.files) {
      d++;
      var q = r.replace(".mid", ""),
        p = a && 0 > r.toLowerCase().indexOf(a);
      e && (p ? (c[d].style.display = "none") : ((c[d].style.display = "block"), n++, (p = !0)));
      Piano.midifile &&
        q === Piano.midifile.replace(".mid", "") &&
        c[d] &&
        (c[d].className = "selected");
      p ||
        (n++,
        (p = document.createElement("div")),
        k.appendChild(p),
        (p.onclick = function (a) {
          Event.cancel(a);
          b(this);
        }),
        p.setAttribute("data-src", r),
        (p.innerHTML = q.replace(" - ", "&mdash;")),
        (q = document.createElement("a")),
        (q.onclick = function (a) {
          Event.cancel(a);
          b(this.parentNode, function (a) {
            fileSaver.html5 &&
              fileSaver.download({
                name: a.replace(".mid", ""),
                extension: "midi",
                getData: function () {
                  var b = Piano.files[a].split(",").pop();
                  return window.atob(b);
                },
              });
          });
        }),
        (q.innerHTML = "download"),
        p.appendChild(q));
    }
    c[c.length - 1].style.display = n ? "none" : "block";
    e ||
      ((p = document.createElement("div")),
      (p.style.height = window.innerHeight - 40 + "px"),
      (p.style.background = "#eee"),
      (p.style.color = "#000"),
      (p.style.cursor = "default"),
      (p.style.display = "none"),
      (p.innerHTML = "No results..."),
      k.appendChild(p));
  };
  var a = document.body,
    c = document.createElement("div");
  c.id = "file-browser";
  c.style.cssText = "display: none; opacity: 0";
  c.style.width = window.innerWidth + "px";
  c.style.height = window.innerHeight + "px";
  var e = document.createElement("img");
  e.onclick = Piano.fileBrowserToggle;
  e.style.cssText = "position: fixed; top: 8px; right: 7px; z-index: 2; cursor: pointer";
  e.src = "./media/close.png";
  c.appendChild(e);
  e = document.createElement("input");
  e.placeholder = "Enter your search here...";
  var d = 0;
  e.onkeyup = e.onkeypress = e.onkeydown = function (a) {
    var b = this;
    Event.stop(a);
    27 === a.keyCode && this.blur();
    "keyup" === a.type &&
      (window.clearTimeout(d),
      (d = window.setTimeout(function () {
        Piano.fileBrowserUpdate(b.value);
      }, 150)));
  };
  c.appendChild(e);
  var k = document.createElement("div");
  k.style.cssText = "position: relative; top: 65px";
  c.appendChild(k);
  a.appendChild(c);
  Event.add(c, "mousewheel", Event.stop);
  Piano.fileBrowserUpdate();
};
