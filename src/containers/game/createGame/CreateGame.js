import React, {Component} from 'react';
import {connect} from 'react-redux'
import Button from '../../../atoms/buttons/buttons';
import Input from '../../../atoms/input/Input';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { createNewGame } from '../../../store/actions/gameActions'
// import "./Game.css";



class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
              name: '',
              group: '',
              type: 'NHL',
            },
            error: {
              name: 'this is error'
            },
        }

        // const { game, userIsFetched, dispatch } = props;
        // if ( !game.isFetched ){
        //   dispatch(getGamesFromDatabase());
        // }
        // if (!userIsFetched) {
        //     dispatch(getUsersFromDatabase());
        // }
    }


    handleChange = (e, key) => {
        const { formField } = this.state
        formField[key] = e.target.value
        this.setState(formField);
    };


    createGame = () => {
        const {dispatch} = this.props;
        console.log('skapar game');
        dispatch(createNewGame({title: 'first Game'}));
    };


    render() {
        const { formField, error } = this.state;
        return (
            <div className={'container-game'}>
                <div className={'paper'}>
                  <Input
                    label='Name of the game'
                    formKey='name'
                    value={formField.name}
                    onChange={this.handleChange}
                    errorMsg={error.name}
                  />
                  <Input
                    label='Grupp'
                    formKey='group'
                    value={formField.group}
                    onChange={this.handleChange}
                    errorMsg={error.group}
                  />
                  <Input
                    label='Type of game'
                    formKey='type'
                    value={formField.type}
                    onChange={this.handleChange}
                    errorMsg={error.type}
                  />
                  <Button>Skapa GAME</Button>
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

export default connect(mapStateToProps)(CreateGame)
