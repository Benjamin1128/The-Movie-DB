import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    seenItemData: [],
};

const getters = {
    getSeenItemData: (state) => state.seenItemData,
};

const mutations = {
    SET_SEEN_DATA(state, data) {
        state.seenItemData = data;
    }
};

const actions = {
    async fetchSeenItemData({ commit }, payload) {
        const { mediaType, itemId } = payload;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };
        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/${mediaType}/${itemId}/account_states`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_SEEN_DATA", data);
        } catch (err) {
            console.error("Error fetching seen item data:", err);
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