import {appStore} from "../store/app.js";
import axios from 'axios';
import {authStore} from "../store/auth.js";

// axios.defaults.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdGhpaW8udGVzdC9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTcwOTczNTc5MywiZXhwIjoxNzA5NzM5MzkzLCJuYmYiOjE3MDk3MzU3OTMsImp0aSI6IkoxQnJ2bm9OYVlKWHgybmMiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.WPjs2mp5gJbI6cmVAiCOrigDxhsoGNvwriERKuoxssg'
// axios.defaults.headers.Authorization = localStorage.getItem('token')


const _axios = axios.create();

const requestInterceptor = (config) => {

    if (config._preloader) {
        appStore().preloader = true
    }
    config.headers.Authorization = localStorage.getItem('token')

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
    if (err.response && err.response.status === 500 && err.response.data.message === "Token has expired") {
        // TODO throw an alert to user about expired session
        authStore().actionLogout()
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
        console.log(error);
        // Check if the error is a token expiration error
        if (error.response.status === 401 && error.response.data.error === 'TokenExpiredException') {
            // Handle token expiration error here, e.g., refresh token or redirect to login
            console.log('Token expired, handle token refresh or redirect to login');
        }

        // If it's not a token expiration error, simply throw the error
        return Promise.reject(error);
    }
);

export default _axios;

