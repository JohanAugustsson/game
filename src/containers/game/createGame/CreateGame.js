import React, {Component} from 'react';
import {connect} from 'react-redux'
import Button from '../../../atoms/buttons/buttons';
import Input from '../../../atoms/input/Input';
import Select from '../../../atoms/select/Select';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { createSerie, getSeries  } from '../../../store/actions/SerieActions'
import { getUsersFromDatabase } from '../../../store/actions/userActions'
import { getGroups } from '../../../store/actions/groupActions'
import { createNewGame } from '../../../store/actions/gameActions'
import CheckboxListSecondary from '../../../components/list/list'
// import "./Game.css";
import SnackBar from '../../../components/snackbar/Snackbar'



class CreateGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
              groupId: "qEdoFMaWDV60wWiQcN8p",
              serieId: 'd',
              title: '',
              playersHome: [],
              playersAway: [],
            },
            error: {
            },
        }

        const { game, userIsFetched, groupIsFetched, seriesIsFetched, dispatch } = props;
        // if ( !game.isFetched ){
        //    dispatch(getGamesFromDatabase());
        // }
        if (!userIsFetched) {
            dispatch(getUsersFromDatabase());
        }
        if (!groupIsFetched) {
            dispatch(getGroups('3FuxgH0SHURX7iee7ozGL4MC9Hr1'));
        }
        if (!seriesIsFetched) {
            dispatch(getSeries('qEdoFMaWDV60wWiQcN8p'));
        }

    }


    handleChange = (e, key) => {
        console.log(e, key);
        const { formField } ={...this.state}
        formField[key] = e.target.value
        this.setState({formField});
    };



    handleCreateGame = () => {
        const {dispatch} = this.props;
        const newData = {...this.state.formField};
        dispatch(createNewGame(newData));
    };


    render() {
        const { formField, error } = this.state;
        const { users, groups, series } = this.props;

        return (
            <div className={'container-game'}>
                <div className={'paper'}>
                  <Select
                    label='Group'
                    formkey='groupId'
                    value={formField.groupId}
                    onChange={this.handleChange}
                    data={groups.data}
                    dataselect={{selectLabel: 'name', selectValue: 'Id'}}
                  />
                  <Select
                    label='Series'
                    formkey='serieId'
                    value={formField.serieId}
                    onChange={this.handleChange}
                    data={series.data}
                    dataselect={{selectLabel: 'title', selectValue: 'Id'}}
                  />
                  <Input
                    label='Name of the game'
                    formkey='title'
                    value={formField.title}
                    onChange={this.handleChange}
                    error={error.title}
                  />
                  Home
                  <CheckboxListSecondary
                    data={users.data}
                    formkey='playersHome'
                    value={formField.playersHome}
                    onChange={this.handleChange}
                  />
                  Away
                  <CheckboxListSecondary
                    data={users.data}
                    formkey='playersAway'
                    value={formField.playersAway}
                    onChange={this.handleChange}
                  />
                  <Button onClick={this.handleCreateGame}>Skapa game</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    users: store.users,
    games: store.games,
    game: store.game,
    userIsFetched: store.users.isFetched,
    groups: store.groups,
    groupIsFetched: store.groups.isFetched,
    series: store.series,
    seriesIsFetched: store.series.isFetched
});

export default connect(mapStateToProps)(CreateGame)
