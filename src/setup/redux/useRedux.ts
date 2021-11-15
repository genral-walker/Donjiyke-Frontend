import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

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
