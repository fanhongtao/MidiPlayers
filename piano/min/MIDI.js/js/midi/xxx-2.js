"undefined" === typeof MIDI && (MIDI = {});
"undefined" === typeof MIDI.Soundfont && (MIDI.Soundfont = {});
(function () {
  MIDI.loadPlugin = function (d) {
    "function" === typeof d && (d = { callback: d });
    var c = d.instruments || d.instrument || "acoustic_grand_piano";
    "object" !== typeof c && (c = [c]);
    for (var e = 0; e < c.length; e++) {
      var f = c[e];
      "number" === typeof f && (c[e] = MIDI.GeneralMIDI.byId[f]);
    }
    MIDI.soundfontUrl = d.soundfontUrl || MIDI.soundfontUrl || "./soundfont/";
    MIDI.audioDetect(function (e) {
      var f = "",
        f = a[d.api]
          ? d.api
          : a[window.location.hash.substr(1)]
          ? window.location.hash.substr(1)
          : window.webkitAudioContext || window.AudioContext
          ? "webaudio"
          : window.Audio
          ? "audiotag"
          : "flash";
      if (b[f]) {
        var r = d.targetFormat ? d.targetFormat : e["audio/ogg"] ? "ogg" : "mp3";
        MIDI.lang = f;
        MIDI.supports = e;
        b[f](r, c, d);
      }
    });
  };
  var b = {
      webmidi: function (a, d, c) {
        MIDI.loader && MIDI.loader.message("Web MIDI API...");
        MIDI.WebMIDI.connect(c);
      },
      flash: function (a, d, c) {
        MIDI.loader && MIDI.loader.message("Flash API...");
        DOMLoader.script.add({
          src: c.soundManagerUrl || "./inc/SoundManager2/script/soundmanager2.js",
          verify: "SoundManager",
          callback: function () {
            MIDI.Flash.connect(d, c);
          },
        });
      },
      audiotag: function (a, b, g) {
        MIDI.loader && MIDI.loader.message("HTML5 Audio API...");
        var f = d({
          items: b,
          getNext: function (d) {
            DOMLoader.sendRequest({
              url: MIDI.soundfontUrl + d + "-" + a + ".js",
              onprogress: e,
              onload: function (a) {
                c(a.responseText);
                MIDI.loader && MIDI.loader.update(null, "Downloading", 100);
                f.getNext();
              },
            });
          },
          onComplete: function () {
            MIDI.AudioTag.connect(g);
          },
        });
      },
      webaudio: function (a, b, g) {
        MIDI.loader && MIDI.loader.message("Web Audio API...");
        var f = d({
          items: b,
          getNext: function (d) {
            DOMLoader.sendRequest({
              url: MIDI.soundfontUrl + d + "-" + a + ".js",
              onprogress: e,
              onload: function (a) {
                c(a.responseText);
                MIDI.loader && MIDI.loader.update(null, "Downloading...", 100);
                f.getNext();
              },
            });
          },
          onComplete: function () {
            MIDI.WebAudio.connect(g);
          },
        });
      },
    },
    a = { webmidi: !0, webaudio: !0, audiotag: !0, flash: !0 },
    c = function (a) {
      var d = document.createElement("script");
      d.language = "javascript";
      d.type = "text/javascript";
      d.text = a;
      document.body.appendChild(d);
    },
    e = function (a) {
      this.totalSize ||
        (this.getResponseHeader("Content-Length-Raw")
          ? (this.totalSize = parseInt(this.getResponseHeader("Content-Length-Raw")))
          : (this.totalSize = a.total));
      a = this.totalSize ? Math.round(100 * (a.loaded / this.totalSize)) : "";
      MIDI.loader && MIDI.loader.update(null, "Downloading...", a);
    },
    d = function (a) {
      var d = { queue: [] },
        c;
      for (c in a.items) d.queue.push(a.items[c]);
      d.getNext = function () {
        if (!d.queue.length) return a.onComplete();
        a.getNext(d.queue.shift());
      };
      setTimeout(d.getNext, 1);
      return d;
    };
})();
