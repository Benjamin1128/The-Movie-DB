import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    itemDetails: [],
};

const getters = {
    getItemDetails: (state) => state.itemDetails,
};

const mutations = {
    SET_ITEM_DATA (state, data) {
        state.itemDetails = data;
    }
};

const actions = {
    async fetchItemDetails({ commit }, payload) {
        const { mediaType, itemId } = payload;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            }, 
        };
        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/${mediaType}/${itemId}?language=en-US`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            if (data) {
                commit("SET_ITEM_DATA", data);
            }
        } catch (err) {
            console.error("Error fetching item details:", err);
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