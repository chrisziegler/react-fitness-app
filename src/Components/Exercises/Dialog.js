import React, { Component, Fragment } from 'react';
import Form from './Form';
// the way this works is it basiclly imports everything from material-ui
// but then only extracts the dialog and the button  - in order to make this
// efficient need to enable tree shaking in setup
import { Dialog, Button } from 'material-ui';
// remember there may be some breaking changes that make everything
// available directly from material-ui
import {
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
// again this is an approach requiring enabling tree shaking in project
// have to see if this requires ejecting CRA to get at Webpack
import { Add } from 'material-ui-icons';

export default class extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  //Dialog gets its props from Header
  render() {
    const { open } = this.state,
      { muscles, onCreate } = this.props;

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
            <DialogContentText>Please fill out a form below</DialogContentText>
            <Form muscles={muscles} onSubmit={onCreate} />
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
