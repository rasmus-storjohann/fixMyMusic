// TODO rename Fix
export interface AlbumFixer {
        firstTrackNumber?: number,
            fixTrackName?: string, // TODO should be regexp
            fixAlbumTitle?: AlbumNameFixer
}

// TODO rename AlbumNameFix
export interface AlbumNameFixer {
        concerto: AlbumNameFixerAttr
}

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
        public parse(json: string): any
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
                return this.buildAlbumNameFixer(from);
        }
        public buildAlbumNameFixer(from): AlbumNameFixer
        {
                var to: AlbumNameFixerAttr = {};

                var kind = Object.keys(from)[0];
                var contents = from[kind];

                this.parseOptionalString(contents, to, "for");
                this.parseOptionalString(contents, to, "subTitle");
                this.parseOptionalString(contents, to, "by");
                this.parseOptionalNumber(contents, to, "num");
                this.parseOpus(contents, to);
                this.parseKeyAndMode(contents, to);

                return { concerto: to };
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
