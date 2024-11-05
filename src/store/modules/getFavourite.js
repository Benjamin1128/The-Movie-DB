import { API_KEY,ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    favouriteData: [],
};

const getters = {   
    getFavouriteData: (state) => state.favouriteData,
};

const mutations = {
    SET_FAVOURITE_DATA(state, data) {
        state.favouriteData = data;
    },
};

const actions = {
    async fetchFavouriteData({ commit }, payload) {
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
                const dataAPIUrl = `https://api.themoviedb.org/3/account/21559727/favorite/${mediaType}?language=en-US&page=${page}&sort_by=created_at.asc`;
                const response = await fetch(dataAPIUrl, options);
                const data = await response.json();

                    allResults = allResults.concat(data.results);
                    totalPages = data.total_pages;
                
                page++;
            }
            commit("SET_FAVOURITE_DATA", allResults);
        } catch (err) {
            console.error("Error fetching favourite data:", err);
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