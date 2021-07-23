import React, { useContext } from 'react';
import styled from 'styled-components';
import { SurroundCurrentContext } from '../../../SurroundCurrentProvider';
import { GameInfo } from '../InfoWithLabel/GameInfo';
import { NextRunInfo } from '../InfoWithLabel/NextRunInfo';
import { PlayerInfo } from '../InfoWithLabel/PlayerInfo';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const NextInfo = () => {
  const surroundCurrent = useContext(SurroundCurrentContext);
  const next = surroundCurrent.next;

  return (
    <Container>
      <NextRunInfo
        game={next?.game || ''}
        player={next?.player.name || ''}
        twitch={next?.player.twitch?.login || ''}
      />
    </Container>
  );
}
