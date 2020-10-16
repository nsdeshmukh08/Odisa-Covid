import { axios } from "./axios";
import config from "config";
import { history } from 'helpers'
import toast from 'helpers/Toast'
import { STAFF_ROLE_ID } from 'helpers/variables'

const getBaseUrl = (baseUrlType = "AUTH_API_BASE_URL") => {
  return config.api[baseUrlType] ? config.api[baseUrlType] : "";
};

export const API = async ({
  url,
  method,
  headers = null,
  responseType,
  data,
  cancelToken,
  baseUrlType,
  params
}) => {
  //REQUEST JSON

  let axiosRequestObject = {
    method,
    headers,
    url,
    baseURL: getBaseUrl(baseUrlType),
    data,
    responseType,
    params, 
    ...(cancelToken
      ? {
          cancelToken,
        }
      : ""),
  };

  //REQUEST

  let request = await axios(axiosRequestObject)
    .then(handleSuccessRequest)
    .catch(handleErrorRequest);

  return request;
};

const handleSuccessRequest = (response) => ({
  status: response.status,
  data: response.data,
});

const handleErrorRequest = (err) => {
  if(!err.response) return Promise.reject()
  if(err.response?.status === 401){
    if(STAFF_ROLE_ID.PUBLIC !== parseInt(localStorage.getItem('role')))
      history.replace('/auth/staff/login')
    else history.replace('/auth/user/login')
    localStorage.clear()
    toast('Unauthorized!!','error')
  }
  if (err.response) return err.response;
  else
    return {
      status: "500",
      data: {
        message: "Internal server error!!",
      },
    };
};
