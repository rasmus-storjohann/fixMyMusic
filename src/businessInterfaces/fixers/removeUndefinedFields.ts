export function removeUndefinedFields(anObject: any)
{
        // does this remove elements that are falsy, such as "", false, 0?
        Object.keys(anObject).forEach((key) => (anObject[key] == null) && delete anObject[key]);
}
