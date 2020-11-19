import React from 'react';

import { months, days, showCurrentMonth, getWeekStartDate } from '../../utils/dateUtils.js';

import './header.scss';
import PropTypes from 'prop-types';

const Header = ({ openEventWindow, setCurrentWeek, setPreviousWeek, setNextWeek, weekStartDate }) => {

    const currentMonth = showCurrentMonth(getWeekStartDate(weekStartDate), months, days);

    return (
        <header className='header'>
            <button
                className="button create-event-btn" 
                onClick={() => openEventWindow()}>
                    <i className="fas fa-plus create-event-btn__icon"></i>Create
            </button>
            <div className="navigation">
                <button 
                    className="navigation__today-btn button" 
                    onClick={() => setCurrentWeek()}>
                        Today
                </button>
                <button 
                    className="icon-button navigation__nav-icon" 
                    onClick={() => setPreviousWeek()}>
                        <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                    className="icon-button navigation__nav-icon" 
                    onClick={() => setNextWeek()}>
                        <i className="fas fa-chevron-right"></i>
                </button>
                <span className="navigation__displayed-month">{currentMonth}</span>
            </div>
        </header>
    );
}

export default Header;

Header.propTypes = {
    openEventWindow: PropTypes.func,
    setCurrentWeek: PropTypes.func,
    setNextWeek: PropTypes.func,
    setPreviousWeek: PropTypes.func
};