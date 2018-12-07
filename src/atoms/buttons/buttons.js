import React from 'react';
import './buttons.css';

const buttonStyle = {
  margin: '10px 10px 10px 0'
};

function BtnPrimary (props) {
  const label = props.label ? props.label : 'missing';
  return (
    <button
    className="btnPrim"
    style={buttonStyle}
    onClick={props.onClick }>{label}</button>
  );
}
const BtnSecondary = (props)=>{
  return (
    <button
    className="btn btn-default"
    style={buttonStyle}
    onClick={props.handleClick}>{props.label}</button>
  );
}


export { BtnPrimary, BtnSecondary };
