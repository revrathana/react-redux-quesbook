import types from './types';

export const simulationRequest = () => ({
  type: types.SIMULATION.REQUEST,
});

export const simulationRequestResult = (result) => ({
  type: types.SIMULATION.REQUEST_RESULT,
  result
});

