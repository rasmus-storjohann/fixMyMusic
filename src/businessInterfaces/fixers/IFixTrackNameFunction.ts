import {NpmLog} from "npmlog";

export interface IFixTrackNameFunction
{
        (name: string, logger: NpmLog) : string;
}
