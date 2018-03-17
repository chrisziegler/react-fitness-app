import React, { Component, Fragment } from 'react';
import { Header, Footer } from './Layouts';
import Exercises from './Exercises';
import { exercises, muscles } from '../store';

export default class extends Component {
  state = {
    exercises,
    exercise: {}
  };

  getExercisesByMuscles() {
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;
        exercises[muscles] = exercises[muscles]
          ? [...exercises[muscles], exercise]
          : [exercise];
        return exercises;
      }, {})
    );
  }

  handleCategorySelected = category => {
    this.setState({
      category
    });
  };

  handleExerciseSelected = id => {
    // this returns an object so we use the extra parens in arrow function ({})
    // to differntiate from the standard (and unneccassary) curly bracket syntax
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id)
    }));
  };

  render() {
    const exercises = this.getExercisesByMuscles(),
      // exercise is the currently selected exercise from handleExerciseSelected
      { category, exercise } = this.state;
    return (
      <Fragment>
        <Header />
        <Exercises
          exercise={exercise}
          exercises={exercises}
          category={category}
          onSelect={this.handleExerciseSelected}
        />
        <Footer
          category={category}
          muscles={muscles}
          onSelect={this.handleCategorySelected}
        />
      </Fragment>
    );
  }
}
