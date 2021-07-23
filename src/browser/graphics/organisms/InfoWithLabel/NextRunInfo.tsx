import React from 'react';
import styled from 'styled-components';
import { BaseInfo } from './BaseInfo';

type Props = {
  game: string;
  player: string;
  twitch: string;
};

const Icon = styled.i`
  filter: drop-shadow(0px 2px 4px #000000);
  margin: 0 0.2em 0 1em;
`;

export const NextRunInfo = ({game, player, twitch}: Props) => {
  return (
    <BaseInfo label="NEXT">
      { `${game}` }
      <Icon className="fab fa-twitch"></Icon>{twitch}
    </BaseInfo>
  )
}