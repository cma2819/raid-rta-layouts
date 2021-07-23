import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Button, CircularProgress, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { useEffect } from 'react';
import { DashboardThemeProvider } from '../DashboardThemeProvider';

const App = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [spreadsheetUri, setSpreadsheetUri] = useState<string>('');
  const [sheetNameList, setSheetNameList] = useState<Array<string>>([]);
  const [sheetName, setSheetName] = useState<string>('');

  const resetStates = () => {
    setLoading(false);
    setSpreadsheetUri('');
    setSheetNameList([]);
    setSheetName('');
  }

  const loadSheetNames = () => {
    setLoading(true);

    nodecg.sendMessage('spreadsheet.sheets', {spreadsheetUri}, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        setSheetNameList(res);
      }
      setLoading(false);
    });
  }

  const handleConfirmed = () => {
    nodecg.sendMessage('channels.import', {spreadsheetUri, sheetName});
  };
  const handleDismissed = () => {
    resetStates();
  }

  useEffect(() => {
    document.addEventListener('dialog-confirmed', handleConfirmed);
    document.addEventListener('dialog-dismissed', handleDismissed);

    return () => {
      document.removeEventListener('dialog-confirmed', handleConfirmed);
      document.removeEventListener('dialog-dismissed', handleDismissed);
    };
  }, [handleConfirmed]);

  return (
    <DashboardThemeProvider>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="spreadsheet-uri"
            label="Spreadsheet URI"
            value={spreadsheetUri}
            onChange={(e) => {
              setSpreadsheetUri(e.target.value)
            }}
            disabled={sheetNameList.length > 0}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            color="primary"
            variant="contained"
            onClick={loadSheetNames}
            disabled={loading}
          >
            {!loading ? 'Load Sheets' : 'Loading...'}
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel id="sheets-select-label">Select Data Sheet</InputLabel>
          <Select
            fullWidth
            labelId="sheets-select-label"
            id="sheets-select"
            value={sheetName}
            onChange={(e) => {
              setSheetName((e.target.value) as string);
            }}
            disabled={sheetNameList.length === 0}
          >
            {sheetNameList.map(name => (
              <MenuItem value={name}>{name}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={resetStates}
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </DashboardThemeProvider>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));