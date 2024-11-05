import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    deleteRatingResponse: false,
};

const getters = {
    getDeleteRatingResponse: (state) => state.deleteRatingResponse,
};

const mutations = {
    SET_RATING_DELETE(state, data) {
        state.deleteRatingResponse = data;
    },
};

const actions = {
    async deleteMediaRating({ commit }, payload) {
        const { accesstoken, sessionId, mediaType, mediaId } = payload;
        let latestAccessToken = "";
        if (accesstoken) {
            latestAccessToken = accesstoken;
        } else {
            latestAccessToken = ACCESS_TOKEN;
        }

        const options = {
            method: "DELETE",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/rating?session_id=${sessionId}`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_RATING_DELETE", data);
        } catch (err) {
            console.error("Error deleting medie rating:", err);
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