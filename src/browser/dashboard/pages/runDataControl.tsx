import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from '@material-ui/core';
import { DashboardThemeProvider } from '../DashboardThemeProvider';
import { ReplicantProvider } from '../../ReplicantProvider';
import { RunDataList } from '../components/RunDataList.tsx';
import styled from 'styled-components';

import '@fortawesome/fontawesome-free/js/all.js';

const RunDataArea = styled.div`
  max-height: 640px;
  overflow-y: scroll;
`;

const App = () => {

  return (
    <DashboardThemeProvider>
      <ReplicantProvider>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <RunDataArea>
              <RunDataList />
            </RunDataArea>
          </Grid>
        </Grid>
      </ReplicantProvider>
    </DashboardThemeProvider>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));