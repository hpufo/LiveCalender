import React from "react";
import ReactDOM from "react-dom";
import Calendar from './components/Calendar';

let date = {year: 2016, month: 3, date: 1}//For testing
ReactDOM.render(<Calendar />, document.getElementById('root'));