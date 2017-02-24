import {Album} from "./Album";
import {CustomFixer} from "./CustomFixer";

export interface ICustomFixerFactory {
        create(album: Album): CustomFixer;
}
