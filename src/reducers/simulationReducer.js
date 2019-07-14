import types from '../actions/types';

const initialState = {
  simulations: []
};

const simulationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SIMULATION.REQUEST_RESULT:
      return {
      ...state,
      simulations: action.data.full_simulation_list
    };
    default:
      return state;
  }
}

export default simulationReducer;
