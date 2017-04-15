import {Album} from "../../Album";
import {CustomFixer} from "../../businessInterfaces/fixers/CustomFixer";

export interface ICustomFixerFactory {
        create(album: Album): CustomFixer;
}
