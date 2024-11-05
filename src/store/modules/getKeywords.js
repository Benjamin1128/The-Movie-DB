import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    keywordsData: [],
};

const getters = {
    getKeywordsData: (state) => state.keywordsData,
};

const mutations = {
    SET_KEYWORDS_DATA(state, data) {
        state.keywordsData = data;
    }
};

const actions = {
    async fetchKeywordsData({ commit }, payload) {
        const { mediaType, itemId } = payload;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        let allResults = [];
        try {
            const dataAPIUrl =  `https://api.themoviedb.org/3/${mediaType}/${itemId}/keywords`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_KEYWORDS_DATA", data);
        } catch (err) {
            console.error("Error fetching keywords data:", err);
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