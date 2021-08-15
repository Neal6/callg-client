import apiGlobal from "@configs/apiGlobal";
import * as chanelUrl from "@constants/apiUrl/chanels";
import { replaceParamUrl, formatQueryUrl } from "@utils/string";

export const getChanelRecent = (data: any) => {
  return apiGlobal.get(formatQueryUrl(chanelUrl.getChanelRecent, data.body));
};
