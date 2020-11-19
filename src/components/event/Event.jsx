import React, { useState, useContext } from 'react';

import './event.scss';
import EventDeletePopup from '../eventDeletePopup/EventDeletePopup';
import PropTypes from 'prop-types';

const Event = ({ height, marginTop, title, time, description }) => {
    const [isPopupOpen, togglePopup] = useState(false);


    const eventStyle = {
        height,
        marginTop
    };

    return (
        <div style={eventStyle}
            className="event"
            onMouseEnter={() => togglePopup(true)}
            onMouseLeave={() => togglePopup(false)}>
            <div className="event__title">{title}</div>
            <div className="event__time">{time}</div>

            {description 
                ? <div className="event__description">{description}</div> 
                : null}
            {isPopupOpen 
                ? <EventDeletePopup /> 
                : null}
        </div>
    )
}

export default Event;
