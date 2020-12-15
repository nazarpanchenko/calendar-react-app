import React, { Component } from 'react';

import './modal.scss';
import PropTypes from 'prop-types';

import { allInputsValid } from '../../utils/validators.js';
import { dates, convertDate } from '../../utils/dateUtils.js';

class Modal extends Component {
    state = {
        event: {
            title: '',
            description: '',
            date: new Date(),
            startTime: '00:00',
            endTime: '00:00'
        },
        canSubmit: false
    };

    componentWillUnmount() {
        this.clearForm();
    }

    isValid = event => {
        this.setState({ canSubmit: allInputsValid(event) });
    };

    clearForm = () => {
        this.setState({
            event: event,
            canSubmit: false
        });
    };

    onTextChange = event => {
        const { name, value } = event.target;
        const text = {
            ...this.state.event,
            [name]: value
        };

        this.setState({ event: text });

        if (name === 'title') this.isValid(convertDate(text));
    };

    onDateChange = event => {
        const date = {
            ...this.state.event,
            [event.target.name]: event.target.value
        };

        this.setState({ event: date });
        this.isValid(convertDate(date));
    };

    handleEventCreate = event => {
        event.preventDefault();

        const { title, description, dateFrom, dateTo } = convertDate(
            this.state.event
        );
        const newEvent = {
            title,
            description,
            dateFrom,
            dateTo
        };

        this.props.onEventCreate(newEvent);
    };

    render() {
        const { canSubmit } = this.state;
        const { closeEventWindow } = this.props;

        return (
            <div className="modal overlay">
                <div className="modal__content">
                    <div className="create-event">
                        <button
                            className="create-event__close-btn"
                            onClick={() => closeEventWindow()}
                        >
                            +
                        </button>
                        <form className="event-form">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="event-form__field"
                                onChange={this.onTextChange}
                            />
                            <div className="event-form__time">
                                <input
                                    type="date"
                                    defaultValue={dates.d}
                                    name="date"
                                    className="event-form__field"
                                    onChange={this.onDateChange}
                                />
                                <input
                                    type="time"
                                    defaultValue={`${dates.h}:${dates.m}`}
                                    name="startTime"
                                    className="event-form__field"
                                    onChange={this.onDateChange}
                                />
                                <span>-</span>
                                <input
                                    type="time"
                                    defaultValue={`${dates.h}:${dates.m}`}
                                    name="endTime"
                                    className="event-form__field"
                                    onChange={this.onDateChange}
                                />
                            </div>
                            <textarea
                                name="description"
                                placeholder="Description"
                                className="event-form__field"
                                onChange={this.onTextChange}
                            ></textarea>
                            <button
                                type="submit"
                                className="event-form__submit-btn"
                                onClick={this.handleEventCreate}
                                disabled={!canSubmit}
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;

Modal.propTypes = {
    closeEventWindow: PropTypes.func,
    onEventCreate: PropTypes.func
};
