import React from 'react';
import { Paper, Tabs } from 'material-ui-next';
import { Tab } from 'material-ui-next/Tabs';

export default ({ muscles }) => (
  <Paper>
    <Tabs
      value={0}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      {muscles.map(group => {
        return <Tab label={group} />;
      })}
    </Tabs>
  </Paper>
);
