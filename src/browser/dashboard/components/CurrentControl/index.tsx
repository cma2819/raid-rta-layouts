import { Button, Grid, Paper } from '@material-ui/core';
import React from 'react';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useContext } from 'react';
import { ReplicantContext } from '../../../ReplicantProvider';
import styled from 'styled-components';
import { RunDetail } from '../../organisms/RunDetail';
import { TwitchDetail } from '../../organisms/TwitchDetail';

export const CurrentControl = () => {

  const replicant = useContext(ReplicantContext);

  const surroundCurrent = replicant.surroundRunIndex;
  const currentRun = replicant.runArray.find((runData) => {
    return runData.uuid === surroundCurrent.current;
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<ArrowLeftIcon />}
          onClick={() => {
            if (surroundCurrent.prev) {
              nodecg.sendMessage('current.update', {newCurrent: surroundCurrent.prev});
            }
          }}
          disabled={!surroundCurrent.prev}
        >
          戻る
        </Button>
      </Grid>
      <Grid item xs>
      </Grid>
      <Grid item xs={3}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          endIcon={<ArrowRightIcon />}
          onClick={() => {
            if (surroundCurrent.next) {
              nodecg.sendMessage('current.update', {newCurrent: surroundCurrent.next});
            }
          }}
          disabled={!surroundCurrent.next}
        >次へ
        </Button>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {
            currentRun && (
              <RunDetail runData={currentRun} />
            )
          }
        </Grid>
        <Grid item xs={12}>
          {
            currentRun && (
              <TwitchDetail runData={currentRun} />
            )
          }
        </Grid>
      </Grid>
    </Grid>
  );
}