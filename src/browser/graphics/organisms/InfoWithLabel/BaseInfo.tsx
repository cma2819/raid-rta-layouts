import React, { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  label: string;
  children: ReactNode;
};

const Container = styled.div`
display: flex;
flex-direction: row;
height: 100%;
width: 100%;
background: linear-gradient(to right, transparent, transparent 24px, rgba(255, 255, 255, 0.2) 24px, rgba(255, 255, 255, 0.2) 48px, transparent 48px);
`;

const Label = styled.div`
  margin-left: 32px;
  align-self: flex-start;
  white-space: nowrap;
`;

const Info = styled.div`
  align-self: flex-end;
  flex-grow: 9;
  text-align: center;
  white-space: nowrap;
  padding: 0 0.5em;
`;

export const BaseInfo = ({label, children}: Props) => {
  return (
    <React.Fragment>
      <Container>
        <Label className="sub">
          { label }
        </Label>
        <Info>
          { children }
        </Info>
      </Container>
    </React.Fragment>
  )
}