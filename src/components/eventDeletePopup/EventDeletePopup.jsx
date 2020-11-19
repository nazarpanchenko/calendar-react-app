import React, { useState, useEffect, useContext } from 'react';
import './eventDeletePopup.scss';
import PropTypes from 'prop-types';
import { canDeleteEvent } from '../../utils/validators';
import EventContext, { EventID } from '../../providers.js';

const EventDeletePopup = () => {
    const [id, setId] = useState(null);

    const context = {
        events: useContext(EventContext),
        eventId: useContext(EventID)
    };

    const { eventsList, rerender, getEventsList, deleteEvent } = context.events,
        event = eventsList.filter(event => event.id === context.eventId.ID)[0];

    // fix context on first render
    useEffect(() => {
        setId(event.id);
    }, [id]);

    const onDelete = () => {
        setId(event.id);
            
        if (canDeleteEvent(event)) {
            deleteEvent(id).then(() => getEventsList())
                .then(() => rerender());
        } else {
            alert('Sorry, cannot cancel this event. It will start in 15 minutes');
        }
    };

    return (
        <div className="popup">
            <button type="button"
                className="popup__delete-btn"
                onClick={() => onDelete()}>

                <i className="fa fa-trash" aria-hidden="true"></i>
                Delete
            </button>
        </div>
    );
}

export default EventDeletePopup;
