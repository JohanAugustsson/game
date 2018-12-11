import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '../../atoms/buttons/buttons';
import { createNewUser } from '../../store/actions/authAction'
import "./login.css";

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
          Lösenord: <input value={password}  onChange={(e)=> this.updateInput(e,'password')}/>
          Förnamn: <input value={firstName}  onChange={(e)=> this.updateInput(e,'firstName')}/>
          Efternamn: <input value={lastName}  onChange={(e)=> this.updateInput(e,'lastName')}/>
          <Button variant={'primary'} onClick={this.createUser}> Skapa användare </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart : state.cart
})

export default connect(mapStateToProps)(Login)
