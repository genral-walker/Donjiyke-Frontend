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
async function getInfo() {
  const res = await window.fetch("/your-endpoint", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Userfront.accessToken()}`,
    },
  });
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
