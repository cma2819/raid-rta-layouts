import React, { useContext } from 'react';
import styled from 'styled-components';
import { SurroundCurrentContext } from '../../../SurroundCurrentProvider';
import { CategoryInfo } from '../../organisms/InfoWithLabel/CategoryInfo';
import { EstimateInfo } from '../../organisms/InfoWithLabel/EstimateInfo';

const CategoryArea = styled.div`
  height: 100%;
  flex-grow: 1;
`;

const EstimateArea = styled.div`
  height: 100%;
`;

export const RunInfo = () => {
  const surroundCurrent = useContext(SurroundCurrentContext);
  const current = surroundCurrent.current;

  return (
    <React.Fragment>
      <CategoryArea>
        <CategoryInfo category={current?.category || ''} />
      </CategoryArea>
      <EstimateArea>
        <EstimateInfo estimate={current?.estimate || ''} />
      </EstimateArea>
    </React.Fragment>
  );
}
