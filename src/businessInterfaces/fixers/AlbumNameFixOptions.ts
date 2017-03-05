import {NameOptions} from "./NameOptions";
import {IAlbumNameFixOptions} from "./IAlbumNameFixOptions";
import {removeUndefinedFields} from "./removeUndefinedFields";

export class AlbumNameFixOptions
{
        readonly cantata?: NameOptions;
        readonly concerto?: NameOptions;
        readonly grosso?: NameOptions;
        readonly quartet?: NameOptions;
        readonly quintet?: NameOptions;
        readonly sonata?: NameOptions;
        readonly suite?: NameOptions;
        readonly symphony?: NameOptions;
        readonly trio?: NameOptions;

        static buildFromForm(form: string, nameOptions: NameOptions)
        {
                switch (form)
                {
                case "concerto": return new AlbumNameFixOptions({concerto : nameOptions});
                case "grosso": return new AlbumNameFixOptions({grosso : nameOptions});
                case "sonata": return new AlbumNameFixOptions({sonata : nameOptions});
                case "quartet": return new AlbumNameFixOptions({quartet : nameOptions});
                case "quintet": return new AlbumNameFixOptions({quintet : nameOptions});
                case "cantata": return new AlbumNameFixOptions({cantata : nameOptions});
                case "symphony": return new AlbumNameFixOptions({symphony : nameOptions});
                case "suite": return new AlbumNameFixOptions({suite : nameOptions});
                case "trio": return new AlbumNameFixOptions({trio : nameOptions});

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
