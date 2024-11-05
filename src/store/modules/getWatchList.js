import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    watchListData: [],
};

const getters = {
    getWatchListData: (state) => state.watchListData,
};

const mutations = {
    SET_WATCHLIST_DATA(state, data) {
        state.watchListData = data;
    },
};

const actions = {
    async fetchWatchListData({ commit }, payload ) {
        const { accesstoken, mediaType } = payload;
        let latestAccessToken = "";
        if (accesstoken) {
            latestAccessToken = accesstoken;
        } else {
            latestAccessToken = ACCESS_TOKEN;
        };
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
                const dataAPIUrl = `https://api.themoviedb.org/3/account/21559727/watchlist/${mediaType}?language=en-US&page=${page}&sort_by=created_at.asc`;
                const response = await fetch(dataAPIUrl, options);
                const data = await response.json();
                if (data && data.results.length > 0) {
                    allResults = allResults.concat(data.results);
                    totalPages = data.total_pages;
                }
                page++;
            }
            commit("SET_WATCHLIST_DATA", allResults);
        } catch (err) {
            console.error("Error fetching watchlist data:", err);
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