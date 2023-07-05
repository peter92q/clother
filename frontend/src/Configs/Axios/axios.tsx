import axios, {AxiosError, AxiosResponse} from 'axios';
import { store } from '../Redux/store';

const sleep = () => new Promise(resolve=>setTimeout(resolve, 500));

axios.defaults.baseURL = 'https://app.peter92.com:30001/api/';
axios.defaults.withCredentials = true; 

const responseBody = (reponse: AxiosResponse) => reponse.data;

axios.interceptors.request.use(config =>{
    const token = store.getState().account.user?.token;
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep();
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            break;
    }

    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}
 
const Basket = {
    get: ()=> requests.get('basket'),
    addItem: (productId: number, quantity = 1, size: string) => requests.post(`basket?productId=${productId}&quantity=${quantity}&size=${size}`,{}),
    removeItem: (productId: number, quantity = 1, size: string) => requests.delete(`basket?productId=${productId}&quantity=${quantity}&size=${size}`)
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser') 
}

const agent = {
    Basket,
    Account
}

export default agent;