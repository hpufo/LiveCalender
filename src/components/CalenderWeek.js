import React from "react";
import PropTypes from 'prop-types';
import Day from './Day';

export default class CalenderWeek extends React.Component{
  renderDays(){
    let date = this.props.startDate;
    //If this week contains days from last month then we know we wont be starting in this month. If not set it to true
    let thisMonth = this.props.containsLastMonth ? false: true;
    let year = this.props.todayDate.year;
    //If this week contains days from Last month intialize monthIndex to be last month index. If not set it to be this month
    let monthIndex = this.props.containsLastMonth ? this.props.todayDate.monthIndex-1:this.props.todayDate.monthIndex;
    let jsx = [];

    for(let i=0; i<7; i++){
      //If this day is not from the current month
      if(!thisMonth){
        //If last month was Dec role back the year
        if(monthIndex < 0){
          year--;
          monthIndex = 11;
        }
        //If the date is higher than the days from last month
        if(date > this.props.daysLastMonth){
          date = 1;                             //Set date to 1
          monthIndex++;                         //Increament the month to the current one
          thisMonth = true;                     //flag that we are in the current month
        }
      }
      //This week contains days from next month, and the date is bigger than the days in the month, and thisMonth flag is true
      else if(this.props.containsNextMonth && date > this.props.daysThisMonth && thisMonth){
        date = 1;                     //Set they day to one
        thisMonth = false;            //Flip flag
        monthIndex++;                 //Set the month to be next month
        if(monthIndex > 11){          //If the next month is Jan
          year++;                     //increament the year
          monthIndex = 0;             //set the monthIndex to be Jan
        }
      }
      //Push Day jsx to the array
      jsx.push(
        <Day date={date} thisMonth={thisMonth} monthIndex={monthIndex} year={year} key={i} />
      );
      //We always want to increament the day
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