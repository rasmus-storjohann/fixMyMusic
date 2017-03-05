import {ValidationOption} from "./businessInterfaces/fixers/ValidationOption";
import {FixOptionsForOneComposer} from "./businessInterfaces/fixers/FixOptionsForOneComposer";
import {GlobalFixOptions} from "./businessInterfaces/fixers/GlobalFixOptions";
import {FixOptions} from "./businessInterfaces/fixers/FixOptions";
import {AlbumNameFixOptions} from "./businessInterfaces/fixers/AlbumNameFixOptions";
import {NameOptions} from "./businessInterfaces/fixers/NameOptions";

export class FixOptionsParser
{
        public parseGlobalJsonFile(json: string): GlobalFixOptions
        {
                var result: GlobalFixOptions = {};
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
        public parseAlbumFixer(json: string): FixOptions
        {
                var parsed = JSON.parse(json);
                return this.buildAlbumFixer(parsed);
        }
        public parseAlbumNameFixer(json: string): AlbumNameFixOptions
        {
                var from = JSON.parse(json);
                return this.buildAlbumNameFixer(from);
        }
        private buildAlbumFixer(from): FixOptions
        {
                var firstTrackNumber = this.toNumber(from, "firstTrackNumber");
                var fixTrackName = this.toRegExp(from, "fixTrackName");
                var nameFixOptions = this.toNameFixOption(from, "fixAlbumTitle");
                var validation = this.toValidationOptions(from, "validation");

                return new FixOptions(firstTrackNumber, fixTrackName, nameFixOptions, validation);
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
        private toNameFixOption(from, field: string): AlbumNameFixOptions | undefined
        {
                return from[field] ? this.buildAlbumNameFixer(from[field]) : undefined;
        }
        private buildAlbumNameFixer(json): AlbumNameFixOptions
        {
                var form = Object.keys(json)[0];
                var body = json[form];

                var instrument = this.toString(body, "for");
                var num = this.toNumber(body, "num");
                var opus = this.parseOpus(body);
                var subTitle = this.toString(body, "subTitle");
                var performer = this.toString(body, "by");
                var major = this.toString(body, "major");
                var minor = this.toString(body, "minor");

                var albumNameOptions =
                    new NameOptions(instrument, num, opus, subTitle, performer, major, minor);

                return AlbumNameFixOptions.buildFromForm(form, albumNameOptions);
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
