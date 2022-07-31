import { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from "axios";

const lsTokenKey = 'my_app_key';

function setToken(req: any){

  const isAuthUrl = req.url?.includes('auth');

  if(!isAuthUrl){
    const token = localStorage.getItem(lsTokenKey);
    req.headers['x-access-token'] = token;
  }

  return req;
}

function setTokenOnLogin(res: AxiosResponse): AxiosResponse{
  const isLoginURL = res.config.url!.includes('login');

  if(isLoginURL){
    const { token } = res.data;
    localStorage.setItem(lsTokenKey, token);
  }

  return res;
}

function getClearResponse(res: AxiosResponse): AxiosResponse{
  return res.data;
}

function onError(err: AxiosError){
  console.dir(err);
  return Promise.reject(err);
}

export default function (axios: AxiosInstance) {
  axios.interceptors.request.use(setToken);
  axios.interceptors.response.use(setTokenOnLogin, onError);
}