import * as npmlog from "npmlog";

// TODO rename IFixTrackNameFunction
export interface fixTrackNameFunc
{
        (name: string, logger: npmlog.NpmLog) : string;
}
