const formatTime = (time: number): string => {
    if (time < 9) {
        return `0${time}`;
    }
    return time.toString();
};

const DateFormat = (date: Date, showTime?: boolean): string => {
    const newDate = new Date(date);
    let result = `${newDate.getDate()}-${parseInt(newDate.getMonth().toString()) + 1}-${newDate.getFullYear()}`;
    if (!!showTime) {
        result += ` ${formatTime(newDate.getHours())}:${formatTime(newDate.getMinutes())}`;
    }

    return result;
};
export default DateFormat;
