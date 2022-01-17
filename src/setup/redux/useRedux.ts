
import axios, { AxiosError, AxiosResponse } from 'axios'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import store from './store';    
      
//http://localhost:8000/api 
// https://api.donjiyke.com/public/api 

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

