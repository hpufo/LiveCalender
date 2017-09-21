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

    let events = [];
    for(let item of window.apiResponse.items){
      for(let occurance of item.occurrences){
         let startDate = new Date(occurance.start);
         let endDate = new Date(occurance.finish);

         if(this.inDateRange(thisDate,startDate,endDate)){
           events.push({name: item.name, start: startDate, end: endDate});
         }
      }
   }
   this.sortByStartTime(events);
   this.setState({
     events: events
   })
  }
  //Sort by startDate by using an insertionSort
  sortByStartTime(events){
    let temp;

    for(let i=1; i<events.length; i++){
      for(let j=i; j>0; j--){
        if(this.compareDates(events[j].start, events[j-1].start)){
          temp = events[j-1];
          events[j-1] = events[j];
          events[j] = temp;
        }
      }
    }
  }
  //If date1 is smaller than date2
  compareDates(date1, date2){
    //Check the year, month, day first.
    if(date1.getYear() < date2.getYear() || date1.getMonth() < date2.getMonth() || date1.getDate() < date2.getDate())
      return true;
    //then compare minutes
    if(date1.getUTCHours() < date2.getUTCHours())
      return true;
    if(date1.getMinutes() < date2.getMinutes())
      return true;

    return false;
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
  renderEvents(){
    return this.state.events.map((event,i) => {
      return <p className="event" key={i}>{event.name}</p>;
    });
  }
  render(){
    //console.log(this.state.events)
    const dateClass = this.props.thisMonth ? "dateCell":"notInMonth";
    return (
    <td className={dateClass}>
      <label className="date">{this.props.date}</label>
      {this.renderEvents()}
    </td>
    );
  }
}

Day.propTypes = {
  date: PropTypes.number,
  thisMonth: PropTypes.bool,
  monthIndex: PropTypes.number,
  year: PropTypes.number
};