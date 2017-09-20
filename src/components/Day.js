import React from "react";
import PropTypes from 'prop-types';
import '../api-response';

export default class Day extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      events: []
    };
  }
  componentWillMount(){
    let thisDate = new Date(this.props.year,this.props.monthIndex,this.props.date);
    thisDate.setHours(0,0,0);
    console.log(thisDate);
    let events = [];
    for(let item of window.apiResponse.items){
      let times = [];
      for(let occurance of item.occurrences){
         let startDate = new Date(occurance.start);
         let endDate = new Date(occurance.finish);

         if(this.inDateRange(thisDate,startDate,endDate)){
           times.push({start: startDate, end: endDate});
         }
      }

      if(times.length > 0){
        event = {
          name: item.name,
          time: times
        };
        events.push(event);
      }
   }
   this.setState({
     events: events
   })
  }
  inDateRange(today,start,end){
    if(start.getYear() > today.getYear() || end.getYear() < today.getYear())
      return false
    if(start.getMonth() > today.getMonth() || end.getMonth() < today.getMonth())
      return false;
    if(start.getDate() > today.getDate() || end.getDate() < today.getDate())
      return false;

    return true;
  }
  render(){
    const dateClass = this.props.thisMonth ? "dateCell":"notInMonth";
    return (<td className={dateClass}>
      <label className="date">{this.props.date}</label>
    </td>);
  }
}

Day.propTypes = {
  date: PropTypes.number,
  thisMonth: PropTypes.bool,
  monthIndex: PropTypes.number,
  year: PropTypes.number
};