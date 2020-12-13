#!/usr/bin/env python3
# Downlad ALL midi files from galactic.ink

from download_midi import pull_midi_file
import sys


def main(start):
    input = "../piano/min/midi_files.js"
    count = 0
    with open(input, "r") as file:
        for line in file:
            count += 1
            if (count < start):
                continue
            if (count == 1):
                line = line.replace('MIDI_FILES = "', '')
            line = line.strip().replace(';\\', '').replace('"', '')
            pull_midi_file(line, count)


if __name__ == '__main__':
    start = 0
    if (len(sys.argv) > 1):
        start = int(sys.argv[1])
    main(start)
