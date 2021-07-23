import React from 'react';
import { BaseInfo } from './BaseInfo';

type Props = {
  category: string;
};

export const CategoryInfo = ({category}: Props) => {
  return (
    <BaseInfo label="カテゴリー">
      { category }
    </BaseInfo>
  )
}