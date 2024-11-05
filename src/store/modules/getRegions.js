import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    availableRegion:[],
};

const getters = {
    getDataRegion: (state) => state.availableRegion,
};

const mutations = {
    SET_REGION_DATA(state, data) {
        state.availableRegion = data;
    },
};

const actions = {
    async fetchDataRegion({ commit }) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };
        
        let allResults = [];   
        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/watch/providers/regions?language=en-US`
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            if (data && data.results.length > 0) {
                allResults = allResults.concat(data.results); 
            }
            commit("SET_REGION_DATA", allResults);
        } catch (err) {
            console.error("Error fetching regions data:", err);
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