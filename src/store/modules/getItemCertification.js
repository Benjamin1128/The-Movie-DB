import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  itemCert: [],
};

const getters = {
  getItemCert: (state) => state.itemCert,
};

const mutations = {
  SET_ITEM_CERT(state, data) {
    state.itemCert = data;
  },
};

const actions = {
  async fetchItemCert({ commit }, payload) {
    const { mediaType, itemId } = payload;
    let contentCheck = "";
    if (mediaType === "movie") {
      contentCheck = "release_dates";
    } else if (mediaType === "tv") {
      contentCheck = "content_ratings";
    }
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    let allResults = [];
    try {
      const dataAPIUrl = `https://api.themoviedb.org/3/${mediaType}/${itemId}/${contentCheck}`;
      const response = await fetch(dataAPIUrl, options);
      const data = await response.json();
      if (data && data.results.length > 0) {
        allResults = allResults.concat(data.results);
      }
      commit("SET_ITEM_CERT", allResults);
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
