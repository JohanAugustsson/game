import React, {Component} from 'react';
import "./gameScore.css";
import connect from "react-redux/es/connect/connect";
import {
    addScoreActivityToGame,
    listenAtActivity,
    removeActivityListener
} from "../../../../store/actions/gameActivityActions";
import {Player} from "../../../../model/player";
import {getUsersFromDatabase} from "../../../../store/actions/userActions";
import {getGameFromDatabase, getGamesFromDatabase} from "../../../../store/actions/gameActions";
import {getGamePlayersFromDB} from "../../../../store/actions/gamePlayerActions";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/es/ListSubheader/ListSubheader";
import Divider from "@material-ui/core/es/Divider/Divider";
import PlayerAddSub from "../../../../components/players/PlayerAddSub";


class GameScore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameId: this.props.match.params.id
        };
    }

    componentWillMount() {
        const {userIsFetched, gamesIsFetched, gamePlayerIsFetched, gameIsFetched, dispatch} = this.props;
        if (!userIsFetched) {
            dispatch(getUsersFromDatabase());
        }
        if (!gamesIsFetched) {
            dispatch(getGamesFromDatabase());
        }

        if (!gameIsFetched) {
            dispatch(getGameFromDatabase(this.state.gameId))
        }

        if (!gamePlayerIsFetched) {
            dispatch(getGamePlayersFromDB(this.state.gameId));
        }
        dispatch(listenAtActivity(this.state.gameId));
    }

    componentWillUnmount() {
        removeActivityListener();
    };

    renderPlayer() {
        const {activities, game, gamePlayer, users} = this.props;
        if (gamePlayer && game && activities && users) {
            return Object.keys(gamePlayer).map(player => {
                let usr = gamePlayer[player];
                let val = 0;
                Object.keys(activities).map(activity => {
                    if (activities[activity].userUid === usr.userUid) {
                        val = val + activities[activity].value;
                    }
                });
                return new Player(usr.userUid, users[usr.userUid].firstName, val, usr.gameId, usr.team)
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
        let playersHome = plays.filter(player => player.isHome());
        let playersAway = plays.filter(player => !player.isHome());
        return (
            <div className={"root"}>
                <Paper className={"paper"}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography color="textSecondary">Game ID: 1030114</Typography>
                        </Grid>
                        <Grid item xs={12} sm container justify="space-around" alignItems="center">
                            <Grid item>
                                <Typography color="textSecondary">Home</Typography>
                                <Typography variant="subtitle1">
                                    {this.getScore(playersHome)}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography color="textSecondary">Away</Typography>
                                <Typography variant="subtitle1">
                                    {this.getScore(playersAway)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Paper className={"paper"}>
                            <List>
                                <ListSubheader>Home</ListSubheader>
                                {playersHome.map((player, i) =>
                                    <div key={i}>
                                        <Divider/>
                                        <ListItem>
                                            <PlayerAddSub player={player} onAdd={() => this.onAdd(player)}
                                                          onSubstract={() => this.onSub(player)}/>
                                        </ListItem>
                                    </div>
                                )}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={"paper"}>
                            <List>
                                <ListSubheader>Away</ListSubheader>
                                {playersAway.map((player, i) =>
                                    <div key={i}>
                                        <Divider/>
                                        <ListItem>
                                            <PlayerAddSub player={player} onAdd={() => this.onAdd(player)}
                                                          onSubstract={() => this.onSub(player)}/>
                                        </ListItem>
                                    </div>
                                )}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users.data,
    usersIsFetched: state.users.isFetched,
    games: state.games.data,
    gamesIsFetched: state.games.data.isFetched,
    game: state.game.data,
    gameIsFetched: state.game.isFetched,
    activities: state.gameActivities.data,
    gamePlayer: state.gamePlayer.data,
    gamePlayerIsFetched: state.gamePlayer.isFetched,
});

export default connect(mapStateToProps)(GameScore)
