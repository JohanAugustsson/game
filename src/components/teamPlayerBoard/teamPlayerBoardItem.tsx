import {Divider, ListItem} from "@material-ui/core";
import React from "react";
import {Player} from "../../core/model/player";
import PlayerSelectTeam from "../players/playerSelectTeam";

interface Props {
    player: Player;
    onToggleChange: (team: string, player: Player) => void;
}

export const TeamPlayerBoardItem: React.FC<Props> = (props) => {
    const {player, onToggleChange} = props;
    return (
        <div>
            <Divider/>
            <ListItem>
                <PlayerSelectTeam
                    player={player}
                    onToogleChange={(team, updatePlayer) => onToggleChange(team, updatePlayer)}
                />
            </ListItem>
        </div>);
};

export default TeamPlayerBoardItem;
