import React from 'react';
import {storiesOf} from "@storybook/react";
import {action} from '@storybook/addon-actions';
import PlayerAddSub from "../../src/components/players/PlayerAddSub";
import {Player} from "../../src/core/model/player";

export const player = new Player('1', 'Bill', 1);

export const actions = {
    onAdd: action('onAdd'),
    onSubstract: action('onSubstract'),
};


storiesOf('Player', module).add('default', () => <PlayerAddSub player={player} {...actions} />);