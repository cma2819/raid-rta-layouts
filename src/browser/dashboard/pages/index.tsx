import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@material-ui/core';

const App = () => {

  return (
    <React.Fragment>
      <Button variant="contained" color="primary" nodecg-dialog="run-import">
        Open Dialog
      </Button>
    </React.Fragment>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));