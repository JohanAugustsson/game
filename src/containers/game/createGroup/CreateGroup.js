import React, {Component} from 'react';
import {connect} from 'react-redux'
import Button from '../../../atoms/buttons/buttons';
import Input from '../../../atoms/input/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { createNewGame } from '../../../store/actions/gameActions'
import { getUsersFromDatabase } from '../../../store/actions/userActions'
// import "./Game.css";



class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
              name: '',
              password: '',
            },
            error: {
              name: 'this is error'
            },
        }

        const { game, userIsFetched, dispatch } = props;
        // if ( !game.isFetched ){
        //    dispatch(getGamesFromDatabase());
        // }
        if (!userIsFetched) {
            dispatch(getUsersFromDatabase());
        }
    }


    handleChange = (e, key) => {
        const { formField } = this.state
        formField[key] = e.target.value
        this.setState({formField});
    };


    createGame = () => {
        const {dispatch} = this.props;
        const { formField } = this.state;
        const { title, group, type } = formField;
        console.log('skapar game');
        dispatch(createNewGame({title: 'first Game'}));
    };


    render() {
        const { formField, error } = this.state;
        return (
            <div className={'container-game'}>
                <div className={'paper'}>
                  <Input
                    label='Title of the group'
                    formkey='name'
                    value={formField.title}
                    onChange={this.handleChange}
                    error={error.title}
                  />
                  <Input
                    label='Password'
                    formkey='password'
                    value={formField.title}
                    onChange={this.handleChange}
                    error={error.title}
                  />
                  <Button onClick={this.createGame}>Skapa Grupp</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    users: store.users,
    games: store.games,
    game: store.game,
    userIsFetched: store.users.isFetched
});

export default connect(mapStateToProps)(CreateGroup)
