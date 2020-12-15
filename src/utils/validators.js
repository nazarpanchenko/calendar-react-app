import moment from "moment";
import { getEventsList } from '../gateway/events';

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
        isInRange: start >= dayStart && end <= dayEnd,
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

export const eventNotExists = event => {
    const targetEvent = event;
    let notExists = true;

    getEventsList().then(eventsList => {
        // convert to correct format before comparison
        const newStart = new Date(targetEvent.dateFrom).getTime(),
            newEnd = new Date(targetEvent.dateTo).getTime();

        const foundEvent = eventsList.filter(event => {
            const oldStart = new Date(event.dateFrom).getTime(),
                oldEnd = new Date(event.dateTo).getTime();

            return (newStart >= oldStart && newStart <= oldEnd) || 
                (newStart <= oldEnd && newStart >= oldStart);
        });

        return foundEvent.length 
            ? alert('Event is already planned on this date. Please, choose another date')
            : notExists = false;
    });

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
