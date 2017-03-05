import {removeUndefinedFields} from "./removeUndefinedFields";

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
