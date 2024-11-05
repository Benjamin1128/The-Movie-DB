import { data } from "autoprefixer";
import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    dataMovieList: [],
    movieListTP: 0,
};

const getters = {
    getMovieList: (state) => state.dataMovieList,
    getMovieListTP: (state) => state.movieListTP,
};

const mutations = {
    SET_MOVIE_LIST(state, data) {
        state.dataMovieList = data
    },
    SET_MOVIELIST_TP(state, data) {
        state.movieListTP = data
    },
};

const actions = {
    async fetchMovieList({ commit }, payload) {
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
                const dataAPIUrl = `https://api.themoviedb.org/3/movie/${orderBy}?language=en-US&page=${page}&api_key=${API_KEY}`;
                const response = await fetch(dataAPIUrl, options);
                const data = await response.json();

                if (data && data.results.length > 0) {
                    allResults = allResults.concat(data.results);
                    totalPages = data.total_pages;
                }
            }
            commit("SET_MOVIE_LIST", allResults);
            commit("SET_MOVIELIST_TP", totalPages);
        } catch (err) {
            console.error("Error fetching movie list data:", err);
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