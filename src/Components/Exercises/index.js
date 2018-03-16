import React from 'react';
import { Grid } from 'material-ui-next';
import LeftPane from './LeftPane';
import RightPane from './RightPane';

const style = {
  Paper: {
    padding: 20,
    marginTop: 15,
    marginBottom: 10,
    fontFamily: 'Roboto'
  }
};

export default props => (
  <Grid container>
    <Grid item sm>
      <LeftPane styles={style.Paper} />
    </Grid>
    <Grid item sm>
      <RightPane styles={style.Paper} />
    </Grid>
  </Grid>
);
