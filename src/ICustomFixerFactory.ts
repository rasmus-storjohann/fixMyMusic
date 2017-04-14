import {Album} from "./Album";
import {CustomFixer} from "./businessInterfaces/fixers/CustomFixer";

// move to interfaces fixers
export interface ICustomFixerFactory {
        create(album: Album): CustomFixer;
}
