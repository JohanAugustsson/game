import React, {Component} from 'react';
import {connect} from 'react-redux'
import Button from '../../../atoms/buttons/buttons';
import Input from '../../../atoms/input/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { createGroup } from '../../../core/store/actions/groupActions'
import { getUsers } from '../../../core/store/actions/userActions'
import CheckboxListSecondary from '../../../components/list/list'
// import "./Game.css";
import SnackBar from '../../../components/snackbar/Snackbar'



class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
              title: '',
              password: '',
              players: [],
            },
            error: {
              title: 'this is error'
            },
        }

        const { game, userIsFetched, dispatch, user } = props;
        // if ( !game.isFetched ){
        //    dispatch(getGamesFromDatabase());
        // }
        if (!userIsFetched) {
            dispatch(getUsers(user.uid));
        }
    }


    handleChange = (e, key) => {
        const { formField } = this.state
        formField[key] = e.target.value
        this.setState({formField});
    };


    handleCreateGroup = () => {
        const {dispatch, user} = this.props;
        const { formField } = this.state;
        console.log('skapar game', user.uid);

        dispatch(createGroup( {...formField, createdBy: user.uid} ));
    };


    render() {
        const { formField, error } = this.state;
        const { users } = this.props;
        return (
            <div className={'container-game'}>
                <div className={'sheet'}>
                  <Input
                    label='Title of the group'
                    formkey='title'
                    value={formField.title}
                    onChange={this.handleChange}
                    error={error.title}
                  />
                  <Input
                    label='Password'
                    formkey='password'
                    value={formField.password}
                    onChange={this.handleChange}
                    error={error.password}
                  />
                  <CheckboxListSecondary
                    data={users.data}
                    formkey='players'
                    value={formField.players}
                    onChange={this.handleChange}
                  />
                  <Button onClick={this.handleCreateGroup}>Skapa Grupp</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    user: store.auth.data.user,
    users: store.users,
    games: store.games,
    game: store.game,
    userIsFetched: store.users.isFetched
});

export default connect(mapStateToProps)(CreateGroup)
