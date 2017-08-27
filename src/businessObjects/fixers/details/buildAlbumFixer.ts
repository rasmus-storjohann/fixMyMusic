import {FixOptionsForOneArtist} from "./../../../businessInterfaces/fixers/FixOptionsForOneArtist";
import {FixOptionsForOneAlbum} from "./../../../businessInterfaces/fixers/FixOptionsForOneAlbum";
import {ClassicalWorkName} from "./../../../businessInterfaces/fixers/ClassicalWorkName";
import {ValidationOption} from "./../../../businessInterfaces/fixers/ValidationOption";
import {buildClassicalWorkName} from "./buildClassicalWorkName";
import * as Details from "./parserDetails";

export function buildAlbumFixer(from): FixOptionsForOneAlbum
{
        var firstTrackNumber = Details.toNumber(from, "firstTrackNumber");
        var fixTrackName = toRegExp(from, "fixTrackName");
        var classicalWorkName = toClassicalWorkName(from, "fixAlbumTitle");
        var albumName = Details.toString(from, "albumTitle");
        var validation = toValidationOptions(from, "validation");
        var fixTrackNameFunction = undefined;

        var options = {
                firstTrackNumber: firstTrackNumber,
                fixTrackName: fixTrackName,
                fixTrackNameFunction: fixTrackNameFunction,
                albumName: albumName,
                fixAlbumTitle: classicalWorkName,
                validation: validation
        };

        return stripUndefinedFieldsFromFixOptionsForOneAlbum(options);
}

function stripUndefinedFieldsFromFixOptionsForOneAlbum(options: FixOptionsForOneAlbum): FixOptionsForOneAlbum
{
        Object.keys(options).forEach((key) => (options[key] == null) && delete options[key]);
        return options;
}

function toRegExp(from, field: string): RegExp | undefined
{
        return Details.isString(from[field]) ? new RegExp(from[field]) : undefined;
}

function toValidationOptions(from, field): ValidationOption[] | undefined
{
        if (!isStringArray(from[field]))
        {
                return undefined;
        }
        return from[field].map(element => {
                switch (element)
                {
                case "skipUniqueTrackNameCheck":
                        return ValidationOption.skipUniqueTrackNameCheck;
                case "skipTrackNumberCheck":
                        return ValidationOption.skipTrackNumberCheck;
                default:
                        throw new Error(element + ": Unknown validation option");
                }
        });
}

function toStringArray(from, field: string): string[] | undefined
{
        return isStringArray(from[field]) ? from[field] : undefined;
}

function isStringArray(s: any): boolean
{
        return s && s.length && s.every(item => Details.isString(item));
}

function toClassicalWorkName(from, field: string): ClassicalWorkName | undefined
{
        return from[field] ? buildClassicalWorkName(from[field]) : undefined;
}
