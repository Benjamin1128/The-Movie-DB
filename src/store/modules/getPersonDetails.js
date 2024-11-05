import { data } from "autoprefixer";
import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    personDetails: [],
};

const getters = {
    getPersonDetails: (state) => state.personDetails,
};

const mutations = {
    SET_PERSON_DETAILS(state, data) {
        state.personDetails = data;
    }
};

const actions = {
    async fetchPersonDetails({ commit }, targetID) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };
        try {
             const dataAPIUrl = `https://api.themoviedb.org/3/person/${targetID}?language=en-US`;
             const response = await fetch(dataAPIUrl, options);
             const data = await response.json();
             if (data) {
                commit("SET_PERSON_DETAILS", data);
             }
        } catch (err) {
            console.error("Error fetching person details:", err);
        }
    }
};

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions,
}