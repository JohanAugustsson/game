import {InterfaceHash} from "./model/iHash";
import {compareTimestamps} from "./momentHelper";

export const sortByChronologicalOrder = <T extends {}>(data: InterfaceHash<T>) => {
    return Object.keys(data).map((value) => data[value]).sort(compareTimestamps);
};
