"undefined" === typeof MIDI && (MIDI = {});
(function (b) {
  var a = {
      9: 0,
      49: 1,
      81: 0,
      192: 0,
      50: 1,
      87: 2,
      51: 3,
      69: 4,
      52: 6,
      82: 5,
      53: 6,
      84: 7,
      54: 8,
      89: 9,
      55: 10,
      85: 11,
      56: 13,
      65: 13,
      73: 12,
      57: 13,
      79: 14,
      48: 15,
      80: 16,
      189: 18,
      219: 17,
      187: 18,
      221: 19,
      8: 20,
      220: 21,
      90: 12,
      83: 13,
      88: 14,
      68: 15,
      67: 16,
      70: 18,
      86: 17,
      71: 18,
      66: 19,
      72: 20,
      78: 21,
      74: 22,
      77: 23,
      75: 25,
      188: 24,
      76: 25,
      190: 26,
      186: 27,
      13: 30,
      222: 30,
      191: 28,
    },
    c = function (b, c, e) {
      if (!isNaN(a[b])) {
        8 == b && c.preventDefault();
        var g = a[b] + 12;
        Piano.inversion = 0;
        16 != b &&
          (c.shiftKey
            ? "down" == e
              ? Piano.chordOn(g)
              : Piano.chordOff(g)
            : "up" == e
            ? Piano.noteOff(g)
            : Piano.noteOn(g));
      }
    },
    e = {};
  Piano.keyDown = function (a) {
    var b = a.keyCode;
    e[b] || ((e[b] = !0), c(b, a, "down"));
  };
  Piano.keyUp = function (a) {
    var b = a.keyCode;
    e[b] = !1;
    c(b, a, "up");
  };
  Event.add(window, "keydown", Piano.keyDown);
  Event.add(window, "keyup", Piano.keyUp);
  Event.add(window, "mouseup", function () {
    Piano.mouseIsActive = !1;
  });
})(MIDI.Keyboard);

"undefined" == typeof Piano && (Piano = {});
(function (b) {
  b.notesPlaying = 0;
  b.trackNote = function (a, c, e) {
    b.notesPlaying += e ? 1 : -1;
    b.notes[c] = { isOn: e };
    "musicbox" === b.visualize &&
      (e
        ? ((a = MusicBox.scene.objects[c]), (a.scale.x = 1e3), MusicBox.render())
        : ((a = MusicBox.scene.objects[c]), (a.scale.x = 1), (a.scale.y = 1)));
  };
  b.calculateNote = function (a) {
    return b.key + 12 * b.octave + (a || 0);
  };
  b.noteOn = function (a) {
    "undefined" == typeof a && (a = b.key + 12 * b.octave);
    b.drawKeyLabel(a, !0);
    b.trackNote(b.channel, a, !0);
    MIDI.noteOn && MIDI.noteOn(b.channel, a + MIDI.pianoKeyOffset, 64);
  };
  b.noteOff = function (a) {
    b.drawKeyLabel(a, !1);
    b.trackNote(b.channel, a, !1);
    MIDI.noteOff && MIDI.noteOff(b.channel, a + MIDI.pianoKeyOffset);
  };
  b.chordOn = function (a) {
    "undefined" == typeof a && (a = b.key + 12 * b.octave);
    var c = clone(MusicTheory.Chords[b.chord]),
      e;
    for (e in c) {
      var d = a + c[e];
      b.trackNote(b.channel, d, !0);
      b.drawKeyLabel(d, !0);
      c[e] = d + MIDI.pianoKeyOffset;
    }
    MIDI.chordOn && MIDI.chordOn(b.channel, c, 64);
  };
  b.chordOff = function (a) {
    var c = clone(MusicTheory.Chords[b.chord]),
      e = [],
      d;
    for (d in c) b.drawKeyLabel(a + c[d], !1), e.push(a + c[d] + MIDI.pianoKeyOffset);
    MIDI.chordOff && MIDI.chordOff(b.channel, e);
    for (var k in e)
      b.notes[e[k] - MIDI.pianoKeyOffset] && b.trackNote(b.channel, e[k] - MIDI.pianoKeyOffset, !1);
  };
  b.playScale = function (a) {
    b.clearNotes();
    void 0 == a && (a = MusicTheory.Scales[b.scale]);
    a = clone(a);
    a.push(a[0] + 12);
    b.position = 0;
    b.scaleObj = a;
    window.clearInterval(b.interval);
    b.interval = window.setInterval(function () {
      if (b.position > b.scaleObj.length - 1) window.clearInterval(b.interval), (b.interval = 0);
      else {
        var a = b.calculateNote(b.scaleObj[b.position]);
        b.noteOn(a);
        b.position++;
      }
    }, 6e4 / b.tempo);
  };
  b.invert = function (a) {
    b.clearNotes();
    b.inversion += a;
    a = b.inversion;
    var c = clone(MusicTheory.Chords[b.chord]);
    0 > a && (c = c.reverse());
    for (var e = 0; e < Math.abs(a); e++) c[e % c.length] += 12 * (0 < a ? 1 : -1);
    for (var d in c)
      (e = b.calculateNote(c[d])),
        (c[d] = e),
        b.trackNote(b.channel, e, !0),
        b.drawKeyLabel(e, !0),
        b.noteOn(e);
  };
  b.clearNotes = function () {
    if (b.notes) {
      MIDI.chordOff && MIDI.chordOff(b.channel, b.notes);
      for (var a in b.notes) b.drawKeyLabel(a, !1), b.trackNote(b.channel, a, !1);
    }
  };
  b.func = b.playScale;
  b.play = function (a) {
    a && (MIDI.Player.currentData = a);
    MIDI.Player.loadMidiFile();
    MIDI.Player.renderScreen();
  };
  b.resume = function () {
    delete b.Animation.tCurrent;
    MIDI.Player.playing = !0;
    b.clearNotes();
    MIDI.Player.resume();
  };
})(Piano);
