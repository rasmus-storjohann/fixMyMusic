// TODO put this in a details namespace or make it package private

import {ClassicalWorkName} from "./ClassicalWorkName";

export function validateClassicalWorkName(name: ClassicalWorkName) : ClassicalWorkName
{
        removeUndefinedFields(name);
        validateMajorMinor(name);
        return name;
}

// TODO does this remove elements that are falsy, such as "", false, 0?
export function removeUndefinedFields(anObject: any)
{
        Object.keys(anObject).forEach((key) => (anObject[key] == null) && delete anObject[key]);
}

function validateMajorMinor(name: ClassicalWorkName) : void
{
        if (name.major && name.minor)
        {
                throw new Error("major and minor keys given");
        }
}
