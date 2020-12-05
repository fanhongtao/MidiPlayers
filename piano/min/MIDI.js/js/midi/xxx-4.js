"undefined" === typeof MIDI && (MIDI = {});
(function () {
  var b = function (a) {
    MIDI.api = a.api;
    MIDI.setVolume = a.setVolume;
    MIDI.programChange = a.programChange;
    MIDI.noteOn = a.noteOn;
    MIDI.noteOff = a.noteOff;
    MIDI.chordOn = a.chordOn;
    MIDI.chordOff = a.chordOff;
    MIDI.stopAllNotes = a.stopAllNotes;
    MIDI.getInput = a.getInput;
    MIDI.getOutputs = a.getOutputs;
  };
  (function () {
    var a = null,
      c = null,
      e = (MIDI.WebMIDI = { api: "webmidi" });
    e.setVolume = function (a, b) {
      c.send([176 + a, 7, b]);
    };
    e.programChange = function (a, b) {
      c.send([192 + a, b]);
    };
    e.noteOn = function (a, b, e, g) {
      c.send([144 + a, b, e], 1e3 * g);
    };
    e.noteOff = function (a, b, e) {
      c.send([128 + a, b, 0], 1e3 * e);
    };
    e.chordOn = function (a, b, e, g) {
      for (var f = 0; f < b.length; f++) c.send([144 + a, b[f], e], 1e3 * g);
    };
    e.chordOff = function (a, b, e) {
      for (var g = 0; g < b.length; g++) c.send([128 + a, b[g], 0], 1e3 * e);
    };
    e.stopAllNotes = function () {
      for (var a = 0; 16 > a; a++) c.send([176 + a, 123, 0]);
    };
    e.getInput = function () {
      return a.getInputs();
    };
    e.getOutputs = function () {
      return a.getOutputs();
    };
    e.connect = function (d) {
      b(e);
      navigator.requestMIDIAccess().then(
        function (b) {
          a = b;
          c = a.outputs()[0];
          d.callback && d.callback();
        },
        function (a) {
          d.api =
            window.AudioContext || window.webkitAudioContext
              ? "webaudio"
              : window.Audio
              ? "audiotag"
              : "flash";
          MIDI.loadPlugin(d);
        }
      );
    };
  })();
  (window.AudioContext || window.webkitAudioContext) &&
    (function () {
      var a = window.AudioContext || window.webkitAudioContext,
        c = (MIDI.WebAudio = { api: "webaudio" }),
        e,
        d = {},
        k = 127,
        m = {},
        g = function (a, d, c, b, k) {
          var g = MIDI.GeneralMIDI.byName[a],
            s = g.number,
            t = d[c];
          if (!MIDI.Soundfont[a][t]) return k(a);
          var v = MIDI.Soundfont[a][t].split(",")[1],
            v = Base64Binary.decodeArrayBuffer(v);
          e.decodeAudioData(v, function (e) {
            for (var v = t; 3 > v.length; ) v += "&nbsp;";
            "undefined" !== typeof MIDI.loader &&
              MIDI.loader.update(
                null,
                g.instrument + "<br>Processing: " + ((100 * (c / 87)) >> 0) + "%<br>" + v
              );
            e.id = t;
            b[c] = e;
            if (b.length === d.length) {
              for (; b.length; ) (e = b.pop()) && (m[s + "" + MIDI.keyToNote[e.id]] = e);
              k(a);
            }
          });
        };
      c.setVolume = function (a, d) {
        k = d;
      };
      c.programChange = function (a, d) {
        MIDI.channels[a].instrument = d;
      };
      c.noteOn = function (a, c, b, g) {
        if (MIDI.channels[a]) {
          var q = MIDI.channels[a].instrument;
          if (m[q + "" + c]) {
            g < e.currentTime && (g += e.currentTime);
            var p = e.createBufferSource();
            d[a + "" + c] = p;
            p.buffer = m[q + "" + c];
            p.connect(e.destination);
            p.gainNode = e.createGain ? e.createGain() : e.createGainNode();
            a = ((2 * b) / 127) * (k / 127) - 1;
            p.gainNode.connect(e.destination);
            p.gainNode.gain.value = Math.max(-1, a);
            p.connect(p.gainNode);
            p.noteOn ? p.noteOn(g || 0) : p.start(g || 0);
            return p;
          }
        }
      };
      c.noteOff = function (a, c, b) {
        b = b || 0;
        b < e.currentTime && (b += e.currentTime);
        var k = d[a + "" + c];
        if (k) {
          if (k.gainNode) {
            var g = k.gainNode.gain;
            g.linearRampToValueAtTime(g.value, b);
            g.linearRampToValueAtTime(-1, b + 0.2);
          }
          k.noteOff ? k.noteOff(b + 0.3) : k.stop(b + 0.3);
          delete d[a + "" + c];
        }
      };
      c.chordOn = function (a, d, b, e) {
        for (var k = {}, g, m = 0, t = d.length; m < t; m++) k[(g = d[m])] = c.noteOn(a, g, b, e);
        return k;
      };
      c.chordOff = function (a, d, b) {
        for (var e = {}, k, g = 0, m = d.length; g < m; g++) e[(k = d[g])] = c.noteOff(a, k, b);
        return e;
      };
      c.stopAllNotes = function () {
        for (var a in d) {
          var c = 0;
          c < e.currentTime && (c += e.currentTime);
          d[a].gain.linearRampToValueAtTime(1, c);
          d[a].gain.linearRampToValueAtTime(0, c + 0.2);
          d[a].noteOff(c + 0.3);
          delete d[a];
        }
      };
      c.connect = function (d) {
        b(c);
        MIDI.Player.ctx = e = new a();
        var k = [],
          n = MIDI.keyToNote,
          r;
        for (r in n) k.push(r);
        var n = [],
          m = {};
        r = function (a) {
          delete m[a];
          for (var c in m) break;
          c || d.callback();
        };
        for (var p in MIDI.Soundfont) {
          m[p] = !0;
          for (var s = 0; s < k.length; s++) g(p, k, s, n, r);
        }
      };
    })();
  window.Audio &&
    (function () {
      for (
        var a = (MIDI.AudioTag = { api: "audiotag" }),
          c = {},
          e = 127,
          d = -1,
          k = [],
          m = [],
          g = {},
          f = 0;
        12 > f;
        f++
      )
        k[f] = new Audio();
      var l = function (a, c) {
          if (MIDI.channels[a]) {
            var b = MIDI.GeneralMIDI.byId[MIDI.channels[a].instrument].id;
            if ((c = g[c])) {
              var f = (d + 1) % k.length,
                l = k[f];
              m[f] = b + "" + c.id;
              l.src = MIDI.Soundfont[b][c.id];
              l.volume = e / 127;
              l.play();
              d = f;
            }
          }
        },
        n = function (a, c) {
          if (MIDI.channels[a]) {
            var b = MIDI.GeneralMIDI.byId[MIDI.channels[a].instrument].id;
            if ((c = g[c]))
              for (var b = b + "" + c.id, e = 0; e < k.length; e++) {
                var f = (e + d + 1) % k.length,
                  l = m[f];
                if (l && l == b) {
                  k[f].pause();
                  m[f] = null;
                  break;
                }
              }
          }
        };
      a.programChange = function (a, c) {
        MIDI.channels[a].instrument = c;
      };
      a.setVolume = function (a, c) {
        e = c;
      };
      a.noteOn = function (a, d, b, e) {
        var k = c[d];
        if (g[k]) {
          if (e)
            return window.setTimeout(function () {
              l(a, k);
            }, 1e3 * e);
          l(a, k);
        }
      };
      a.noteOff = function (a, d, b) {
        var e = c[d];
        if (g[e]) {
          if (b)
            return setTimeout(function () {
              n(a, e);
            }, 1e3 * b);
          n(a, e);
        }
      };
      a.chordOn = function (a, d, b, e) {
        for (b = 0; b < d.length; b++) {
          var k = c[d[b]];
          if (g[k]) {
            if (e)
              return window.setTimeout(function () {
                l(a, k);
              }, 1e3 * e);
            l(a, k);
          }
        }
      };
      a.chordOff = function (a, d, b) {
        for (var e = 0; e < d.length; e++) {
          var k = c[d[e]];
          if (g[k]) {
            if (b)
              return window.setTimeout(function () {
                n(a, k);
              }, 1e3 * b);
            n(a, k);
          }
        }
      };
      a.stopAllNotes = function () {
        for (var a = 0, c = k.length; a < c; a++) k[a].pause();
      };
      a.connect = function (d) {
        for (var e in MIDI.keyToNote) (c[MIDI.keyToNote[e]] = e), (g[e] = { id: e });
        b(a);
        d.callback && d.callback();
      };
    })();
  (function () {
    var a = (MIDI.Flash = { api: "flash" }),
      c = {},
      e = {};
    a.programChange = function (a, c) {
      MIDI.channels[a].instrument = c;
    };
    a.setVolume = function (a, c) {};
    a.noteOn = function (a, b, m, g) {
      if (
        MIDI.channels[a] &&
        ((b = MIDI.GeneralMIDI.byId[MIDI.channels[a].instrument].number + "" + c[b]), e[b])
      ) {
        if (g)
          return window.setTimeout(function () {
            e[b].play({ volume: 2 * m });
          }, 1e3 * g);
        e[b].play({ volume: 2 * m });
      }
    };
    a.noteOff = function (a, c, b) {};
    a.chordOn = function (a, b, m, g) {
      if (MIDI.channels[a]) {
        a = MIDI.GeneralMIDI.byId[MIDI.channels[a].instrument].number;
        for (var f in b) (g = a + "" + c[b[f]]), e[g] && e[g].play({ volume: 2 * m });
      }
    };
    a.chordOff = function (a, c, b) {};
    a.stopAllNotes = function () {};
    a.connect = function (d, k) {
      soundManager.flashVersion = 9;
      soundManager.useHTML5Audio = !0;
      soundManager.url = k.soundManagerSwfUrl || "../inc/SoundManager2/swf/";
      soundManager.useHighPerformance = !0;
      soundManager.wmode = "transparent";
      soundManager.flashPollingInterval = 1;
      soundManager.debugMode = !1;
      soundManager.onload = function () {
        for (
          var g = function (a, c, d) {
              e[MIDI.GeneralMIDI.byName[a].number + "" + c] = soundManager.createSound({
                id: c,
                url: MIDI.soundfontUrl + a + "-mp3/" + c + ".mp3",
                multiShot: !0,
                autoLoad: !0,
                onload: d,
              });
            },
            f = [],
            l = 88 * d.length,
            n = 0;
          n < d.length;
          n++
        )
          for (
            var r = d[n],
              m = function () {
                f.push(this.sID);
                "undefined" !== typeof MIDI.loader &&
                  MIDI.loader.update(null, "Processing: " + this.sID);
              },
              p = 0;
            88 > p;
            p++
          )
            g(r, c[p + 21], m);
        b(a);
        var s = window.setInterval(function () {
          f.length < l || (window.clearInterval(s), k.callback && k.callback());
        }, 25);
      };
      soundManager.onerror = function () {};
      for (var m in MIDI.keyToNote) c[MIDI.keyToNote[m]] = m;
    };
  })();
  MIDI.GeneralMIDI = (function (a) {
    var c = function (a) {
        return a
          .replace(/[^a-z0-9 ]/gi, "")
          .replace(/[ ]/g, "_")
          .toLowerCase();
      },
      b = { byName: {}, byId: {}, byCategory: {} },
      d;
    for (d in a)
      for (var k = a[d], m = 0, g = k.length; m < g; m++) {
        var f = k[m];
        if (f) {
          var l = parseInt(f.substr(0, f.indexOf(" ")), 10),
            f = f.replace(l + " ", "");
          b.byId[--l] = b.byName[c(f)] = b.byCategory[c(d)] = {
            id: c(f),
            instrument: f,
            number: l,
            category: d,
          };
        }
      }
    return b;
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
    for (var a = {}, c = 0; 16 > c; c++)
      a[c] = { instrument: 0, mute: !1, mono: !1, omni: !1, solo: !1 };
    return a;
  })();
  MIDI.pianoKeyOffset = 21;
  MIDI.keyToNote = {};
  MIDI.noteToKey = {};
  (function () {
    for (var a = "C Db D Eb E F Gb G Ab A Bb B".split(" "), c = 21; 108 >= c; c++) {
      var b = a[c % 12] + (((c - 12) / 12) >> 0);
      MIDI.keyToNote[b] = c;
      MIDI.noteToKey[c] = b;
    }
  })();
})();
