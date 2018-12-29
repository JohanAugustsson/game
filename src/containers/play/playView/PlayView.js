import React, {Component} from 'react';
import {connect} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '../../../atoms/buttons/buttons';
import Input from '../../../atoms/input/Input';
import Select from '../../../atoms/select/Select';
import List from '../../../atoms/list/List';
import SnackBar from '../../../components/snackbar/Snackbar'
import { getSeries  } from '../../../store/actions/SerieActions'
import './PlayView.css';


const dataForList = {
  efaef: { name: 'johan', age: 38, city: 'Göteborg' },
  feffe: { name: 'peter', age: 38, city: 'Stockholm' },
}

const labelList = {
  headers: ['Name','Age','City'],
  tabelKeys: [
    {
      type: 'text',
      value: 'name'
    },
    {
      type: 'button',
      value: 'age'
    },
    {
      type: 'button',
      value: 'city',
    }
  ]
}

class PlayView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
              groupId: "3EGYEr7hAO7hcfSQzr0C",
              serieId: 'd',
              title: '',
              playersHome: [],
              playersAway: [],
            },
            error: {
            },
        }

        const { seriesIsFetched, dispatch } = props;
        // if ( !game.isFetched ){
        //    dispatch(getGamesFromDatabase());
        // }
        // if (!userIsFetched) {
        //     dispatch(getUsersFromDatabase());
        // }
        // if (!groupIsFetched) {
        //     dispatch(getGroups('3FuxgH0SHURX7iee7ozGL4MC9Hr1'));
        // }
        if (!seriesIsFetched) {
            dispatch(getSeries('yX0vZHRTHBZQFkYs1QxFKUL7x6v2'));
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
        // dispatch(createNewGame(newData));
    };

    handleList = (e) =>{
      console.log('funkar ', e);
    }


    render() {
        const { formField, error } = this.state;
        const { users, groups, series } = this.props;

        return (
            <div className={'container-playview'}>
                <div className={'paper'}>
                  <Input
                    label='Name of the game'
                    formkey='title'
                    value={formField.title}
                    onChange={this.handleChange}
                    error={error.title}
                  />
                  <List
                    data={dataForList}
                    dataselect={labelList}
                    onClick={this.handleList}
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

export default connect(mapStateToProps)(PlayView)
