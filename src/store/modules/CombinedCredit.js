import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    combinedCredtis: [],
};

const getters = {
    getCombinedCredits: (state) => state.combinedCredtis,
};

const mutations = {
    SET_COMBINED_CREDITS(state, data) {
        state.combinedCredtis = data;
    },
};

const actions = {
    async fetchCombinedCredits({ commit }, targetID) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };
        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/person/${targetID}/combined_credits?language=en-US`
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            if (data) {
                commit("SET_COMBINED_CREDITS", data);
            }
        } catch (err) {
            console.error("Error fetching combined credits:", err);
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