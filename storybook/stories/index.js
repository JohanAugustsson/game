import React from 'react';
import {storiesOf} from '@storybook/react';
import {BtnPrimary} from "../../src/atoms/buttons/buttons";

storiesOf('Button', module)
    .add('with text', () => <BtnPrimary>Hello Button</BtnPrimary>)
    .add('with some emoji', () => (
        <BtnPrimary>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
        </BtnPrimary>
    ));
