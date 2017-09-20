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
    console.log(window.apiResponse);
  }
  render(){
    return (<td>
      {this.props.date}
    </td>);
  }
}

Day.propTypes = {
  date: PropTypes.any,
};