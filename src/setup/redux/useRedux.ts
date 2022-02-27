
import axios, { AxiosError, AxiosResponse } from 'axios'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import store from './store';    

const userToken = store.getState().user.auth.accessToken;
const baseURL = process.env.REACT_APP_INSTANCE === 'dev' ? process.env.REACT_APP_PROJECT_URL_DEV : process.env.REACT_APP_PROJECT_URL_PROD;

const httpFree = axios.create({
  baseURL,   
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
  baseURL,
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

// UTILS   
export const randomPass = (count: number) => {
  const letter = "0123456789ABCDEFGHIJabcdefghijklmnopqrstuvwxyzKLMNOPQRSTUVWXYZ0123456789abcdefghiABCDEFGHIJKLMNOPQRST0123456789jklmnopqrstuvwxyz";
  let randomString = "";
  for (let i = 0; i <= count; i++) {
    const randomStringNumber = Math.floor(1 + Math.random() * (letter.length - 1));
    randomString += letter.substring(randomStringNumber, randomStringNumber + 1);
  }
  return (document.getElementById('password') as HTMLInputElement).value = randomString;
}


export default http; 
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

