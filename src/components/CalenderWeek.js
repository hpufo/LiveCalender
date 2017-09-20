import React from "react";
import PropTypes from 'prop-types';
import Day from './Day';

export default class CalenderWeek extends React.Component{
  renderDays(){
    let date = this.props.startDate;
    let thisMonth;
    let jsx = [];

    for(let i=0; i<7; i++){
      let year = this.props.todayDate.year;
      let monthIndex = this.props.todayDate.monthIndex;

      if(this.props.startDate > this.props.endDate && !thisMonth){
        thisMonth = false;
        monthIndex--;
        if(monthIndex == 0) year--;
        if(date > this.props.daysLastMonth){
          date = 1;
          monthIndex++;
          thisMonth = true;
        }
      }
      else{
        thisMonth = true;
        if(date > this.props.daysThisMonth){
          date = 1;
          thisMonth = false;
        }
      }
      
      jsx.push(
        <Day date={date} thisMonth={thisMonth} monthIndex={monthIndex} year={year} key={i} />
      );
      date++;
    }
    return jsx;
  }
  render(){
    return (<tr>{this.renderDays()}</tr>);
  }
}

CalenderWeek.propTypes = {
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  daysLastMonth: PropTypes.number,
  daysThisMonth: PropTypes.number
};