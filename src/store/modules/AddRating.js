import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    ratingResponse: false, 
};

const getters = {   
    getRatingResponse: (state) => state.ratingResponse,
};

const mutations = {
    SET_MEDIA_RATING(state, data) {
        state.ratingResponse = data;
    },
};

const actions = {
    async postMediaRating({ commit }, payload) {
        const { accesstoken, sessionId, mediaType, mediaId, rateValue} = payload;
        let latestAccessToken = "";
        if (accesstoken) {
            latestAccessToken = accesstoken;
        } else {
            latestAccessToken = ACCESS_TOKEN;
        }

        const options = {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            body: JSON.stringify({
                value: rateValue,
            }),
        };

        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/${mediaType}/${mediaId}/rating?session_id=${sessionId}`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_MEDIA_RATING", data);
        } catch (err) {
            console.error("Error posting media rate:", err);
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