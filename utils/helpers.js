module.exports = {
    format_date: (date) => {
        const currentDate = new Date(date);
        const formatDate = `${date.getMonth() +1}/${date.getDate()}/${date.getFullYear()}`;
        const currentHour = currentDate.getHours().toString().padStart(2, '0');
        const currentMinutes = currentDate.getMinutes().toString().padStart(2, '0');
        const formatTime = `${currentHour}:${currentMinutes}`;
        return `${formatDate} at ${formatTime}`;
    },
};
