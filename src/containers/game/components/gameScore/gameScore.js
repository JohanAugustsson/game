import React, {Component} from 'react';
import "./gameScore.css";
import {
    addScoreActivityToGame,
    listenAtActivity,
    removeActivityListener
} from "../../../../core/store/actions/gameActivityActions";
import {Player} from "../../../../core/model/player";
import {getUsers} from "../../../../core/store/actions/userActions";
import {getGameFromDatabase, getGamesFromDatabase} from "../../../../core/store/actions/gameActions";
import {
    createOrUpdatePlayer,
    listenAtGamePlayer,
    removeGamePlayerListener
} from "../../../../core/store/actions/gamePlayerActions";
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/es/ListSubheader/ListSubheader";
import Divider from "@material-ui/core/es/Divider/Divider";
import PlayerAddSub from "../../../../components/players/PlayerAddSub";
import PlayerSelectTeam from "../../../../components/players/playerSelectTeam";
import {getSeriePlayers} from "../../../../core/store/actions/seriePlayerActions";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/es/Button";


class GameScore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameId: this.props.match.params.gameId,
            serieId: this.props.match.params.serieId,
            step: 0,
        };
    }

    componentWillMount() {
        const {userIsFetched, gamesIsFetched, gameIsFetched, seriePlayerIsFetched, dispatch} = this.props;
        if (!userIsFetched) {
            dispatch(getUsers());
        }
        if (!gamesIsFetched) {
            dispatch(getGamesFromDatabase());
        }

        if (!gameIsFetched) {
            dispatch(getGameFromDatabase(this.state.gameId))
        }

        if (!seriePlayerIsFetched) {
            dispatch(getSeriePlayers(this.state.serieId));
        }

        dispatch(listenAtActivity(this.state.gameId));
        dispatch(listenAtGamePlayer(this.state.gameId));
    }

    componentWillUnmount() {
        removeActivityListener();
        removeGamePlayerListener();
    };

    renderPlayer() {
        const {activities, game, gamePlayer, users} = this.props;
        if (gamePlayer && game && activities && users) {
            return Object.keys(gamePlayer).map(player => {
                let usr = gamePlayer[player];

                let val = Object.keys(activities)
                    .filter(activity => activities[activity].userUid === usr.userUid)
                    .map(activity => activities[activity].value)
                    .reduce((total, value) => total + value, 0);

                return new Player(usr.userUid, users[usr.userUid].firstName, val, usr.gameId, usr.team)
            });
        }
        return [];
    }

    getAvailablePlayers() {
        const {seriePlayer, gamePlayer, users} = this.props;
        let temp = {};
        Object.keys(seriePlayer).map(player => {
            temp = this.getPlayerInstance(temp, seriePlayer[player].userUid,
                users[seriePlayer[player].userUid].firstName, this.state.gameId, null);
        });
        Object.keys(gamePlayer).map(player => {
            let usr = gamePlayer[player];
            temp = this.getPlayerInstance(temp, usr.userUid, users[usr.userUid].firstName, usr.gameId, usr.team);
        });
        return temp;
    }

    getPlayerInstance(acc, playerUid, firstName, gameId, team) {
        return Object.assign({}, acc, {
            [playerUid]:
                new Player(playerUid, firstName, 0, gameId, team)
        });
    }

    getScore(players) {
        return players.map(player => player.value)
            .reduce((total, value) => total + value, 0);
    }

    onAdd(player) {
        const {dispatch} = this.props;
        dispatch(addScoreActivityToGame({player, value: 1}))
    }

    onSub(player) {
        const {dispatch} = this.props;
        dispatch(addScoreActivityToGame({player, value: -1}))
    }

    onToggleChange = (team, player) => {
        const {dispatch, game} = this.props;
        player.team = team;
        let flattenGame = game[Object.keys(game)[0]];
        dispatch(createOrUpdatePlayer({game: flattenGame, player}))
    };


    onPrev() {
        if (this.state.step > 0) {
            this.setState({step: this.state.step - 1});
        }
    }

    onNext() {
        if (this.state.step < 1) {
            this.setState({step: this.state.step + 1});
        }
    }


    getScoreBoard(playersHome, playersAway) {
        return <Paper className={"paper"}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography color="textSecondary">ID: {this.state.gameId}</Typography>
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
        </Paper>;
    }


    getTeamBoard(availablePlayers) {
        return <Grid container>
            <Grid item xs={12} sm={12}>
                <Typography variant={"headline"}>Test</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper className={"paper"}>
                    <List>
                        <ListSubheader>Select Team</ListSubheader>
                        {Object.keys(availablePlayers).map((player, i) =>
                            <div key={i}>
                                <Divider/>
                                <ListItem>
                                    <PlayerSelectTeam player={availablePlayers[player]}
                                                      onToogleChange={(team) => this.onToggleChange(team, availablePlayers[player])}/>
                                </ListItem>
                            </div>
                        )}
                    </List>
                </Paper>
            </Grid>
        </Grid>;
    }

    getPlayerBoard(playersHome, playersAway) {
        return <Grid container>
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
        </Grid>;
    }


    render() {
        let plays = this.renderPlayer();
        let availablePlayers = this.getAvailablePlayers();
        let playersHome = plays.filter(player => player.isHome());
        let playersAway = plays.filter(player => player.isAway());
        let scoreBoard;
        let playerBoard;
        let teamBoard;
        if (this.state.step === 1) {
            scoreBoard = this.getScoreBoard(playersHome, playersAway)
            playerBoard = this.getPlayerBoard(playersHome, playersAway)
        } else if (this.state.step === 0) {
            teamBoard = this.getTeamBoard(availablePlayers)
        }

        return (
            <div className={"root"}>
                <div style={{display: "flex"}}>
                    <div style={{flexGrow: 1}}>
                        <Button size="small" onClick={() => this.onPrev()} color="secondary"> Prev</Button>
                    </div>
                    <div>
                        <Button size="small" onClick={() => this.onNext()} color="secondary"> Next</Button>
                    </div>
                </div>
                {scoreBoard}
                {playerBoard}
                {teamBoard}
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
    seriePlayer: state.seriePlayer.data,
    seriePlayerIsFetched: state.seriePlayer.isFetched,
});

export default connect(mapStateToProps)(GameScore)
