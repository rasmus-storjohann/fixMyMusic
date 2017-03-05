export class FixOptions {
        constructor(
                readonly firstTrackNumber?: number,
                readonly fixTrackName?: string, // TODO should be regexp
                readonly fixAlbumTitle?: AlbumNameFixOptions,
                readonly validation?: string[] // TODO should be an enum
        )
        {
                var myObj = this;
                Object.keys(myObj).forEach((key) => (myObj[key] == null) && delete myObj[key]);
        }
}

// TODO this should be a class with a validating constructor, since exactly one of the members should be set
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
                var myObj = this;
                Object.keys(myObj).forEach((key) => (myObj[key] == null) && delete myObj[key]);

                if (this.major && minor)
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

                var fixAlbumTitle: AlbumNameFixOptions | string | undefined = undefined;
                if (from.fixAlbumTitle)
                {
                        fixAlbumTitle = this.buildAlbumNameFixer(from.fixAlbumTitle);
                }

                return new FixOptions(firstTrackNumber, fixTrackName, fixAlbumTitle, validation);
        }
        private parseOptionalString(from, field: string) : string | undefined
        {
                if (from[field])
                {
                        return from[field] + "";
                }

        }
        private parseOptionalStringArray(from, field: string) : string[] | undefined
        {
                if (from[field])
                {
                        // TODO validate that this really is a string array
                        return from[field];
                }
        }
        private parseOptionalNumber(from, field): number | undefined
        {
                if (from[field])
                {
                        return from[field] + 0;
                }
        }
        public parseAlbumNameFixer(json: string): AlbumNameFixOptions
        {
                var from = JSON.parse(json);
                return this.buildAlbumNameFixer(from); // TODO type system fail
        }
        private buildAlbumNameFixer(from): AlbumNameFixOptions | string
        {
                // TODO fix json to never get here, use a different key
                if (typeof from === "string")
                {
                        return from;
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
        private validateLengthIsTwo(item: Array<string>)
        {
                if (item.length !== 2)
                {
                        throw new Error(
                            "invalid opus array, should have two elements");
                }
        }
}
