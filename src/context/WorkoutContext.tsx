import { createContext, useReducer } from 'react';

export const WorkoutContext = createContext({
  workouts: [],
  dispatch: ({ type, payload }: any) => {}
});

export const workoutReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(
          (workout: any) => workout._id !== action.payload._id
        )
      };

    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: []
  });

  return (
    <WorkoutContext.Provider value={{ workouts: state.workouts, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
