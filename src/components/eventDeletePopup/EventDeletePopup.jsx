import React, { useState } from 'react';
import './eventDeletePopup.scss';
import { canDeleteEvent } from '../../utils/validators';

const EventDeletePopup = ({ events, eventID }) => {
    const [id, setId] = useState(eventID);

    const { eventsList, rerender, getEventsList, deleteEvent } = events,
        event = eventsList.filter(event => event.id === eventID)[0];

    const onDelete = () => {
        setId(event.id);

        if (canDeleteEvent(event)) {
            deleteEvent(id)
                .then(() => getEventsList())
                .then(() => rerender());
        } else {
            alert(
                'Sorry, cannot cancel this event. It will start in 15 minutes'
            );
        }
    };

    return (
        <div className="popup">
            <button
                type="button"
                className="popup__delete-btn"
                onClick={() => onDelete()}
            >
                <i className="fa fa-trash" aria-hidden="true"></i>
                Delete
            </button>
        </div>
    );
};

export default EventDeletePopup;
