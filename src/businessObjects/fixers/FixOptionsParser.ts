import {FixOptionsForAll} from "./../../businessInterfaces/fixers/FixOptionsForAll";
import {FixOptionsForOneArtist} from "./../../businessInterfaces/fixers/FixOptionsForOneArtist";
import {FixOptionsForOneAlbum} from "./../../businessInterfaces/fixers/FixOptionsForOneAlbum";
import {ClassicalWorkName} from "./../../businessInterfaces/fixers/ClassicalWorkName";
import {Opus} from "./../../businessInterfaces/fixers/Opus";
import {ValidationOption} from "./../../businessInterfaces/fixers/ValidationOption";

export class FixOptionsParser
{
        // TODO parser should throw on both albumName and fixAlbumTitle being defined
        public parseGlobalJsonFile(json: string): FixOptionsForAll
        {
                var result: FixOptionsForAll = {};
                var parsed = JSON.parse(json);
                for (var artist in parsed)
                {
                        if (parsed.hasOwnProperty(artist))
                        {
                                result[artist] = new FixOptionsForOneArtist();
                                for (var album in parsed[artist])
                                {
                                        if (parsed[artist].hasOwnProperty(album))
                                        {

                                                result[artist][album] = this.buildAlbumFixer(parsed[artist][album]);
                                        }
                                }
                        }
                }
                return result;
        }

        public parseArtistJsonFile(json: string): FixOptionsForOneArtist
        {
                var result = new FixOptionsForOneArtist();
                var parsed = JSON.parse(json);
                for (var album in parsed)
                {
                        if (parsed.hasOwnProperty(album))
                        {
                                result[album] = this.buildAlbumFixer(parsed[album]);
                        }
                }
                return result;
        }

        public parseAlbumFixer(json: string): FixOptionsForOneAlbum
        {
                var parsed = JSON.parse(json);
                return this.buildAlbumFixer(parsed);
        }

        public parseClassicalWorkName(json: string): ClassicalWorkName
        {
                var from = JSON.parse(json);
                return this.buildClassicalWorkName(from);
        }

        private buildAlbumFixer(from): FixOptionsForOneAlbum
        {
                var firstTrackNumber = this.toNumber(from, "firstTrackNumber");
                var fixTrackName = this.toRegExp(from, "fixTrackName");
                var classicalWorkName = this.toClassicalWorkName(from, "fixAlbumTitle");
                var albumName = this.toString(from, "albumTitle");
                var validation = this.toValidationOptions(from, "validation");
                var fixTrackNameFunction = undefined;

                var options = {
                        firstTrackNumber: firstTrackNumber,
                        fixTrackName: fixTrackName,
                        fixTrackNameFunction: fixTrackNameFunction,
                        albumName: albumName,
                        fixAlbumTitle: classicalWorkName,
                        validation: validation
                };

                return this.StripUndefinedFieldsFromFixOptionsForOneAlbum(options);
        }

        private StripUndefinedFieldsFromFixOptionsForOneAlbum(options: FixOptionsForOneAlbum): FixOptionsForOneAlbum
        {
                Object.keys(options).forEach((key) => (options[key] == null) && delete options[key]);
                return options;
        }

        private toString(from, field: string): string | undefined
        {
                return this.isString(from[field]) ? from[field] + "" : undefined;
        }

        private toRegExp(from, field: string): RegExp | undefined
        {
                return this.isString(from[field]) ? new RegExp(from[field]) : undefined;
        }

        private toValidationOptions(from, field): ValidationOption[] | undefined
        {
                if (!this.isStringArray(from[field]))
                {
                        return undefined;
                }
                return from[field].map(element => {
                        switch (element)
                        {
                        case "skipUniqueTrackNameCheck":
                                return ValidationOption.skipUniqueTrackNameCheck;
                        case "skipTrackNumberCheck":
                                return ValidationOption.skipTrackNumberCheck;
                        default:
                                throw new Error(element + ": Unknown validation option");
                        }
                });
        }

        private toStringArray(from, field: string): string[] | undefined
        {
                return this.isStringArray(from[field]) ? from[field] : undefined;
        }

        private toNumber(from, field): number | undefined
        {
                return this.isNumber(from[field]) ? from[field] + 0 : undefined;
        }

        private isString(s: any): boolean { return s && s + "" === s; }

        private isNumber(n: any): boolean { return n && n + 0 === n; }

        private isStringArray(s: any): boolean
        {
                return s && s.length && s.every(item => this.isString(item));
        }

        private toClassicalWorkName(from, field: string): ClassicalWorkName | undefined
        {
                return from[field] ? this.buildClassicalWorkName(from[field]) : undefined;
        }

        private buildClassicalWorkName(json): ClassicalWorkName
        {
                // TODO throw if more than one elements in keys
                // TODO throw if opus has the wrong number of elements
                // TODO support different opus prefixes
                // TODO throw if major and minor are both given
                var form = Object.keys(json)[0];
                var body = json[form];

                var instrument = this.toString(body, "for");
                var num = this.toNumber(body, "num");
                var opus = this.parseOpus(body);
                var subTitle = this.toString(body, "subTitle");
                var performer = this.toString(body, "by");
                var major = this.toString(body, "major");
                var minor = this.toString(body, "minor");

                var result = new ClassicalWorkName(form, instrument, num, opus, subTitle, performer, major, minor);

                return this.validateClassicalWorkName(result);
        }

        private parseOpus(from): Opus | undefined
        {
                var validPrefixes = ["op", "K", "R", "BWV", "HWV"];
                for (let prefix of validPrefixes)
                {
                        var opus = from[prefix];
                        if (Array.isArray(opus))
                        {
                                this.validateLengthIsTwo(opus);
                                return {
                                        opus: opus[0],
                                        num: opus[1],
                                        prefix: prefix
                                };
                        }
                        else if (this.isNumber(opus))
                        {
                                return {
                                        opus: opus,
                                        prefix: prefix
                                };
                        }
                }
                return undefined;
        }

        private validateClassicalWorkName(name: ClassicalWorkName) : ClassicalWorkName
        {
                this.removeUndefinedFields(name);
                this.validateMajorMinor(name);
                return name;
        }

        private removeUndefinedFields(anObject: any)
        {
                Object.keys(anObject).forEach((key) => (anObject[key] == null) && delete anObject[key]);
        }

        private validateMajorMinor(name: ClassicalWorkName) : void
        {
                if (name.major && name.minor)
                {
                        throw new Error("major and minor keys given");
                }
        }

        private validateLengthIsTwo(item: string[])
        {
                if (item.length !== 2)
                {
                        throw new Error("invalid opus array, should have two elements");
                }
        }
}
