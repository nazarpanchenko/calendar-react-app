import React from 'react';
import './timeLine.scss';

const TimeLine = ({ position }) => {
    return (
        <>
            <span className="calendar__day_time-line" style={position}></span>
            <span className="calendar__day_time-circle" style={position}></span>
        </>
    );
};

export default TimeLine;
