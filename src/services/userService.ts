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

export const requestFriend = (data: any) => {
  return apiGlobal.post(replaceParamUrl(userUrl.requestFriend, []), data.body);
};
