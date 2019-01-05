import React, {Component} from 'react';
import {connect} from 'react-redux'
import moment from 'moment';
// import Button from '../../../atoms/buttons/buttons';
import Input from '../../../atoms/input/Input';
import List from '../../../atoms/list/List';
//import SnackBar from '../../../components/snackbar/Snackbar'
import { getGroups } from '../../../core/store/actions/groupActions'
import { getSeries  } from '../../../core/store/actions/SerieActions'
import { getUsers } from '../../../core/store/actions/userActions'
import { getGames  } from '../../../core/store/actions/gameActions'
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
            error: {}
        }

        const { dispatch, seriesIsFetched, usersIsFetched, groupsIsFetched, gamesIsFetched, user } = props;
        if (!usersIsFetched) {
            dispatch(getUsers(user.uid));
        }

        if (!groupsIsFetched) {
            dispatch(getGroups(user.uid));
        }
        if (!seriesIsFetched) {
            dispatch(getSeries(user.uid));
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
        history.push(`/serie/${serieId}/game/${gameId}`)
    };

    handleList = (e) =>{
      console.log('funkar ', e);
      console.log(e.rowData.id);
      this.goTo(e.rowData.id)
    }

    generateTableData = () => {
      const { users, series, groups, games } = this.props;
      if (!users || !series || !groups) return {};
      const newTableObj = {}
      console.log(games);
      Object.keys(games).map(gameKey=>{
        const game = games[gameKey];
        const serieKey = game.serieId;
        const serie = series[serieKey];
        newTableObj[gameKey] = {...game};
        newTableObj[gameKey].gameTitle = game.title || 'missing';
        newTableObj[gameKey].createdByName = users[game.createdBy] && users[game.createdBy].firstName && users[game.createdBy].lastName && users[game.createdBy].firstName + ' '+ users[game.createdBy].lastName   || 'missing';
        newTableObj[gameKey].btn = 'Select'
        newTableObj[gameKey].date = moment(game.createdAt.toDate()).format('YYYY-MM-DD HH:MM');
      })
      return newTableObj;
    }

    render() {
        const { formField, error } = this.state;
        const { history } = this.props;
        console.log(history);

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
    series: store.series.data,
    seriesIsFetched: store.series.isFetched,
    groups: store.groups.data,
    groupsIsFetched: store.groups.isFetched,
    games: store.games.data,
    gamesIsFetched: store.games.isFetched,
});

export default connect(mapStateToProps)(GamesInSerieView)
