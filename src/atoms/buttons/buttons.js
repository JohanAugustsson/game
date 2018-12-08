import React from 'react';
import './buttons.css';

const buttonStyle = {
  margin: '10px 10px 10px 0'
};

function BtnPrimary (props) {
  const children = props.children ? props.children : 'missing';
  return (
    <button
    className="btnPrimary"
    style={buttonStyle}
    onClick={props.onClick }>{children}</button>
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
