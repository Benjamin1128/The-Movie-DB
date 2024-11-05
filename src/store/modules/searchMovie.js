import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    sMovieData: [],
    movieTR: 0,
};

const getters = {
    getSearchMovieData:(state) => state.sMovieData,
    getMovieTRData:(state) => state.movieTR,
};

const mutations = {
    SET_SMOVIE_DATA(state, data) {
        state.sMovieData = data;
    },
    SET_MOVIETR_DATA(state, data) {
        state.movieTR = data;
    },
};

const actions = {
    async fetchSMovieData({ commit }, payload) {
        const { targetSearch, targetPage } = payload;
        const yearRange = 20;
        let filterYear;
        const parts = targetSearch.split("y:");
        const searchText = parts[0].trim();
        if (targetSearch && targetSearch.includes("y:")) {
            const yearMatch = targetSearch.match(/y:(\d{4})/);
            if (yearMatch) {
                filterYear = parseInt(yearMatch[1], 10);
            }
        }

        const options = {
            method: "GET", 
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        let totalResults = 0;
        let allResults = [];
        let searchAPIURL = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=false&language=en-US&page=${targetPage}&api_key=${API_KEY}`;
        try {
            const response = await fetch(searchAPIURL, options);
            const data = await response.json();
            totalResults = data.total_results;
            if (data && data.results.length > 0) {
                allResults = allResults.concat(data.results);
            }

            if (filterYear) {
                allResults = allResults.filter((movie) => {
                    const releaseYear = new Date(movie.release_date).getFullYear();
                    return Math.abs(releaseYear - filterYear) <= yearRange;
                })
                totalResults = allResults.length;
            }
        } catch (err) {
            console.error("Error fetching search movie data:", err);
        }
        commit("SET_SMOVIE_DATA", allResults);
        commit("SET_MOVIETR_DATA", totalResults);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}