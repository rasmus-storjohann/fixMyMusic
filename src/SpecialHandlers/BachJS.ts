
export function SpecialHandlers()
{
    return {
        "Brandenburg 1 [Pinnock]" : {
            fixTrackName: /Disc 1 - (\d+) - Concerto No\. 1 in F major, BWV 1046_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 2 [Pinnock]" : {
            firstTrackNumber: 5,
            fixTrackName: /Disc 1 - (\d+) - Concerto No\. 2 in F major, BWV 1047_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 3 [Karajan]" : {
            firstTrackNumber: 5,
            fixTrackName: /(\d+) - Brandenburg Concerto No\. 3 in G major, BWV 1048_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 3 [Pinnock]" : {
            firstTrackNumber: 8,
            fixTrackName: /Disc 1 - (\d+) - Concerto No\. 3 in G major, BWV 1048_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 4 [Karajan]" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) - Brandenburg Concerto No\. 4 in G major, BWV 1049_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 4 [Pinnock]" : {
            firstTrackNumber: 11,
            fixTrackName: /Disc 1 - (\d+) - Concerto No\. 4 in G major, BWV 1049_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 5 [Karajan]" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) - Concerto No. 5 in D Major_ l+\. (.*).mp3/
        },
        "Brandenburg 5 [Pinnock]" : {
            fixTrackName: /Disc 2 - (\d+) - Concerto No. 5, BWV 1050_ [IV]+\. (.*).mp3/
        },
        "Brandenburg 6 [Karajan]" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) - Concerto No. 6 in B Flat Major_ l+\. (.*).mp3/
        },
        "Brandenburg 6 [Pinnock]" : {
            firstTrackNumber: 4,
            fixTrackName: /Disc 2 - (\d+) - Concerto No. 6, BWV 1051_ [IV]+\. (.*).mp3/
        },
        "Cantata BWV 51 Jauchzet" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) - Cantata, BWV 51 - \d+\. (.*).mp3/
        },
        "Cantata Ein feste Burg" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) - Cantata No. 80_ [IV]+\. (.*).mp3/
        },
        "Cantata Jesu meine Freunde BWV 227 " : {
            firstTrackNumber: 11,
            fixTrackName: /(\d+) - Jesu, meine Freunde, BW 227_ [IVX]+\.(.*).mp3/
        },
        "CelloSuite1" : {
            fixTrackName: /(\d+) - Cello Suite No. 1 in G major, BWV 1007_ [IVab]+\. (.*)\.mp3/
        },
        "CelloSuite2" : {
            fixTrackName: /(\d+) - Cello Suite No. 2 in D minor, BWV 1008_ [IVab]+\. (.*).mp3/
        },
        "CelloSuite3" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) - Cello Suite No. 3 in C major, BWV 1009_ [IVab]+\. (.*).mp3/
        },
        "CelloSuite4" : {
            firstTrackNumber: 8,
            fixTrackName: /(\d+) - Cello Suite No. 4 in E-flat major, BWV 1010_ [IVab]+\. (.*).mp3/
        },
        "CelloSuite5" : {
            firstTrackNumber: 15,
            fixTrackName: /(\d+) - Cello Suite No. 5 in C minor, BWV 1011_ [IVab]+\. (.*).mp3/
        },
        "CelloSuite6" : {
            firstTrackNumber: 15,
            fixTrackName: /(\d+) - Cello Suite No. 6 in D major, BWV 1012_ [IVab]+\. (.*).mp3/
        },
        "Conc2Violins[Stern] BWV1043" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) - Concerto for Two Violins and Orchestra in D minor, BWV 1043_ [IV]+. (.*).mp3/
        },
        "ConcOboeViolin[Stern] BWV 1060" : {
            firstTrackNumber: 10,
            fixTrackName: /(\d+) - Concerto for Oboe, Violin and Orchestra in C minor, BWV 1060_ [IV]+. (.*).mp3/
        },
        "Opfer" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) - Musikalisches Opfer, BWV 1079_ (.*).mp3/
        },
        "Orchestral Suite 2 [Karajan]" : {
            firstTrackNumber: 11,
            fixTrackName: /(\d+) - Suite for Orchestra No. 2 in B minor, BWV 1067_ [IV]+. (.*).mp3/
        },
        "Orchestral Suite 3 [Karajan]" : {
            firstTrackNumber: 10,
            fixTrackName: /(\d+) - Orchestral Suite No. 3 in D Major_ [lV]+. (.*).mp3/
        },
        "Ouverture 1 [Pinnock]" : {
            firstTrackNumber: 7,
            fixTrackName: /Disc 2 - (\d+) - Ouverture No. 1, BWV 1066_ [IV]+\. (.*)\.mp3/
        },
        "Ouverture 2 [Pinnock]" : {
            fixTrackName: /Disc 3 - (\d+) - Ouverture No. 2, BWV 1067_ [IV]+\. (.*)\.mp3/
        },
        "Ouverture 3 [Pinnock]" : {
            firstTrackNumber: 8,
            fixTrackName: /Disc 3 - (\d+) - Ouverture No. 3, BWV 1068_ [IV]+\. (.*)\.mp3/
        },
        "Ouverture 4 [Pinnock]" : {
            firstTrackNumber: 13,
            fixTrackName: /Disc 3 - (\d+) - Ouverture No. 4, BWV 1069_ [IV]+\. (.*)\.mp3/
        },
        "PianoConc1 BVW1052" : {
            fixTrackName: /(\d+) - Piano Concerto No.1 in D minor, BWV 1052 - \d+. (.*).mp3/
        },
        "PianoConc2 BVW1053" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) - Piano Concerto No.2 in E major, BWV 1053 - \d+. (.*)\.mp3/
        },
        "PianoConc3 BWV1054" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) - Piano Concerto No.3 in D major, BWV 1054 - \d+. (.*).mp3/
        },
        "PianoConc5 BWV1056" : {
            firstTrackNumber: 4,
            fixTrackName: /(\d+) - Piano Concerto No.5 in F minor, BWV 1056 - \d+. (.*).mp3/
        },
        "PianoConc7 BWV1058" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) - Piano Concerto No.7 in G minor, BWV 1058 - \d+. (.*).mp3/
        },
        "PianoWorks[Gould]" : {
            firstTrackNumber: 8
        },
        "PianoPartita1 BWV825" : {
            fixTrackName: /(\d+) - Partita No.1 in G major, BWV 825_ [IV]+\. (.*).mp3/
        },
        "PianoPartita2 BWV826" : {
            firstTrackNumber: 7,
            fixTrackName: /(\d+) - Partita No.2 in C minor, BWV 826_ [IV]+. (.*).mp3/
        },
        "PianoPartita3 BWV827" : {
            firstTrackNumber: 13,
            fixTrackName: /(\d+) - Partita No.3 in C minor, BWV 827_ [IV]+. (.*).mp3/
        },
        "PianoPartita4 BWV828" : {
            firstTrackNumber: 20,
            fixTrackName: /(\d+) - Partita No.4 in D [Mm]ajor, BWV 828[_,\.] [IV]+. (.*).mp3/
        },
        "PianoPartita5 BWV829" : {
           firstTrackNumber: 27,
           fixTrackName: /(\d+) - Partita No.5 in G major, BWV 829[_\.] [IV]+\. (.*)\.mp3/
       },
       "ViolinConc[Stern] BWV 1042" : {
          firstTrackNumber: 4,
          fixTrackName: /(\d+) - Concerto for Violin and Orchestra in E major, BWV 1042_ [IV]+. (.*).mp3/
      }
    };
}
