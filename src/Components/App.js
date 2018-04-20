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
        exercises[muscles] = [
          ...exercises[muscles],
          exercise
        ];
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
      exercise: exercises.find(ex => ex.id === id),
      editMode: false
    }));
  };

  handleExerciseCreate = exercise =>
    this.setState(({ exercises }) => ({
      // spreads out prevState, pushes/concats new exercise object into array
      exercises: [...exercises, exercise]
    }));

  handleExerciseDelete = id =>
    this.setState(({ exercises, exercise }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
      editMode: false,
      exercise: exercise.id === id ? {} : exercise
    }));

  handleExerciseSelectEdit = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    }));
  // Again, we need to call a callback that accpets the prevState
  // which we pull exercises off
  handleExerciseEdit = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [
        // extract all of the elements to a new array
        // and append our new exercise to the end of that array
        ...exercises.filter(ex => ex.id !== exercise.id),
        exercise
      ],
      exercise,
      editMode: false
    }));

  render() {
    const exercises = this.getExercisesByMuscles(),
      { category, exercise, editMode } = this.state;
    return (
      <Fragment>
        <Header
          muscles={muscles}
          onExerciseCreate={this.handleExerciseCreate}
        />
        <Exercises
          exercise={exercise}
          exercises={exercises}
          editMode={editMode}
          category={category}
          muscles={muscles}
          onSelect={this.handleExerciseSelect}
          onDelete={this.handleExerciseDelete}
          onSelectEdit={this.handleExerciseSelectEdit}
          onEdit={this.handleExerciseEdit}
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
