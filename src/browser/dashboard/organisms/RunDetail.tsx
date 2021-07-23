import { Card, CardMedia, Grid, Icon, TextField, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { RunData } from '../../../nodecg/generated/lib';

type Props = {
  runData: RunData;
}

const BaseCard = styled(Card)`
  display: flex;
  width: 100%;
  background-color: ${props => props.color};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const RunDetail = ({runData}: Props) => {

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <TextField
          label="カテゴリ"
          value={runData.category}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="予定タイム"
          value={runData.estimate}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Grid>
  );
}