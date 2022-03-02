const formatTime = (time: number): string => {
    if (time <= 9) {
        return `0${time}`;
    }
    return time.toString();
};

const formatDate = (date: number): string => {
    if (date <= 9) {
        return `0${date}`;
    }
    return date.toString();
};

const DateFormat = (date: Date, showTime?: boolean): string => {
    const newDate = new Date(date);
    let result = `${formatDate(newDate.getDate())}-${formatDate(
        parseInt(newDate.getMonth().toString()) + 1
    )}-${newDate.getFullYear()}`;
    if (!!showTime) {
        result += ` ${formatTime(newDate.getHours())}:${formatTime(newDate.getMinutes())}`;
    }

    return result;
};
export default DateFormat;
