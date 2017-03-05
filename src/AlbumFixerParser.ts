// TODO rename FixOptions
// TODO everything should be read only
export interface AlbumFixer {
        firstTrackNumber?: number,
        fixTrackName?: string, // TODO should be regexp
        fixAlbumTitle?: AlbumNameFixer
}

// TODO rename AlbumNameFixOption
// TODO this should be a class with a validating constructor, since exactly one of the members should be set
export interface AlbumNameFixer {
        cantata?: AlbumNameFixerAttr,
        concerto?: AlbumNameFixerAttr,
        grosso?: AlbumNameFixerAttr,
        quartet?: AlbumNameFixerAttr,
        quintet?: AlbumNameFixerAttr,
        sonata?: AlbumNameFixerAttr,
        suite?: AlbumNameFixerAttr,
        symphony?: AlbumNameFixerAttr,
        trio?: AlbumNameFixerAttr
}

// TODO rename AlbumNameFixAttributes
// TODO this should be a class with a validating constructor, e.g. both major and minor can not be set
export interface AlbumNameFixerAttr {
        instrument?: string,
        num?: number,
        opus?: number | number[],
        subTitle?: string,
        performer?: string,
        major?: string,
        minor?: string
}

// TODO rename FixParser
export class AlbumFixerParser
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
        public parseAlbumFixer(json: string): AlbumFixer
        {
                var parsed = JSON.parse(json);
                return this.buildAlbumFixer(parsed);
        }
        private buildAlbumFixer(from): AlbumFixer
        {
                var to: AlbumFixer = {};

                this.parseOptionalNumber(from, to, "firstTrackNumber");
                this.parseOptionalString(from, to, "fixTrackName");
                this.parseOptionalStringArray(from, to, "validation");

                if (from.fixAlbumTitle)
                {
                        to.fixAlbumTitle =
                            this.buildAlbumNameFixer(from.fixAlbumTitle);
                }
                return to;
        }
        private parseOptionalString(from, to, field: string)
        {
                if (from[field])
                {
                        to[field] = from[field] + "";
                }

        }
        private parseOptionalStringArray(from, to, field: string)
        {
                if (from[field])
                {
                        // TODO validate that this really is a string array
                        to[field] = from[field];
                }
        }
        private parseOptionalNumber(from, to, field)
        {
                if (from[field])
                {
                        to[field] = from[field] + 0;
                }
        }
        public parseAlbumNameFixer(json: string): AlbumNameFixer
        {
                var from = JSON.parse(json);
                return this.buildAlbumNameFixer(from); // TODO type system fail
        }
        private buildAlbumNameFixer(from): AlbumNameFixer | string
        {
                // TODO fix json to never get here, use a different key
                if (typeof from === "string")
                {
                        return from;
                }

                var to: AlbumNameFixerAttr = {};

                var kind = Object.keys(from)[0];
                var contents = from[kind];

                this.parseOptionalString(contents, to, "for");
                this.parseOptionalString(contents, to, "subTitle");
                this.parseOptionalString(contents, to, "by");
                this.parseOptionalNumber(contents, to, "num");
                this.parseOpus(contents, to);
                this.parseKeyAndMode(contents, to);

                switch(kind)
                {
                        case "concerto": { return { concerto: to }; }
                        case "grosso": { return { grosso: to }; }
                        case "sonata": { return { sonata: to }; }
                        case "quartet": { return { quartet: to }; }
                        case "quintet": { return { quintet: to }; }
                        case "cantata": { return { cantata: to }; }
                        case "symphony": { return { symphony: to }; }
                        case "suite": { return { suite: to }; }
                        case "trio": { return { trio: to }; }
                        default: { throw new Error(kind + ": Invalid form"); }
                }
        }
        private parseOpus(from, to: AlbumNameFixerAttr)
        {
                if (!from.opus)
                {
                        return;
                }

                if (Array.isArray(from.opus))
                {
                        this.validateLengthIsTwo(from.opus);
                        to.opus = from.opus;
                }
                else
                {
                        to.opus = from.opus + 0;
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
        private parseKeyAndMode(from, to: AlbumNameFixerAttr)
        {
                if (from.major && from.minor)
                {
                        throw new Error("major and minor keys given");
                }
                if (from.major)
                {
                        to.major = from.major + "";
                }
                if (from.minor)
                {
                        to.minor = from.minor + "";
                }
        }
}
