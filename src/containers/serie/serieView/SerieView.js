import React, {Component} from 'react';
import {connect} from 'react-redux'
import moment from 'moment';
import Button from '../../../atoms/buttons/buttons';
import Input from '../../../atoms/input/Input';
import List from '../../../atoms/list/List';
import SnackBar from '../../../components/snackbar/Snackbar'
import { getGroups } from '../../../core/store/actions/groupActions'
import { getSeries  } from '../../../core/store/actions/SerieActions'
import { getUsers } from '../../../core/store/actions/userActions'
import './SerieView.css';


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

class SerieView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
              search: '',
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



    goTo = () => {
        const { history } = this.props;
        history.push('/serie/create')
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
            <div className={'container-serieview'}>
                <div className={'sheet'}>
                <h4>SERIES</h4>
                <div className='wrapper-headrow'>
                  <Input
                    label='Search'
                    formkey='search'
                    value={formField.search}
                    onChange={this.handleChange}
                    error={error.search}
                  />
                  <Button onClick={this.goTo}>Create new serie</Button>
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
    groupsIsFetched: store.groups.isFetched
});

export default connect(mapStateToProps)(SerieView)
