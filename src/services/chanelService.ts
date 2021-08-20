import apiGlobal from "@configs/apiGlobal";
import * as chanelUrl from "@constants/apiUrl/chanels";
import { replaceParamUrl, formatQueryUrl } from "@utils/string";

export const getChanelRecent = (data: any) => {
  return apiGlobal.get(formatQueryUrl(chanelUrl.getChanelRecent, data.body));
};

export const getChanel = (data: any) => {
  return apiGlobal.get(replaceParamUrl(chanelUrl.getChanel, [data]));
};

export const sendMessage = (data: any) => {
  return apiGlobal.post(
    replaceParamUrl(chanelUrl.sendMessage, [data.chanelId]),
    data
  );
};

export const getMessages = (data: any) => {
  const { page, pageSize, chanelId } = data;
  return apiGlobal.get(
    formatQueryUrl(replaceParamUrl(chanelUrl.getMessages, [data.chanelId]), {
      page,
      pageSize,
    })
  );
};
