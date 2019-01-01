import React, {Component} from 'react';
import {connect} from 'react-redux'
import moment from 'moment';
import Button from '../../../atoms/buttons/buttons';
import Input from '../../../atoms/input/Input';
import List from '../../../atoms/list/List';
import SnackBar from '../../../components/snackbar/Snackbar'
import { getGroups } from '../../../core/store/actions/groupActions'
// import { getSeries  } from '../../../core/store/actions/SerieActions'
import { getUsers } from '../../../core/store/actions/userActions'
import './GroupView.css';


const labelList = {
  headers: ['Group','Created by','Date', 'Edit'],
  tabelKeys: [
    {
      type: 'text',
      value: 'title'
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

class GroupView extends Component {
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
        // if (!seriesIsFetched) {
        //     dispatch(getSeries(user.uid));
        // }


    }


    handleChange = (e, key) => {
        const { formField } ={...this.state}
        formField[key] = e.target.value
        this.setState({formField});
    };



    goTo = () => {
        const {dispatch, history } = this.props;
        const newData = {...this.state.formField};
        console.log(history);
        history.push('/group/create');
    };

    handleList = (e) =>{
      console.log('funkar ', e);
    }

    generateTableData = () => {
      const { users, groups } = this.props;
      if (!users || !groups) return {};
      const newTableObj = {}

      Object.keys(groups).map(groupKey=>{
        const group = groups[groupKey];
        newTableObj[groupKey] = {...group};
        newTableObj[groupKey].createdByName = users[group.createdBy] && users[group.createdBy].firstName && users[group.createdBy].lastName && users[group.createdBy].firstName + ' '+ users[group.createdBy].lastName   || 'missing';
        newTableObj[groupKey].btn = 'Select'
        newTableObj[groupKey].date = moment(group.createdAt.toDate()).format('YYYY-MM-DD HH:MM');
      })
      console.log(newTableObj);
      return newTableObj;
    }

    render() {
        const { formField, error } = this.state;

        const tableData = this.generateTableData();

        return (
            <div className={'container-groupview'}>
                <div className={'sheet'}>
                  <h4>GROUPS</h4>
                  <div className='wrapper-headrow'>
                    <Input
                      label='Search'
                      formkey='search'
                      value={formField.search}
                      onChange={this.handleChange}
                      error={error.search}
                    />
                    <Button onClick={this.goTo}>Create new group</Button>
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
    // series: store.series.data,
    // seriesIsFetched: store.series.isFetched,
    groups: store.groups.data,
    groupsIsFetched: store.groups.isFetched
});

export default connect(mapStateToProps)(GroupView)
