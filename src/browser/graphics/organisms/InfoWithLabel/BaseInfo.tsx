import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
  children: ReactNode;
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const Border = styled.div`
  width: 24px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
  left: 24px;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

const Label = styled.div`
  margin-left: 32px;
  align-self: flex-start;
`;

const Info = styled.div`
  align-self: flex-end;
  flex-grow: 9;
  text-align: center;
`;

export const BaseInfo = ({label, children}: Props) => {
  return (
    <React.Fragment>
      <Container>
        <Border />
        <Overlay>
          <Label className="sub">
            { label }
          </Label>
          <Info>
            { children }
          </Info>
        </Overlay>
      </Container>
    </React.Fragment>
  )
}