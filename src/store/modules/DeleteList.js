import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    deleteListResponse: false,
};

const getters= {
    getDeleteListResponse: (state) => state.deleteListResponse,
};

const mutations = {
    SET_DELETE_LIST(state, data) {
        state.deleteListResponse = data;
    },
};

const actions = {
    async deleteList({ commit }, payload) {
        const { accesstoken, listId } = payload;
        let latestAccessToken = "";
        if (accesstoken) {
            latestAccessToken = accesstoken
        } else {
            latestAccessToken = ACCESS_TOKEN;
        }

        const options = {
            method: "DELETE",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/list/${listId}`
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_DELETE_LIST", data);
        } catch (err) {
            console.error("Error deleting list:", err);
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