import React, { Component } from 'react';

import Modal from '../modal/Modal';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import {
    getEventsList,
    createEvent,
    deleteEvent
} from '../../gateway/events.js';
import './calendar.scss';
import PropTypes from 'prop-types';
import { eventNotExists } from '../../utils/validators.js';

class Calendar extends Component {
    state = {
        events: []
    };

    componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents = () => {
        getEventsList().then(eventsList => {
            this.setState({
                events: eventsList
            });
        });
    };

    onEventCreate = event => {
        if (eventNotExists(event)) {
            createEvent(event).then(() => this.fetchEvents());
        }
    };

    render() {
        const { weekDates, closeEventWindow, isModalOpen } = this.props;

        const events = {
            eventsList: this.state.events,
            getEventsList: getEventsList,
            deleteEvent: deleteEvent,
            rerender: this.fetchEvents
        };

        return (
            <main className="calendar">
                {isModalOpen ? (
                    <Modal
                        onEventCreate={this.onEventCreate}
                        closeEventWindow={closeEventWindow}
                    />
                ) : null}
                <Navigation weekDates={weekDates} />
                <div className="calendar__body">
                    <div className="calendar__week-container">
                        <Sidebar />
                        <Week events={events} weekDates={weekDates} />
                    </div>
                </div>
            </main>
        );
    }
}

export default Calendar;

Calendar.propTypes = {
    weekDates: PropTypes.array,
    isModalOpen: PropTypes.bool
};

Calendar.defaultProps = {
    weekDates: [],
    isModalOpen: false
};
