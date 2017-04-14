import {ClassicalWorkName} from "../../businessInterfaces/fixers/ClassicalWorkName";

export class ClassicalWorkNameValidator
{
        public validate(name: ClassicalWorkName) : ClassicalWorkName
        {
                this.removeUndefinedFields(name);
                this.validateMajorMinor(name);
                return name;
        }

        // TODO does this remove elements that are falsy, such as "", false, 0?
        private removeUndefinedFields(anObject: any)
        {
                Object.keys(anObject).forEach((key) => (anObject[key] == null) && delete anObject[key]);
        }

        private validateMajorMinor(name: ClassicalWorkName) : void
        {
                if (name.major && name.minor)
                {
                        throw new Error("major and minor keys given");
                }
        }
}
