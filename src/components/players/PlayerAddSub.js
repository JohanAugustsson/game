import React from 'react';
import PropTypes from 'prop-types';
import './playerAddSub.css'
import Grid from "@material-ui/core/Grid";
import PersonIcon from "@material-ui/core/SvgIcon/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function PlayerAddSub({player, onAdd, onSubstract}) {
    return (
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
                            onClick={() => onSubstract(player)}>
                    <RemoveIcon/>
                </IconButton>
            </Grid>
            <Grid item xs={1} sm={2} className={"gridcenter"}>
                <Typography variant={"subtitle1"}
                            align={"center"}
                            className={"gridcenter"}> {player.value}</Typography>
            </Grid>
            <Grid item xs={1} sm={1} className={"gridcenter"}>
                <IconButton aria-label="Add" onClick={() => onAdd(player)}>
                    <AddIcon/>
                </IconButton>
            </Grid>
        </Grid>
    )
}

PlayerAddSub.propTypes = {
    player: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        value: PropTypes.number,
    }),
    onAdd: PropTypes.func,
    onSubstract: PropTypes.func,
};


export default PlayerAddSub
