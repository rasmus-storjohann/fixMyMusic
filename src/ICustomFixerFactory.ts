import {Album} from "./Album";
import {CustomFixer} from "./CustomFixer";

// TODO remove?
export interface ICustomFixerFactory {
        create(album: Album): CustomFixer;
}
