import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    favouriteResponse: false,
};

const getters = {
    getFavouriteResponse: (state) => state.favouriteResponse,
};  

const mutations = {
    SET_MEDIA_FAVOURITE(state, data) {
        state.favouriteResponse = data;
    }
};

const actions = {
    async postFavouriteMedia({ commit }, payload) {
        const { accesstoken, sessionId, mediaType, mediaId, favouriteState } = payload;
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
                media_type: mediaType,
                media_id: mediaId,
                favorite: favouriteState,
            }),
        };

        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/account/21559727/favorite?session_id=${sessionId}`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_MEDIA_FAVOURITE", data);
        } catch (err) {
            console.error("Error adding favourite media:", err);
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