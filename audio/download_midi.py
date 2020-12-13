#!/usr/bin/env python3
# Downlad midi file from galactic.ink

import base64
import os
import ssl
import sys
from urllib.request import urlopen
from urllib.parse import quote


def pull_midi_file(file_name, idx=0):
    if (os.path.isfile(file_name)):
        print("File [%s] is already exist." % file_name)
        return

    if (idx > 0):
        print("%d - Downloading [%s] ..." % (idx, file_name))
    else:
        print("Downloading [%s] ..." % file_name)

    ssl._create_default_https_context = ssl._create_unverified_context
    url = 'https://galactic.ink/piano/midi-to-json.php?query=' + \
        quote(file_name)
    response = urlopen(url)
    str = response.read().decode('utf-8')
    str64 = str[str.index(",")+1: str.rindex("'")]
    if (len(str64) < 2):
        print("Can't get file content of [%s]" % file_name)
        return

    with open(file_name, "wb") as file:
        b64 = bytes(str64, encoding="utf8")
        file.write(base64.b64decode(b64))


def main():
    if len(sys.argv) != 2:
        print("Usage: %s midi-file-name" % sys.argv[0])
        return
    file_name = sys.argv[1]
    pull_midi_file(file_name)


if __name__ == '__main__':
    main()
