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
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PersonIcon from "@material-ui/icons/Person";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
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
        if (gamePlayer && game && activities) {
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
                                    {this.getScore(plays.filter(player => player.isHome()))}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography color="textSecondary">Away</Typography>
                                <Typography variant="subtitle1">
                                    {this.getScore(plays.filter(player => !player.isHome()))}
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
                                {plays.filter(player => player.isHome()).map((player, i) =>
                                    <div key={i}>
                                        <Divider/>
                                        <ListItem>
                                            <Grid item xs container direction={"row"}
                                                  alignItems={"center"} justify={"center"}>
                                                <Grid item xs={1} sm={2} className={"gridcenter"}>
                                                    <PersonIcon/>
                                                </Grid>
                                                <Grid item xs={8} sm={6}>
                                                    <span>{player.firstName}</span>
                                                </Grid>
                                                <Grid item xs={1} sm={1} className={"gridcenter"}>
                                                    <IconButton aria-label="Delete"
                                                                onClick={() => this.onSub(player)}>
                                                        <RemoveIcon/>
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={1} sm={2} className={"gridcenter"}>
                                                    <Typography variant={"subtitle1"}
                                                                align={"center"}
                                                                className={"gridcenter"}> {player.value}</Typography>
                                                </Grid>
                                                <Grid item xs={1} sm={1} className={"gridcenter"}>
                                                    <IconButton aria-label="Add" onClick={() => this.onAdd(player)}>
                                                        <AddIcon/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
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
                                {plays.filter(player => !player.isHome()).map((player, i) =>
                                    <div key={i}>
                                        <Divider/>
                                        <ListItem>
                                            <Grid item xs container direction={"row"}
                                                  alignItems={"center"} justify={"center"}>
                                                <Grid item xs={1} sm={2} className={"gridcenter"}>
                                                    <PersonIcon/>
                                                </Grid>
                                                <Grid item xs={8} sm={6}>
                                                    <span>{player.firstName}</span>
                                                </Grid>
                                                <Grid item xs={1} sm={1} className={"gridcenter"}>
                                                    <IconButton aria-label="Delete"
                                                                onClick={() => this.onSub(player)}>
                                                        <RemoveIcon/>
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={1} sm={2} className={"gridcenter"}>
                                                    <Typography variant={"subtitle1"}
                                                                align={"center"}
                                                                className={"gridcenter"}> {player.value}</Typography>
                                                </Grid>
                                                <Grid item xs={1} sm={1} className={"gridcenter"}>
                                                    <IconButton aria-label="Add" onClick={() => this.onAdd(player)}>
                                                        <AddIcon/>
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
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
