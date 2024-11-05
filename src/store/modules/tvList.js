import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    dataTVList: [],
    tvListTP: 0,
};

const getters = {
    getTVList: (state) => state.dataTVList,
    getTVListTP: (state) => state.tvListTP,
};

const mutations = {
    SET_TV_LIST(state, data) {
        state.dataTVList = data;
    },
    SET_TVLIST_TP(state, data) {
        state.tvListTP = data;
    },
};

const actions = {
    async fetchTVList({ commit }, payload) {
        const { orderBy, currentPage } = payload;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        let totalPages = 1;
        let allResults = [];
        try {
            for (let page = 1; page <= currentPage; page++) {
                const dataAPIUrl = `https://api.themoviedb.org/3/tv/${orderBy}?language=en-US&page=${page}&api_key=${API_KEY}`;
                const response = await fetch(dataAPIUrl, options);
                const data = await response.json();

                if (data && data.results.length > 0) {
                    allResults = allResults.concat(data.results);
                    totalPages = data.total_pages;
                }
            }
            commit("SET_TV_LIST", allResults);
            commit("SET_TVLIST_TP", totalPages);
        } catch (err) {
            console.error("Error fetching tv list data:", err);
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