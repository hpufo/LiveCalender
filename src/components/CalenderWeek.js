import React from "react";
import PropTypes from 'prop-types';
import Day from './Day';

export default class CalenderWeek extends React.Component{
  renderDays(){
    let date = this.props.startDate;
    let thisMonth = this.props.containsLastMonth ? false: true;
    let jsx = [];

    for(let i=0; i<7; i++){
      let year = this.props.todayDate.year;
      let monthIndex = this.props.todayDate.monthIndex;


      if(this.props.containsLastMonth && !thisMonth){
        monthIndex--;
        if(monthIndex == 0) year--;
        if(date > this.props.daysLastMonth){
          date = 1;
          monthIndex++;
          thisMonth = true;
        }
      }
      else if(this.props.containsNextMonth && thisMonth){
        //maybe do this better later
        if(date > this.props.daysThisMonth){
          date = 1;
          monthIndex++;
          thisMonth = false;
          if(monthIndex == 11) year++;
        }
      }
      else if(this.props.containsNextMonth && !thisMonth){
        monthIndex++;
      }

      jsx.push(
        <Day date={date} thisMonth={thisMonth} monthIndex={monthIndex} year={year} key={i} />
      );
      date++;
    }
    return jsx;
  }
  render(){
    return (<tr className="week">{this.renderDays()}</tr>);
  }
}

CalenderWeek.propTypes = {
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  daysLastMonth: PropTypes.number,
  daysThisMonth: PropTypes.number
};