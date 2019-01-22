import moment from "moment";

const getDateFromTimestamp = (timestamp) => {
    if (timestamp != null) {
        if (typeof timestamp.toDate === 'function') {
            return moment(timestamp.toDate()).format('YYYY-MM-DD HH:mm:ss')
        }
    }
};

const compareTimestamps = (a, b) => {
    return moment(getDateFromTimestamp(a.createdAt)).isBefore(getDateFromTimestamp(b.createdAt)) ? 1 : -1;
};

export {getDateFromTimestamp, compareTimestamps}
