// TODO rename Fix
export interface AlbumFixer {
        firstTrackNumber?: number,
            fixTrackName?: string, // TODO should be regexp
            fixAlbumTitle?: AlbumNameFixer
}

// TODO rename AlbumNameFix
export interface AlbumNameFixer {
        form: string, instrument?: string, num?: number, opus?: number,
            opus_number?: number, subTitle?: string, performer?: string,
            mode?: string, key?: string
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
        private parseOptionalString(from, to, field: string, toField?: string)
        {
                if (!from[field]) return;

                var fieldToAssignTo = toField || field;
                to[fieldToAssignTo] = from[field] + "";
        }
        private parseOptionalStringArray(from, to, field: string)
        {
                if (!from[field]) return;

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
                var to: AlbumNameFixer = {form : from.form + ""};

                // TODO don't change the names of the fields, this should be a pure parser
                this.parseOptionalString(from, to, "for", "instrument");
                this.parseOptionalString(from, to, "subTitle");
                this.parseOptionalString(from, to, "by", "performer");
                this.parseOptionalNumber(from, to, "num");
                this.parseOpus(from, to);
                this.parseKeyAndMode(from, to);

                return to;
        }
        private parseOpus(from, to)
        {
                if (!from.opus) return;

                if (Array.isArray(from.opus))
                {
                        this.validateLengthIsTwo(from.opus);
                        to.opus = from.opus[0] + 0;
                        to.opus_number = from.opus[1] + 0;
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
        private parseKeyAndMode(from, to)
        {
                if (from.major && from.minor)
                {
                        throw new Error("major and minor keys given");
                }
                if (from.major)
                {
                        to.mode = "major";
                        to.key = from.major + "";
                }
                if (from.minor)
                {
                        to.mode = "minor";
                        to.key = from.minor + "";
                }
        }
}
