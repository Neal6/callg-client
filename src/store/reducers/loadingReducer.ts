import { AnyAction } from "redux";

type loadingTypes = {};

const initState: loadingTypes = {};

const loadingReducer = (state = initState, action: AnyAction) => {
  const { type } = action;
  const matches = /(.*)_(START|SUCCESS|FAIL)/.exec(type);

  if (!matches) return state;

  const [, actionName, actionState] = matches;
  return {
    ...state,
    [actionName]: actionState === "START",
  };
};

export default loadingReducer;
