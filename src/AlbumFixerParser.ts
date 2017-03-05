function removeUndefinedFields(anObject: any)
{
        // does this remove elements that are falsy, such as "", false, 0?
        Object.keys(anObject).forEach((key) => (anObject[key] == null) && delete anObject[key]);
}

export class FixOptions
{
        constructor(readonly firstTrackNumber?: number, readonly fixTrackName?: RegExp,
                    readonly fixAlbumTitle?: AlbumNameFixOptions,
                    readonly validation?: string[] // TODO should be an enum
                    )
        {
                removeUndefinedFields(this);
        }
}

export interface IAlbumNameFixOptions {
        cantata?: NameOptions, concerto?: NameOptions, grosso?: NameOptions, quartet?: NameOptions,
            quintet?: NameOptions, sonata?: NameOptions, suite?: NameOptions,
            symphony?: NameOptions, trio?: NameOptions
}

export class AlbumNameFixOptions
{
        cantata?: NameOptions;
        concerto?: NameOptions;
        grosso?: NameOptions;
        quartet?: NameOptions;
        quintet?: NameOptions;
        sonata?: NameOptions;
        suite?: NameOptions;
        symphony?: NameOptions;
        trio?: NameOptions;

        static buildFromForm(form: string, nameOptions: NameOptions)
        {
                switch (form)
                {
                case "concerto": { return new AlbumNameFixOptions({concerto : nameOptions});
                }
                case "grosso": { return new AlbumNameFixOptions({grosso : nameOptions});
                }
                case "sonata": { return new AlbumNameFixOptions({sonata : nameOptions});
                }
                case "quartet": { return new AlbumNameFixOptions({quartet : nameOptions});
                }
                case "quintet": { return new AlbumNameFixOptions({quintet : nameOptions});
                }
                case "cantata": { return new AlbumNameFixOptions({cantata : nameOptions});
                }
                case "symphony": { return new AlbumNameFixOptions({symphony : nameOptions});
                }
                case "suite": { return new AlbumNameFixOptions({suite : nameOptions});
                }
                case "trio": { return new AlbumNameFixOptions({trio : nameOptions});
                }

                default: { throw new Error(form + ": Invalid form");
                }
                }
        }

        constructor(options: IAlbumNameFixOptions)
        {
                this.cantata = options.cantata;
                this.concerto = options.concerto;
                this.grosso = options.grosso;
                this.quartet = options.quartet;
                this.quintet = options.quintet;
                this.sonata = options.sonata;
                this.suite = options.suite;
                this.symphony = options.symphony;
                this.trio = options.trio;

                removeUndefinedFields(this);
                this.validateOnlyOneFieldIsSet();
        }

        private validateOnlyOneFieldIsSet()
        {
                if (Object.keys(this).length !== 1)
                {
                        throw new Error("Album name fix spec has more than one entry");
                }
        }
}

export class NameOptions
{
        constructor(readonly instrument?: string, readonly num?: number,
                    readonly opus?: number | number[], readonly subTitle?: string,
                    readonly by?: string, readonly major?: string, readonly minor?: string)
        {
                removeUndefinedFields(this);
                this.validateMajorMinor();
                this.validateOpus();
        }
        private validateMajorMinor()
        {
                if (this.major && this.minor)
                {
                        throw new Error("major and minor keys given");
                }
        }
        private validateOpus()
        {
                if (this.opus && typeof this.opus !== "number" && this.opus.length !== 2)
                {
                        throw new Error("opus must be number or array of two numbers");
                }
        }
}

export class FixOptionsParser
{
        public parseGlobalJsonFile(json: string): any
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
                                                result[artist][album] =
                                                    this.buildAlbumFixer(parsed[artist][album]);
                                        }
                                }
                        }
                }
                return result;
        }
        public parseComposerJsonFile(json: string):
            any // TODO should return hash from string to AlbumFixer
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
        public parseAlbumNameFixer(json: string): AlbumNameFixOptions
        {
                var from = JSON.parse(json);
                return this.buildAlbumNameFixer(from);
        }
        private buildAlbumFixer(from): FixOptions
        {
                var firstTrackNumber = this.parseOptionalNumber(from, "firstTrackNumber");
                var fixTrackName = this.parseOptionalRegExp(from, "fixTrackName");
                var nameFixOptions = this.parseOptionalNameFixOptions(from, "fixAlbumTitle");
                var validation = this.parseOptionalStringArray(from, "validation");

                return new FixOptions(firstTrackNumber, fixTrackName, nameFixOptions, validation);
        }
        private parseOptionalString(from, field: string): string | undefined
        {
                return this.isString(from[field]) ? from[field] + "" : undefined;
        }
        private parseOptionalRegExp(from, field: string): RegExp | undefined
        {
                return this.isString(from[field]) ? new RegExp(from[field]) : undefined;
        }
        private parseOptionalStringArray(from, field: string): string[] | undefined
        {
                return this.isStringArray(from[field]) ? from[field] : undefined;
        }
        private parseOptionalNumber(from, field): number | undefined
        {
                return this.isNumber(from[field]) ? from[field] + 0 : undefined;
        }
        private isString(s: any): boolean { return s && s + "" === s; }
        private isNumber(n: any): boolean { return n && n + 0 === n; }
        private isStringArray(s: any): boolean
        {
                return s && s.length && s.every(item => this.isString(item));
        }
        private parseOptionalNameFixOptions(from, field: string): AlbumNameFixOptions | undefined
        {
                return from[field] ? this.buildAlbumNameFixer(from[field]) : undefined;
        }
        private buildAlbumNameFixer(json): AlbumNameFixOptions
        {
                var form = Object.keys(json)[0];
                var body = json[form];

                var instrument = this.parseOptionalString(body, "for");
                var num = this.parseOptionalNumber(body, "num");
                var opus = this.parseOpus(body);
                var subTitle = this.parseOptionalString(body, "subTitle");
                var performer = this.parseOptionalString(body, "by");
                var major = this.parseOptionalString(body, "major");
                var minor = this.parseOptionalString(body, "minor");

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
