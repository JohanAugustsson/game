import {Divider, Grid, List, ListItem, ListSubheader, Paper, Typography} from "@material-ui/core";
import * as React from "react";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import Button from "../../../../atoms/buttons/buttons";
import PlayerAddSub from "../../../../components/players/playerAddSub";
import PlayerSelectTeam from "../../../../components/players/playerSelectTeam";
import {Player} from "../../../../core/model/player";
import {compareTimestamps, getDateFromTimestamp} from "../../../../core/momentHelper";
import {getGame} from "../../../../core/store/actions/gameActions";
import {listenAtActivity, removeActivityListener} from "../../../../core/store/actions/gameActivityActions";
import {
    createOrUpdatePlayer,
    listenAtGamePlayer,
    removeGamePlayerListener,
} from "../../../../core/store/actions/gamePlayerActions";
import {getSeriePlayers} from "../../../../core/store/actions/seriePlayerActions";
import {getUsers} from "../../../../core/store/actions/userActions";
import {ApplicationState} from "../../../../core/store/applicationstate";
import "./gameScore.css";

interface RouteParams {
    gameId: string;
    serieId: string;
}

interface Props extends RouteComponentProps<RouteParams> {
    activities: any;
    game: any;
    gameIsFetched: boolean;
    gamePlayer: any;
    gamePlayerIsFetched: boolean;
    seriePlayer: any;
    seriePlayerIsFetched: boolean;
    users: any;
    usersIsFetched: boolean;
    dispatch: Dispatch<any>;
}

interface State {
    gameId: string;
    serieId: string;
    step: number;
}

