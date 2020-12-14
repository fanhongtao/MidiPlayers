A collection of web-based MIDI players.

There are two branches:
* master - Origin code downloaded from webs.
* local - Local modification. For example, use `local` JS/CSS files.

# 1 Directories

* [piano](piano) - Code for [Color Piano](https://galactic.ink/piano/).
* [smfplayer.js](smfplayer.js) - Code for [MIDI Player XG](https://logue.dev/smfplayer.js/). Execute `download_extra.sh` before test.

# 2 Run local instance

## 2.1 Start web server

Start your favorite web server, and set this directory as web `Root`. For example, execute

```bash
python3 -m http.server --cgi
```


## 2.2 Try players

Open URLs with a browser:

* http://localhost:8000/piano/
* http://localhost:8000/smfplayer.js/
