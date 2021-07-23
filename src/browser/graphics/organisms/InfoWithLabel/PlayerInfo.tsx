import React from 'react';
import styled from 'styled-components';
import { BaseInfo } from './BaseInfo';

type Props = {
  name: string;
  twitch: string;
};

const Icon = styled.i`
  filter: drop-shadow(0px 2px 4px #000000);
  margin: 0 0.2em;
`;

export const PlayerInfo = ({name, twitch}: Props) => {
  return (
    <BaseInfo label="プレイヤー">
      <span className="sub">
        {name}
        <Icon className="fab fa-twitch"></Icon>{twitch}
      </span>
    </BaseInfo>
  )
}