import React, {useState, useEffect} from 'react';
import Hour from '../hour/Hour';

import PropTypes from 'prop-types';
import './day.scss';

const Day = ({ dataDay, dayEvents }) => {
    let currentMin = (new Date().getHours() * 60) + (new Date().getMinutes());

    const [linePosition, setPosition] = useState(currentMin);
    const hours = Array(24).fill().map((val, index) => index);

    useEffect(() => {
        const timerId = setInterval(() => {
            if (currentMin === 60 * 60 * 24) {
                currentMin = (new Date().getHours() * 60) + (new Date().getMinutes());
                setPosition(currentMin);
            }
            setPosition(++currentMin);
        }, 1000 * 60);

        return () => {
            clearInterval(timerId);
        }
    }, []);

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
                            dataHour={hour}
                            hourEvents={hourEvents}
                        />
                        {
                            new Date().getDate() === dataDay 
                                ? <>
                                    <span className="calendar__day_time-circle" style={moveDown}></span>
                                    <span className="calendar__day_time-line" style={moveDown}></span> 
                                </>
                                : ''
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default Day;

Day.propTypes = {
    dataDay: PropTypes.number,
    dayEvents: PropTypes.array
};

Day.defaultProps = {
    dayEvents: []
};