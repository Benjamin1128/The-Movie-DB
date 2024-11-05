import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    removeItemResponse: false,
};

const getters = {
    getRemoveItemResponse: (state) => state.removeItemResponse,
};

const mutations = {
    SET_REMOVE_ITEM(state, data) {
        state.removeItemResponse = data;
    },
};

const actions = {
    async removeItem({ commit }, payload) {
        const { accesstoken, listId, mediaType, mediaId } = payload;
        let latestAccessToken = "";
        if (accesstoken) {
            latestAccessToken = accesstoken
        } else {
            latestAccessToken = ACCESS_TOKEN
        }

        const options = {
            method: "DELETE",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${latestAccessToken}`,
            },
            body: JSON.stringify({
                items: [{
                    media_type: mediaType, media_id: mediaId
                }]
            }),
        };

        try {
            const dataAPIUrl = `https://api.themoviedb.org/4/list/${listId}/items`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_REMOVE_ITEM", data);
        } catch (err) {
            console.error("Error removing items:", err);
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