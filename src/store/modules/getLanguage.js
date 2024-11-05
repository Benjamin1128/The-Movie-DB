import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    languageData: [],
};

const getters = {  
    getLanguageData:(state) => state.languageData,
};

const mutations = {
    SET_LANGUAGE_DATA(state, data) {
        state.languageData = data;
    }
};

const actions = {
    async fetchLanguageData({ commit }) {
        const options = {
            method: "GET",
            headers: {
                accept:"application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        let searchAPIUrl = 'https://api.themoviedb.org/3/configuration/languages';

        try {
            const response = await fetch(searchAPIUrl, options);
            const data = await response.json();
            commit ("SET_LANGUAGE_DATA", data);

        } catch (err) {
            console.error("Error fetching language data:", err);
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