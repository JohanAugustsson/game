import * as React from "react";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Dispatch} from "redux";
import Button from "../../../../atoms/buttons/buttons";
import ActivityList from "../../../../components/activityList/activityList";
import Scoreboard from "../../../../components/scoreboard/scoreboard";
import TeamPlayerActionBoard from "../../../../components/teamPlayerActionBoard/teamPlayerActionBoard";
import TeamPlayerBoard from "../../../../components/teamPlayerBoard/teamPlayerBoard";
import {Player} from "../../../../core/model/player";
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

    render() {
        const plays = this.renderPlayer();
        const availablePlayers = this.getAvailablePlayers();
        const playersHome = plays.filter((player) => player.isHome());
        const playersAway = plays.filter((player) => player.isAway());

        const teamBoard = <TeamPlayerBoard
            players={availablePlayers}
            onToggleChange={(team: string, player: Player) => this.onToggleChange(team, player)}
        />;

        const scoreBoard = <Scoreboard playersHome={playersHome} playersAway={playersAway} gameId={this.state.gameId}/>;

        const playerBoard = <TeamPlayerActionBoard
            playersHome={playersHome}
            playersAway={playersAway}
            onAdd={(player: Player) => this.onAdd(player)}
            onSub={(player: Player) => this.onSub(player)}
        />;

        const activityBoard = <ActivityList activities={this.props.activities} users={this.props.users}/>;

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
                {this.state.step === 0 ? teamBoard : ""}
                {this.state.step === 1 ? scoreBoard : ""}
                {this.state.step === 1 ? playerBoard : ""}
                {this.state.step === 1 ? activityBoard : ""}
            </div>
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
