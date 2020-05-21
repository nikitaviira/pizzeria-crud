import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import ILoginCredentials from '@/domain/ILoginCredentials';
import IRegisterCredentials from '@/domain/IRegisterCredentials';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        baseURL: 'https://pizzeria-nekitosa.azurewebsites.net/api/v1.0',
        token: localStorage.getItem('jwt') || '',
    },
    mutations: {
        set_token(state, token: string) {
            state.token = token;
        },
        logout(state) {
            state.token = '';
        },
    },
    actions: {
        login({commit}, credentials: ILoginCredentials) {
            return new Promise((resolve, reject) => {
                axios({ url: this.state.baseURL + '/account/login', data: credentials, method: 'POST' })
                    .then((resp) => {
                        const token = resp.data.token as string;
                        localStorage.setItem('jwt', token);
                        axios.defaults.headers.common.Authorization = 'Bearer ' + token;
                        commit('set_token', token);
                        resolve(resp);
                    })
                    .catch((err) => {
                        localStorage.removeItem('jwt');
                        reject(err);
                    });
            });
        },
        register({commit}, credentials: IRegisterCredentials) {
            return new Promise((resolve, reject) => {
                axios({url: this.state.baseURL + '/account/register', data: credentials, method: 'POST' })
                    .then((resp) => {
                        resolve(resp);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        logout({commit}) {
            return new Promise((resolve, reject) => {
                commit('logout');
                localStorage.removeItem('jwt');
                delete axios.defaults.headers.common.Authorization;
                resolve();
            });
        },
    },
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
});
