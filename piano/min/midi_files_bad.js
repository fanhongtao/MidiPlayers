// Files can not download by
//      https://galactic.ink/piano/midi-to-json.php?query=

BAD_MIDI_FILES = "\
Bach, JS - BWV-0910 Toccata No-1 in F#-min.mid;\
Bach, JS - PrN\u0303ludium und Fuge in D-Dur, BWV.mid;\
Bach, JS - Sonata No-2 in F-sharp-min Op-2 (Tak06).mid;\
Beethoven, Ludwig Van - Mondscheinsonate (Moonlight Sonata) No.14 in C#-min Op-27-2 (1801) 1st Nov.mid;\
Beethoven, Ludwig Van - Mondscheinsonate (Moonlight Sonata) No.14 in C#-min Op-27-2 (1801) 2nd Nov.mid;\
Beethoven, Ludwig Van - Mondscheinsonate (Moonlight Sonata) No.14 in C#-min Op-27-2 (1801) 3rd Nov.mid;\
Beethoven, Ludwig Van - Moonlight Sonata 2nd Mov .mid;\
Brahms - Op-09 Piano Variations on Theme (Robert Schumann) F# min.mid;\
Chopin, Frederic Francois - Barcarolle F sharp minor Op-60.mid;\
Chopin, Frederic Francois - Etude C sharp minor Op-10 No-03.mid;\
Chopin, Frederic Francois - Etude C sharp minor Op-10 No-04.mid;\
Chopin, Frederic Francois - Etude C sharp minor Op-25 No-07.mid;\
Chopin, Frederic Francois - Etude G sharp minor Op-25 No-06.mid;\
Chopin, Frederic Francois - Etude Op-10 NoSchwarze-Tasten-.mid;\
Chopin, Frederic Francois - Etude Op-25, NSturmetA\u030ade.mid;\
Chopin, Frederic Francois - Fantasie-Impromptu C sharp minor Op-66.mid;\
Chopin, Frederic Francois - Fantasie-Impromptu in C#.mid;\
Chopin, Frederic Francois - Mazurka C sharp minor Op-06 No-02.mid;\
Chopin, Frederic Francois - Mazurka C sharp minor Op-30 No-04.mid;\
Chopin, Frederic Francois - Mazurka C sharp minor Op-50 No-03.mid;\
Chopin, Frederic Francois - Mazurka C sharp minor Op-63 No-03.mid;\
Chopin, Frederic Francois - Mazurka C sharp Op-41 No-01.mid;\
Chopin, Frederic Francois - Mazurka F sharp minor Op-06 No-01.mid;\
Chopin, Frederic Francois - Mazurka F sharp minor Op-59 No-03.mid;\
Chopin, Frederic Francois - Mazurka G sharp minor Op-33 No-01.mid;\
Chopin, Frederic Francois - Nocturne C sharp minor Op-27 No-01.mid;\
Chopin, Frederic Francois - Nocturne C sharp minor.mid;\
Chopin, Frederic Francois - Nocturne F sharp Major Op-15 No-02.mid;\
Chopin, Frederic Francois - Nocturne F sharp minor Op-48 No-02.mid;\
Chopin, Frederic Francois - Op-10 Etude No-04 in C#-min.mid;\
Chopin, Frederic Francois - Op-10 Etude No-04C# Minor.mid;\
Chopin, Frederic Francois - Op-15 Nocturne No-2 in F#.mid;\
Chopin, Frederic Francois - Op-27 Nocturne No-1 In C# Minor.mid;\
Chopin, Frederic Francois - Op-27 Nocturne No-1 in C#-min.mid;\
Chopin, Frederic Francois - Op-48 Nocturne No-2 In F# Minor.mid;\
Chopin, Frederic Francois - Op-48 Nocturne No-2 in F#-min.mid;\
Chopin, Frederic Francois - Op-53 Polonaise In Ab [Heroic].mid;\
Chopin, Frederic Francois - Op-53 Polonaise in Ab [heroic].mid;\
Chopin, Frederic Francois - Op-58 Mov.4 Presto Sonata No.3 In .mid;\
Chopin, Frederic Francois - Op-64 Waltz in C#-min No-2.mid;\
Chopin, Frederic Francois - Op-66 'fantaisie-impromptu In C# Mi.mid;\
Chopin, Frederic Francois - Op-66 Fantaisie-impromptu in C#.mid;\
Chopin, Frederic Francois - Op.64 Waltz In C# Minor No.2.mid;\
Chopin, Frederic Francois - Polonaise F sharp minor Op-44.mid;\
Chopin, Frederic Francois - Polonaise in Ab major Op-.mid;\
Chopin, Frederic Francois - Sonate No-02 B-min Op-35 Mov-02 .mid;\
Chopin, Frederic Francois - Waltz in E Op-Posth..mid;\
Greig - Vi\u0302glein Op-43, No-4.mid;\
Rachmaninov, Sergei Vasilyevich - Concerto No-01 F sharp min.mid;\
Rachmaninov, Sergei Vasilyevich - Etude Tableau Op-33 No-9 in C-sharp-min.mid;\
Rachmaninov, Sergei Vasilyevich - Etude Tableau Op-39 No-3 in F-sharp-min.mid;\
Rachmaninov, Sergei Vasilyevich - Morceau de Fantasie Op-03 No-02 Prelude in C#-min (1892).mid;\
Rachmaninov, Sergei Vasilyevich - Nocturne No-01 in F# min (11888).mid;\
Rachmaninov, Sergei Vasilyevich - Op-03 No-02 Prelude in C#-min.mid;\
Rachmaninov, Sergei Vasilyevich - Op-32 No-12 Prelude in G#.mid;\
Rachmaninov, Sergei Vasilyevich - Prelude Op-03 No-02 in C#-min.mid;\
Rachmaninov, Sergei Vasilyevich - Prelude Op-23 No-01 in F#-min.mid;\
Rachmaninov, Sergei Vasilyevich - Prelude Op-23 No-02 in C#-min.mid;\
Rachmaninov, Sergei Vasilyevich - Prelude Op-32 No-06 in G#.mid;\
Rachmaninov, Sergei Vasilyevich - Prelude Op-32 No-12 in G#-min.mid;\
Robert Schumann - Sonata No-1 in F-sharp-min Op-11 (Soukhovetski08).mid;\
Schumann - Kinderszenen Opus TrN\u0303umerei.mid;\
Schumann - Kinderszenen Opus Von fremden LN\u0303nd.mid;\
Schumann - Symphonic Etude in C#-min Op-13.mid;\
Scriabin - Etude in C#-min Op-02 No-01 (1887).mid;\
Scriabin - Etude in C-sharpop.2no 11.mid;\
Scriabin - Etude Op-08 (1894) No-02 in F#.mid;\
Scriabin - Etude Op-08 (1894) No-12 in E# min.mid;\
"
