import { ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    logoutResponse: false,
};

const getters = {
    getLogoutResponse: (state) => state.logoutResponse,
};

const mutations = { 
    SET_TOKEN_DELETE(state, data) {
        state.logoutResponse = data;
    }
};

const actions = {
    async deleteAccTkn({ commit }, accessToken) {
        const options = {
            method: "DELETE",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
                access_token: accessToken,
            }),
        };

        try {
            const dataAPIUrl = `https://api.themoviedb.org/4/auth/access_token`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            
            commit("SET_TOKEN_DELETE", data);
        } catch (err) {
            console.error("Error deleting access token:", err);
        }
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}