class GameScore extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            gameId: this.props.match.params.gameId,
            serieId: this.props.match.params.serieId,
            step: 0,
        };
    }

    componentWillMount() {
        const {usersIsFetched, seriePlayerIsFetched, dispatch} = this.props;
        if (!usersIsFetched) {
            dispatch(getUsers());
        }

        if (!seriePlayerIsFetched) {
            dispatch(getSeriePlayers(this.state.serieId));
        }

        dispatch(getGame(this.state.gameId));
        dispatch(listenAtActivity(this.state.gameId));
        dispatch(listenAtGamePlayer(this.state.gameId));
    }

    componentWillUnmount() {
        removeActivityListener();
        removeGamePlayerListener();
    }

    renderPlayer() {
        const {activities, game, gamePlayer, users} = this.props;
        if (gamePlayer && game.id && activities && users) {
            return Object.keys(gamePlayer).map((player) => {
                const usr = gamePlayer[player];

                const val = Object.keys(activities)
                    .filter((activity) => activities[activity].userUid === usr.userUid)
                    .map((activity) => activities[activity].value)
                    .reduce((total, value) => total + value, 0);
                return new Player(
                    usr.userUid, users[usr.userUid].firstName, val,
                    game.id, usr.team, game.groupId, game.serieId,
                );
            });
        }
        return [];
    }

    getAvailablePlayers() {
        const {seriePlayer, gamePlayer, users, game} = this.props;
        if (game.id) {
            let temp = {};
            Object.keys(seriePlayer).map((player) => {
                temp = this.getPlayerInstance(temp, seriePlayer[player].userUid,
                    users[seriePlayer[player].userUid].firstName, this.state.gameId, "", game.groupId, game.serieId);
            });
            Object.keys(gamePlayer).map((player) => {
                const usr = gamePlayer[player];
                temp = this.getPlayerInstance(
                    temp, usr.userUid, users[usr.userUid].firstName, usr.gameId, usr.team, game.groupId, game.serieId,
                );
            });
            return temp;
        } else {
            return {};
        }
    }

    getPlayerInstance(acc: any, playerUid: string, firstName: string,
                      gameId: string, team: string, groupId: string, serieId: string) {
        return {
            ...acc,
            [playerUid]:
                new Player(playerUid, firstName, 0, gameId, team, groupId, serieId),
        };
    }

    getScore(players: Player[]) {
        return players.map((player) => player.value)
            .reduce((total, value) => {
                total = total != null ? total : 0;
                value = value != null ? value : 0;
                return total + value;
            }, 0);
    }

    onAdd(player: Player) {
        const {dispatch} = this.props;
        player.addScore(dispatch);
    }

    onSub(player: Player) {
        const {dispatch} = this.props;
        player.substractScore(dispatch);
    }

    onToggleChange(team: string, player: Player) {
        const {dispatch, game} = this.props;
        player.team = team;
        dispatch(createOrUpdatePlayer({game, player}));
    }

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

    getScoreBoard(playersHome: Player[], playersAway: Player[]) {
        return <Paper className={"paper"}>
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography color="textSecondary">ID: {this.state.gameId}</Typography>
                </Grid>
                <Grid item={true} xs={12} sm={true} container={true} justify="space-around" alignItems="center">
                    <Grid item={true}>
                        <Typography color="textSecondary">Home</Typography>
                        <Typography variant="subtitle1">
                            {this.getScore(playersHome)}
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        <Typography color="textSecondary">Away</Typography>
                        <Typography variant="subtitle1">
                            {this.getScore(playersAway)}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>;
    }

    getTeamBoard(availablePlayers: any) {
        return <Grid container={true}>
            <Grid item={true} xs={12} sm={12}>
                <Typography variant={"headline"}>Test</Typography>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
                <Paper className={"paper"}>
                    <List>
                        <ListSubheader>Select Team</ListSubheader>
                        {this.listAvailablePlayers(availablePlayers)}
                    </List>
                </Paper>
            </Grid>
        </Grid>;
    }

    getActivityBoard() {
        const {activities, users} = this.props;
        if (!activities) {
            return;
        }
        const acts = Object.keys(activities).map((activity) => activities[activity]).sort(compareTimestamps);
        return <Grid container={true}>
            <Grid item={true} xs={12} sm={12}>
                <Typography variant={"headline"}/>
            </Grid>
            <Grid item={true} xs={12} sm={12}>
                <Paper className={"paper"}>
                    <Typography>Activities in game</Typography>
                    <Grid item={true} xs={true} container={true} direction={"row"}>
                        <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                            <span>Name</span>
                        </Grid>
                        <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                            <span>Value</span>
                        </Grid>
                        <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                            Team
                        </Grid>
                        <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                            <span>Type</span>
                        </Grid>
                        <Grid item={true} xs={4} sm={4} className={"grid-flex-center"}>
                            Date
                        </Grid>
                    </Grid>
                    <List style={{maxHeight: 300, overflow: "auto"}}>
                        {this.getActiitiesForActivityBoard(acts, users)}
                    </List>
                </Paper>
            </Grid>
        </Grid>;
    }

    getPlayerList(playersHome: Player[]) {
        return playersHome.map((player, i) =>
            <div key={i}>
                <Divider/>
                <ListItem>
                    <PlayerAddSub
                        player={player}
                        onAdd={() => this.onAdd(player)}
                        onSubstract={() => this.onSub(player)}
                    />
                </ListItem>
            </div>,
        );
    }

    getPlayerBoard(playersHome: Player[], playersAway: Player[]) {
        return <Grid container={true}>
            <Grid item={true} xs={12} sm={6}>
                <Paper className={"paper"}>
                    <List>
                        <ListSubheader>Home</ListSubheader>
                        {this.getPlayerList(playersHome)}
                    </List>
                </Paper>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
                <Paper className={"paper"}>
                    <List>
                        <ListSubheader>Away</ListSubheader>
                        {this.getPlayerList(playersAway)}
                    </List>
                </Paper>
            </Grid>
        </Grid>;
    }

    render() {
        const plays = this.renderPlayer();
        const availablePlayers = this.getAvailablePlayers();
        const playersHome = plays.filter((player) => player.isHome());
        const playersAway = plays.filter((player) => player.isAway());

        const teamBoard = this.state.step === 0 ? this.getTeamBoard(availablePlayers) : "";

        const scoreBoard = this.state.step === 1 ? this.getScoreBoard(playersHome, playersAway) : "";
        const playerBoard = this.state.step === 1 ? this.getPlayerBoard(playersHome, playersAway) : "";
        const activityBoard = this.state.step === 1 ? this.getActivityBoard() : "";

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
                {activityBoard}
            </div>
        );
    }

    private getActiitiesForActivityBoard(acts: any, users: any) {
        return acts.map((activity: any, i: number) =>
            <div key={i}>
                <Divider/>
                <ListItem>
                    <Grid item={true} xs={true} container={true} direction={"row"}>
                        <Grid
                            style={{textAlign: "left"}}
                            item={true}
                            xs={2}
                            sm={2}
                            className={"grid-flex-center"}
                        >
                            <span>{users[activity.userUid].firstName}</span>
                        </Grid>
                        <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                            <span>{activity.value}</span>
                        </Grid>
                        <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                            <span>{activity.team}</span>
                        </Grid>
                        <Grid item={true} xs={2} sm={2} className={"grid-flex-center"}>
                            <span>{activity.type}</span>
                        </Grid>
                        <Grid
                            style={{textAlign: "right"}}
                            item={true}
                            xs={4}
                            sm={4}
                            className={"grid-flex-center"}
                        >
                            {getDateFromTimestamp(activity.createdAt)}
                        </Grid>
                    </Grid>
                </ListItem>
            </div>,
        );
    }

    private listAvailablePlayers(availablePlayers: any) {
        return Object.keys(availablePlayers).map((key: string, i) =>
            <div key={i}>
                <Divider/>
                <ListItem>
                    <PlayerSelectTeam
                        player={availablePlayers[key]}
                        onToogleChange={(team) => this.onToggleChange(team, availablePlayers[key])}
                    />
                </ListItem>
            </div>,
        );
    }

}

const mapStateToProps = ({gameActivities, game, gamePlayer, seriePlayer, users}: ApplicationState) => ({
    activities: gameActivities.data,
    game: game.data,
    gameIsFetched: game.isFetched,
    gamePlayer: gamePlayer.data,
    gamePlayerIsFetched: gamePlayer.isFetched,
    seriePlayer: seriePlayer.data,
    seriePlayerIsFetched: seriePlayer.isFetched,
    users: users.data,
    usersIsFetched: users.isFetched,
});

export default connect(mapStateToProps)(GameScore);
