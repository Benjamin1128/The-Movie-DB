import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    watchListResponse: false,
};

const getters = {
    getWatchListResponse: (state) => state.watchListResponse,
};

const mutations = {
    SET_MEDIA_WATCHLIST(state, data) {
        state.watchListResponse = data;
    },
};

const actions = {
    async postWatchListMedia({ commit }, payload) {
        const { accesstoken, sessionId, mediaType, mediaId, watchlistState } = payload;

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
                watchlist: watchlistState,
            }),
        };

        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/account/21559727/watchlist?session_id=${sessionId}`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_MEDIA_WATCHLIST", data);
        } catch (err) {
            console.error("Error posting watchlist:", err);
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