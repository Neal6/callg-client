import store from "@store/store";

export const requestFriend = (data: any) => {
  const socket = store.getState().socketIo.socket;
  socket.emit("request-friend", data);
};
