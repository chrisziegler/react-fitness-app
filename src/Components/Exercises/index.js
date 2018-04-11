import React, { Fragment } from 'react';
import { Grid, Paper, Typography, List, IconButton } from 'material-ui';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import { Delete, Edit } from 'material-ui-icons';
import Form from './Form';

const styles = {
  Paper: {
    padding: 20,
    marginTop: 15,
    marginBottom: 10,
    height: 620,
    overflowY: 'auto'
  }
};

export default ({
  muscles,
  exercises,
  editMode,
  category,
  onSelect,
  exercise,
  exercise: {
    id,
    title = 'Welcome',
    description = 'Please select an exercise from the list on the left:'
  },
  onDelete,
  onSelectEdit,
  onEdit
}) => (
  <Grid container spacing={16}>
    <Grid item xs={12} sm={6}>
      <Paper style={styles.Paper}>
        {exercises.map(
          ([group, exercises]) =>
            !category || category === group ? (
              <Fragment key={group}>
                <Typography
                  variant="headline"
                  style={{ textTransform: 'capitalize' }}
                >
                  {group}
                </Typography>
                <List component="ul">
                  {exercises.map(({ id, title }) => (
                    <ListItem button key={id} onClick={() => onSelect(id)}>
                      <ListItemText primary={title} />
                      <ListItemSecondaryAction>
                        <IconButton onClick={() => onSelectEdit(id)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => onDelete(id)}>
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Fragment>
            ) : null
        )}
      </Paper>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Paper style={styles.Paper}>
        {editMode ? (
          <Form muscles={muscles} onSubmit={onEdit} exercise={exercise} />
        ) : (
          <Fragment>
            <Typography variant="display1">{title}</Typography>
            <Typography variant="subheading" style={{ marginTop: 15 }}>
              {description}
            </Typography>
          </Fragment>
        )}
      </Paper>
    </Grid>
  </Grid>
);
