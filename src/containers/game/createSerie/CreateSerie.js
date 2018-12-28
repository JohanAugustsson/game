import React, {Component} from 'react';
import {connect} from 'react-redux'
import Button from '../../../atoms/buttons/buttons';
import Input from '../../../atoms/input/Input';
import Select from '../../../atoms/select/Select';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { createSerie  } from '../../../store/actions/SerieActions'
import { getUsersFromDatabase } from '../../../store/actions/userActions'
import { getGroups } from '../../../store/actions/groupActions'
import CheckboxListSecondary from '../../../components/list/list'
// import "./Game.css";
import SnackBar from '../../../components/snackbar/Snackbar'



class CreateSerie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formField: {
              groupId: "3EGYEr7hAO7hcfSQzr0C",
              title: '',
              players: [],
            },
            error: {
            },
        }

        const { game, userIsFetched, groupIsFetched, dispatch } = props;
        // if ( !game.isFetched ){
        //    dispatch(getGamesFromDatabase());
        // }
        if (!userIsFetched) {
            dispatch(getUsersFromDatabase());
        }
        if (!groupIsFetched) {
            dispatch(getGroups('3FuxgH0SHURX7iee7ozGL4MC9Hr1'));
        }

    }


    handleChange = (e, key) => {
        const { formField } ={...this.state}
        formField[key] = e.target.value
        this.setState({formField});
    };


    handleCreateSerie = () => {
        const {dispatch} = this.props;
        const { formField } = this.state;
        dispatch(createSerie( {...formField} ));
    };


    render() {
        const { formField, error } = this.state;
        const { users, groups } = this.props;
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
                  <Input
                    label='Title of the serie'
                    formkey='title'
                    value={formField.title}
                    onChange={this.handleChange}
                    error={error.title}
                  />
                  <CheckboxListSecondary
                    data={users.data}
                    formkey='players'
                    value={formField.players}
                    onChange={this.handleChange}
                  />
                  <Button onClick={this.handleCreateSerie}>Skapa serie</Button>
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
    groupIsFetched: store.groups.isFetched
});

export default connect(mapStateToProps)(CreateSerie)