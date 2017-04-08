// TODO find a way to avoid relative paths
import {FixOptionsForAll} from "./../../businessInterfaces/fixers/FixOptionsForAll";
import {FixOptionsForOneComposer} from "./../../businessInterfaces/fixers/FixOptionsForOneComposer";
import {FixOptionsForOneAlbum} from "./../../businessInterfaces/fixers/FixOptionsForOneAlbum";
import {ClassicalWorkName} from "./../../businessInterfaces/fixers/ClassicalWorkName";
import {ValidationOption} from "./../../businessInterfaces/fixers/ValidationOption";

export class FixOptionsParser
{
        public parseGlobalJsonFile(json: string): FixOptionsForAll
        {
                var result: FixOptionsForAll = {};
                var parsed = JSON.parse(json);
                for (var artist in parsed)
                {
                        if (parsed.hasOwnProperty(artist))
                        {
                                result[artist] = {};
                                for (var album in parsed[artist])
                                {
                                        if (parsed[artist].hasOwnProperty(album))
                                        {
                                                result[artist][album] =
                                                    this.buildAlbumFixer(parsed[artist][album]);
                                        }
                                }
                        }
                }
                return result;
        }
        public parseComposerJsonFile(json: string): FixOptionsForOneComposer
        {
                var result: FixOptionsForOneComposer = {};
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
        public parseAlbumNameFixer(json: string): ClassicalWorkName
        {
                var from = JSON.parse(json);
                return this.buildAlbumNameFixer(from);
        }
        private buildAlbumFixer(from): FixOptionsForOneAlbum
        {
                var firstTrackNumber = this.toNumber(from, "firstTrackNumber");
                var fixTrackName = this.toRegExp(from, "fixTrackName");
                var nameFixOptions = this.toNameFixOption(from, "fixAlbumTitle");
                var albumName = this.toString(from, "albumTitle");
                var validation = this.toValidationOptions(from, "validation");

                return new FixOptionsForOneAlbum(firstTrackNumber, fixTrackName, albumName, nameFixOptions, validation);
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
                return from[field].map(el => {
                        switch (el)
                        {
                        case "skipUniqueTrackNameCheck":
                                return ValidationOption.skipUniqueTrackNameCheck;
                        case "skipTrackNumberCheck": return ValidationOption.skipTrackNumberCheck;
                        default: throw new Error(el + ": Unknown validation option");
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
        private toNameFixOption(from, field: string): ClassicalWorkName | undefined
        {
                return from[field] ? this.buildAlbumNameFixer(from[field]) : undefined;
        }
        private buildAlbumNameFixer(json): ClassicalWorkName
        {
                // TODO throw if more than one elements in keys
                var form = Object.keys(json)[0];
                var body = json[form];

                var instrument = this.toString(body, "for");
                var num = this.toNumber(body, "num");
                // TODO throw if opus has the wrong number of elements
                // TODO support different opus prefixes
                var opus = this.parseOpus(body);
                var subTitle = this.toString(body, "subTitle");
                var performer = this.toString(body, "by");
                // TODO throw if major and minor are both given
                var major = this.toString(body, "major");
                var minor = this.toString(body, "minor");

                return new ClassicalWorkName(form, instrument, num, opus, subTitle, performer, major, minor);
        }
        private parseOpus(from): number | number[] | undefined
        {
                if (!from.opus)
                {
                        return undefined;
                }

                if (Array.isArray(from.opus))
                {
                        this.validateLengthIsTwo(from.opus);
                        return from.opus;
                }

                if (this.isNumber(from.opus))
                {
                        return from.opus;
                }

                throw new Error("Invalid data for opus");
        }
        private validateLengthIsTwo(item: string[])
        {
                if (item.length !== 2)
                {
                        throw new Error("invalid opus array, should have two elements");
                }
        }
}
