import { data } from "autoprefixer";
import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    updateCommentResponse: false,
};

const getters = {
    getUpdateCommentResponse: (state) => state.updateCommentResponse,
};

const mutations = {
    SET_COMMENT_UPDATE(state, data) {
        state.updateCommentResponse = data;
    },
};

const actions = {
    async putCommentItem({ commit }, payload) {
        const { accesstoken, mediaType, mediaId, mediaComment, listId } = payload;
        let latestAccessToken = "";
        if (accesstoken) {
            latestAccessToken = accesstoken;
        } else {
            latestAccessToken = ACCESS_TOKEN;
        }

        const options = {
            method: "PUT", 
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${latestAccessToken}`,
            },
            body: JSON.stringify({
                items: [
                    { media_type: mediaType, media_id: mediaId,  comment: mediaComment},
                ]
            }),
        };

        try {
            const dataAPIUrl = `https://api.themoviedb.org/4/list/${listId}/items`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_COMMENT_UPDATE", data);
        } catch (err) {
            console.error("Error putting comment item:", err);
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