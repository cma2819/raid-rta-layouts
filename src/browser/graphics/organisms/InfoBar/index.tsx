import React, { useEffect, useRef, useState } from 'react';
import { RunInfo } from './RunInfo';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import './fade.css';
import styled from 'styled-components';
import { HashtagInfo } from './HashtagInfo';
import { NextInfo } from './NextInfo';
import { useContext } from 'react';
import { SurroundCurrentContext } from '../../../SurroundCurrentProvider';

const CHANGE_INTERVAL_SEC = 10;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

export const InfoBar = () => {
  const [infoIndex, setInfoIndex] = useState<number>(0);
  const refInfoIndex = useRef(infoIndex);

  const surroundCurrent = useContext(SurroundCurrentContext);
  const next = surroundCurrent.next;

  useEffect(() => {
    refInfoIndex.current = infoIndex
  }, [infoIndex]);
  
  useEffect(() => {

    const intervalId = window.setInterval(() => {
      const length = next ? 3 : 2;
      // setInfoIndex((refInfoIndex.current + 1) % length);
      setInfoIndex(0);
      
    }, CHANGE_INTERVAL_SEC * 1000);

    return () => clearInterval(intervalId);
  }, [CHANGE_INTERVAL_SEC, next]);

  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={infoIndex}
        addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
        classNames="fade"
      >
        <React.Fragment>
          {
            infoIndex === 0 && (
              <Container>
                <RunInfo />
              </Container>
            )
          }
          {
            infoIndex === 1 && (
              <Container>
                <HashtagInfo />
              </Container>
            )
          }
          {
            infoIndex === 2 && (
              <Container>
                <NextInfo />
              </Container>
            )
          }
        </React.Fragment>
      </CSSTransition>
    </SwitchTransition>
  );
}
