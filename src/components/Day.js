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
    let dayStart = new Date(this.props.year,this.props.monthIndex,this.props.date);
    dayStart.setHours(0,0,0);
    console.log(dayStart)
    //Loop through the json file and get the data I want then store it in the events array
    let events = [];
    for(let item of window.apiResponse.items){
      for(let occurance of item.occurrences){
         let startDate = new Date(occurance.start);
         let endDate = new Date(occurance.finish);

         if(this.inDateRange(dayStart,startDate,endDate)){
           events.push({name: item.name, start: startDate, end: endDate});  //I am assuming you can have the save event more than once a day
         }
      }
   }
   //Sort then set the state
   this.sortByStartTime(events);
   this.setState({events: events});
  }
  //Sort by startDate by using an insertionSort I am assuming the dataset is small
  sortByStartTime(events){
    let temp;

    for(let i=1; i<events.length; i++){
      for(let j=i; j>0; j--){
        //Comapares the stateDate going into the storted sub array
        if(events[j].start.getTime() < events[j-1].start.getTime()){
          //swap
          temp = events[j-1];
          events[j-1] = events[j];
          events[j] = temp;
        }
      }
    }
  }
  //If today is in between the start and end date
  inDateRange(todayStart,start,end){
    let todayEnd = new Date(todayStart);
    todayEnd.setHours(23,59,59);
    //If the event ends before the start of the day or starts after the end of the day
    if(end.getTime() < todayStart.getTime() || start.getTime() > todayEnd.getTime())
      return false;
    //If we made it here then it must be true
    return true;
  }
  renderEvents(){
    return this.state.events.map((event,i) => {
      return <p className="event" key={i}>{event.name}</p>;
    });
  }
  render(){
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