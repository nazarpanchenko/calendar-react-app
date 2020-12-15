import React from 'react';
import Day from '../day/Day';

import './week.scss';
import PropTypes from 'prop-types';

const Week = ({ weekDates, events }) => {
    return (
        <div className="calendar__week">
            {weekDates.map(dayStart => {
                const dayEnd = new Date(dayStart.getTime()).setHours(
                    dayStart.getHours() + 24
                );

                //getting all events from the day we will render
                const dayEvents = events.eventsList
                    .map(event => ({
                        ...event,
                        dateFrom: new Date(event.dateFrom).getTime(),
                        dateTo: new Date(event.dateTo).getTime()
                    }))
                    .filter(
                        event =>
                            event.dateFrom > dayStart && event.dateTo < dayEnd
                    );

                return (
                    <Day
                        key={dayStart.getDate()}
                        events={events}
                        dataDay={dayStart.getDate()}
                        dayEvents={dayEvents}
                    />
                );
            })}
        </div>
    );
};

export default Week;

Week.propTypes = {
    weekDates: PropTypes.array,
    events: PropTypes.shape()
};

Week.defaultProps = {
    weekDates: [],
    events: []
};
