import types from './types';

export const diagnosticRequest = () => ({
  type: types.DIAGNOSTIC.REQUEST,
});

export const diagnosticRequestResult = (result) => ({
  type: types.DIAGNOSTIC.REQUEST_RESULT,
  result
});

export const diagnosticSingleRequest = (section) => ({
  type: types.DIAGNOSTIC.SINGLE_REQUEST,
  section: section
});

export const diagnosticSingleRequestResult = (result) => ({
  type: types.DIAGNOSTIC.SINGLE_REQUEST_RESULT,
  result
});

export const diagnosticCreatePdf = () => ({
  type: types.DIAGNOSTIC.CREATE_PDF,
});
