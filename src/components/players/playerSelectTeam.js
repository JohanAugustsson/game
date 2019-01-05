import React from 'react';
import PropTypes from 'prop-types';
import './playerSelectTeam.css'
import Grid from "@material-ui/core/Grid";
import PermIdentity from '@material-ui/icons/PermIdentity';
import Radio from "@material-ui/core/Radio";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import FormControlLabel from "@material-ui/core/FormControlLabel";

function PlayerSelectTeam({player, onToogleChange}) {
    return (
        <Grid item xs container direction={"row"}
              alignItems={"center"} justify={"center"}>
            <Grid item xs={2} sm={2} className={"playerselectteam-gridcenter"}>
                <PermIdentity/>
            </Grid>
            <Grid item xs={4} sm={4}>
                <span>{player.firstName}</span>
            </Grid>
            <Grid item xs={2} sm={2} className={"playerselectteam-gridcenter"}>
                <FormControlLabel className={"playerselectteam-compact"}
                                  label="Home"
                                  labelPlacement="top"
                                  control={
                                      <Radio style={{paddingTop: 0}}
                                             checked={player.isHome()}
                                             onChange={(event) => onToogleChange(event.target.value)}
                                             value="Home"
                                             name="radio-button-demo"
                                             aria-label="Home"
                                             icon={<RadioButtonUncheckedIcon fontSize="small"/>}
                                             checkedIcon={<RadioButtonCheckedIcon fontSize="small"/>}
                                      />}
                />
            </Grid>
            <Grid item xs={2} sm={2} className={"playeraddsub-gridcenter"}>
                <FormControlLabel className={"playerselectteam-compact"}
                                  label="Inactive"
                                  labelPlacement="top"
                                  control={
                                      <Radio style={{paddingTop: 0}}
                                             checked={!player.isHome() && !player.isAway()}
                                             onChange={(event) => onToogleChange(event.target.value)}
                                             value="Inactive"
                                             name="radio-button-demo"
                                             aria-label="Inactive"
                                             icon={<RadioButtonUncheckedIcon fontSize="small"/>}
                                             checkedIcon={<RadioButtonCheckedIcon fontSize="small"/>}
                                      />}
                />
            </Grid>
            <Grid item xs={2} sm={2} className={"playeraddsub-gridcenter"}>
                <FormControlLabel className={"playerselectteam-compact"}
                                  label="Away"
                                  labelPlacement="top"
                                  control={
                                      <Radio style={{paddingTop: 0}}
                                             checked={player.isAway()}
                                             onChange={(event) => onToogleChange(event.target.value)}
                                             value="Away"
                                             name="radio-button-demo"
                                             aria-label="Away"
                                             icon={<RadioButtonUncheckedIcon fontSize="small"/>}
                                             checkedIcon={<RadioButtonCheckedIcon fontSize="small"/>}
                                      />}

                />
            </Grid>
        </Grid>
    )
}

PlayerSelectTeam.propTypes = {
    player: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        value: PropTypes.number,
    }),
    onToogleChange: PropTypes.func,
};


export default PlayerSelectTeam
