import moment from "moment";

const getDateFromTimestamp = (timestamp) => {
    if (timestamp != null) {
        if (typeof timestamp.toDate === 'function') {
            return moment(timestamp.toDate()).format('YYYY-MM-DD HH:mm:ss')
        } else if (timestamp) {
            return timestamp
        }
    }
    return;
};

const timeTempLocally = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss');
};

export {getDateFromTimestamp, timeTempLocally}
