export function getIfExistsOrThrow(value: any, names: string[]) : any
{
        if (names.length === 0)
        {
                return value;
        }
        var child = value[names[0]];
        if (!child)
        {
                throw new Error(names[0] + " is null");
        }
        return getIfExistsOrThrow(child, names.slice(1));
}
