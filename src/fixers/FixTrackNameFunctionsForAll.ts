import {IFixTrackNameFunctionsForAll} from "../businessInterfaces/fixers/IFixTrackNameFunctionsForAll";
import * as npmlog from "npmlog";

function BachFantasias(name: string, logger: npmlog.NpmLog) : string
{
        if (/Fantasia in .*, BWV \d+/.exec(name)) {
                return name;
        }
        var m = /and Fugue in (.*) (major|minor), BWV (\d+): I+\. (.*)/.exec(name);
        if (m) {
                var key = m[1];
                var opusNumber = m[3];
                var trackName = m[4];
                if (m[2] === "minor") {
                        key = key.toLowerCase();
                }
                return "BWV" + opusNumber + " in " + key + ": " + trackName;
        }
        throw new Error(name + ": mismatch to fixTrackNameFunc() pattern");
}

function BachGoldBergStrings(name: string, logger: npmlog.NpmLog) : string
{
        if (name === "J.S. Bach Goldberg-Variationen, BWV 988 - Aria") {
                return "Aria";
        }
        var match = /J.S. Bach Goldberg-Variationen, BWV 988 - Variatio (\d+)¡E\d+¡E\d+/.exec(name);
        if (!match)
        {
                throw new Error("Error parsing name in Bach - Goldberg - Strings");
        }
        var variationNumber = parseInt(match[1]);
        return "Variations " + variationNumber + "-" + (variationNumber + 2);
}

function BachInventionsGould(name: string, logger: npmlog.NpmLog) : string
{
        var m = /(\d-Part Invention) No\. (\d+) in ([^ ]+) (major|minor), BWV (\d+)/.exec(name);
        if (!m) {
                throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
        }
        var key = m[3];
        if (m[4] === "minor") {
                key = key.toLowerCase();
        }
        return m[1] + " " + m[2] + " " + key + " BWV" + m[5];
}

function BachStJohnPassion(name: string, logger: npmlog.NpmLog) : string
{
        var m = /Johannes-Passion, BWV 245: Teil I+\. (.*)/.exec(name);
        if (m)
        {
                return m[1];
        }
        return name;
}

function WellTempOneFellner(name: string, logger: npmlog.NpmLog) : string
{
        var m = /(Präludium|Fuge) [IVX]+ in ([a-zA-Z]+)-(Dur|Moll), BWV \d+/.exec(name);
        if (m) {
                var type = m[1];
                var key = m[2].toLowerCase();
                if (m[3] === "Dur") {
                        key = key.charAt(0).toUpperCase() + key.slice(1);
                }
                if (type !== "Fuge") {
                        type = "Prelude";
                }
                return type + " in " + key;
        }
        throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
}

function WellTempOneGould(name: string, logger: npmlog.NpmLog) : string
{
        if (name === "Prelude in E-flat minor and Fugue in D-sharp minor, BWV 853: I. Praeludium") {
                return "Prelude in e-flat";
        }
        if (name === "Prelude in E-flat minor and Fugue in D-sharp minor, BWV 853: II. Fuga") {
                return "Fuge in d-sharp"
        }
        var m = /Prelude and Fugue no\. \d+ in ([a-zA-Z\-]+) (major|minor), BWV \d+: [IVX]+\. (Praeludium|Fuga)/.exec(name);
        if (m) {
                var key = m[1].toLowerCase();
                if (m[2] === "major") {
                        key = key.charAt(0).toUpperCase() + key.slice(1);
                }
                var type = m[3];
                if (type === "Fuga") {
                        type = "Fuge";
                }
                if (type === "Praeludium") {
                        type = "Prelude";
                }
                return type + " in " + key;
        }
        throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
}

function WellTempTwoGould(name: string, logger: npmlog.NpmLog) : string
{
        var trackNumber, key, type;
        var m = /Prelude and Fugue No.\d+ in ([a-zA-Z]+) (major|minor) - (Prelude|Fugue)/.exec(name);
        var n = /Prelude (?:&|and) Fugue No.\d+ [Ii]n (.*) ([Mm]ajor|[Mm]inor) (?:- )?(Prelude|Fugue)/.exec(name);
        var o = /(Prelude|Fugue) No.\d+ in (.*) ?(major|minor)?/.exec(name);
        if (m)
        {
                key = m[1].toLowerCase();
                if (m[2].toLowerCase() === "major")
                {
                        key = key.charAt(0).toUpperCase() + key.slice(1);
                }
                type = m[3];
        }
        else if(n)
        {
                key = n[1].toLowerCase();
                if (n[2] === "Major")
                {
                        key = key.charAt(0).toUpperCase() + key.slice(1);
                }
                type = n[3];
        }
        else if (o)
        {
                type = o[1];
                key = o[2].toLowerCase();
                if (o[3] !== "minor")
                {
                        key = key.charAt(0).toUpperCase() + key.slice(1);
                }
        }
        else
        {
                throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
        }
        if (type === "Fugue")
        {
                type = "Fuge";
        }
        return type + " in " + key;
}

