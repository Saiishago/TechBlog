module.exports = {
    format_date: (date) => {
        const date = new Date(date);
        const formatDate = `${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}`;
        const hour = date.getHour().toString().padStart(2, '0');
        const minute = date.getMinute().toString().padStart(2, '0');
        const formatTime = `${hour}:${minute}`;
        return `${formateDate} at ${formatTime}`;
    },
};