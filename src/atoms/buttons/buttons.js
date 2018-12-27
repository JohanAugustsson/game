import React,{ Fragment} from 'react';
import './buttons.css';


function Button (props) {
  if ( props.variant ==='primary') return PrimaryBtn(props);
  if ( props.variant ==='btn-add') return BtnAdd(props);


  const children = props.children || 'missing';
  const variant = props.variant || 'default'
  return (
    <button
    className={"atoms-button " + variant}
    onClick={props.onClick }>{children}</button>
  );
}



function PrimaryBtn(props){
  const children = props.children || 'missing';
  const variant = props.variant || 'default'
  return (
    <button
    className={"atoms-button " + variant}
    onClick={props.onClick }>{children}</button>
  );
}

function BtnAdd(props){
  const children = props.children || 'missing';
  const variant = props.variant || 'default'
  return (
    <button
    className={"atoms-button " + variant}
    onClick={props.onClick }>{children}</button>
  );
}



export default Button;