function WellTempTwoTureck(name: string, logger: npmlog.NpmLog) : string
{
        var trackNumber, key, type;
        var m = /Prelude and Fugue no. \d+ in (.*) (major|minor), BWV \d+: [IVX]+\. (Praeludium|Fuga)/.exec(name);
        if (m)
        {
                key = m[1].toLowerCase();
                if (m[2].toLowerCase() === "major")
                {
                        key = key.charAt(0).toUpperCase() + key.slice(1);
                }
                type = m[3];
                if (type === "Praeludium")
                {
                        type = "Prelude";
                }
                else if (type === "Fuga")
                {
                        type = "Fuge";
                }
        }
        else
        {
                throw new Error(name + ": mismatch to fixTrackNameFunc() pattern")
        }
        return type + " in " + key;
}

function DiabelliDemidenko(name: string, logger: npmlog.NpmLog) : string
{
        return name === "- Track 3" ? "Theme" : "Variation"
}

function WozzekActOne(name: string, logger: npmlog.NpmLog) : string
{
        if (name === "Wozzeck - Act One - Scene 1 - Langsam, Wozzeck, langsam!") {
                return "Langsam, Wozzeck, langsam!";
        }
        var m = /Scene \d- (.*)/.exec(name);
        if (m) {
                return m[1];
        }
        return name;
}

function TurnOfTheScrewActOne(name: string, logger: npmlog.NpmLog) : string
{
        if (name === "Act 1- Prologue")
        {
                return "Prologue";
        }
        if (name === "Theme - Scene 1 The Journey")
        {
                return "The Journey";
        }
        var m = /Variation [IVX]+ - Scene \d+ (.*)/.exec(name);
        if (!m) {
                throw new Error("Pattern mismatch in Britten/Turn of the screw 1");
        }
        return m[1];
}

function ShostakovichPreludesFugues(name: string, logger: npmlog.NpmLog) : string
{
        var parseFirstFormat = function(name: string)
        {
                var match = /Prelude and Fugue No\.(\d+) in ([A-Za-z]+)( flat| sharp)?( major| minor)? - (Prelude|Fugue)/.exec(name);
                if (!match)
                {
                        return undefined;
                }
                return {
                        number: match[1],
                        key: match[2],
                        sharpOrFlat: match[3],
                        minorOrMajor: match[4],
                        preludeOrFugue: match[5]
                }
        };

        var parseSecondFormat = function(name: string)
        {
                var match = /(Prelude|Fugue) in ([A-Z])( sharp| flat)?( major| minor), Op\. 87 No\. (\d+)/.exec(name);
                if (!match)
                {
                        return undefined;
                }
                return {
                        preludeOrFugue: match[1],
                        key: match[2],
                        sharpOrFlat: match[3],
                        minorOrMajor: match[4],
                        number: match[5]
                }
        };

        var formatKey = function(key: string, sharpOrFlat: string, minorOrMajor: string)
        {
                if (sharpOrFlat === " sharp")
                {
                        key += "#";
                }
                if (sharpOrFlat === " flat")
                {
                        key += "b";
                }
                if (minorOrMajor === " minor")
                {
                        return key.toLowerCase();
                }
                return key;
        };

        var parsed = parseFirstFormat(name) || parseSecondFormat(name);

        if (!parsed)
        {
                throw new Error("Could not parse name in Shostakovich preludes and fugues");
        }

        var formattedKey = formatKey(parsed.key, parsed.sharpOrFlat, parsed.minorOrMajor);

        return parsed.preludeOrFugue + " " + parsed.number + " in " + formattedKey;
}

function VivaldiFourSeasonsMarriner(name: string, logger: npmlog.NpmLog) : string
{
        var match = /Concerto in (.*), op. 8 no. \d, RV \d+ \"(.*)\": I+\. (.*)/.exec(name);
        if (!match)
        {
                logger.error("Could not parse " + name);
                return "parse error";
        }
        return match[2] + " - " + match[3];
}

function VivaldiFourSeasonsKennedy(name: string, logger: npmlog.NpmLog) : string
{
        var match = /Concerto no. \d in (.*), RV \d+ “(.*)”: I+\. (.*)/.exec(name);
        if (!match)
        {
                logger.error("Could not parse " + name);
                return "parse error";
        }
        return match[2] + " - " + match[3];
}

export var FixTrackNameFunctionsForAll : IFixTrackNameFunctionsForAll = {
        "JS Bach" :
        {
                "Fantasias, Preludes and Fugues [Herrick]" :    BachFantasias,
                "Goldberg-Strings":                             BachGoldBergStrings,
                "Inventions[Gould]":                            BachInventionsGould,
                "St. John Passion":                             BachStJohnPassion,
                "WellTemp1 [Fellner]":                          WellTempOneFellner,
                "WellTemp1 [Gould]":                            WellTempOneGould,
                "WellTemp2 [Gould]":                            WellTempTwoGould,
                "WellTemp2 [Tureck]":                           WellTempTwoTureck
        },
        "Beethoven" :
        {
                "Diabelli[Demidenko]":                          DiabelliDemidenko
        },
        "Berg" :
        {
                "Wozzeck1":                                     WozzekActOne
        },
        "Britten":
        {
                "The Turn of the Screw 1":                      TurnOfTheScrewActOne
        },
        "Shostakovich":
        {
                "Preludes-Fugues":                              ShostakovichPreludesFugues
        },
        "Vivaldi":
        {
                "The Four Seasons[Marriner]":                   VivaldiFourSeasonsMarriner,
                "The Four Seasons[Kennedy]":                    VivaldiFourSeasonsKennedy
        }
};
