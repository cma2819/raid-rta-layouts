import React from 'react';
import { BaseInfo } from './BaseInfo';

type Props = {
  game: string;
};

export const GameInfo = ({game}: Props) => {
  return (
    <BaseInfo label="ゲーム">
      <span className="sub">{game}</span>
    </BaseInfo>
  )
}