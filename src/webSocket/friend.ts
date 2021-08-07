//@ts-nocheck
import { getUser } from "@services/userService";
import { toast } from "react-toastify";

import ToastFriend from "@components/ToastFriend/ToastFriend";

const friendSocketListener = (socket: any, dispatch: any, useSelector: any) => {
  socket.on("request-friend", async (data: any) => {
    const user = await getUser({ userId: data });
    toast(ToastFriend, {
      updateId: {
        ...user.data,
        message: "đã gửi lời mời kết bạn cho bạn.",
      },
    });
  });
};

export default friendSocketListener;
