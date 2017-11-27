I own 1000 CDs of classical music. Ripping this music creates a mess. This system cleans up the mess. Without having to rename mp3 files, and always copying the mp3s while fixing, so making mistakes will not affect the originals.

# Installation

Install node, see https://nodejs.org/en/download/

Make sure that npm was installed as part of node by running the following command from the command line

`> npm --version`

Download and unzip fixMyMusic https://github.com/rasmus-storjohann/fixMyMusic/archive/master.zip

Copy a mp3 file to the fixMyMusic folder and rename it to test.mp3, any mp3 will do, the `npm test` command below will fail if you omit this step. Then in the fixMyMusic folder, run the commands to install supporting packages and run the tests

```
> npm install
> npm test
```

Make sure that the tests pass, there should be one 175 passing tests and one failing test.

# Use

Assuming that you use the directory strucure

```
working/
    fixMyMusic/
    messy/
    tidy/
```

where `fixMyMusic/` contains the tool, `messy/` contains the ripped music as it is, and `tidy/` will contain the music once it's cleaned up. The tool will not make any changes inside `messy/` so it should always be safe. Still, taking backups is smart.

From the `working/` directory, run the following command to start cleaning it up

```
> node fixMyMusic/index.js --dry-run --out tidy/ messy/
```

# Manual labor

As an example, consider a double album with four symphonies and a filler piece, one of the symphonies hillariously spanning the two disks. This also wouldn't be any fun without the inconsistent naming between the two disks:

```
messy/Sibelius/Symphonies 4, 5, 6, 7 - disk 1/01 - op. 63 - I Tempo molto moderato, quasi adagio.mp3
messy/Sibelius/Symphonies 4, 5, 6, 7 - disk 1/02 - op. 63 - II Allegro molto Vivace.mp3
messy/Sibelius/Symphonies 4, 5, 6, 7 - disk 1/03 - op. 63 - III Il tempo Largo.mp3
messy/Sibelius/Symphonies 4, 5, 6, 7 - disk 1/04 - op. 63 - IV Allegro.mp3
messy/Sibelius/Symphonies 4, 5, 6, 7 - disk 1/05 - op. 26 Finlandia.mp3
messy/Sibelius/Symphonies 4, 5, 6, 7 - disk 1/06 - op. 82 - I Tempo molto moderato.mp3
messy/Sibelius/Symphonies 4, 5, 6, 7 - disk 1/07 - op. 82 - Allegro moderato - Presto.mp3
messy/Sibelius/Symphonies 4, 5, 6, 7 - disk 1/08 - op. 82 - II Andante mosso, quasi allegretto.mp3
messy/Sibelius/Four Symphonies - disk 2/01 - Symphony No.5 in Eb Major - Allegro Molto.mp3
messy/Sibelius/Four Symphonies - disk 2/02 - Symphony No.6 in D Minor - Allegro molto moderato.mp3
messy/Sibelius/Four Symphonies - disk 2/03 - Symphony No.6 in D Minor - Allegretto moderato.mp3
messy/Sibelius/Four Symphonies - disk 2/04 - Symphony No.6 in D Minor - Poco vivace.mp3
messy/Sibelius/Four Symphonies - disk 2/05 - Symphony No.6 in D Minor - Allegro molto.mp3
messy/Sibelius/Four Symphonies - disk 2/06 - Symphony No.7 in C Major - Adagio.mp3
messy/Sibelius/Four Symphonies - disk 2/07 - Symphony No.7 in C Major - Vivacissimo - Adagio.mp3
messy/Sibelius/Four Symphonies - disk 2/08 - Symphony No.7 in C Major - Allegro molto moderato - Allegro moderato.mp3
messy/Sibelius/Four Symphonies - disk 2/09 - Symphony No.7 in C Major - Vivace - Presto - Adagio - Largamente molto - Affettuoso.mp3

```

First, you have to put the files in their proper folders, making sub folders disk1 and disk2 (spelled with a k) for the work spanning the disks, with the special disk1 and disk2 folders for the one that spans the two CDs (without the subfolders, the track numbers would make it seem like Allegro Molto is the first movement and that movements 2-5 are missing).


```
messy/Sibelius/Symphony4/01 - op. 63 - I Tempo molto moderato, quasi adagio.mp3
messy/Sibelius/Symphony4/02 - op. 63 - II Allegro molto Vivace.mp3
messy/Sibelius/Symphony4/03 - op. 63 - III Il tempo Largo.mp3
messy/Sibelius/Symphony4/04 - op. 63 - IV Allegro.mp3

messy/Sibelius/Finlandia/05 - op. 26 Finlandia.mp3

messy/Sibelius/Symphony5/disk1/06 - op. 82 - I Tempo molto moderato.mp3
messy/Sibelius/Symphony5/disk1/07 - op. 82 - Allegro moderato - Presto.mp3
messy/Sibelius/Symphony5/disk1/08 - op. 82 - II Andante mosso, quasi allegretto.mp3
messy/Sibelius/Symphony5/disk2/01 - Symphony No.5 in Eb Major - Allegro Molto.mp3

messy/Sibelius/Symphony6/02 - Symphony No.6 in D Minor - Allegro molto moderato.mp3
messy/Sibelius/Symphony6/03 - Symphony No.6 in D Minor - Allegretto moderato.mp3
messy/Sibelius/Symphony6/04 - Symphony No.6 in D Minor - Poco vivace.mp3
messy/Sibelius/Symphony6/05 - Symphony No.6 in D Minor - Allegro molto.mp3

messy/Sibelius/Symphony7/06 - Symphony No.7 in C Major - Adagio.mp3
messy/Sibelius/Symphony7/07 - Symphony No.7 in C Major - Vivacissimo - Adagio.mp3
messy/Sibelius/Symphony7/08 - Symphony No.7 in C Major - Allegro molto moderato - Allegro moderato.mp3
messy/Sibelius/Symphony7/09 - Symphony No.7 in C Major - Vivace - Presto - Adagio - Largamente molto - Affettuoso.mp3
```

If the multi-disk album is ripped with the disk number in the mp3 file names like `The Tragically Hip/Yer Favourites/Disc 2 - 06 - Fireworks.mp3` the tool will understand that and the two folders will not be needed.

Now run the tool as follows

```
> node fixMyMusic/index.js --dry-run --out tidy/ messy/
```
The tool goes through all the music in messy/ and stops on the first error it finds, in this case it complains about the symphony number 5, since the first track number is 6, when it ought to be one. The tool suggest a fix, which with some modifications will need to be added to `fixMyMusic/src/fixers/Others.json` under Sibelius:

```
Error: op. 82 - I Tempo molto moderato: Track number out of order, expected 1 but got 6
Template for special handler:
"Sibelius" : {
    "Symphony5" : {
        "firstTrackNumber": 6,
        "fixTrackName": "op. 82 - I Tempo molto moderato(.*)"
    }
}
```

The tool expects each work to start with track 1, `"firstTrackNumber": 6` tells the tool that for this work the first track is number 6. The `"fixTrackName": "op. 82 - I Tempo molto moderato(.*)"` setting is a template for the regular expression that will be used to fix each track name, this should be changed to `"fixTrackName": "op. 82 - (.*)"` so that the tool will extract the part of the file name, `I Tempo molto moderato`, which matches the `(.*)` part.

