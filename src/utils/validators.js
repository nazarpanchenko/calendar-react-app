import moment from "moment";

export const allInputsValid = event => {
    const { title, dateFrom, dateTo } = event;
    const dayStart = new Date(dateFrom),
        dayEnd = new Date(dateFrom);

    dayStart.setHours(0);
    dayEnd.setHours(dayStart.getHours() + 24);

    // convert to correct format before calculations
    const start = new Date(dateFrom);
    const end = new Date(dateTo);

    const validators = {
        titleNotEmpty : title !== '',
        isInRange: start > dayStart && end < dayEnd,
        startNotSame: !(moment(start).isSame(end)) && !(moment(end).isSameOrBefore(start)),
        isDurationValid: moment(end).diff(moment(start), 'hours') <= 6,
        
        isCorrectMins: !(start.getMinutes() % 15) && !(end.getMinutes() % 15),
        notInPast: !(moment().isSameOrAfter(start))
    };

    for (let check in validators) {
        if (validators[check] === false) return false; 
    }
    
    return true;
};

export const fetchEvents = () => {
    
}

export const eventNotExists = (event, eventsList) => {
    let notExists = true;

    // convert to correct format before comparison
    const newEventStart = new Date(event.dateFrom).getTime(),
        newEventEnd = new Date(event.dateTo).getTime();

    for (let i = 0; i < eventsList.length; i++) {
        const oldEventStart = new Date(eventsList[i].dateFrom).getTime(),
            oldEventEnd = new Date(eventsList[i].dateTo).getTime();
    
        if ( (newEventStart === oldEventStart || newEventEnd === oldEventEnd) || 
            (newEventStart <= oldEventStart && newEventStart >= oldEventEnd) ||
            (newEventStart <= oldEventEnd && newEventEnd >= oldEventStart) ) {
                alert('Event is already planned on this date. Please, choose another date');
                notExists = false;
                break;
        }
    }

    return notExists;
};

export const canDeleteEvent = event => {
    const eventStart = new Date(event.dateFrom),
        now = new Date();

    if (now.getTime() >= eventStart.getTime()) {
        return true;
    }
    return moment(eventStart).diff(moment(now), 'minutes') >= 15;
};
