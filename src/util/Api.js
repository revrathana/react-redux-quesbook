import axios from 'axios';
import { mockApi } from './mockApi';
import Cookies from 'js-cookie';
import config from 'config';
const jwt = Cookies.get('jwt');

if (axios.defaults && axios.defaults.headers) {
    axios.defaults.headers['Authorization'] = jwt ? `bearer ${jwt}` : '';
}

const emptyFn = () => true;
const Api = {
    get: params => {
        const time = new Date();
        const apiUrl = config.apiUrl;
        const { url, data = { params: { time } } } = params;

        if (Object.keys(mockApi).includes(url)) {
            console.log('MOCKING API: ' + url);
            return Promise.resolve([]).then(results => {
                return { result: mockApi[url], error: {} };
            });
        }

        let authOptions = {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        };

        data.params['ignore_headers'] = true;
        return axios
            .get(`${apiUrl}${url}`, { ...data }, authOptions)
            .then(result => ({ result }))
            .catch(error => ({ error }));
    },
    post: params => {
        const time = new Date();
        const apiUrl = config.apiUrl;
        const { url, data } = params;
        if (data) {
            data.ignore_headers = true;
        }

        if (Object.keys(mockApi).includes(url)) {
            console.log('MOCKING API: ' + url);
            return Promise.resolve([]).then(results => {
                return { result: mockApi[url], error: {} };
            });
        }

        let authOptions = {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        };

        return axios
            .post(`${apiUrl}${url}`, data, authOptions)
            .then(result => ({ result }))
            .catch(error => ({ error }));
    },
    patch: params => {
        const { apiUrl } = config;
        const { url, data } = params;

        if (Object.keys(mockApi).includes(url)) {
            console.log('MOCKING API: ' + url);
            return Promise.resolve([]).then(results => {
                return { result: mockApi[url], error: {} };
            });
        }

        let authOptions = {
            headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json'
            }
        };
        return axios
            .patch(`${apiUrl}${url}`, data, authOptions)
            .then(result => ({ result }))
            .catch(error => ({ error }));
    },
    download: params => {
        const time = new Date();
        const apiUrl = config.apiUrl;
        const {
            url,
            data = {
                data: { time }
            },
            exportType
        } = params;

        data['ignore_headers'] = true;

        return axios
            .post(`${apiUrl}${url}`, data, {
                responseType: 'arraybuffer'
            })
            .then(result => ({ result }))
            .catch(error => ({ error }));
    },
    upload: params => {
        const time = new Date();
        const apiUrl = config.apiUrl;
        const { url, data } = params;

        return axios({
            method: 'post',
            url: `${apiUrl}${url}`,
            data: data
        })
            .then(result => ({ result }))
            .catch(error => ({ error }));
    }
};

export default Api;
