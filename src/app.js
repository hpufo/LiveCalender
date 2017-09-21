import React from "react";
import ReactDOM from "react-dom";
import Calendar from './components/Calendar';

let date = {year: 2015, month: 2, date: 1}
ReactDOM.render(<Calendar setDate={date} />, document.getElementById('root'));