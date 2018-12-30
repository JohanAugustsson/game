import React, {Component} from 'react';
import {connect} from 'react-redux'
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '../../../atoms/buttons/buttons';
import Input from '../../../atoms/input/Input';
import Select from '../../../atoms/select/Select';
import List from '../../../atoms/list/List';
import SnackBar from '../../../components/snackbar/Snackbar'
import { getGroups } from '../../../core/store/actions/groupActions'
import { getSeries  } from '../../../core/store/actions/SerieActions'
import { getUsers } from '../../../core/store/actions/userActions'
import './PlayView.css';

const labelList = {
  headers: ['Title','Group','Created by','Date','SerieId'],
  tabelKeys: [
    {
      type: 'text',
      value: 'title'
    },
    {
      type: 'text',
      value: 'groupTitle'
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

class PlayView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
              groupId: '',
              serieId: '',
              title: '',
              playersHome: [],
              playersAway: [],
            },
            error: {}
        }

        const { dispatch, seriesIsFetched, usersIsFetched, groupsIsFetched, user } = props;
        if (!usersIsFetched) {
            dispatch(getUsers(user.uid));
        }

        if (!groupsIsFetched) {
            dispatch(getGroups(user.uid));
        }
        if (!seriesIsFetched) {
            dispatch(getSeries(user.uid));
        }


    }


    handleChange = (e, key) => {
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

    generateTableData = () => {
      const { users, series, groups } = this.props;
      if (!users || !series || !groups) return {};
      const newTableObj = {}

      Object.keys(series).map(serieKey=>{
        const serie = series[serieKey];
        newTableObj[serieKey] = {...serie};
        newTableObj[serieKey].groupTitle = groups[serie.groupId] && groups[serie.groupId].title || 'missing';
        newTableObj[serieKey].createdByName = users[serie.createdBy] && users[serie.createdBy].firstName && users[serie.createdBy].lastName && users[serie.createdBy].firstName + ' '+ users[serie.createdBy].lastName   || 'missing';
        newTableObj[serieKey].btn = 'Select'
        newTableObj[serieKey].date = moment(serie.createdAt.toDate()).format('YYYY-MM-DD HH:MM');
      })
      return newTableObj;
    }

    render() {
        const { formField, error } = this.state;

        const tableData = this.generateTableData();

        return (
            <div className={'container-playview'}>
                <div className={'sheet'}>
                  <Input
                    label='Name of the game'
                    formkey='title'
                    value={formField.title}
                    onChange={this.handleChange}
                    error={error.title}
                  />
                  <List
                    data={tableData}
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
    user: store.auth.data.user,
    users: store.users.data,
    usersIsFetched: store.users.isFetched,
    series: store.series.data,
    seriesIsFetched: store.series.isFetched,
    groups: store.groups.data,
    groupsIsFetched: store.groups.isFetched
});

export default connect(mapStateToProps)(PlayView)
