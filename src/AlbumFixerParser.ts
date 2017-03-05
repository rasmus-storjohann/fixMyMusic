// TODO rename FixOptions
// TODO everything should be read only
// TODO this should be a class with a validating constructor
export interface AlbumFixer {
        firstTrackNumber?: number,
        fixTrackName?: string, // TODO should be regexp
        fixAlbumTitle?: AlbumNameFixer
}

// TODO rename AlbumNameFixOption
// TODO this should be a class with a validating constructor
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
// TODO this should be a class with a validating constructor
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
        public parse(json: string): any // TODO should be hash from string to AlbumFixer
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
        public buildAlbumFixer(from): AlbumFixer
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
                if (!from[field]) return;

                to[field] = from[field] + "";
        }
        private parseOptionalStringArray(from, to, field: string)
        {
                if (!from[field]) return;
                // TODO validate that this really is a string array
                to[field] = from[field];
        }
        private parseOptionalNumber(from, to, field)
        {
                if (!from[field]) return;

                to[field] = from[field] + 0;
        }
        public parseAlbumNameFixer(json: string): AlbumNameFixer
        {
                var from = JSON.parse(json);
                return this.buildAlbumNameFixer(from); // TODO type system fail
        }
        public buildAlbumNameFixer(from): AlbumNameFixer | string
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

                if (kind === "concerto") { return { concerto: to }; }
                if (kind === "grosso") { return { grosso: to }; }
                if (kind === "sonata") { return { sonata: to }; }
                if (kind === "quartet") { return { quartet: to }; }
                if (kind === "quintet") { return { quintet: to }; }
                if (kind === "cantata") { return { cantata: to }; }
                if (kind === "symphony") { return { symphony: to }; }
                if (kind === "suite") { return { suite: to }; }
                if (kind === "trio") { return { trio: to }; }

                throw new Error(kind + ": Invalid form in " + from.toString());
        }
        private parseOpus(from, to: AlbumNameFixerAttr)
        {
                if (!from.opus) return;

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
