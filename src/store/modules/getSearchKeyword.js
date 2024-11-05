import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    keywordList: [],
};

const getters = {
    getKeywordList: (state) => state.keywordList,
};

const mutations = {
    SET_KEYWORD_LIST(state, data) {
        state.keywordList = data;
    }
};

const actions = {
    async fetchKeywordList({ commit }, targetSearch) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        let page = 1;
        let totalPages = 1;
        let allResults = [];
        try {
            while (page <= totalPages) {
                let searchAPIURL = `https://api.themoviedb.org/3/search/keyword?query=${targetSearch}&page=${page}&api_key=${API_KEY}`;
                const response = await fetch(searchAPIURL, options);
                const data = await response.json();
                if (data && data.results.length > 0) {
                    allResults = allResults.concat(data.results);
                    totalPages = data.total_pages;
                }
                page++;
            }
            commit("SET_KEYWORD_LIST", allResults);
        } catch (err) {
            console.error("Error fetching keyword list:", err);
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