import {ClassicalWorkName} from "./../../businessInterfaces/fixers/ClassicalWorkName";

// TODO remove this whole thing
export class AlbumNameFactory
{
        public create(format: ClassicalWorkName) : string
        {
                var result: string[] = []; // TODO array syntax is better here?
                if (format.instrument)
                {
                        result.push(format.instrument);
                }
                result.push(format.form);
                if (format.num)
                {
                        result.push(format.num + "");
                }
                if (format.by)
                {
                        result.push("[" + format.by + "]");
                }
                if (format.subTitle)
                {
                        result.push("\"" + format.subTitle + "\"");
                }
                var key = this.getKey(format);
                if (key)
                {
                        result.push(key);
                }
                var opus = this.getOpus(format);
                if (opus)
                {
                        result.push(opus);
                }
                return result.join(" ");
        }
        private getKeySignature(format: ClassicalWorkName) : string | undefined
        {
                var key = this.getKey(format);
                var mode = this.getMode(format);
                if (key && mode)
                {
                        key = key.toLowerCase();
                        if (mode === "major")
                        {
                                key = key.charAt(0).toUpperCase() + key.slice(1);
                        }
                        return "in " + key;
                }
                return undefined;
        }
        private getKey(format: ClassicalWorkName) : string | undefined
        {
                if (format.major) return format.major;
                if (format.minor) return format.minor;
                return undefined;
        }
        private getMode(format: ClassicalWorkName) : string | undefined
        {
                if (format.major) return "major"; // TODO enum
                if (format.minor) return "minor";
                return undefined;
        }
        private getOpus(format: ClassicalWorkName) : string | undefined
        {
                if (!format.opus)
                {
                        return undefined;
                }

                var prefix = this.getOpusPrefix(format);

                if (format.opus instanceof Array)
                {
                        return prefix + format.opus[0] + "-" + format.opus[1];
                }

                return prefix + format.opus;
        }
        private getOpusPrefix(format: ClassicalWorkName) : string
        {
                return "Op.";
        }
}
