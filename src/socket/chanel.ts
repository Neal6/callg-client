//@ts-nocheck
import * as userService from "@services/userService";
import { toast } from "react-toastify";

import ToastFriend from "@components/ToastFriend/ToastFriend";
import * as authAction from "@store/actions/authActions";
import * as chanelAction from "@store/actions/chanelAction";

const chanelSocketListener = (socket: any, dispatch: any, useSelector: any) => {
  socket.on("join-chanel", (data: any) => {
    dispatch(
      chanelAction.joinChanel({
        body: { chanel: data.room.split("-")[1], user: data.user },
      })
    );
  });

  socket.on("leave-chanel", (data: any) => {
    dispatch(
      chanelAction.leaveChanel({
        body: { chanel: data.room.split("-")[1], user: data.user },
      })
    );
  });

  socket.on("send-message", (data: any) => {
    dispatch(
      chanelAction.reciveMessage({
        body: data,
      })
    );
  });
};

export default chanelSocketListener;
