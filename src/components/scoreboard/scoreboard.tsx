import {Grid, Paper, Typography} from "@material-ui/core";
import React from "react";
import {Player} from "../../core/model/player";

interface Props {
    playersHome: Player[];
    playersAway: Player[];
    gameId: string;
}

const extractScore = (players: Player[]) => {
    return players.map((player) => player.value)
        .reduce((total, value) => {
            total = total != null ? total : 0;
            value = value != null ? value : 0;
            return total + value;
        }, 0);
};

export const Scoreboard: React.FC<Props> = (props) => {
    const {playersHome, playersAway, gameId} = props;
    return (
        <Paper className={"paper"}>
            <Grid container={true}>
                <Grid item={true} xs={12}>
                    <Typography color="textSecondary">ID: {gameId}</Typography>
                </Grid>
                <Grid item={true} xs={12} sm={true} container={true} justify="space-around" alignItems="center">
                    <Grid item={true}>
                        <Typography color="textSecondary">Home</Typography>
                        <Typography variant="subtitle1">
                            {extractScore(playersHome)}
                        </Typography>
                    </Grid>
                    <Grid item={true}>
                        <Typography color="textSecondary">Away</Typography>
                        <Typography variant="subtitle1">
                            {extractScore(playersAway)}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default Scoreboard;
