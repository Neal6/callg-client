//@ts-nocheck
import * as userService from "@services/userService";
import { toast } from "react-toastify";

import ToastFriend from "@components/ToastFriend/ToastFriend";
import * as authAction from "@store/actions/authActions";
import * as userAction from "@store/actions/userActions";
import * as chanelAction from "@store/actions/chanelAction";
import store from "@store/store";

const friendSocketListener = (socket: any, dispatch: any, useSelector: any) => {
  socket.on("request-friend", async (data: any) => {
    const user = await userService.getUser({ userId: data });
    dispatch(authAction.receiveRequestFriend(data));
    toast(ToastFriend, {
      updateId: {
        ...user.data,
        message: "đã gửi lời mời kết bạn cho bạn.",
      },
    });
  });

  socket.on("reject-friend", async (data: any) => {
    const user = await userService.getUser({ userId: data });
    dispatch(authAction.rejectRequestFriend(data));
    toast(ToastFriend, {
      updateId: {
        ...user.data,
        message: "đã từ chối lời mời kết bạn của bạn.",
      },
    });
  });

  socket.on("cancel-request-friend", async (data: any) => {
    dispatch(authAction.cancelRequestFriend(data));
  });

  socket.on("accept-friend", async (data: any) => {
    const user = await userService.getUser({ userId: data.user });
    toast(ToastFriend, {
      updateId: {
        ...user.data,
        message: `đã chấp nhận lời mời kết bạn của bạn. bạn và ${user.data.fullName} đã trở thành bạn bè`,
      },
    });
    dispatch(
      authAction.acceptFriend({ friend: data.user, chanel: data.chanel })
    );
    dispatch(chanelAction.addChanel({ body: data.chanel }));
  });

  socket.on("un-friend", async (data: any) => {
    dispatch(authAction.unFriend(data));
  });

  socket.on("online", (data: any) => {
    const { _id, ...restUser } = data;
    const user = { ...restUser, id: _id };
    dispatch(userAction.friendOnline({ body: user }));
  });

  socket.on("offline", (data: any) => {
    try {
      const user = data;
      dispatch(userAction.friendOffline({ body: user }));
    } catch (error) {
      console.log(error);
    }
  });
};

export default friendSocketListener;
