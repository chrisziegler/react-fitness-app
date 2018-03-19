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
    // added this data structure to keep category label from being deleted
    // from list when all exercises have been deleted by handleExerciseDelete
    const initExercises = muscles.reduce(
      (acc, muscles) => ({
        ...acc,
        [muscles]: []
      }),
      {}
    );

    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;
        exercises[muscles] = [...exercises[muscles], exercise];

        // No longer need this conditional as exercises/initExercises will now
        // always have a category for each of our hardcoded muscles groups, even
        // if that is a key to an empty array.
        // exercises[muscles] = exercises[muscles]
        //   ? [...exercises[muscles], exercise]
        //   : [exercise];
        return exercises;
      }, initExercises)
    );
  }

  handleCategorySelect = category => {
    this.setState({
      category
    });
  };

  handleExerciseSelect = id => {
    // this returns an object so we use the extra parens in arrow function ({})
    // to differntiate from the standard (and unneccassary) curly bracket syntax
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id)
    }));
  };

  handleExerciseCreate = exercise => {
    this.setState(({ exercises }) => ({
      // spreads out prevState, pushes/concats new exercise object into array
      exercises: [...exercises, exercise]
    }));
  };

  handleExerciseDelete = id => {
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id)
    }));
  };

  render() {
    const exercises = this.getExercisesByMuscles(),
      { category, exercise } = this.state;
    return (
      <Fragment>
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />
        <Exercises
          exercise={exercise}
          exercises={exercises}
          category={category}
          onSelect={this.handleExerciseSelect}
          onDelete={this.handleExerciseDelete}
        />
        <Footer
          category={category}
          muscles={muscles}
          onSelect={this.handleCategorySelect}
        />
      </Fragment>
    );
  }
}
