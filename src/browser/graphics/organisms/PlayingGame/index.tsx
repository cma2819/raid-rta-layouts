import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { SurroundCurrentContext } from '../../../SurroundCurrentProvider';

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
`;

const GameText = styled.div`
  writing-mode: vertical-lr;
  white-space: nowrap;
`;

export const PlayingGame = () => {
  const surroundCurrent = useContext(SurroundCurrentContext);
  const current = surroundCurrent.current;

  return (
    <Container>
      <GameText className="strong">
        { current?.game || '' }
      </GameText>
    </Container>
  )
}