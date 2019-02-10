import {Grid, List, ListSubheader, Paper} from "@material-ui/core";
import React from "react";
import {Player} from "../../core/model/player";
import TeamPlayerActionBoardItem from "./teamPlayerActionBoardItem";

interface Props {
    playersHome: Player[];
    playersAway: Player[];
    onAdd: (player: Player) => void;
    onSub: (player: Player) => void;
}

export const TeamPlayerActionBoard: React.FC<Props> = (props) => {
    const {playersHome, playersAway, onAdd, onSub} = props;
    return (
        <Grid container={true}>
            <Grid item={true} xs={12} sm={6}>
                <Paper className={"paper"}>
                    <List>
                        <ListSubheader>Home</ListSubheader>
                        {playersHome.map((player, i) =>
                            <TeamPlayerActionBoardItem
                                key={i}
                                player={player}
                                onAdd={onAdd}
                                onSub={onSub}
                            />)}
                    </List>
                </Paper>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
                <Paper className={"paper"}>
                    <List>
                        <ListSubheader>Away</ListSubheader>
                        {playersAway.map((player, i) =>
                            <TeamPlayerActionBoardItem
                                key={i}
                                player={player}
                                onAdd={onAdd}
                                onSub={onSub}
                            />)}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default TeamPlayerActionBoard;
