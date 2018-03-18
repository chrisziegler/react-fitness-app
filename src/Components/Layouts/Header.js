import React from 'react';
// import AppBar from "material-ui-next/AppBar";
// import Toolbar from "material-ui-next/Toolbar";
import { AppBar, Toolbar, Typography } from 'material-ui';
import CreateDialog from '../Exercises/Dialogs/Create';

export default ({ muscles, onExerciseCreate }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="headline" color="inherit" style={{ flex: 1 }}>
        Exercise Database
      </Typography>
      <CreateDialog muscles={muscles} onCreate={onExerciseCreate} />
    </Toolbar>
  </AppBar>
);
