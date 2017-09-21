import React from "react";
import CalenderWeek from './CalenderWeek';

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

// YYYY-MM-DD
export default class Calendar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      todayDate: {
        monthIndex: null,
        year: null
      },
      weeks: [] //{startDay: n, endDay: n, containsLastMonth: bool containsNextMonth: bool}
    }
  }
  componentWillMount(){
    let today = new Date();
    //For testing
    if(this.props.setDate){
      let date = this.props.setDate;
      today = new Date(date.year,date.month-1,date.date);
    }
    
    const monthIndex = today.getMonth();
    const year = today.getFullYear();

    const daysInMonth = [31,28+this.leapYear(year),31,30,31,30,31,31,30,31,30,31];
    let firstDayOfMonth = new Date(year,monthIndex,1).getDay(); //Returns the day as a number 0-6
    //If this month is Jan then set the index of last month to be Dec
    let lastMonthIndex = monthIndex == 0 ? 11 : monthIndex-1;  //0-11
    //If firstDay of the month is equal to 0(Sunday), then set the first day of the Cal to be 1. If not subtract the index of the day(+1) from the days in last month.
    let firstDayOfCal = firstDayOfMonth == 0 ? 1 : (daysInMonth[lastMonthIndex]-firstDayOfMonth+1); //1-31
    //If the 1st day of the month is saturday then set index to 6, is not subtract it from 6 then add one to find the date of the first saturday
    let fisrtSat =  firstDayOfMonth == 6 ? 6 : (6-firstDayOfMonth) + 1;
    
    let weeks = [];
    //Adding these extra vars for readabilty
    let startDay = firstDayOfCal;
    let endDay = fisrtSat;
    //If the first day of the month isn't Sunday, then you can assume that this week will contain days from last month
    let containsLastMonth = firstDayOfMonth == 0 ? false:true;
    let containsNextMonth = false;
    //Loop for every saturday in the month
    for(let i=fisrtSat; i<=daysInMonth[monthIndex]; i+=7){
      //First push the data into the weeks array
      weeks.push({startDay: startDay, endDay: endDay, containsLastMonth: containsLastMonth, containsNextMonth: containsNextMonth});

      startDay += 7;
      //If this is the first week and the startDay is now bigger than days in last month
      if(i == fisrtSat && startDay > daysInMonth[lastMonthIndex]){
        startDay =  startDay - daysInMonth[lastMonthIndex];
        //From now the weeks won't contain days from last month
        containsLastMonth = false;
      }

      endDay += 7
      //If this is the last saturday
      if(endDay > daysInMonth[monthIndex]){
        endDay = endDay - daysInMonth[monthIndex];
        containsNextMonth = true;                     //This week will contain days from next month
      }

      //Loop again if there is another sunday after the last sunday
      if(i+7 > daysInMonth[monthIndex] && startDay <= daysInMonth[monthIndex]){
        i -= 7;
      }
    }

    this.setState({
      todayDate: {
        monthIndex: monthIndex,
        year: year
      },
      daysLastMonth: daysInMonth[lastMonthIndex],
      daysThisMonth: daysInMonth[monthIndex],
      weeks: weeks
    });
  }
  leapYear(year){
    if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
      return 1;
    return 0;
  }
  renderDaysOfWeek(){
    return days.map((day,i) => {
      return (<th key={i}>{day}</th>);
    })
  }
  renderWeeks(){
    return this.state.weeks.map((week,i) => {
      return (
        <CalenderWeek 
          startDate={week.startDay} 
          endDate={week.endDay}
          containsLastMonth={week.containsLastMonth}
          containsNextMonth={week.containsNextMonth}
          daysLastMonth={this.state.daysLastMonth} 
          daysThisMonth={this.state.daysThisMonth}
          todayDate={this.state.todayDate}
          key={i}
        />
      );
    });
  }
  render(){
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return (
      <div>
        <h1>{`${months[this.state.todayDate.monthIndex]}, ${this.state.todayDate.year}`}</h1>
        <table>
          <thead>
          <tr className="daysOfWeek">
            {this.renderDaysOfWeek()}
          </tr>
          </thead>
          <tbody>
            {this.renderWeeks()}
          </tbody>
        </table>
      </div>
    );
  }
}