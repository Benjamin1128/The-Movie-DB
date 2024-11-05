import { data } from "autoprefixer";
import { API_KEY,ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    getDetailList: [],
};
 
const getters = {   
    getDetailList: (state) => state.getDetailList,
};

const mutations = { 
    SET_DETAIL_LIST(state, data) {
        state.getDetailList = data;
    },
};

const actions = {
    async fetchDetailList({ commit }, targetList) {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            }
        };

        let page = 1;
        let totalPages = 1;
        let allResults = [];
        try {
            while (page <= totalPages) {
                const dataAPIUrl = `https://api.themoviedb.org/4/list/${targetList}?language=en-US&page=${page}`;
                const response = await fetch(dataAPIUrl, options);
                const data = await response.json();
                allResults = allResults.concat(data);
                totalPages = data.total_pages;
                page++;
            }
            commit("SET_DETAIL_LIST", allResults);
        } catch (err) {
            console.error("Error fetching detail list:", err);
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