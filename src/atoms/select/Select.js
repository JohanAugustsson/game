import React from 'react';
import './Select.css';

// data : object with data that we are going to select from
// dataselect: which key we are going to select..
//    -selectValue: a key which we want to handel
//    -selectLabel: text which user is going to se in the dropdown


function Select (props) {
  const { data, dataselect } = props;
  const optionList = Object.keys(data).map((itemKey)=>{
    const item = {
      value: data[itemKey][dataselect.selectValue],
      label: data[itemKey][dataselect.selectLabel],
    }
    return (
      <option key={itemKey} value={item.value}>
        {item.label}
      </option>
    )
  })

  return (
    <div className='atoms-select'>
      <label className='label-header'>
        {props.label}
      </label>
      <select
        {...props}
        onChange={e=>props.onChange(e, props.formkey)}
      >
        <option>-</option>
        {optionList}
      </select>
      <label className='label-bottom'>
        {props.error}
      </label>
    </div>
  );
}


export default Select;
