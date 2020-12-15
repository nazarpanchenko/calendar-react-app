import React from 'react';

import { days } from '../../utils/dateUtils.js';
import './navigation.scss';
import classNames from 'classnames';

const Navigation = ({ weekDates }) => {
    const now = new Date();

    return (
        <header className="calendar__header">
            {weekDates.map(dayDate => (
                <div key={dayDate} className="calendar__day-label day-label">
                    <span
                        className={`day-label__day-name 
                        ${classNames({
                            active:
                                dayDate.getMonth() === now.getMonth()
                                    ? dayDate.getDate() === now.getDate()
                                    : false
                        })}`}
                    >
                        {days[dayDate.getDay()]}
                    </span>
                    <span
                        className={`day-label__day-number 
                        ${classNames({
                            active:
                                dayDate.getMonth() === now.getMonth()
                                    ? dayDate.getDate() === now.getDate()
                                    : false
                        })}`}
                    >
                        {dayDate.getDate()}
                    </span>
                </div>
            ))}
        </header>
    );
};

export default Navigation;
