import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography } from '@material-ui/core';
import React from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useContext } from 'react';
import { ReplicantContext } from '../../../ReplicantProvider';
import styled from 'styled-components';
import { TwitchDetail } from '../../organisms/TwitchDetail';
import { RunDetail } from '../../organisms/RunDetail';

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RunDataList = () => {

  const replicants = useContext(ReplicantContext);
  const runDataArray = replicants.runArray;

  return (
    <div>
      { runDataArray.map(runData => (
        <Accordion key={runData.uuid}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`${runData.uuid}-header`}
          >
            <SummaryContainer>
              <Typography variant="subtitle1">
                {runData.game}
              </Typography>
              <Typography variant="caption">
                {runData.category}
              </Typography>
            </SummaryContainer>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RunDetail runData={runData} />
              </Grid>
              <Grid item xs={12}>
                <TwitchDetail runData={runData} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => {
                    nodecg.sendMessage('current.update', {newCurrent: runData.uuid})
                  }}
                >
                  切り替え
                </Button>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}