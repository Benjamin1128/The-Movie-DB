import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    peopleList: [],
    peopleListTP: 0,
};

const getters = {
    getPeopleList: (state) => state.peopleList,
    getPeopleListTP: (state) => state.peopleListTP,
};

const mutations = {
    SET_PEOPLE_LIST(state, data) {
        state.peopleList = data;
    },
    SET_PEOPLE_TP(state, data) {
        state.peopleListTP = data;
    },
};

const actions = {
    async fetchPeopleList({ commit }, targetPage) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };
        let totalPages = 1;
        let allResults = [];
        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/person/popular?language=en-US&page=1&page=${targetPage}`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            if (data && data.results.length > 0) {
                allResults = allResults.concat(data.results);
                totalPages = data.total_pages;
            }
            commit ("SET_PEOPLE_LIST", allResults);
            commit ("SET_PEOPLE_TP", totalPages);
        } catch (err) {
            console.error("Error fetching people list:", err);
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