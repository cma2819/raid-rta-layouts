import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-self: flex-end;
  justify-content: center;
`;

const Icon = styled.i`
  filter: drop-shadow(0px 2px 4px #000000);
  margin: 0 0.2em;
`;

export const HashtagInfo = () => {
  return (
    <Container>
      <div>
        <Icon className="fab fa-twitter strong"></Icon>
        ハッシュタグ #レイドRTA <span style={{fontSize: '0.8em'}}>で現在の進行状況を確認！</span>
        <Icon className="fab fa-twitter strong"></Icon>
      </div>
    </Container>
  );
}
