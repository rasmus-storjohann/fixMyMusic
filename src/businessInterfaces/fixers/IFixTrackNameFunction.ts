import * as npmlog from "npmlog";

export interface IFixTrackNameFunction
{
        (name: string, logger: npmlog.NpmLog) : string;
}
