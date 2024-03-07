import {appStore} from "../store/app.js";
import axios from 'axios';
import {authStore} from '../store/auth.js';
import router from "../routes/router.js";


const _axios = axios.create();
_axios.defaults.headers.common.Authorization = localStorage.getItem('token')

const requestInterceptor = (config) => {

    if (config._preloader) {
        appStore().preloader = true
    }

    return config;
};

const requestErrInterceptor = (err) => {

    if (err.config && err.config._preloader) {
        appStore().preloader = false
    }

    return Promise.reject(err);
};

const responseInterceptor = (resp) => {

    if (resp.config._preloader) {
        appStore().preloader = false
    }

    return resp;
};

const responseErrInterceptor = (err) => {

    // Control session
    if (err.response && err.response.status === 401 && err.response.statusText === 'Unauthorized') {
        authStore().actionLogout().then(() => router.push('/login'))
    }

    if (err.response && err.response.status === 500 && err.response.data.message === "Token has expired") {
        // TODO throw an alert to user about expired session
        authStore().actionLogout().then(() => router.push('/login'))
    }

    if (err.config && err.config._preloader) {
        appStore().preloader = false
    }

    return Promise.reject(err);
};

_axios.interceptors.request.use(requestInterceptor, requestErrInterceptor);
_axios.interceptors.response.use(responseInterceptor, responseErrInterceptor);

_axios.interceptors.response.use(
    response => {
        // If the request was successful, return the response
        return response;
    },
    error => {
        // Check if the error is a token expiration error
        if (error.response.status === 401 && error.response.data.error === 'TokenExpiredException') {
            // Handle token expiration error here, e.g., refresh token or redirect to login
            console.log('TODO: Token expired, handle token refresh or redirect to login');
        }

        // If it's not a token expiration error, simply throw the error
        return Promise.reject(error);
    }
);

export default _axios;

