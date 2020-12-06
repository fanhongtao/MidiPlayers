"undefined" === typeof MIDI && (MIDI = {});
"undefined" === typeof MIDI.Player && (MIDI.Player = {});
(function () {
  var root = MIDI.Player;
  root.callback = undefined;
  root.currentTime = 0;
  root.endTime = 0;
  root.restart = 0;
  root.playing = false;
  root.timeWarp = 1;
  root.start = root.resume = function () {
    -1 > root.currentTime && (root.currentTime = -1);
    startAudio(root.currentTime);
  };
  root.pause = function () {
    var tmp = root.restart;
    stopAudio();
    root.restart = tmp;
  };
  root.stop = function () {
    stopAudio();
    root.restart = 0;
    root.currentTime = 0;
  };
  root.addListener = function (callback) {
    onMidiEvent = callback;
  };
  root.removeListener = function () {
    onMidiEvent = undefined;
  };
  root.clearAnimation = function () {
    root.interval && window.clearInterval(root.interval);
  };
  root.setAnimation = function (config) {
    var callback = "function" === typeof config ? config : config.callback;
    var interval = config.interval || 30;
    var currentTime = 0,
      tOurTime = 0,
      tTheirTime = 0;
    root.clearAnimation();
    root.interval = window.setInterval(function () {
      if (0 !== root.endTime) {
        root.playing
          ? ((currentTime = tTheirTime === root.currentTime ? tOurTime - new Date().getTime() : 0),
            (currentTime = 0 === root.currentTime ? 0 : root.currentTime - currentTime),
            tTheirTime !== root.currentTime && ((tOurTime = new Date().getTime()), (tTheirTime = root.currentTime)))
          : (currentTime = root.currentTime);
        var total = currentTime / 1000,
          minutes = total / 60,
          t1 = 60 * minutes + (total - 60 * minutes),
          t2 = root.endTime / 1000;
        -1 > t2 - t1 || callback({ now: t1, end: t2, events: noteRegistrar });
      }
    }, interval);
  };
  root.loadMidiFile = function () {
    root.replayer = new Replayer(MidiFile(root.currentData), root.timeWarp);
    root.data = root.replayer.getData();
    root.endTime = getLength();
  };
  root.loadFile = function (file, callback) {
    root.stop();
    if (-1 !== file.indexOf("base64,")) {
      var data = window.atob(file.split(",")[1]);
      root.currentData = data;
      root.loadMidiFile();
      callback && callback(data);
    } else
      (fetch = new XMLHttpRequest()),
        fetch.open("GET", file),
        fetch.overrideMimeType("text/plain; charset=x-user-defined"),
        (fetch.onreadystatechange = function () {
          if (4 === this.readyState && 200 === this.status) {
            for (
              var t = this.responseText || "", ff = [], mx = t.length, scc = String.fromCharCode, z = 0;
              z < mx;
              z++
            )
              ff[z] = scc(t.charCodeAt(z) & 255);
            var data = ff.join("");
            root.currentData = data;
            root.loadMidiFile();
            callback && callback(data);
          }
        }),
        fetch.send();
  };
  var eventQueue = [],
    queuedTime,
    startTime = 0,
    noteRegistrar = {},
    onMidiEvent = undefined,
    scheduleTracking = function (channel, note, currentTime, offset, message, velocity) {
      return window.setTimeout(function () {
        var data = { channel: channel, note: note, now: currentTime, end: root.endTime, message: message, velocity: velocity };
        128 === message ? delete noteRegistrar[note] : (noteRegistrar[note] = data);
        onMidiEvent && onMidiEvent(data);
        root.currentTime = currentTime;
        root.currentTime === queuedTime && queuedTime < root.endTime && startAudio(queuedTime, true);
      }, currentTime - offset);
    },
    getContext = function () {
      if ("WebAudioAPI" === MIDI.lang) return MIDI.Player.ctx;
      root.ctx || (root.ctx = { currentTime: 0 });
      return root.ctx;
    },
    getLength = function () {
      for (var data = root.data, length = data.length, totalTime = 0.5, n = 0; n < length; n++) totalTime += data[n][1];
      return totalTime;
    },
    startAudio = function (currentTime, fromCache) {
      if (root.replayer) {
        fromCache ||
          ("undefined" === typeof currentTime && (currentTime = root.restart),
          root.playing && stopAudio(),
          (root.playing = true),
          (root.data = root.replayer.getData()),
          (root.endTime = getLength()));
        var note,
          offset = 0,
          messages = 0,
          data = root.data,
          ctx = getContext(),
          length = data.length;
        queuedTime = 0.5;
        startTime = ctx.currentTime;
        for (var B = 0; B < length; B++)
          if (((l = data[B]), (l = l[1] || 1e-11), queuedTime + l <= currentTime)) offset = queuedTime += l;
          else break;
        for (; B < length && 100 > messages; B++) {
          l = data[B];
          queuedTime += l[1] || 1e-11;
          currentTime = queuedTime - offset;
          var event = l[0].event;
          if ("channel" === event.type) {
            var channel = event.channel;
            switch (event.subtype) {
              case "noteOn":
                if (MIDI.channels[channel].mute) break;
                note = event.noteNumber - (root.MIDIOffset || 0);
                eventQueue.push({
                  event: event,
                  source: MIDI.noteOn(channel, event.noteNumber, event.velocity, currentTime / 1000 + ctx.currentTime),
                  interval: scheduleTracking(channel, note, queuedTime, offset, 144, event.velocity),
                });
                messages++;
                break;
              case "noteOff":
                if (MIDI.channels[channel].mute) break;
                note = event.noteNumber - (root.MIDIOffset || 0);
                eventQueue.push({
                  event: event,
                  source: MIDI.noteOff(channel, event.noteNumber, currentTime / 1000 + ctx.currentTime),
                  interval: scheduleTracking(channel, note, queuedTime, offset, 128),
                });
            }
          }
        }
      }
    },
    stopAudio = function () {
      var ctx = getContext();
      root.playing = false;
      root.restart += 1000 * (ctx.currentTime - startTime);
      while (eventQueue.length) {
        var o = eventQueue.pop();
        window.clearInterval(o.interval);
          o.source &&
            ("number" === typeof o.source ? window.clearTimeout(o.source) : o.source.disconnect(0));
      }
      for (var key in noteRegistrar) {
        var o = noteRegistrar[key];
          144 === noteRegistrar[key].message &&
            onMidiEvent &&
            onMidiEvent({
              channel: o.channel,
              note: o.note,
              now: o.now,
              end: o.end,
              message: 128,
              velocity: o.velocity,
            });
      }
      noteRegistrar = {};
    };
})();
