import React from 'react';
import { BaseInfo } from './BaseInfo';

type Props = {
  estimate: string;
};

export const EstimateInfo = ({estimate}: Props) => {
  return (
    <BaseInfo label="EST">
      { estimate }
    </BaseInfo>
  )
}