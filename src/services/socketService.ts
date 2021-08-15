import store from "@store/store";

export const requestFriend = (data: any) => {
  const socket = store.getState().socketIo.socket;
  socket.emit("request-friend", data);
};

export const rejectFriend = (data: any) => {
  const socket = store.getState().socketIo.socket;
  socket.emit("reject-friend", data);
};

export const cancelRequestFriend = (data: any) => {
  const socket = store.getState().socketIo.socket;
  socket.emit("cancel-request-friend", data);
};

export const acceptFriend = (data: any) => {
  const socket = store.getState().socketIo.socket;
  socket.emit("accept-friend", data);
};

export const unFriend = (data: any) => {
  const socket = store.getState().socketIo.socket;
  socket.emit("un-friend", data);
};

export const connectLogout = () => {
  const socket = store.getState().socketIo.socket;
  if (socket) {
    socket.emit("connect-logout");
  }
};
