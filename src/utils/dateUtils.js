import moment from "moment";

export const dates = {
    d: moment().format('YYYY-MM-DD', 'mm/dd/yyyy'),
    h : moment().format('hh'),
    m : moment().format('mm')
};

export const getWeekStartDate = (date) => {
    const dateCopy = new Date(date);
    const dayOfWeek = dateCopy.getDay();
    const difference =
        dayOfWeek === 0
            ? -6 // for Sunday
            : 1 - dayOfWeek;

    const monday = new Date(dateCopy.setDate(date.getDate() + difference));
    return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
}

export const generateWeekRange = (startDate) => {
    const result = [];
    for (let i = 0; i < 7; i += 1) {
        const base = new Date(startDate);
        result.push(new Date(base.setDate(base.getDate() + i)));
    }
    return result;
}

export const getDateTime = (date, time) => {
    const [hours, minutes] = time.split(':');
    const withHours = new Date(new Date(date).setHours(Number(hours)));
    const withMinutes = new Date(
        new Date(withHours).setMinutes(Number(minutes)),
    );
    return withMinutes;
}

export const formatMins = (mins) => {
    return mins < 10 ? `0${mins}` : mins;
}

export const showCurrentMonth = (weekStartDate, months, days) => {
   const monday = weekStartDate.getDate();
   let month = months[weekStartDate.getMonth()].substring(0, 3);

   // if the year is ended, start new year  
   if (months[weekStartDate.getMonth() + 1] === undefined) {
       months[weekStartDate.getMonth() + 1] = months[0];
   }

   for (let i = 0; i < days.length; i++) {
       const nextDate = new Date(new Date().setDate(monday + i)).getDate();
       if (nextDate === 1) {
           month = month + ' - ' + months[weekStartDate.getMonth() + 1].substring(0, 3);
       }
   }

    return month;
};

export const convertDate = event => {
    const { title, description, date, startTime, endTime } = event;

    return {
        title: title,
        description: description,
        dateFrom: getDateTime(date, startTime),
        dateTo: getDateTime(date, endTime)
    };
};


export const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
