import moment from "moment";
const now = moment();

export const formatTimeAgo = (timestamp) => {

}
export const handleTimeChat = (timestamp) => {
    const now = moment();
    const time = moment(timestamp);
    const hours = now.diff(time, 'hours');
    if (hours < 24) {
        return time.format('HH:mm');
    }
    return time.format('DD/MM/YYYY')
}
