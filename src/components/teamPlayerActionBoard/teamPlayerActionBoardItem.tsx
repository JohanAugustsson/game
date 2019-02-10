import {Divider, ListItem} from "@material-ui/core";
import React from "react";
import {Player} from "../../core/model/player";
import PlayerAddSub from "../players/playerAddSub";

interface Props {
    player: Player;
    onAdd: (player: Player) => void;
    onSub: (player: Player) => void;
}

export const TeamPlayerActionBoardItem: React.FC<Props> = (props) => {
    const {player, onAdd, onSub} = props;
    return (
        <div>
            <Divider/>
            <ListItem>
                <PlayerAddSub
                    player={player}
                    onAdd={() => onAdd(player)}
                    onSubstract={() => onSub(player)}
                />
            </ListItem>
        </div>);
};

export default TeamPlayerActionBoardItem;
