import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    totalPages: 0,
};

const getters = {
    getTotalPages: (state) => state.totalPages,
};

const mutations = {
    SET_TOTAL_PAGES(state, data) {
        state.totalPages = data;
    },
};

const actions = {
    async fetchTotalPage({ commit }, payload) {
        const { targetSearch, targetType } = payload;
        const yearRange = 20;
        let filterYear;
        const parts = targetSearch.split("y:");
        const searchText = parts[0].trim();
        if (targetSearch && targetSearch.includes("y:")) {
            const yearMatch = targetSearch.match(/y:(\d{4})/);
            if (yearMatch) {
                filterYear = parseInt(yearMatch[1], 10);
            }
        };

        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        let allResults = [];
        let totalPages = 0;
        let searchAPIURL = `https://api.themoviedb.org/3/search/${targetType}?query=${searchText}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;
        try {
            if (targetType !== "network") {
                const response = await fetch(searchAPIURL, options);
                const data = await response.json();

                if (data && data.results.length > 0) {
                    allResults = allResults.concat(data.results);
                    totalPages = data.total_pages;
                }

                if (filterYear) {
                    allResults = allResults.filter((result) => {
                        let knownForCondition = false;
                        let movieCondition = false;

                        if (result.known_for) {
                            knownForCondition = result.known_for.some((item) => {
                                const releaseYear = new Date(
                                    item.release_date ? item.release_date : item.first_air_date
                                ).getFullYear();
                                return Math.abs(releaseYear - filterYear) <= yearRange;
                            });
                        }

                        if (result.release_date || result.first_air_date) {
                            const releaseYear = new Date(
                                result.result_date
                                    ? result.release_date
                                    : result.first_air_date
                            ).getFullYear();
                            movieCondition = Math.abs(releaseYear - filterYear) <= yearRange;
                        }
                        return knownForCondition || movieCondition;
                    });
                    const resultsPerPage = Math.ceil(allResults.length / 20);
                    totalPages = resultsPerPage;
                }
            } else {
                totalPages = 0;
            }
        } catch (err) {
            console.error("Error fetching total pages:", err);
        }
        commit("SET_TOTAL_PAGES", totalPages);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}