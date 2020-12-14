#!/usr/bin/env python3

import cgi
import os
import base64


def midi_to_json(file):
    if (file == None):
        return ""
    path = "audio/" + file
    if (not os.path.isfile(path)):
        return ""
    with open(path, 'rb') as f:
        content = f.read()
        bytes = base64.b64encode(content)
        result = str(bytes, encoding="utf-8")
    return result


def main():
    form = cgi.FieldStorage()
    midi_file = form.getvalue("query")
    str = midi_to_json(midi_file)
    print("Content-Type: text/html\n")
    print("Piano.loadExternalMIDICallback('data:audio/midi;base64,%s')" % str)


if __name__ == '__main__':
    main()
