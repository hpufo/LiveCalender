import React from "react";
import ReactDOM from "react-dom";
import Calendar from './components/Calendar';

let date = {year: 2015, month: 2, date: 1}//For testing
ReactDOM.render(<Calendar />, document.getElementById('root'));