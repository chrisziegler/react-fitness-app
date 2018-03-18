import React, { Component, Fragment } from 'react';
// the way this works is it basiclly imports everything from material-ui
// but then only extracts the dialog and the button in order to make this
// efficient need to enable tree shaking in setup
import { Dialog, Button, TextField, Select } from 'material-ui';
// remember there may be some breaking changes that make everything
// available directly from material-ui
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui-next/Dialog';
// again this is an approach requiring enabling tree shaking in project
// have to see if this requires ejecting CRA to get at Webpack
import { Add } from 'material-ui-icons';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  FormControl: {
    width: 500
  }
});

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      exercise: {
        title: '',
        description: '',
        muscles: ''
      }
    };

    handleToggle = () => {
      this.setState({ open: !this.state.open });
    };

    handleChange = name => ({ target: { value } }) => {
      this.setState = {
        exercise: {
          // reach out to the state and spread all properties from exercise
          // to retain their potential values as we create/set a name property
          ...this.state.exercise,
          // set the value to the name property, creating it in state
          [name]: value
        }
      };
    };

    handleSubmit = () => {
      // todo validate form
      const { exercise } = this.state;
      this.props.onCreate(exercise);
    };

    render() {
      const { open, exercise: { title, description, muscles } } = this.state,
        { classes, muscles: categories } = this.props;
      return (
        <Fragment>
          <Button variant="fab" onClick={this.handleToggle} mini>
            <Add />
          </Button>

          <Dialog open={open} onClose={this.handleToggle}>
            <DialogTitle id="form-dialog-title">
              Create a New Exercise
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please fill out a form below
              </DialogContentText>
              <form>
                <TextField
                  label="Title"
                  value={title}
                  onChange={this.handleChange('title')}
                  margin="normal"
                  className={classes.FormControl}
                />
                <br />
                <FormControl className={classes.FormControl}>
                  <InputLabel htmlFor="muscles">Muscles</InputLabel>
                  <Select
                    value={muscles}
                    onChange={this.handleChange('muscles')}
                  >
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <TextField
                  multiline
                  rows="4"
                  label="Description"
                  value={description}
                  onChange={this.handleChange('description')}
                  margin="normal"
                  className={classes.FormControl}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                variant="raised"
                onClick={this.handleSubmit}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      );
    }
  }
);
