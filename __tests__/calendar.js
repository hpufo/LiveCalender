import React from 'react';
import {mount} from 'enzyme';
import Calendar from '../src/components/Calendar';

describe('a sun-mon calendar with events on each day', function() {

  test('should have a working test runner', function() {
    // Sanity check, feel free to remove this test
    expect(2).toEqual(2);
  });

  test('should render 4 weeks for the month feb/2015', function() {
    let date = {year: 2015, month: 1, date: 1}
    let wrapper = mount(<Calendar setDate={date}/>);
    expect(wrapper.find(".week").length).toBe(4);
  });

  test('should render 5 weeks for the month march/2016', function() {
    let date = {year: 2016, month: 3, date: 1}
    let wrapper = mount(<Calendar setDate={date}/>);
    expect(wrapper.find(".week").length).toBe(5);
  });

  test('should render 6 weeks for the month dec/2017', function() {
    let date = {year: 2017, month: 12, date: 1}
    let wrapper = mount(<Calendar setDate={date}/>);
    expect(wrapper.find(".week").length).toBe(6);
  });

  test('should render 31 days for the month march/2016', function() {
    let date = {year: 2016, month: 3, date: 1}
    let wrapper = mount(<Calendar setDate={date}/>);
    expect(wrapper.find(".dateCell").length).toBe(31);
  });

  test('should render 1 event on 1/march/2016', function() {

  });

  test('should render 3 events on 13/march/2016 in start order', function() {

  });
});