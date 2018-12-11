import React from 'react';
import {storiesOf} from "@storybook/react";
import {action} from '@storybook/addon-actions';
import PlayerAddSub from "../../src/components/players/PlayerAddSub";

export const player = {
    uid: '1',
    name: 'Bill',
    value: 1,
};

export const actions = {
    onAdd: action('onAdd'),
    onSubstract: action('onSubstract'),
};


storiesOf('Player', module).add('default', () => <PlayerAddSub player={player} {...actions} />);