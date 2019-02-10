import {Grid, List, ListSubheader, Paper, Typography} from "@material-ui/core";
import React from "react";
import {InterfaceHash} from "../../core/model/iHash";
import {Player} from "../../core/model/player";
import TeamPlayerBoardItem from "./teamPlayerBoardItem";

interface Props {
    players: InterfaceHash<Player>;
    onToggleChange: (team: string, player: Player) => void;
}

export const TeamPlayerBoard: React.FC<Props> = (props) => {
    const {players, onToggleChange} = props;
    return (
        <Grid container={true}>
            <Grid item={true} xs={12} sm={12}>
                <Typography variant={"headline"}>Test</Typography>
            </Grid>
            <Grid item={true} xs={12} sm={6}>
                <Paper className={"paper"}>
                    <List>
                        <ListSubheader>Select Team</ListSubheader>
                        {Object.keys(players).map((key: string, i) =>
                            <TeamPlayerBoardItem
                                key={i}
                                player={players[key]}
                                onToggleChange={onToggleChange}
                            />)
                        }
                    </List>
                </Paper>
            </Grid>
        </Grid>);
};

export default TeamPlayerBoard;
