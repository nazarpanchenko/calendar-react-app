import React, { useState } from 'react';
import Hour from '../hour/Hour';
import TimeLine from '../TimeLine/TimeLine';
import PropTypes from 'prop-types';

const Day = ({ events, dataDay, dayEvents }) => {
    let currentMin = new Date().getHours() * 60 + new Date().getMinutes();

    const [linePosition, setPosition] = useState(currentMin);
    const hours = Array(24)
        .fill()
        .map((val, index) => index);

    const timerId = setInterval(() => {
        if (currentMin === 60 * 60 * 24) {
            currentMin = new Date().getHours() * 60 + new Date().getMinutes();
            setPosition(currentMin);
        }

        setPosition(++currentMin);
    }, 1000 * 60);

    const moveDown = {
        top: `${linePosition + 1}px`
    };

    return (
        <div className="calendar__day" data-day={dataDay}>
            {hours.map(hour => {
                //getting all events from the day we will render
                const hourEvents = dayEvents
                    .map(event => ({
                        ...event,
                        dateFrom: new Date(event.dateFrom),
                        dateTo: new Date(event.dateTo)
                    }))
                    .filter(event => event.dateFrom.getHours() === hour);

                return (
                    <div key={dataDay + hour}>
                        <Hour
                            events={events}
                            dataHour={hour}
                            hourEvents={hourEvents}
                        />
                        {new Date().getDate() === dataDay ? (
                            <TimeLine position={moveDown} />
                        ) : null}
                    </div>
                );
            })}
        </div>
    );
};

export default Day;

Day.propTypes = {
    dataDay: PropTypes.number,
    dayEvents: PropTypes.array
};

Day.defaultProps = {
    dayEvents: []
};
