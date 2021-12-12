
import axios, { AxiosError, AxiosResponse } from 'axios'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import store from './store';
   
// https://donjiyke-api.sqtdemo.com.ng/public/api

const userToken = store.getState().user.auth.accessToken;

const httpFree = axios.create({
  baseURL: "http://localhost:8000/api"
});

httpFree.defaults.headers.post["Content-Type"] = "application/json";    

httpFree.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error: AxiosError) => {
    const {
      response,   
      request,
    }: {
      response?: AxiosResponse;
      request?: XMLHttpRequest;    
    } = error;
    if (response) {
      if (
        response?.status === 400 &&
        response?.data?.error === "Token expired"
      ) {
        alert("Your session token has expired, please login again!")
        localStorage.clear();
      }
      // return null;
    } else if (request) {
      alert("Request failed. Please try again.");
      // return null;
    }
    return Promise.reject(error);     
  }
);

export {httpFree};



const http = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
});

http.defaults.headers.post["Content-Type"] = "application/json";

http.interceptors.request.use(
  async (config) => {        
    if (!userToken) {      
      config.headers.Authorization = `Bearer ${store.getState().user.auth.accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    const {
      response,   
      request,
    }: {
      response?: AxiosResponse;
      request?: XMLHttpRequest;
    } = error;
    if (response) {      
      if (
        response?.status === 400 &&
        response?.data?.error === "Token expired"
      ) {
        alert("Your session token has expired, please login again!")
        localStorage.clear();    
      }
      // return null;
    } else if (request) {
      alert("Request failed. Please try again.");
      // return null;
    }
    return Promise.reject(error);     
  }
);

export default http; 
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;




/*
export default function setupAxios(axios: any, store: any) {
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: {accessToken},
      } = store.getState()

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}


/*
token: 4|gwdemerHXCqcyicY8k8En4cd1phjJGRsnW2w6NHW

let res = await axios.post('http://donjiyke-api.sqtdemo.com.ng/public/api/logout', {
  email: 'lukmansanni60@gmail.com',
  password: 'lukman528',
}, { headers: { Authorization: `Bearer ${token}` } });
*/ 


/*
const options = {
  url: 'http://localhost:3000/api/home',
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data: {
    name: 'David',
    age: 45
  }
};

axios(options)
  .then(response => {
    console.log(response.status);
  });
*/ 
