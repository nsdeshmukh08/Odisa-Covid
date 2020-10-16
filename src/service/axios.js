import axios from 'axios'
import config from "config";

axios.defaults.baseURL = config.api.API_BASE_URL; //BASE URL

axios.interceptors.request.use(function (config) {
    config.headers['token'] = localStorage.getItem('token')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
export {axios}
