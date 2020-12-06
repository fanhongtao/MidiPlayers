"undefined" === typeof MIDI && (MIDI = {});
"undefined" === typeof MIDI.Soundfont && (MIDI.Soundfont = {});
(function () {
  MIDI.loadPlugin = function (conf) {
    "function" === typeof conf && (conf = { callback: conf });
    var instruments = conf.instruments || conf.instrument || "acoustic_grand_piano";
    "object" !== typeof instruments && (instruments = [instruments]);
    for (var n = 0; n < instruments.length; n++) {
      var instrument = instruments[n];
      "number" === typeof instrument && (instruments[n] = MIDI.GeneralMIDI.byId[instrument]);
    }
    MIDI.soundfontUrl = conf.soundfontUrl || MIDI.soundfontUrl || "./soundfont/";
    MIDI.audioDetect(function (types) {
      var api = "",
        api = apis[conf.api]
          ? conf.api
          : apis[window.location.hash.substr(1)]
          ? window.location.hash.substr(1)
          : window.webkitAudioContext || window.AudioContext
          ? "webaudio"
          : window.Audio
          ? "audiotag"
          : "flash";
      if (connect[api]) {
        var filetype = conf.targetFormat ? conf.targetFormat : types["audio/ogg"] ? "ogg" : "mp3";
        MIDI.lang = api;
        MIDI.supports = types;
        connect[api](filetype, instruments, conf);
      }
    });
  };
  var connect = {
      webmidi: function (filetype, instruments, conf) {
        MIDI.loader && MIDI.loader.message("Web MIDI API...");
        MIDI.WebMIDI.connect(conf);
      },
      flash: function (filetype, instruments, conf) {
        MIDI.loader && MIDI.loader.message("Flash API...");
        DOMLoader.script.add({
          src: conf.soundManagerUrl || "./inc/SoundManager2/script/soundmanager2.js",
          verify: "SoundManager",
          callback: function () {
            MIDI.Flash.connect(instruments, conf);
          },
        });
      },
      audiotag: function (filetype, instruments, conf) {
        MIDI.loader && MIDI.loader.message("HTML5 Audio API...");
        var queue = createQueue({
          items: instruments,
          getNext: function (instrumentId) {
            DOMLoader.sendRequest({
              url: MIDI.soundfontUrl + instrumentId + "-" + filetype + ".js",
              onprogress: getPercent,
              onload: function (response) {
                addSoundfont(response.responseText);
                MIDI.loader && MIDI.loader.update(null, "Downloading", 100);
                queue.getNext();
              },
            });
          },
          onComplete: function () {
            MIDI.AudioTag.connect(conf);
          },
        });
      },
      webaudio: function (filetype, instruments, conf) {
        MIDI.loader && MIDI.loader.message("Web Audio API...");
        var queue = createQueue({
          items: instruments,
          getNext: function (instrumentId) {
            DOMLoader.sendRequest({
              url: MIDI.soundfontUrl + instrumentId + "-" + filetype + ".js",
              onprogress: getPercent,
              onload: function (response) {
                addSoundfont(response.responseText);
                MIDI.loader && MIDI.loader.update(null, "Downloading...", 100);
                queue.getNext();
              },
            });
          },
          onComplete: function () {
            MIDI.WebAudio.connect(conf);
          },
        });
      },
    },
    apis = { webmidi: true, webaudio: true, audiotag: true, flash: true },
    addSoundfont = function (text) {
      var script = document.createElement("script");
      script.language = "javascript";
      script.type = "text/javascript";
      script.text = text;
      document.body.appendChild(script);
    },
    getPercent = function (event) {
      this.totalSize ||
        (this.getResponseHeader("Content-Length-Raw")
          ? (this.totalSize = parseInt(this.getResponseHeader("Content-Length-Raw")))
          : (this.totalSize = event.total));
      var percent = this.totalSize ? Math.round(100 * (event.loaded / this.totalSize)) : "";
      MIDI.loader && MIDI.loader.update(null, "Downloading...", percent);
    },
    createQueue = function (conf) {
      var self = { queue: [] };
      for (var key in conf.items) self.queue.push(conf.items[key]);
      self.getNext = function () {
        if (!self.queue.length) return conf.onComplete();
        conf.getNext(self.queue.shift());
      };
      setTimeout(self.getNext, 1);
      return self;
    };
})();
