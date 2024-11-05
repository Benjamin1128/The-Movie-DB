import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    sCompanyData: [],
    companyTR: 0,
};

const getters = {
    getSearchCompanyData:(state) => state.sCompanyData,
    getCompanyTRData:(state) => state.companyTR,
};

const mutations = {
    SET_SCOMPANY_DATA(state, data) {
        state.sCompanyData = data;
    },
    SET_COMPANYTR_DATA(state, data) {
        state.companyTR = data;
    },
};

const actions = {
    async fetchSCompanyData({ commit }, payload) {
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
        let searchAPIURL = `https://api.themoviedb.org/3/search/company?query=${searchText}&include_adult=false&language=en-US&page=${targetPage}&api_key=${API_KEY}`;
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
        commit("SET_SCOMPANY_DATA", allResults);
        commit("SET_COMPANYTR_DATA", totalResults);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}