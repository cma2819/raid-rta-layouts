import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import styled from 'styled-components';
import { SurroundCurrentContext } from '../../../SurroundCurrentProvider';

type Props = {
  heightPx: number;
};

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
`;

const GameText = styled.div`
  /* font-size: ${(props: {fontSize: number}) => props.fontSize}px; */
  writing-mode: vertical-lr;
  white-space: nowrap;
`;

export const PlayingGame = ({heightPx}: Props) => {
  const surroundCurrent = useContext(SurroundCurrentContext);
  const current = surroundCurrent.current;

  const [fontSizePx, setFontSizePx] = useState<number>(1);

  useEffect(() => {
    setFontSizePx(Math.min(
      heightPx / (current?.game.length || 1),
      45
    ));
  }, [current])

  return (
    <Container>
      <GameText className="strong" fontSize={fontSizePx}>
        { current?.game || '' }
      </GameText>
    </Container>
  )
}