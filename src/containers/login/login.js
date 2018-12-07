import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from "firebase";
import "./login.css";
import { BtnPrimary } from '../../atoms/buttons/buttons';

console.log(firebase);

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: "",
      password: "",
    }
  }
  updateInput = (e,stateKey)=> {
    console.log("hej", e.target.value);
    this.setState({ [stateKey]: e.target.value });
  }

  test = () => {
    console.log("hej");
  }
  render(){
    const { name, password } = this.state;
    return(
      <div class={'container-loign'}>
        Login

        Name: <input value={name}  onChange={(e)=> this.updateInput(e,'name')}/>
        Password: <input value={password}  onChange={(e)=> this.updateInput(e,'password')}/>
        <BtnPrimary onClick={this.test}> Logga in </BtnPrimary>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart : state.cart
})

export default connect(mapStateToProps)(Login)
