import axios from "axios";
import { useEffect } from "react";

const useAxiosFetch = () => {
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:9000/',

    });

    //Interceptors
    useEffect(() => {
        // request inceptors
        const requestInceptors = axios.interceptors.request.use((config) => {
            // Do something before request is sent
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        const responseInterceptor = axios.interceptors.response.use((response) => {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
        });

        return () => {
            axiosInstance.interceptors.request.eject(requestInceptors);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        }

    }, [axiosInstance])
    return axiosInstance
}

export default useAxiosFetch