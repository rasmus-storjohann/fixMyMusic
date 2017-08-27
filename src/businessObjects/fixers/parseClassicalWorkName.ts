import {ClassicalWorkName} from "./../../businessInterfaces/fixers/ClassicalWorkName";
import {buildClassicalWorkName} from "./details/buildClassicalWorkName";

export function parseClassicalWorkName(json: string): ClassicalWorkName
{
        var from = JSON.parse(json);
        return buildClassicalWorkName(from);
}
