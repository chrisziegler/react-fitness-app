import React from 'react';
import { Paper, Tabs } from 'material-ui-next';
import { Tab } from 'material-ui-next/Tabs';

export default ({ muscles, category, onSelect }) => {
  // if we have a category, get its index, otherwise
  const index = category
    ? muscles.findIndex(group => group === category) + 1
    : 0;

  const onIndexSelect = (e, index) => {
    onSelect(index === 0 ? '' : muscles[index - 1]);
  };

  return (
    <Paper>
      <Tabs
        value={index}
        onChange={onIndexSelect}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="All" />
        {muscles.map(group => {
          return <Tab label={group} key={group} />;
        })}
      </Tabs>
    </Paper>
  );
};
