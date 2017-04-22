import {FixOptionsForOneAlbum} from "./FixOptionsForOneAlbum";

// TODO replace all referenes to composer with artist
export interface FixOptionsForOneComposer {
        [name: string]: FixOptionsForOneAlbum;
}
