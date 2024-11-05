import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  itemVideo: [],
};

const getters = {
  getItemVideo: (state) => state.itemVideo,
};

const mutations = {
  SET_ITEM_VIDEO(state, data) {
    state.itemVideo = data;
  },
};

const actions = {
  async fetchItemVideo({ commit }, payload) {
    const { mediaType, targetId } = payload;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    let allResults = [];
    try {
      const dataAPIURL = `https://api.themoviedb.org/3/${mediaType}/${targetId}/videos?language=en-US`;
      const response = await fetch(dataAPIURL, options);
      const data = await response.json();
      if (data && data.results.length > 0) {
        allResults = allResults.concat(data.results);
      }
      commit("SET_ITEM_VIDEO", allResults);
    } catch (err) {
      console.error("Error fetching trending data:", err);
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
