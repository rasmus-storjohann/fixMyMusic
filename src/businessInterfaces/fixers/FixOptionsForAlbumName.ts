import {ParametersForAlbumName} from "./ParametersForAlbumName";
import {IAlbumNameFixOptions} from "./IAlbumNameFixOptions";
import {removeUndefinedFields} from "./removeUndefinedFields";

export class FixOptionsForAlbumName
{
        readonly cantata?: ParametersForAlbumName;
        readonly concerto?: ParametersForAlbumName;
        readonly grosso?: ParametersForAlbumName;
        readonly quartet?: ParametersForAlbumName;
        readonly quintet?: ParametersForAlbumName;
        readonly sonata?: ParametersForAlbumName;
        readonly suite?: ParametersForAlbumName;
        readonly symphony?: ParametersForAlbumName;
        readonly trio?: ParametersForAlbumName;

        // this should be a normal constructor
        static buildFromForm(form: string, nameOptions: ParametersForAlbumName)
        {
                switch (form)
                {
                case "concerto": return new FixOptionsForAlbumName({concerto : nameOptions});
                case "grosso": return new FixOptionsForAlbumName({grosso : nameOptions});
                case "sonata": return new FixOptionsForAlbumName({sonata : nameOptions});
                case "quartet": return new FixOptionsForAlbumName({quartet : nameOptions});
                case "quintet": return new FixOptionsForAlbumName({quintet : nameOptions});
                case "cantata": return new FixOptionsForAlbumName({cantata : nameOptions});
                case "symphony": return new FixOptionsForAlbumName({symphony : nameOptions});
                case "suite": return new FixOptionsForAlbumName({suite : nameOptions});
                case "trio": return new FixOptionsForAlbumName({trio : nameOptions});

                default: throw new Error(form + ": Invalid form");
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
