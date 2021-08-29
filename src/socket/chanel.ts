//@ts-nocheck
import * as userService from "@services/userService";
import { toast } from "react-toastify";

import ToastFriend from "@components/ToastFriend/ToastFriend";
import * as authAction from "@store/actions/authActions";
import * as chanelAction from "@store/actions/chanelAction";
import * as appAction from "@store/actions/appActions";
import store from "@store/store";
import apiGlobal from "@configs/apiGlobal";
import * as chanelUrl from "@constants/apiUrl/chanels";
import { replaceParamUrl, formatQueryUrl } from "@utils/string";

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

  socket.on("send-message", async (data: any) => {
    let chanelReive = {};
    if (
      !store
        .getState()
        .chanel.chanelList.find((chanel: any) => chanel.id == data.chanelId)
    ) {
      const res = await apiGlobal.get(
        replaceParamUrl(chanelUrl.getChanel, [data.chanelId])
      );
      const { _id, ...rest } = res.data;
      chanelReive = { ...rest, id: _id };
    }
    dispatch(appAction.playSoundMessage());
    dispatch(
      chanelAction.reciveMessage({
        body: data,
        chanelReive,
      })
    );
    dispatch(
      authAction.receiveMessage({
        body: data,
      })
    );
  });

  socket.on("typing-message", (data: any) => {
    dispatch(chanelAction.typingMessage({ body: data }));
  });

  socket.on("stop-typing-message", (data: any) => {
    dispatch(chanelAction.stopTypingMessage({ body: data }));
  });

  socket.on("add-unknown-chanel", (data: any) => {
    const { chanel } = data;
    socket.emit("join-chanel", { chanel });
    dispatch(authAction.addChanel({ chanel }));
  });
};

export default chanelSocketListener;
