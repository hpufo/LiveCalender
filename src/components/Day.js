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
    let thisDayDate = new Date(this.props.year,this.props.monthIndex,this.props.date);

    for(let item of window.apiResponse.items){
      for(let occurance of item.occurrences){
         let startDate = new Date();
      }
      /*
      event = {
        name: item.name,

     };//*/
   }
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