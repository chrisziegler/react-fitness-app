import React, { Component } from 'react';
import { TextField, Select, Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';

const styles = theme => ({
  FormControl: {
    width: 300
  }
});

export default withStyles(styles)(
  class Form extends Component {
    state = this.getInitState();
    // if called from Header this.props.exercise does not get passed
    // otherwise we intialize state with exercise to prepopulate form
    getInitState() {
      const { exercise } = this.props;
      return exercise
        ? exercise
        : {
            title: '',
            description: '',
            muscles: ''
          };
    }

    componentWillReceiveProps({ exercise }) {
      this.setState({
        ...exercise
      });
    }

    handleChange = name => ({ target: { value } }) =>
      this.setState({
        [name]: value
      });

    handleSubmit = () => {
      // remember to validate form!!
      // calls handleExerciseEdit back in App
      this.props.onSubmit({
        id: this.state.title.toLocaleLowerCase().replace(/ /g, '-'),
        ...this.state
      });
      // clear old state - clear modal form
      this.setState(this.getInitState());
    };

    render() {
      // moved entire from Create in refactor
      const { classes, exercise, muscles: categories } = this.props,
        { title, description, muscles } = this.state;
      return (
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
            <Select value={muscles} onChange={this.handleChange('muscles')}>
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
          <br />
          <Button color="primary" variant="raised" onClick={this.handleSubmit}>
            {exercise ? 'Edit' : 'Create'}
          </Button>
        </form>
      );
    }
  }
);
