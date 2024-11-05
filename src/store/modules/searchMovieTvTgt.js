import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    searchTgtData: [],
};

const getters = {
    getSearchTgtData: (state) => state.searchTgtData,
};

const mutations = {
    SET_SEARCH_TGTDATA(state, data) {
        state.searchTgtData = data;
    },
};

const actions = {
    async fetchSearchTgtData({ commit }, targetSearch) {
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
        let filteredResults = [];
        let searchAPIUrl = `https://api.themoviedb.org/3/search/multi?query=${targetSearch}&include_adult=false&language=en-US&page=${page}&api_key=${API_KEY}`;
        try {
            while (page <= 2) {
                const response = await fetch(searchAPIUrl, options);
                const data = await response.json();
                if (data && data.results.length > 0) {
                    allResults = allResults.concat(data.results);
                    filteredResults = allResults.filter(
                        (item) => item.media_type === "tv" || item.media_type === "movie"
                    );
                    const uniqueResults = [];
                    const keys = new Set();

                    filteredResults.forEach((item) => {
                        const key = `${item.id}-${item.media_type}`;
                        if (!keys.has(key)) {
                            keys.add(key);
                            uniqueResults.push(item);
                        }
                    });
                    filteredResults = uniqueResults;
                    totalPages = data.total_pages;
                }
                page++;
            }
            commit("SET_SEARCH_TGTDATA", filteredResults);
        } catch (err) {
            console.error("Error fetching search data:", err);
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