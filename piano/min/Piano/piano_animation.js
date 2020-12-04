"undefined" === typeof Piano && (Piano = {});
var root = (Piano.Animation = (function () {
  var b = {},
    a = 0,
    c = 0,
    e = this,
    d = MIDI.Player;
  this.tCurrent = this.animateInterval = this.scrollTop = 0;
  this.animate = function (b, m) {
    c++;
    Piano.notesPlaying && (c = 0);
    if (Piano.notesPlaying || !(150 < c) || b)
      if ("preview" === Piano.visualize && d.replayer) {
        if (d.playing || b)
          (this.scrollTop = 0),
            e.tCurrent === d.currentTime && 0 !== a && (this.scrollTop = a - new Date().getTime()),
            (this.scrollTop = d.currentTime - this.scrollTop),
            d.renderScreen(!0),
            e.tCurrent !== d.currentTime &&
              ((a = new Date().getTime()), (e.tCurrent = d.currentTime));
      } else {
        var g = e.postview2d;
        if (b) {
          var f = document.getElementById("note" + b);
          f &&
            (m
              ? -1 === f.className.indexOf("force") && (f.className += " force")
              : (f.className = f.className.replace("force", "").trim()));
        } else {
          e.preview2d.drawImage(g.canvas, 0, 0);
          var f = Piano.notes,
            l;
          for (l in f)
            if (f[l].isOn) {
              var n = l;
              if (Piano.blackKeys[n % 12]) {
                var r = 14;
                e.preview2d.globalCompositeOperation = "source-over";
              } else
                (r = Piano.width / 53), (e.preview2d.globalCompositeOperation = "destination-over");
              if (Piano.colorMap[n]) {
                var q = Piano.colorMap[n].hsl;
                q &&
                  ((e.preview2d.fillStyle = q),
                  e.preview2d.fillRect(Piano.keys[n] + 1 + Piano.offsetLeft - 1, 0, r, 2));
              }
            }
          f = g.canvas;
          g.clearRect(0, 0, f.width, f.height);
          g.drawImage(e.preview2d.canvas, 0, 0, f.width, f.height, 0, 2, f.width, f.height);
          e.preview2d.clearRect(0, 0, f.width, f.height);
        }
      }
  };
  this.boot = function () {
    var a = !1,
      c = 0;
    window.clearInterval(root.animateInterval);
    if (!b.preview) {
      Event.add(document.body, "mousewheel", function (b) {
        b = b ? b : window.event;
        var f = d.endTime;
        d.currentTime += 150 * (b.detail ? -1 * b.detail : b.wheelDelta / 40);
        d.currentTime = Math.max(-Piano.width, d.currentTime);
        d.currentTime = Math.min(f, d.currentTime);
        d.restart = Math.max(0, Math.min(f, d.currentTime));
        c || ((a = d.playing), d.pause(), Piano.clearNotes());
        window.clearInterval(c);
        c = window.setInterval(function () {
          window.clearInterval(c);
          c = 0;
          a && Piano.resume();
        }, 150);
        e.animate(!0);
        Piano.genTimeCursor && Piano.genTimeCursor();
        Event.stop(b);
        Event.prevent(b);
      });
      var g = document.getElementById("container"),
        f = document.createElement("div");
      f.style.cssText =
        "position: absolute; background: #000; z-index: 1000; left: 0; top: 103px; overflow: hidden";
      f.appendChild(CanvasRender[0]);
      f.appendChild(CanvasRender[1]);
      f.appendChild(CanvasRender.overlay);
      g.appendChild(f);
      var l = CanvasRender.overlay.parentNode;
      Event.add(l, "mousedown", function (b) {
        var c = Event.proxy.getCoord(b).y;
        Event.proxy.drag({
          target: l,
          position: "absolute",
          event: b,
          listener: function (b, f) {
            if ("up" === f.state && a) return Piano.resume();
            if ("down" === f.state) return (a = d.playing), d.pause();
            var g = d.endTime;
            d.currentTime -= 50 * (f.y - c);
            d.currentTime = Math.max(-Piano.width, d.currentTime);
            d.currentTime = Math.min(g, d.currentTime);
            d.restart = Math.max(0, Math.min(g, d.currentTime));
            c = f.y;
            e.animate(!0);
            Piano.genTimeCursor();
          },
        });
      });
      b.preview = f;
    }
    b.postview ||
      ((f = document.createElement("div")),
      (g = document.createElement("canvas")),
      g.setAttribute("style", "position: absolute; top: 98px"),
      (g.width = canvas.bg.width),
      (g.height = 300),
      f.appendChild(g),
      (e.postview2d = g.getContext("2d")),
      (g = canvas.animate),
      g.setAttribute("style", "position: absolute; top: 98px"),
      (g.width = canvas.bg.width),
      (g.height = 300),
      (e.preview2d = canvas.animate.getContext("2d")),
      g.setAttribute(
        "style",
        "border-radius: 10px; position: absolute; top: 98px; width: " +
          canvas.bg.width +
          "px; height: 300px"
      ),
      (g.className = "gradient"),
      f.appendChild(g),
      document.getElementById("container").appendChild(f),
      (b.postview = f));
    switch (Piano.visualize) {
      case "preview":
        b.postview && (b.postview.style.display = "none");
        b.musicbox && (musicbox.preview.style.display = "none");
        f = window.innerHeight - Event.proxy.getBoundingBox(b.preview).y1;
        b.preview.style.display = "block";
        b.preview.style.width = "990px";
        b.preview.style.height = f + "px";
        e.animate(!0);
        break;
      case "postview":
        b.preview && (b.preview.style.display = "none");
        b.musicbox && (musicbox.preview.style.display = "none");
        b.postview.style.display = "block";
        break;
      case "musicbox":
        b.postview && (b.postview.style.display = "none"),
          b.preview && (b.preview.style.display = "none"),
          b.musicbox || (MusicBox.init(), (b.musicbox = {}));
    }
  };
  this.callback = this.animate;
  return this;
})());
