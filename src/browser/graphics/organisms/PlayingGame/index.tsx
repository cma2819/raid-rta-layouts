import React from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { ReplicantContext } from '../../../ReplicantProvider';
import { SurroundCurrentContext } from '../../../SurroundCurrentProvider';

type Props = {
  game: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
`;

const GameText = styled.div`
  writing-mode: vertical-lr;
  white-space: nowrap;
  padding-top: 1em;
`;

export const PlayingGame = ({game}: Props) => {
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