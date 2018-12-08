import React, { Component } from 'react';
import { connect } from 'react-redux'
import firebase from "firebase";
import "./login.css";
import { createNewUser } from '../../actions/authAction'
import { BtnPrimary } from '../../atoms/buttons/buttons';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
    }
  }
  updateInput = (e,stateKey)=> {
    this.setState({ [stateKey]: e.target.value });
  }

  createUser = () =>{
    const { dispatch } = this.props;
    const { email , password, firstName, lastName } = this.state;
    const data = {
      email,
      password,
      firstName,
      lastName,
    }
    dispatch(createNewUser(data));
  }

  render(){
    const { email, password, firstName, lastName } = this.state;
    return(
      <div className={'container-loign'}>
        <div className={'form'}>
          Email: <input value={email}  onChange={(e)=> this.updateInput(e,'email')}/>
          Password: <input value={password}  onChange={(e)=> this.updateInput(e,'password')}/>
          firstName: <input value={firstName}  onChange={(e)=> this.updateInput(e,'firstName')}/>
          lastName: <input value={lastName}  onChange={(e)=> this.updateInput(e,'lastName')}/>
          <BtnPrimary onClick={this.createUser}> Skapa användare </BtnPrimary>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart : state.cart
})

export default connect(mapStateToProps)(Login)
