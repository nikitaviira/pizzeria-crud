import axios from 'axios';
import store from '@/store/index';

const baseURL: string = store.state.baseURL;

export default () => {
    return axios.create({
        baseURL,
    });
};
