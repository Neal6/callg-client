export const replaceParamUrl = (url: string, params: string[]) => {
    let replaceUrl = params.reduce((acc:string,cur:string)=>{
            return acc.replace("$",cur)
    },url);
    return replaceUrl
  };