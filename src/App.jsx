import React, { Component } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';
import moment from "moment";

class App extends Component {

    state = {
        weekStartDate: new Date(),
        isModalOpen: false
    };

    setCurrentWeek = () => {
        this.setState({
            weekStartDate: new Date()
        });
    }

    setPreviousWeek = () => {
        this.setState({
            weekStartDate: moment(this.state.weekStartDate)
                .subtract(7, 'days').toDate()
        });
    }

    setNextWeek = () => {
        this.setState({
            weekStartDate: moment(this.state.weekStartDate)
                .add(7, 'days').toDate()
        });
    }

    openEventWindow = () => {
        this.setState({
            isModalOpen : true
        });
    }

    closeEventWindow = () => {
        this.setState({
            isModalOpen : false
        });
    }

    render() {
        const { weekStartDate, isModalOpen } = this.state;
        const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

        return (<>
            <Header 
                openEventWindow={this.openEventWindow}
                setCurrentWeek={this.setCurrentWeek}
                setPreviousWeek={this.setPreviousWeek} 
                setNextWeek={this.setNextWeek}
                weekStartDate={weekStartDate}
            />
            <Calendar 
                weekDates={weekDates}
                isModalOpen={isModalOpen}
                closeEventWindow={this.closeEventWindow}
                weekStartDate={weekStartDate}
            />
        </>)
    }
};

export default App;