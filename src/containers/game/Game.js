import React, { Component } from 'react';
import { connect } from 'react-redux'
// import "./Game.css";
import { createNewUser } from '../../actions/authAction'
import { getUsersFromDatabase } from '../../actions/userActions'
import Button from '../../atoms/buttons/buttons';

class Game extends Component{
  constructor(props){
    super(props);
    this.state = {
      gameId: '',
      gameName:'',
    }

    const { users, dispatch } = props;
    if ( !users.isFetched ){
      dispatch(getUsersFromDatabase());
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
          <Button variant={'btn-add'} onClick={this.createUser}> + </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart : state.cart,
  users: state.users,
})

export default connect(mapStateToProps)(Game)
