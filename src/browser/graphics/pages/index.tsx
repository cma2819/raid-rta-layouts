import '../common.css';
import '@fortawesome/fontawesome-free/js/all.js';
import Background from '../img/frame.png';

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { PlayingGame } from '../organisms/PlayingGame';
import { InfoBar } from '../organisms/InfoBar';
import { ReplicantProvider } from '../../ReplicantProvider';
import { SurroundCurrentProvider } from '../../SurroundCurrentProvider';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
  background-image: url(${Background});
`;

const GameContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 165px;
  height: 990px;
`;

const InfoBarContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 1500px;
  height: 90px;
`;

const App = () => {
  return (
    <ReplicantProvider>
      <SurroundCurrentProvider>
        <Container>
          <GameContainer>
            <PlayingGame heightPx={990} />
          </GameContainer>
          <InfoBarContainer>
            <InfoBar />
          </InfoBarContainer>
        </Container>
      </SurroundCurrentProvider>
    </ReplicantProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));