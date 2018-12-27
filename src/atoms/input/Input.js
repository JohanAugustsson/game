import React,{ Fragment} from 'react';
import './Input.css';

function Input (props) {

  return (
    <div className='atoms-input'>
    <label className='label-header'>
      {props.label}
    </label>
      <input
        {...props}
        value={props.value}
        className={props.variant}
        onChange={e=>props.onChange(e, props.formkey)}
      />
    <label className='label-bottom'>
      {props.error}
    </label>
    </div>
  );
}


export default Input;
