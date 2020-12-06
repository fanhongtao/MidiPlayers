"undefined" === typeof MIDI && (MIDI = {});
(function () {
  var setPlugin = function (root) {
    MIDI.api = root.api;
    MIDI.setVolume = root.setVolume;
    MIDI.programChange = root.programChange;
    MIDI.noteOn = root.noteOn;
    MIDI.noteOff = root.noteOff;
    MIDI.chordOn = root.chordOn;
    MIDI.chordOff = root.chordOff;
    MIDI.stopAllNotes = root.stopAllNotes;
    MIDI.getInput = root.getInput;
    MIDI.getOutputs = root.getOutputs;
  };
  (function () {
    var plugin = null,
      output = null,
      root = (MIDI.WebMIDI = { api: "webmidi" });
    root.setVolume = function (channel, volume) {
      output.send([0xB0 + channel, 0x07, volume]);
    };
    root.programChange = function (channel, program) {
      output.send([0xC0 + channel, program]);
    };
    root.noteOn = function (channel, note, velocity, delay) {
      output.send([0x90 + channel, note, velocity], delay * 1000);
    };
    root.noteOff = function (channel, note, delay) {
      output.send([0x80 + channel, note, 0], delay * 1000);
    };
    root.chordOn = function (channel, chord, velocity, delay) {
      for (var n = 0; n < chord.length; n++) output.send([0x90 + channel, chord[n], velocity], delay * 1000);
    };
    root.chordOff = function (channel, chord, delay) {
      for (var n = 0; n < chord.length; n++) output.send([0x80 + channel, chord[n], 0], delay * 1000);
    };
    root.stopAllNotes = function () {
      for (var channel = 0; 16 > channel; channel++) output.send([0xB0 + channel, 0x7B, 0]);
    };
    root.getInput = function () {
      return plugin.getInputs();
    };
    root.getOutputs = function () {
      return plugin.getOutputs();
    };
    root.connect = function (conf) {
      setPlugin(root);
      navigator.requestMIDIAccess().then(
        function (access) {
          plugin = access;
          output = plugin.outputs()[0];
          conf.callback && conf.callback();
        },
        function (err) {
          conf.api =
            window.AudioContext || window.webkitAudioContext
              ? "webaudio"
              : window.Audio
              ? "audiotag"
              : "flash";
          MIDI.loadPlugin(conf);
        }
      );
    };
  })();
  (window.AudioContext || window.webkitAudioContext) &&
    (function () {
      var AudioContext = window.AudioContext || window.webkitAudioContext,
        root = (MIDI.WebAudio = { api: "webaudio" }),
        ctx,
        sources = {},
        masterVolume = 127,
        audioBuffers = {},
        audioLoader = function (instrument, urlList, index, bufferList, callback) {
          var synth = MIDI.GeneralMIDI.byName[instrument];
          var instrumentId = synth.number;
          var url = urlList[index];
          if (!MIDI.Soundfont[instrument][url]) return callback(instrument);
          var base64 = MIDI.Soundfont[instrument][url].split(",")[1];
          var buffer = Base64Binary.decodeArrayBuffer(base64);
          ctx.decodeAudioData(buffer, function (buffer) {
            for (var msg = url; 3 > msg.length; ) msg += "&nbsp;";
            "undefined" !== typeof MIDI.loader &&
              MIDI.loader.update(
                null,
                synth.instrument + "<br>Processing: " + ((100 * (index / 87)) >> 0) + "%<br>" + msg
              );
            buffer.id = url;
            bufferList[index] = buffer;
            if (bufferList.length === urlList.length) {
              for (; bufferList.length; ) (buffer = bufferList.pop()) && (audioBuffers[instrumentId + "" + MIDI.keyToNote[buffer.id]] = buffer);
              callback(instrument);
            }
          });
        };
      root.setVolume = function (channel, volume) {
        masterVolume = volume;
      };
      root.programChange = function (channel, program) {
        MIDI.channels[channel].instrument = program;
      };
      root.noteOn = function (channel, note, velocity, delay) {
        if (MIDI.channels[channel]) {
          var instrument = MIDI.channels[channel].instrument;
          if (audioBuffers[instrument + "" + note]) {
            delay < ctx.currentTime && (delay += ctx.currentTime);
            var source = ctx.createBufferSource();
            sources[channel + "" + note] = source;
            source.buffer = audioBuffers[instrument + "" + note];
            source.connect(ctx.destination);
            source.gainNode = ctx.createGain ? ctx.createGain() : ctx.createGainNode();
            var value = ((2 * velocity) / 127) * (masterVolume / 127) - 1;
            source.gainNode.connect(ctx.destination);
            source.gainNode.gain.value = Math.max(-1, value);
            source.connect(source.gainNode);
            source.noteOn ? source.noteOn(delay || 0) : source.start(delay || 0);
            return source;
          }
        }
      };
      root.noteOff = function (channel, note, delay) {
        delay = delay || 0;
        delay < ctx.currentTime && (delay += ctx.currentTime);
        var source = sources[channel + "" + note];
        if (source) {
          if (source.gainNode) {
            var gain = source.gainNode.gain;
            gain.linearRampToValueAtTime(gain.value, delay);
            gain.linearRampToValueAtTime(-1, delay + 0.2);
          }
          source.noteOff ? source.noteOff(delay + 0.3) : source.stop(delay + 0.3);
          delete sources[channel + "" + note];
        }
      };
      root.chordOn = function (channel, chord, velocity, delay) {
        for (var ret = {}, note, n = 0, t = chord.length; n < t; n++) ret[(note = chord[n])] = root.noteOn(channel, note, velocity, delay);
        return ret;
      };
      root.chordOff = function (channel, chord, delay) {
        for (var ret = {}, note, n = 0, length = chord.length; n < length; n++) ret[(note = chord[n])] = root.noteOff(channel, note, delay);
        return ret;
      };
      root.stopAllNotes = function () {
        for (var source in sources) {
          var delay = 0;
          delay < ctx.currentTime && (delay += ctx.currentTime);
          sources[source].gain.linearRampToValueAtTime(1, delay);
          sources[source].gain.linearRampToValueAtTime(0, delay + 0.2);
          sources[source].noteOff(delay + 0.3);
          delete sources[source];
        }
      };
      root.connect = function (conf) {
        setPlugin(root);
        MIDI.Player.ctx = ctx = new AudioContext();
        var urlList = [],
          keyToNote = MIDI.keyToNote;
        for (var key in keyToNote) urlList.push(key);
        var bufferList = [],
          pending = {};
        var oncomplete = function (instrument) {
          delete pending[instrument];
          for (var key in pending) break;
          key || conf.callback();
        };
        for (var instrument in MIDI.Soundfont) {
          pending[instrument] = true;
          for (var i = 0; i < urlList.length; i++) audioLoader(instrument, urlList, i, bufferList, oncomplete);
        }
      };
    })();
  window.Audio &&
    (function () {
      for (
        var root = (MIDI.AudioTag = { api: "audiotag" }),
          note2id = {},
          volume = 127,
          channel_nid = -1,
          channels = [],
          channelInstrumentNoteIds = [],
          notes = {},
          nid = 0;
        12 > nid;
        nid++
      )
        channels[nid] = new Audio();
      var playChannel = function (channel, note) {
          if (MIDI.channels[channel]) {
            var instrumentId = MIDI.GeneralMIDI.byId[MIDI.channels[channel].instrument].id;
            if ((note = notes[note])) {
              var nid = (channel_nid + 1) % channels.length,
                audio = channels[nid];
              channelInstrumentNoteIds[nid] = instrumentId + "" + note.id;
              audio.src = MIDI.Soundfont[instrumentId][note.id];
              audio.volume = volume / 127;
              audio.play();
              channel_nid = nid;
            }
          }
        },
        stopChannel = function (channel, note) {
          if (MIDI.channels[channel]) {
            var instrumentId = MIDI.GeneralMIDI.byId[MIDI.channels[channel].instrument].id;
            if ((note = notes[note]))
              for (var instrumentNoteId = instrumentId + "" + note.id, i = 0; i < channels.length; i++) {
                var nid = (i + channel_nid + 1) % channels.length,
                  cId = channelInstrumentNoteIds[nid];
                if (cId && cId == instrumentNoteId) {
                  channels[nid].pause();
                  channelInstrumentNoteIds[nid] = null;
                  break;
                }
              }
          }
        };
      root.programChange = function (channel, program) {
        MIDI.channels[channel].instrument = program;
      };
      root.setVolume = function (channel, n) {
        volume = n;
      };
      root.noteOn = function (channel, note, velocity, delay) {
        var id = note2id[note];
        if (notes[id]) {
          if (delay)
            return window.setTimeout(function () {
              playChannel(channel, id);
            }, delay * 1000);
          playChannel(channel, id);
        }
      };
      root.noteOff = function (channel, note, delay) {
        var id = note2id[note];
        if (notes[id]) {
          if (delay)
            return setTimeout(function () {
              stopChannel(channel, id);
            }, delay * 1000);
          stopChannel(channel, id);
        }
      };
      root.chordOn = function (channel, chord, velocity, delay) {
        for (var idx = 0; idx < chord.length; idx++) {
          var id = note2id[chord[idx]];
          if (notes[id]) {
            if (delay)
              return window.setTimeout(function () {
                playChannel(channel, id);
              }, delay * 1000);
            playChannel(channel, id);
          }
        }
      };
      root.chordOff = function (channel, chord, delay) {
        for (var idx = 0; idx < chord.length; idx++) {
          var id = note2id[chord[idx]];
          if (notes[id]) {
            if (delay)
              return window.setTimeout(function () {
                stopChannel(channel, id);
              }, delay * 1000);
            stopChannel(channel, id);
          }
        }
      };
      root.stopAllNotes = function () {
        for (var nid = 0, length = channels.length; nid < length; nid++) channels[nid].pause();
      };
      root.connect = function (conf) {
        for (var key in MIDI.keyToNote) (note2id[MIDI.keyToNote[key]] = key), (notes[key] = { id: key });
        setPlugin(root);
        conf.callback && conf.callback();
      };
    })();
  (function () {
    var root = (MIDI.Flash = { api: "flash" }),
      noteReverse = {},
      notes = {};
    root.programChange = function (channel, program) {
      MIDI.channels[channel].instrument = program;
    };
    root.setVolume = function (channel, note) {};
    root.noteOn = function (channel, note, velocity, delay) {
      if (
        MIDI.channels[channel] &&
        ((note = MIDI.GeneralMIDI.byId[MIDI.channels[channel].instrument].number + "" + noteReverse[note]), notes[note])
      ) {
        if (delay)
          return window.setTimeout(function () {
            notes[note].play({ volume: 2 * velocity });
          }, delay * 1000);
        notes[note].play({ volume: 2 * velocity });
      }
    };
    root.noteOff = function (channel, note, delay) {};
    root.chordOn = function (channel, chord, velocity, delay) {
      if (MIDI.channels[channel]) {
        var id = MIDI.GeneralMIDI.byId[MIDI.channels[channel].instrument].number;
        for (var key in chord) (note = id + "" + noteReverse[chord[key]]), notes[note] && notes[note].play({ volume: 2 * velocity });
      }
    };
    root.chordOff = function (channel, chord, delay) {};
    root.stopAllNotes = function () {};
    root.connect = function (instruments, conf) {
      soundManager.flashVersion = 9;
      soundManager.useHTML5Audio = true;
      soundManager.url = conf.soundManagerSwfUrl || "../inc/SoundManager2/swf/";
      soundManager.useHighPerformance = true;
      soundManager.wmode = "transparent";
      soundManager.flashPollingInterval = 1;
      soundManager.debugMode = false;
      soundManager.onload = function () {
        for (
          var createBuffer = function (instrument, id, onload) {
              notes[MIDI.GeneralMIDI.byName[instrument].number + "" + id] = soundManager.createSound({
                id: id,
                url: MIDI.soundfontUrl + instrument + "-mp3/" + id + ".mp3",
                multiShot: true,
                autoLoad: true,
                onload: onload,
              });
            },
            loaded = [],
            samplesToLoad = 88 * instruments.length,
            i = 0;
          i < instruments.length;
          i++
        )
          for (
            var instrument = instruments[i],
              onload = function () {
                loaded.push(this.sID);
                "undefined" !== typeof MIDI.loader &&
                  MIDI.loader.update(null, "Processing: " + this.sID);
              },
              p = 0;
            88 > p;
            p++
          )
            createBuffer(instrument, noteReverse[p + 21], onload);
        setPlugin(root);
        var interval = window.setInterval(function () {
          loaded.length < samplesToLoad || (window.clearInterval(interval), conf.callback && conf.callback());
        }, 25);
      };
      soundManager.onerror = function () {};
      for (var key in MIDI.keyToNote) noteReverse[MIDI.keyToNote[key]] = key;
    };
  })();
  MIDI.GeneralMIDI = (function (arr) {
    var clean = function (v) {
        return v
          .replace(/[^a-z0-9 ]/gi, "")
          .replace(/[ ]/g, "_")
          .toLowerCase();
      },
      ret = { byName: {}, byId: {}, byCategory: {} };
    for (var key in arr)
      for (var list = arr[key], n = 0, length = list.length; n < length; n++) {
        var instrument = list[n];
        if (instrument) {
          var num = parseInt(instrument.substr(0, instrument.indexOf(" ")), 10),
            instrument = instrument.replace(num + " ", "");
          ret.byId[--num] = ret.byName[clean(instrument)] = ret.byCategory[clean(key)] = {
            id: clean(instrument),
            instrument: instrument,
            number: num,
            category: key,
          };
        }
      }
    return ret;
  })({
    Piano: "1 Acoustic Grand Piano;2 Bright Acoustic Piano;3 Electric Grand Piano;4 Honky-tonk Piano;5 Electric Piano 1;6 Electric Piano 2;7 Harpsichord;8 Clavinet".split(
      ";"
    ),
    "Chromatic Percussion": "9 Celesta;10 Glockenspiel;11 Music Box;12 Vibraphone;13 Marimba;14 Xylophone;15 Tubular Bells;16 Dulcimer".split(
      ";"
    ),
    Organ: "17 Drawbar Organ;18 Percussive Organ;19 Rock Organ;20 Church Organ;21 Reed Organ;22 Accordion;23 Harmonica;24 Tango Accordion".split(
      ";"
    ),
    Guitar: "25 Acoustic Guitar (nylon);26 Acoustic Guitar (steel);27 Electric Guitar (jazz);28 Electric Guitar (clean);29 Electric Guitar (muted);30 Overdriven Guitar;31 Distortion Guitar;32 Guitar Harmonics".split(
      ";"
    ),
    Bass: "33 Acoustic Bass;34 Electric Bass (finger);35 Electric Bass (pick);36 Fretless Bass;37 Slap Bass 1;38 Slap Bass 2;39 Synth Bass 1;40 Synth Bass 2".split(
      ";"
    ),
    Strings: "41 Violin;42 Viola;43 Cello;44 Contrabass;45 Tremolo Strings;46 Pizzicato Strings;47 Orchestral Harp;48 Timpani".split(
      ";"
    ),
    Ensemble: "49 String Ensemble 1;50 String Ensemble 2;51 Synth Strings 1;52 Synth Strings 2;53 Choir Aahs;54 Voice Oohs;55 Synth Choir;56 Orchestra Hit".split(
      ";"
    ),
    Brass: "57 Trumpet;58 Trombone;59 Tuba;60 Muted Trumpet;61 French Horn;62 Brass Section;63 Synth Brass 1;64 Synth Brass 2".split(
      ";"
    ),
    Reed: "65 Soprano Sax;66 Alto Sax;67 Tenor Sax;68 Baritone Sax;69 Oboe;70 English Horn;71 Bassoon;72 Clarinet".split(
      ";"
    ),
    Pipe: "73 Piccolo;74 Flute;75 Recorder;76 Pan Flute;77 Blown Bottle;78 Shakuhachi;79 Whistle;80 Ocarina".split(
      ";"
    ),
    "Synth Lead": "81 Lead 1 (square);82 Lead 2 (sawtooth);83 Lead 3 (calliope);84 Lead 4 (chiff);85 Lead 5 (charang);86 Lead 6 (voice);87 Lead 7 (fifths);88 Lead 8 (bass + lead)".split(
      ";"
    ),
    "Synth Pad": "89 Pad 1 (new age);90 Pad 2 (warm);91 Pad 3 (polysynth);92 Pad 4 (choir);93 Pad 5 (bowed);94 Pad 6 (metallic);95 Pad 7 (halo);96 Pad 8 (sweep)".split(
      ";"
    ),
    "Synth Effects": "97 FX 1 (rain);98 FX 2 (soundtrack);99 FX 3 (crystal);100 FX 4 (atmosphere);101 FX 5 (brightness);102 FX 6 (goblins);103 FX 7 (echoes);104 FX 8 (sci-fi)".split(
      ";"
    ),
    Ethnic: "105 Sitar;106 Banjo;107 Shamisen;108 Koto;109 Kalimba;110 Bagpipe;111 Fiddle;112 Shanai".split(
      ";"
    ),
    Percussive: "113 Tinkle Bell;114 Agogo;115 Steel Drums;116 Woodblock;117 Taiko Drum;118 Melodic Tom;119 Synth Drum".split(
      ";"
    ),
    "Sound effects": "120 Reverse Cymbal;121 Guitar Fret Noise;122 Breath Noise;123 Seashore;124 Bird Tweet;125 Telephone Ring;126 Helicopter;127 Applause;128 Gunshot".split(
      ";"
    ),
  });
  MIDI.channels = (function () {
    for (var channels = {}, n = 0; 16 > n; n++)
      channels[n] = { instrument: 0, mute: false, mono: false, omni: false, solo: false };
    return channels;
  })();
  MIDI.pianoKeyOffset = 21;
  MIDI.keyToNote = {};
  MIDI.noteToKey = {};
  (function () {
    for (var number2key = "C Db D Eb E F Gb G Ab A Bb B".split(" "), n = 21; 108 >= n; n++) {
      var name = number2key[n % 12] + (((n - 12) / 12) >> 0);
      MIDI.keyToNote[name] = n;
      MIDI.noteToKey[n] = name;
    }
  })();
})();
