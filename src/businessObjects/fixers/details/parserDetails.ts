export function toString(from, field: string): string | undefined
{
        return isString(from[field]) ? from[field] + "" : undefined;
}

export function isString(s: any): boolean { return s && s + "" === s; }

export function toNumber(from, field): number | undefined
{
        return isNumber(from[field]) ? from[field] + 0 : undefined;
}

export function isNumber(n: any): boolean { return n && n + 0 === n; }
