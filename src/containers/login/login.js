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

  createUser = () =>{
    console.log("skapar användare");
    const { dispatch } = this.props;
    const { name , password } = this.state;
    const data = {
      name,
      password
    }
    dispatch(createNewUser(data));
  }

  render(){
    const { name, password } = this.state;
    return(
      <div className={'container-loign'}>
        Login

        Name: <input value={name}  onChange={(e)=> this.updateInput(e,'name')}/>
        Password: <input value={password}  onChange={(e)=> this.updateInput(e,'password')}/>
        <BtnPrimary onClick={this.createUser}> Logga in </BtnPrimary>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart : state.cart
})

export default connect(mapStateToProps)(Login)
