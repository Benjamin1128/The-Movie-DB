import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    requestToken: null,
};

const getters = {
    getRequestToken: (state) => state.requestToken,
};

const mutations = { 
    SET_REQUEST_TOKEN(state, data) {
        state.requestToken = data;
    }
};

const actions = {
    async fetchRequestToken({ commit }) {
        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ redirect_to: "http://localhost:9000/#/" }),
        };

        try {
            const dataAPIUrl = `https://api.themoviedb.org/4/auth/request_token`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit ("SET_REQUEST_TOKEN", data.request_token);
            window.open(
                `https://www.themoviedb.org/auth/access?request_token=${data.request_token}`,
                "_blank"
            )
        } catch (err) {
            console.error("Error fetching request token:", err);
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}