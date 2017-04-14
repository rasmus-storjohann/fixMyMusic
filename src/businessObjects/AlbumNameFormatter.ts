import {ClassicalWorkName} from "../businessInterfaces/fixers/ClassicalWorkName";
import {Opus} from "../businessInterfaces/fixers/Opus";

export class AlbumNameFormatter
{
        public create(format: ClassicalWorkName): string
        {
                var result = "";
                if (format.instrument)
                {
                        result += format.instrument;
                }
                result += this.buildForm(format.form);
                if (format.num)
                {
                        result += " " + format.num; // TODO this can give a leading space
                }
                if (format.by)
                {
                        result += " [" + format.by + "]";
                }
                if (format.subTitle)
                {
                        result += " \"" + format.subTitle + "\"";
                }
                var key = this.buildKeyString(format);
                if (key)
                {
                        result += " in " + key;
                }
                if (format.opus)
                {
                        result += " " + this.buildOpusString(format.opus);
                }
                return result;
        }

        private buildForm(form: string): string
        {
                switch (form)
                {
                case "cantata": return "Cantata";
                case "concerto": return "Conc";
                case "grosso": return "ConcGrosso";
                case "quartet": return "Quartet";
                case "quintet": return "Quintet";
                case "sonata": return "Sonata";
                case "suite": return "Suite";
                case "symphony": return "Symph";
                case "trio": return "Trio";
                }
                return form;
        }

        private buildKeyString(format: ClassicalWorkName): string | undefined
        {
                var key = format.major || format.minor;

                if (!key)
                {
                        return undefined;
                }

                key = key.toLowerCase();

                if (format.major)
                {
                        return this.capitalizeFirstLetter(key);
                }

                return key;
        }

        private capitalizeFirstLetter(key: string): string
        {
                return key.charAt(0).toUpperCase() + key.slice(1);
        }

        private buildOpusString(opus: Opus): string | undefined
        {
                var prefix = opus.prefix;
                if (prefix === "op")
                {
                        prefix = "Op.";
                }
                var result = prefix + opus.opus;
                if (opus.num)
                {
                        result += "-" + opus.num;
                }
                return result;
        }
}
