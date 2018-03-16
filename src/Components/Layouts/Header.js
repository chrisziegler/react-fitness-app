import React from 'react';
// import AppBar from "material-ui-next/AppBar";
// import Toolbar from "material-ui-next/Toolbar";
import { AppBar, Toolbar, Typography } from 'material-ui-next';

export default props => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="headline" color="inherit">
        Exercise Database
      </Typography>
    </Toolbar>
  </AppBar>
);
