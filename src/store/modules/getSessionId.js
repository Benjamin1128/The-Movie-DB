import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    sessionID: null,
};

const getters = {
    getSessionID: (state) => state.sessionID,
};

const mutations = {
    SET_SESSION_ID(state, data) {
        state.sessionID = data;
    }
};

const actions = {
    async fetchSessionID({ commit }, request_token) {
        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({ request_token: request_token }),
        };

        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_SESSION_ID", data.session_id);
        } catch (err) {
            console.error("Error fetching session id:", err);
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