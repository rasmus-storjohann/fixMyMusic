// TODO does this remove elements that are falsy, such as "", false, 0?
// TODO put this in a details namespace or make it package private
export function removeUndefinedFields(anObject: any)
{
        Object.keys(anObject).forEach((key) => (anObject[key] == null) && delete anObject[key]);
}
