import React from "react";

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
      weeks: [] //{startDay: n, endDay: n}
    }
  }
  componentWillMount(){
    let today = new Date();
    const monthIndex = today.getMonth();
    const year = today.getFullYear();

    const daysInMonth = [31,28+this.leapYear(year),31,30,31,30,31,31,30,31,30,31];
    let firstDayOfMonth = new Date(year,monthIndex,1).getDay(); //Returns the day as a number 0-6
    //If this month is Jan then set the index of last month to be Dec
    let lastMonth = monthIndex == 0 ? 11 : monthIndex-1;  //0-11
    //If firstDay of the month is equal to 0(Sunday), then set the first day of the Cal to be 1. If not subtract the index of the day(+1) from the days in last month.
    let firstDayOfCal = firstDayOfMonth == 0 ? 1 : (daysInMonth[lastMonth]-firstDayOfMonth+1); //1-31
    //If the 1st day of the month is saturday then set index to 6, is not subtract it from 6 then add one to find the date of the first saturday
    let fisrtSat =  firstDayOfMonth == 6 ? 6 : (6-firstDayOfMonth) + 1;
    
    let weeks = [];
    //Loop for every saturday in the month
    for(let i=fisrtSat; i<=daysInMonth[monthIndex]; i=i+7){
      //Will do the math for this later
      weeks.push({startDay: firstDayOfCal, endDay: fisrtSat});
    }
    this.setState({
      todayDate: {
        monthIndex: monthIndex,
        year: year
      },
      daysInLastMonth: daysInMonth[lastMonth],
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
  render(){
    console.log(this.state)
    return (
    <table>
      <thead>
      <tr className="daysOfWeek">
        {this.renderDaysOfWeek()}
      </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>);
  }
}