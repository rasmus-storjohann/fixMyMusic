function removeUndefinedFields(anObject: any)
{
        // does this remove elements that are falsy, such as "", false, 0?
        Object.keys(anObject).forEach((key) => (anObject[key] == null) && delete anObject[key]);
}

export class FixOptions {
        constructor(
                readonly firstTrackNumber?: number,
                readonly fixTrackName?: string, // TODO should be regexp
                readonly fixAlbumTitle?: AlbumNameFixOptions,
                readonly validation?: string[] // TODO should be an enum
        )
        {
                removeUndefinedFields(this);
        }
}

export interface AlbumNameFixOptions {
        cantata?: AlbumNameOptions,
        concerto?: AlbumNameOptions,
        grosso?: AlbumNameOptions,
        quartet?: AlbumNameOptions,
        quintet?: AlbumNameOptions,
        sonata?: AlbumNameOptions,
        suite?: AlbumNameOptions,
        symphony?: AlbumNameOptions,
        trio?: AlbumNameOptions
}

export class AlbumNameOptions {
        constructor(
                readonly instrument?: string,
                readonly num?: number,
                readonly opus?: number | number[],
                readonly subTitle?: string,
                readonly by?: string,
                readonly major?: string,
                readonly minor?: string
        )
        {
                removeUndefinedFields(this);
                this.validateMajorAndMinorAreNotBothDefined();
                // also opus length is 1 or two
        }
        private validateMajorAndMinorAreNotBothDefined()
        {
                if (this.major && this.minor)
                {
                        throw new Error("major and minor keys given");
                }
        }
}

export class FixOptionsParser
{
        public parseGlobalJsonFile(json: string) : any
        {
                var result = {};
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
                                                result[artist][album] = this.buildAlbumFixer(parsed[artist][album]);
                                        }
                                }
                        }
                }
                return result;
        }
        public parseComposerJsonFile(json: string): any // TODO should return hash from string to AlbumFixer
        {
                var result = {};
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
        private buildAlbumFixer(from): FixOptions
        {
                var firstTrackNumber = this.parseOptionalNumber(from, "firstTrackNumber");
                var fixTrackName = this.parseOptionalString(from, "fixTrackName");
                var validation = this.parseOptionalStringArray(from, "validation");

                var fixAlbumTitle: AlbumNameFixOptions | undefined = undefined;
                if (from.fixAlbumTitle)
                {
                        fixAlbumTitle = this.buildAlbumNameFixer(from.fixAlbumTitle);
                }

                return new FixOptions(firstTrackNumber, fixTrackName, fixAlbumTitle, validation);
        }
        private parseOptionalString(from, field: string) : string | undefined
        {
                return this.isString(from[field]) ? from[field] + "" : undefined;
        }
        private isString(s: any) : boolean
        {
                return s && s + "" === s;
        }
        private parseOptionalStringArray(from, field: string) : string[] | undefined
        {
                return this.isStringArray(from[field]) ? from[field] : undefined;
        }
        private isStringArray(s: any) : boolean
        {
                return s && s.length && s.every(element => element + "" === element);
        }
        private parseOptionalNumber(from, field): number | undefined
        {
                return this.isNumber(from[field]) ? from[field] + 0 : undefined;
        }
        private isNumber(s: any) : boolean
        {
                return s && s + 0 === s;
        }
        public parseAlbumNameFixer(json: string): AlbumNameFixOptions
        {
                var from = JSON.parse(json);
                return this.buildAlbumNameFixer(from); // TODO type system fail
        }
        private buildAlbumNameFixer(from): AlbumNameFixOptions
        {
                // TODO fix json to never get here, use a different key
                if (typeof from === "string")
                {
                        throw new Error(from + ": Invalid album name fixer");
                }

                var kind = Object.keys(from)[0];
                var contents = from[kind];

                var instrument = this.parseOptionalString(contents, "for");
                var num = this.parseOptionalNumber(contents, "num");
                var opus = this.parseOpus(contents);
                var subTitle = this.parseOptionalString(contents, "subTitle");
                var performer = this.parseOptionalString(contents, "by");
                var major = this.parseOptionalString(contents, "major");
                var minor = this.parseOptionalString(contents, "minor");

                var albumNameOptions = new AlbumNameOptions(instrument, num, opus, subTitle, performer, major, minor);

                switch(kind)
                {
                        case "concerto": { return { concerto: albumNameOptions }; }
                        case "grosso": { return { grosso: albumNameOptions }; }
                        case "sonata": { return { sonata: albumNameOptions }; }
                        case "quartet": { return { quartet: albumNameOptions }; }
                        case "quintet": { return { quintet: albumNameOptions }; }
                        case "cantata": { return { cantata: albumNameOptions }; }
                        case "symphony": { return { symphony: albumNameOptions }; }
                        case "suite": { return { suite: albumNameOptions }; }
                        case "trio": { return { trio: albumNameOptions }; }

                        default: { throw new Error(kind + ": Invalid form"); }
                }
        }
        private parseOpus(from) : number | number[] | undefined
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
                else
                {
                        return from.opus + 0;
                }
        }
        private validateLengthIsTwo(item: string[])
        {
                if (item.length !== 2)
                {
                        throw new Error(
                            "invalid opus array, should have two elements");
                }
        }
}
