import React, {Component} from 'react';
import {connect} from 'react-redux'
import "./Game.css";
import {createNewUser} from '../../store/actions/authAction'
import {getUsersFromDatabase} from '../../store/actions/userActions'
import {getGamesFromDatabase} from '../../store/actions/gameActions'
import Button from '../../atoms/buttons/buttons';
import GameView from './GameView';
import PlayerAddSub from "../../components/players/PlayerAddSub";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: '',
            gameName: '',
        };

        const {userIsFetched, gamesIsFetched, dispatch} = props;
        if (!userIsFetched) {
            dispatch(getUsersFromDatabase());
        }
        if (!gamesIsFetched) {
            dispatch(getGamesFromDatabase());
        }
    }

    updateInput = (e, stateKey) => {
        this.setState({[stateKey]: e.target.value});
    };

    createUser = () => {
        const {dispatch} = this.props;
        const {email, password, firstName, lastName} = this.state;
        const data = {
            email,
            password,
            firstName,
            lastName,
        };
        dispatch(createNewUser(data));
    };

    renderPlayerList = () => {
        const {currentGame, users } = this.props;
        const {members} = currentGame;
        if (!members) return null;

        const home = [];
        const away = [];
        Object.values(members).forEach(member => {
            console.log(member);
            if (member.team === 'Home') {
                home.push(this.createPlayer(users[member.uid]));
            } else {
                away.push(this.createPlayer(users[member.uid]));
            }
        });
        return {home, away};
    };

    createPlayer = (member) => {
      console.log(member);
      return (     <li><PlayerAddSub player={member} onSubstract={() => console.log("sub")} onAdd={() => console.log("add")}/></li>)

    };


    render() {
        const {email, password, firstName, lastName} = this.state;
        const {currentGame} = this.props;

        const teamList = (currentGame && currentGame.members) ? this.renderPlayerList() : {
            home: null,
            away: null
        };
        const title = currentGame.title || 'Inget spel valt'

        return (
            <div className={'container-game'}>
                <div className={'wrapper-game'}>
                    <h3> {title} </h3>
                    <div>
                      <div>
                        Home
                        <ul>
                          {teamList.home}
                        </ul>
                      </div>
                        Away
                        <div>
                          <ul>
                            {teamList.away}
                          </ul>
                      </div>
                    </div>
                </div>
                <GameView/>

                <Button variant={'btn-add'} onClick={this.createUser}> + </Button>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    cart: store.cart,
    users: store.users.data,
    usersIsFetched: store.users.isFetched,
    games: store.games.data,
    gameIsFetched: store.games.isFetched,
    currentGame: store.currentGame.data,
});

export default connect(mapStateToProps)(Game)