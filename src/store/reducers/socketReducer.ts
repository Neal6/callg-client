import { AnyAction } from "redux";
import * as socketType from "@store/actionTypes/socketType";


type socketTypes = {
    socket:any
};

const initState: socketTypes = {
    socket:{}
};

const socketReducer = (state = initState, action: AnyAction) => {
    switch (action.type) {
        case socketType.socketConnectSuccess:
            return {...state,socket:action.payload}
        default:
          return state;
      }
};

export default socketReducer;
