import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    dataGenres : [],
};

const getters = {
    getDataGenres: (state) => state.dataGenres,
};

const mutations = {
    SET_GENRES_DATA(state, data) {
        state.dataGenres = data;
    }
};

const actions = {
    async fetchDataGenres({ commit }, mediaType) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        let allResults = [];
        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/genre/${mediaType}/list?language=en`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            if (data && data.genres.length > 0) {
                allResults = allResults.concat(data.genres);
            }
            commit("SET_GENRES_DATA", allResults);
        } catch (err) {
            console.error("Error fetching genres data:", err);
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