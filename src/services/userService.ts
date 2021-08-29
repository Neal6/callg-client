import apiGlobal from "@configs/apiGlobal";
import * as userUrl from "@constants/apiUrl/user";
import { replaceParamUrl, formatQueryUrl } from "@utils/string";

export const updateUser = (data: any) => {
  return apiGlobal.put(replaceParamUrl(userUrl.user, [data.userId]), data.body);
};

export const updateAvatarUser = (data: any) => {
  return apiGlobal.put(replaceParamUrl(userUrl.user, [data.userId]), data.body);
};

export const getUser = (data: { userId: any }) => {
  return apiGlobal.get(replaceParamUrl(userUrl.user, [data.userId]));
};

export const searchUser = (data: any) => {
  return apiGlobal.get(formatQueryUrl(userUrl.search, data.body));
};

export const getFriend = (data: any) => {
  return apiGlobal.get(formatQueryUrl(userUrl.getFriend, data.body));
};

export const getFriendOnline = (data: any) => {
  return apiGlobal.get(formatQueryUrl(userUrl.getFriendOnline, data.body));
};

export const getRequestFriend = (data: any) => {
  return apiGlobal.get(formatQueryUrl(userUrl.getRequestFriend, data.body));
};

export const getReceiveRequestFriend = (data: any) => {
  return apiGlobal.get(
    formatQueryUrl(userUrl.getReceiveRequestFriend, data.body)
  );
};

export const requestFriend = (data: any) => {
  return apiGlobal.post(replaceParamUrl(userUrl.requestFriend, []), data.body);
};

export const rejectFriend = (data: any) => {
  return apiGlobal.put(replaceParamUrl(userUrl.rejectFriend, []), data.body);
};

export const cancelRequestFriend = (data: any) => {
  return apiGlobal.put(
    replaceParamUrl(userUrl.cancelRequestFriend, []),
    data.body
  );
};

export const acceptFriend = (data: any) => {
  return apiGlobal.put(replaceParamUrl(userUrl.acceptFriend, []), data.body);
};

export const unFriend = (data: any) => {
  return apiGlobal.put(replaceParamUrl(userUrl.unFriend, []), data.body);
};

export const seenMessage = (data: any) => {
  return apiGlobal.put(userUrl.seenMessage, data.body);
};
