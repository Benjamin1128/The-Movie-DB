import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    collectionData: [],
};

const getters = {   
    getCollectionData:(state) => state.collectionData,
};

const mutations = {
    SET_COLLECTION_DATA(state, data) {
        state.collectionData = data;
    }
};

const actions = {
    async fetchCollectionData({ commit }, itemId) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };
        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/collection/${itemId}?language=en-US`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_COLLECTION_DATA", data);
        } catch (err) {
            console.error("Error fetching collection data:", err);
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