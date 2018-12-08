import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from "firebase";
import "./login.css";
import { createNewUser } from '../../actions/auth'
import { BtnPrimary } from '../../atoms/buttons/buttons';

console.log(firebase);

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }
  updateInput = (e,stateKey)=> {
    this.setState({ [stateKey]: e.target.value });
  }

  createUser = () =>{
    const { dispatch } = this.props;
    const { email , password } = this.state;
    const data = {
      email,
      password
    }
    dispatch(createNewUser(data));
  }

  render(){
    const { email, password } = this.state;
    return(
      <div className={'container-loign'}>
        Name: <input value={email}  onChange={(e)=> this.updateInput(e,'email')}/>
        Password: <input value={password}  onChange={(e)=> this.updateInput(e,'password')}/>
        <BtnPrimary onClick={this.createUser}> Skapa användare </BtnPrimary>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart : state.cart
})

export default connect(mapStateToProps)(Login)
