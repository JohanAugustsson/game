import {Grid, IconButton, Typography} from "@material-ui/core";
import {Add, PermIdentity, Remove} from "@material-ui/icons";
import React from "react";
import {Player} from "../../core/model/player";
import "./playerAddSub.css";

interface Props {
    player: Player;
    onAdd: any;
    onSubstract: any;
}

export const PlayerAddSub: React.FC<Props> = (props) => {
    const {player, onAdd, onSubstract} = props;
    return (
        <Grid
            item={true}
            xs={true}
            container={true}
            direction={"row"}
            alignItems={"center"}
            justify={"center"}
        >
            <Grid item={true} xs={2} sm={2} className={"playeraddsub-gridcenter"}>
                <PermIdentity/>
            </Grid>
            <Grid item={true} xs={6} sm={6}>
                <span>{player.firstName}</span>
            </Grid>
            <Grid item={true} xs={1} sm={1} className={"playeraddsub-gridcenter"}>
                <IconButton
                    aria-label="Delete"
                    onClick={() => onSubstract(player)}
                >
                    <Remove/>
                </IconButton>
            </Grid>
            <Grid item={true} xs={2} sm={2} className={"playeraddsub-gridcenter"}>
                <Typography
                    variant={"subtitle1"}
                    align={"center"}
                    className={"playeraddsub-gridcenter"}
                >
                    {player.value}
                </Typography>
            </Grid>
            <Grid item={true} xs={1} sm={1} className={"playeraddsub-gridcenter"}>
                <IconButton aria-label="Add" onClick={() => onAdd(player)}>
                    <Add/>
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default PlayerAddSub;
