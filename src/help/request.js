import axios from 'axios';
import _ from 'lodash';
import { updateError } from '../features/wrappers/actions';
//require('../mock/server.js')
//axios.defaults.baseURL = 'http://localhost:8090/' // 设置 baseUrl


//Request interception
axios.defaults.timeout = 10 * 60 * 1000;
axios.interceptors.request.use(config => {
  console.log('config:',config)
    return config;
  },
  //error handle
  error => {
    return Promise.reject(error);
  }
);

//Response interception
const setResponseInterceptors = ({dispatch}) => {
  axios.interceptors.response.use(response => {
    return response;
  },
  error => {
    console.log('error:',error);
    const status = error.response.status;
    switch (status) {
      case 504:
        dispatch(updateError('Service request timeout'));
        break;
      case 500:
        dispatch(updateError('Net error'));
          break;
    }
    return Promise.reject(error);
  });
}

export const request = {
    get: async (url, params) => {
        const response = await axios.get(url, params);
        return response;
    },
    post: async (url, payload, params) => {
        const response = axios.post(url, payload, params);
        return response;
    },
    setResponseInterceptors
}