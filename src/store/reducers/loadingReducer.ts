//@ts-nocheck

import { AnyAction } from "redux";

import {loadingClean} from '@store/actionTypes/loadingTypes'

type loadingTypes = {
};

const initState: loadingTypes = {};

const loadingReducer = (state = initState, action: AnyAction) => {
  const { type } = action;
  const matches = /(.*)_(START|SUCCESS|FAIL)/.exec(type);
  if(type ===loadingClean){
    const matchesClean = action.payload;
    matchesClean.forEach(match => {
        delete state[match]
    });
    return state
  }

  if (!matches) return state;

  if(matches){
      const [, actionName, actionState] = matches;
      return {
        ...state,
        [actionName]: actionState === "START",
      };
  }
};

export default loadingReducer;
