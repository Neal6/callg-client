import apiGlobal from "@configs/apiGlobal";
import * as socketUrl from "@constants/apiUrl/socket";

export const socketConnect = (data: any) => {
  return apiGlobal.post(socketUrl.socketConnect, data);
};