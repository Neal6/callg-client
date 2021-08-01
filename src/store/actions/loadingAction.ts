import * as actions from "@store/actionTypes/loadingTypes";


export const loadingClean = (payload: string[]) => {
  return {
    type: actions.loadingClean,
    payload
  };
};