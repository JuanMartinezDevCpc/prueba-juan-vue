import axios from 'axios'
import Cookies from 'js-cookie';
import { useAuth } from '../store/auth.store';


axios.defaults.baseURL = 'http://localhost:3000/api'
const { setUserFailure } = useAuth();

axios.interceptors.request.use(request => {
    try {
        const token = Cookies.get('token');
        if (token) {
            if (!request.headers) {
                request.headers = {};
            }
            request.headers['Authorization'] = `Bearer ${token}`
        }
        return request
    } catch (error) {
        console.log(error);
    }
})

axios.interceptors.response.use(response => response, error => {
    const { status, data } = error.response
    if (status >= 500) console.error(error)
    if (status === 400) throw data
    if (status === 401) {
        setUserFailure()
        location.reload();
    }
    return Promise.reject(error)
})