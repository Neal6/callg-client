import apiGlobal from "@configs/apiGlobal";
import * as userUrl from "@constants/apiUrl/user";
import {replaceParamUrl} from '@utils/string'

export const updateUser = (data: any) => {
  return apiGlobal.put(replaceParamUrl(userUrl.user,[data.userId]), data.body);
};

export const updateAvatarUser = (data: any) => {
  return apiGlobal.put(replaceParamUrl(userUrl.user,[data.userId]), data.body);
};

export const getUser = (data: any) => {
  return apiGlobal.get(replaceParamUrl(userUrl.user,[data.userId]));
};