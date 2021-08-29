import apiGlobal from "@configs/apiGlobal";
import * as chanelUrl from "@constants/apiUrl/chanels";
import { replaceParamUrl, formatQueryUrl } from "@utils/string";

export const getChanelRecent = (data: any) => {
  return apiGlobal.get(formatQueryUrl(chanelUrl.getChanelRecent, data.body));
};

export const getChanel = (data: any) => {
  return apiGlobal.get(replaceParamUrl(chanelUrl.getChanel, [data]));
};

export const getChanelMemberJoin = (data: any) => {
  return apiGlobal.get(
    formatQueryUrl(chanelUrl.getChanelMemberJoin, {
      member: JSON.stringify(data.members),
    })
  );
};

export const sendMessage = (data: any) => {
  return apiGlobal.post(
    replaceParamUrl(chanelUrl.sendMessage, [data.chanelId]),
    data
  );
};

export const getMessages = (data: any) => {
  const { dateBefore, pageSize, chanelId } = data;
  return apiGlobal.get(
    formatQueryUrl(replaceParamUrl(chanelUrl.getMessages, [chanelId]), {
      dateBefore,
      pageSize,
    })
  );
};
