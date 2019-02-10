import {FormControlLabel, Grid, Radio} from "@material-ui/core";
import {PermIdentity, RadioButtonChecked, RadioButtonUnchecked} from "@material-ui/icons";
import * as React from "react";
import {Player} from "../../core/model/player";

interface Props {
    player: Player;
    onToogleChange: (team: string, player: Player) => void;
}

export const PlayerSelectTeam: React.FC<Props> = (props) => {
    const {player, onToogleChange} = props;
    return (
        <Grid
            item={true}
            xs={true}
            container={true}
            direction={"row"}
            alignItems={"center"}
            justify={"center"}
        >
            <Grid item={true} xs={2} sm={2} className={"playerselectteam-gridcenter"}>
                <PermIdentity/>
            </Grid>
            <Grid item={true} xs={4} sm={4}>
                <span>{player.firstName}</span>
            </Grid>
            <Grid item={true} xs={2} sm={2} className={"playerselectteam-gridcenter"}>
                <FormControlLabel
                    className={"playerselectteam-compact"}
                    label="Home"
                    labelPlacement="top"
                    control={
                        <Radio
                            style={{paddingTop: 0}}
                            checked={player.isHome()}
                            onChange={(event) => onToogleChange(event.target.value, player)}
                            value="Home"
                            name="radio-button-demo"
                            aria-label="Home"
                            icon={<RadioButtonUnchecked fontSize="small"/>}
                            checkedIcon={<RadioButtonChecked fontSize="small"/>}
                        />}
                />
            </Grid>
            <Grid item={true} xs={2} sm={2} className={"playeraddsub-gridcenter"}>
                <FormControlLabel
                    className={"playerselectteam-compact"}
                    label="Inactive"
                    labelPlacement="top"
                    control={
                        <Radio
                            style={{paddingTop: 0}}
                            checked={!player.isHome() && !player.isAway()}
                            onChange={(event) => onToogleChange(event.target.value, player)}
                            value="Inactive"
                            name="radio-button-demo"
                            aria-label="Inactive"
                            icon={<RadioButtonUnchecked fontSize="small"/>}
                            checkedIcon={<RadioButtonChecked fontSize="small"/>}
                        />}
                />
            </Grid>
            <Grid item={true} xs={2} sm={2} className={"playeraddsub-gridcenter"}>
                <FormControlLabel
                    className={"playerselectteam-compact"}
                    label="Away"
                    labelPlacement="top"
                    control={
                        <Radio
                            style={{paddingTop: 0}}
                            checked={player.isAway()}
                            onChange={(event) => onToogleChange(event.target.value, player)}
                            value="Away"
                            name="radio-button-demo"
                            aria-label="Away"
                            icon={<RadioButtonUnchecked fontSize="small"/>}
                            checkedIcon={<RadioButtonChecked fontSize="small"/>}
                        />}

                />
            </Grid>
        </Grid>
    );
};

export default PlayerSelectTeam;
