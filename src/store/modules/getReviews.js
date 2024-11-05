import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    reviewsData: [],
};

const getters = {
    getReviewsData:(state) => state.reviewsData,
};

const mutations = {
    SET_REVIEWS_DATA(state, data) {
        state.reviewsData = data;
    },
};

const actions = {
    async fetchReviewsData({ commit }, payload) {
        const { mediaType, itemId } = payload;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            }
        };

        let page = 1;
        let totalPages = 1;
        let allResults = [];

        try {
            while (page <= totalPages) {
                let searchAPIUrl = `https://api.themoviedb.org/3/${mediaType}/${itemId}/reviews?language=en-US&page=${page}`;
                const response = await fetch(searchAPIUrl, options);
                const data = await response.json();
                if (data && data.results.length > 0) {
                    allResults = allResults.concat(data.results);
                    totalPages = data.total_pages;
                }
                page++;
            }
            commit("SET_REVIEWS_DATA", allResults);

        } catch (err) {
            console.error("Error fetching reviews data:", err);
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