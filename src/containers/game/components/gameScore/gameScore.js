import React, {Component} from 'react';
import "./gameScore.css";
import connect from "react-redux/es/connect/connect";
import {
    addScoreActivityToGame,
    getGameActivitiesByGameId,
    listenAtActivity
} from "../../../../store/actions/gameActivityActions";
import PlayerAddSub from "../../../../components/players/PlayerAddSub";
import {Player} from "../../../../model/player";
import {getUsersFromDatabase} from "../../../../store/actions/userActions";
import {getGameFromDatabase, getGamesFromDatabase} from "../../../../store/actions/gameActions";
import {getGamePlayersFromDB} from "../../../../store/actions/gamePlayerActions";

class GameScore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentGameId: this.props.match.params.id
        };

        const {userIsFetched, gamesIsFetched, gamePlayerIsFetched, activitieIsFetched, currentGameIsFetched, dispatch} = props;
        if (!userIsFetched) {
            dispatch(getUsersFromDatabase());
        }
        if (!gamesIsFetched) {
            dispatch(getGamesFromDatabase());
        }

        if (!currentGameIsFetched) {
            dispatch(getGameFromDatabase(this.state.currentGameId))
        }

        if (!gamePlayerIsFetched) {
            dispatch(getGamePlayersFromDB(this.state.currentGameId));
        }

        if (!activitieIsFetched) {
            dispatch(getGameActivitiesByGameId(this.state.currentGameId));
        }
        if (this.state.currentGameId) {
            dispatch(listenAtActivity(this.state.currentGameId));
        }
    }

    renderPlayer() {
        const {activities, currentGame, gamePlayer, users} = this.props;
        if (gamePlayer && currentGame && activities) {
            return Object.keys(gamePlayer).map(member => {
                let usr = gamePlayer[member];
                let val = 0;
                Object.keys(activities).map(activity => {
                    if (activities[activity].userId === usr.uid) {
                        val = val + activities[activity].value;
                    }
                });
                return new Player(usr.uid, users[gamePlayer[member].uid].firstName, val, usr.gameId, usr.team)
            })
        }
        return [];
    }

    getScore(players) {
        let score = 0;
        players.map(player => {
            score = score + player.value;
        });
        return score;
    }

    onAdd(player) {
        const {dispatch} = this.props;
        dispatch(addScoreActivityToGame({player, value: 1}))
    }


    onSub(player) {
        const {dispatch} = this.props;
        dispatch(addScoreActivityToGame({player, value: -1}))
    }

    render() {
        let plays = this.renderPlayer();
        return (
            <div className={'row'}>
                test
                <div className={'column'}>
                    {this.getScore(plays.filter(player => player.isHome()))}
                    <div>
                        {plays.filter(player => player.isHome()).map((player, i) =>
                            <ul key={i}>
                                <PlayerAddSub key={i} player={player} onAdd={() => this.onAdd(player)}
                                              onSubstract={() => this.onSub(player)}/>
                            </ul>)}
                    </div>
                </div>
                <div className={'column'}>
                    {this.getScore(plays.filter(player => !player.isHome()))}
                    <div>
                        {plays.filter(player => !player.isHome()).map((player, i) =>
                            <ul key={i}>
                                <PlayerAddSub player={player} onAdd={() => this.onAdd(player)}
                                              onSubstract={() => this.onSub(player)}/>
                            </ul>)}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users.data,
    usersIsFetched: state.users.isFetched,
    games: state.games.data,
    gamesIsFetched: state.games.data.isFetched,
    currentGame: state.currentGame.data,
    currentGameIsFetched: state.currentGame.isFetched,
    activities: state.gameActivities.data,
    activitieIsFetched: state.gameActivities.isFetched,
    gamePlayer: state.gamePlayer.data,
    gamePlayerIsFetched: state.gamePlayer.isFetched,
});

export default connect(mapStateToProps)(GameScore)