"undefined" === typeof localStorage && (localStorage = {});
if ("undefined" === typeof Piano) var Piano = {};
"undefined" === typeof MIDI && (MIDI = { Player: {} });
var loader,
  canvas = {},
  host =
    "chrome-extension:" === window.location.protocol
      ? "chrome-extension://" + window.location.host
      : "https://galactic.ink/piano";

(function (b) {
  Piano.width = 990;
  Piano.chordLock = !1;
  Piano.interval = 0;
  Piano.scaleObj = [];
  Piano.keySignature = [];
  Piano.notes = {};
  Piano.blackKeys = { 1: !0, 4: !0, 6: !0, 9: !0, 11: !0 };
  Piano.channel = 0;
  Piano.tempo = 250;
  Piano.inversion = 0;
  Piano.key = 3;
  Piano.octave = 3;
  Piano.HSL = localStorage.HSL || "D. D. Jameson (1844)";
  Piano.instrument = "Piano";
  Piano.chord = "Major";
  Piano.scale = "Aeolian";
  Piano.keys = [];
  Piano.offsetLeft = -14;
  Piano.timeWarp = parseFloat(localStorage.timeWarp || 1);
  Piano.labelKey = !0;
  Piano.visualize = localStorage.visualize || "preview";
  Piano.labelType = "signature";
  Piano.setAnimation = function () {};
  Piano.MIDIPlayerPercentage = function () {
    function a(b) {
      var d = (b / 60) >> 0;
      b = String((b - 60 * d) >> 0);
      1 == b.length && (b = "0" + b);
      return d + ":" + b;
    }
    var b = MIDI.Player,
      d = document.getElementById("capsule"),
      k = document.getElementById("cursor"),
      m = document.getElementById("time2");
    Event.add(d, "drag", function (a, d) {
      var c = MIDI.Player.endTime;
      b.currentTime = (d.x / 220) * c;
      b.currentTime = Math.max(-Piano.width, b.currentTime);
      b.currentTime = Math.min(c, b.currentTime);
      b.restart = Math.max(0, Math.min(c, b.currentTime));
      "down" === d.state
        ? ((isPlaying = b.playing), b.pause())
        : "up" === d.state && isPlaying && Piano.resume();
      Piano.Animation.animate(!0);
      Piano.genTimeCursor();
    });
    Piano.genTimeCursor = function () {
      var b = MIDI.Player.endTime,
        d = MIDI.Player.currentTime,
        e = d / 1e3,
        n = e / 60;
      k.style.width = 100 * (d / b) + "%";
      m.innerHTML = "-" + a(b / 1e3 - (60 * n + (e - 60 * n)));
    };
    Piano.setAnimation = function () {
      b.clearAnimation();
      b.setAnimation(function (b, d) {
        var e = b.now >> 0,
          n = b.end >> 0;
        k.style.width = 100 * (b.now / b.end) + "%";
        m.innerHTML = "-" + a(n - e);
        Piano.Animation.animate();
      });
    };
    Piano.genTimeCursor();
    MIDI.UI.enableView();
  };
  Piano.getNextSong = function (a) {
    var b = MIDI.Player;
    a = Math.abs((Piano.fileID += a) % Piano.filesArray.length);
    a = Piano.filesArray[a];
    var d = a.split("/").pop().replaceAll("%20", " "),
      k = MIDI.Player.playing;
    loader.update(null, "&lt;loading&gt;<br>" + d);
    Piano.loadFile(a, function (a) {
      Piano.Animation.scrollTop = 0;
      Piano.setAnimation();
      b.renderScreen();
      loader.stop();
      k && (MIDI.UI.togglePlayer(!0), b.resume());
    });
  };
  Piano.loadPlugin = function () {
    MIDI.loadPlugin(function () {
      var b = 0,
        e = {},
        d;
      for (d in Piano.files) (e[b] = d), b++;
      if ("#http" === window.location.hash.substr(0, 5))
        Piano.loadExternalMIDI(window.location.hash.substr(1));
      else {
        if ("#random" === window.location.hash) Piano.midifile = e[(Math.random() * b) >> 0];
        else if (
          ((Piano.midifile = localStorage.midifile),
          !Piano.midifile || (!Piano.files[Piano.midifile] && null !== Piano.files[Piano.midifile]))
        )
          Piano.midifile = "Tchaikovsky - Dance of the Reed Flutes (Nutcracker).mid";
        Piano.loadFile(Piano.midifile, function () {
          Piano.play();
          Piano.MIDIPlayerPercentage(MIDI.Player);
          a();
        });
      }
      "Java" == MIDI.lang && (MIDI.setVolume(Piano.channel, 100), Piano.drawInstruments());
      document.getElementById("control-play").onclick = MIDI.UI.togglePlayer;
      document.getElementById("control-backward").onclick = function () {
        Piano.getNextSong(-1);
      };
      document.getElementById("control-forward").onclick = function () {
        Piano.getNextSong(1);
      };
      MIDI.UI.drawTimeWarp();
      MIDI.UI.drawSynesthesia();
      Piano.filesArray = [];
      for (d in Piano.files)
        d === Piano.midifile && (Piano.fileID = Piano.filesArray.length), Piano.filesArray.push(d);
    });
  };
  Piano.loadFile = function (a, e) {
    b.clearNotes();
    if (a) (b.midifile = a), Piano.loadExternalMIDI(b.midifile, e, host + "/audio/");
    else if (!MIDI.Player.replayer) {
      var d = Piano.files[b.midifile];
      MIDI.Player.loadFile(d, function (a) {
        var b = d.split(" - ")[1] || d;
        document.getElementById("playback-title").innerHTML = b.replace(".mid", "");
        e && e(a);
      });
      MIDI.Player.stop();
      b.clearNotes();
      b.Animation.callback(!0);
    }
  };
  Piano.loadExternalMIDI = function (c, e, d) {
    Piano.loadExternalMIDICallback = function (d) {
      Piano.files[m] = d;
      MIDI.Player.loadFile(d, function (d) {
        d = d.split(" - ")[1] || c;
        document.getElementById("playback-title").innerHTML = d.replace(".mid", "");
        localStorage.setItem("midifile", m);
        window.requestFileSystem &&
          Piano.files[m] &&
          filer.write("/audio/" + m.replace(".midi", "").replace(".mid", ""), {
            data: Piano.files[m],
            type: "txt",
          });
        if ((d = document.getElementById("tools"))) d.parentNode.style.display = "none";
        loader && loader.stop();
        e && e();
        b.clearNotes();
        a();
      });
    };
    var k = function () {
      loader.update(null, "&lt;downloading&gt;<br>" + f);
      Piano.files[m]
        ? Piano.loadExternalMIDICallback(Piano.files[m])
        : null === Piano.files[m]
        ? "chrome-extension:" === window.location.protocol
          ? Piano.loadExternalMIDICallback(host + "/audio/" + m)
          : DOMLoader.script.add({
              // src: "https://galactic.ink/piano/midi-to-json.php?query=" + encodeURIComponent(m),
              src: "/cgi-bin/midi-to-json.py?query=" + encodeURIComponent(m),
            })
        : DOMLoader.script.add({ src: "https://midi-to-json.appspot.com/" + g.split("//")[1] });
    };
    c || (c = document.getElementById("load-external-midi").value);
    e || (e = Piano.play);
    var m = c.basename(),
      g = decodeURIComponent(d + c),
      f = g.split(" - ")[1] || g;
    "http" !== g.substr(0, 4) && (g = "http://" + g);
    document.getElementById("playback-title").innerHTML = f
      .replace(".midi", "")
      .replace(".mid", "");
    if (window.requestFileSystem)
      return filer.ls("/audio", function (a) {
        for (var b = m.replace(".midi", "").replace(".mid", ""), d = 0; d < a.length; d++)
          if (a[d].name === b)
            return filer.open("/audio/" + a[d].name, function (a) {
              var b = new FileReader();
              b.onload = function (b) {
                b = b.target.result;
                Piano.files[m] = b;
                localStorage.setItem("midifile", m);
                b = window.atob(b.split(",").pop());
                var d = MIDI.Player.playing;
                MIDI.Player.stop();
                MIDI.Player.loadFile(b, function () {
                  var b = a.name;
                  document.getElementById("playback-title").innerHTML = b.replace(".mid", "");
                  e && e();
                  d && MIDI.Player.start();
                  Piano.play();
                  loader.stop();
                });
              };
              b.readAsDataURL(a);
            });
        k();
      });
    k();
  };
  var a = function () {
    DOM.dimensions();
    var a = window.innerHeight;
    Piano.height = a - 103 - 50;
    document.body.style.height = a + "px";
    "undefined" === typeof CanvasRender &&
      ((CanvasRender = {}),
      (CanvasRender[0] = document.createElement("canvas")),
      (CanvasRender[1] = document.createElement("canvas")),
      (CanvasRender.overlay = document.createElement("canvas")),
      Piano.debug &&
        ((CanvasRender[0].style.background = "rgba(0,0,255,0.25)"),
        (CanvasRender[1].style.background = "rgba(255,0,0,0.25)")));
    var a = Piano.height,
      b = Piano.width;
    CanvasRender.overlay.width = b;
    CanvasRender.overlay.height = a;
    CanvasRender[0].id = "render0";
    CanvasRender[0].width = b;
    CanvasRender[0].height = a;
    CanvasRender[1].width = b;
    CanvasRender[1].height = a;
    CanvasRender[1].id = "render1";
    "undefined" !== typeof MIDI.Player.replayer && Piano.Animation.boot();
    MIDI.Player.renderScreen();
    a = CanvasRender.overlay.getContext("2d");
    for (b = 0; 88 > b; b++)
      a.beginPath(),
        a.moveTo(88 * Piano.stretchX - b * Piano.stretchX + 0.5, 0),
        a.lineTo(88 * Piano.stretchX - b * Piano.stretchX + 0.5, CanvasRender[0].height),
        (a.strokeStyle = 0 == (b + 5) % 7 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.1)"),
        a.stroke();
    if ((a = document.getElementById("file-browser")))
      (a.style.height = window.innerHeight + "px"), (a.style.width = window.innerWidth + "px");
  };
  Event.add("body", "ready", function () {
    /* var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://chrome.google.com/webstore/widget/developer/scripts/widget.js";
    document.head.appendChild(script); */
    Event.add(".tools", "mousedown", function (a) {
      MIDI.UI.enableConfigure(!1);
    });
    Event.add("#tools", "mousedown", function (a) {
      Event.stop(a);
    });
    Event.add("#tempo-from-tap", "mousedown", function (a) {
      MusicTheory.tempoFromTap(this);
    });
    Event.add("#playback-title", "click", Piano.fileBrowserToggle);
    Event.add("#theory img", "click", function (a) {
      Piano.func();
    });
    Event.add("#open", "click", Piano.fileBrowserToggle);
    Event.add("#view-song", "click", function (a) {
      Piano.songViewToggle(this);
    });
    Event.add("#configure", "click", function (a) {
      MIDI.UI.enableConfigure(!0);
    });
    Event.add("#find-chord", "click", function (a) {
      MusicTheory.findChord(Piano.chords.tri);
    });
    Event.add("#load-external-midi", "click", Piano.loadExternalMIDI);
    "undefined" !== typeof widgets.Loader && (MIDI.loader = loader = new widgets.Loader());
    a();
    MIDI.Player.timeWarp = Piano.timeWarp;
    var link = document.createElement("link");
    link.href = "../cdn/fonts.googleapis/andada/andada.css"; /* "https://fonts.googleapis.com/css?family=Andada"; */
    link.rel = "stylesheet";
    link.type = "text/css";
    document.getElementsByTagName("head")[0].appendChild(link);
    var container = document.getElementById("container");
    Event.add(container, "contextmenu", function (a) {
      Event.prevent(a);
    });
    canvas.animate = document.getElementById("animate");
    canvas.bg = document.getElementById("piano_bg");
    canvas.black = document.getElementById("black_keys").getContext("2d");
    canvas.white = document.getElementById("white_keys").getContext("2d");
    canvas.bg.height = Piano.Glyphs.whiteKey.canvas.height + 23;
    MusicTheory.getKeySignature("C");
    Piano.loadPlugin();
    Piano.colorMap = MusicTheory.Synesthesia.map(Piano.HSL);
    Piano.drawKeyboard();
    MIDI.UI.enableView(!0);
    MIDI.Player.addListener(function (a) {
      var b = a.note - Piano.MIDINoteOffset,
        c = 144 === a.message;
      Piano.trackNote(a.channel, b, c);
      Piano.drawKeyLabel(b, c);
      Piano.Animation.callback(b, c);
    });
    Piano.uploader = new widgets.Uploader({
      callback: function (a, b, c) {
        if (b) {
          for (var m in b);
          if (b[m]) {
            a = MIDI.Player.playing;
            var g = b[m].src;
            MIDI.Player.stop();
            MIDI.Player.loadFile(g, function (a) {
              var b = g.split(" - ")[1] || g;
              document.getElementById("playback-title").innerHTML = b.replace(".mid", "");
              callback && callback(a);
            });
            a && window.setTimeout(MIDI.Player.start, 100);
          }
        }
      },
      formats: { "audio/mid": !0, "audio/midi": !0 },
    });
    Piano.fileBrowser();
    fileSaver = new widgets.FileSaver();
    filer = new Filer();
    window.requestFileSystem &&
      filer.init(
        { persistent: !1, size: 104857600 },
        function (a) {
          filer.pathToFilesystemURL("/");
          filer.mkdir("./soundfont");
          filer.mkdir("./audio");
        },
        function (a) {
          window.requestFileSystem = !1;
        }
      );
  });
  Event.add(window, "resize", a);
  Event.add(window, "beforeunload", function () {
    MIDI.closePlugin && MIDI.closePlugin();
  });
  Event.add(window, "mousewheel", function (a) {
    Event.stop(a);
    Event.prevent(a);
  });
  Event.add(window, "keyup", function (a) {
    switch (a.keyCode) {
      case 32:
        if (!MIDI.Player.replayer) break;
        Event.prevent(a);
        MIDI.UI.togglePlayer();
        break;
      case 37:
        Event.prevent(a);
        Piano.getNextSong(-1);
        break;
      case 39:
        Event.prevent(a), Piano.getNextSong(1);
    }
  });
  b.MIDINoteOffset = 21;
})(Piano);
