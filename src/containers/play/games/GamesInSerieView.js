import React, {Component} from 'react';
import {connect} from 'react-redux'
import moment from 'moment';
// import Button from '../../../atoms/buttons/buttons';
import Input from '../../../atoms/input/Input';
import List from '../../../atoms/list/List';
import Button from '../../../atoms/buttons/buttons';
//import SnackBar from '../../../components/snackbar/Snackbar'
import { getGroups } from '../../../core/store/actions/groupActions'
import { getSerie  } from '../../../core/store/actions/SerieActions'
import { getUsers } from '../../../core/store/actions/userActions'
import { getGames, createNewGame } from '../../../core/store/actions/gameActions'
import './GamesInSerieView.css';


const labelList = {
  headers: ['Title','Created by','Date','gameId'],
  tabelKeys: [
    {
      type: 'text',
      value: 'gameTitle'
    },
    {
      type: 'text',
      value: 'createdByName'
    },
    {
      type: 'text',
      value: 'date'
    },
    {
      type: 'button',
      value: 'btn',
    }
  ]
}

class GamesInSerieView extends Component {
    constructor(props) {
        super(props);
        const serieId = this.props.match.params.serieId;
        this.state = {
            formField: {
              search: '',
            },
            serieId: serieId,
            error: {},
            page: 1,
        }

        const { dispatch, seriesIsFetched, usersIsFetched, groupsIsFetched, gamesIsFetched, user } = props;
        if (!usersIsFetched) {
            dispatch(getUsers(user.uid));
        }

        if (!groupsIsFetched) {
            dispatch(getGroups(user.uid));
        }
        if (!seriesIsFetched) {
            dispatch(getSerie(serieId));
        }
        if (!gamesIsFetched) {
            dispatch(getGames(serieId));
        }


    }


    handleChange = (e, key) => {
        const { formField } ={...this.state}
        formField[key] = e.target.value
        this.setState({formField});
    };



    goTo = (gameId) => {
        console.log(gameId);
        const { history } = this.props;
        const { serieId } = this.state;
        history.push(`/play/serie/${serieId}/game/${gameId}`)
    };

    handleList = (e) =>{
      this.goTo(e.rowData.id)
    }

    generateTableData = () => {
      const { users, serie, groups, games } = this.props;
      if (!users || !serie || !groups) return {};
      const newTableObj = {}
      Object.keys(games).map(gameKey=>{
        const game = games[gameKey];
        newTableObj[gameKey] = {...game};
        newTableObj[gameKey].gameTitle = game.title || 'missing';
        newTableObj[gameKey].createdByName = users[game.createdBy] && users[game.createdBy].firstName && users[game.createdBy].lastName && users[game.createdBy].firstName + ' '+ users[game.createdBy].lastName   || 'missing';
        newTableObj[gameKey].btn = 'Select'
        newTableObj[gameKey].date = moment(game.createdAt.toDate()).format('YYYY-MM-DD HH:MM');
      })
      return newTableObj;
    }

    handleCreateNewGame = () => {
      const {dispatch, series } = this.props;
      const { serieId } = this.state;
      const selectedSerie = series[serieId];
      const newGame = {};
      newGame.serieId = selectedSerie.id;
      newGame.groupId = selectedSerie.groupId;
      newGame.title = new Date().getTime();
      dispatch(createNewGame(newGame)).then((game)=>{
        this.goTo(game.id)
      });
    }

    render() {
        const { formField, error } = this.state;
        const { history } = this.props;
        const tableData = this.generateTableData();

        return (
            <div className={'container-groupview'}>
                <div className={'sheet'}>
                  <h4>Games in current serie</h4>
                  <div className='wrapper-headrow'>
                    <Input
                      label='Search'
                      formkey='search'
                      value={formField.search}
                      onChange={this.handleChange}
                      error={error.search}
                    />
                    <Button onClick={this.handleCreateNewGame}>Create new game</Button>
                  </div>
                  <List
                    data={tableData}
                    dataselect={labelList}
                    onClick={this.handleList}
                  />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    user: store.auth.data.user,
    users: store.users.data,
    usersIsFetched: store.users.isFetched,
    serie: store.series.data,
    serieIsFetched: store.series.isFetched,
    groups: store.groups.data,
    groupsIsFetched: store.groups.isFetched,
    games: store.games.data,
    gamesIsFetched: store.games.isFetched,
});

export default connect(mapStateToProps)(GamesInSerieView)
