import { AnyAction } from "redux";
import * as userType from "@store/actionTypes/userType";


type socketTypes = {
    profile:any;
    errorGetUser:boolean
};

const initState: socketTypes = {
    profile:{},
    errorGetUser:false
};

const userReducer = (state = initState, action: AnyAction) => {
    switch (action.type) {
        case userType.getUserSuccess:
            return {...state,profile:action.payload,errorGetUser:false}
        case userType.getUserFail:
            return {...state,errorGetUser:true}
        case userType.cleanUser:
            return {...state,profile:{},errorGetUser:false}
        default:
          return state;
      }
};

export default userReducer;
