import { ACCESS_TOKEN } from "../../router/apiToken";

const state = {
  addToListResponse: false,
};

const getters = {
  getAddToListResponse: (state) => state.addToListResponse,
};

const mutations = {
  SET_MEDIA_TOLIST(state, data) {
    state.addToListResponse = data;
  },
};

const actions = {
  async postMediaToList({ commit }, payload) {
    const { accesstoken, sessionId, targetMediaId, targetListId, mediaType } =
      payload;
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
        Authorization: `Bearer ${latestAccessToken}`,
      },
      body: JSON.stringify({
        items: [{ media_type: mediaType, media_id: targetMediaId }],
      }),
    };
    try {
      const dataApiURL = `https://api.themoviedb.org/4/list/${targetListId}/items?session_id=${sessionId}`;
      const response = await fetch(dataApiURL, options);
      const data = await response.json();
      commit("SET_MEDIA_TOLIST", data);
    } catch (err) {
      console.error("Error adding media to list:", err);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
