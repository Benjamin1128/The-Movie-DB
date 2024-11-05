import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  providerData: [],
};

const getters = {
  getproviderData: (state) => state.providerData,
};

const mutations = {
  SET_PROVIDER_DATA(state, data) {
    state.providerData = data;
  },
};

const actions = {
  async fetchproviderData({ commit }, payload) {
    const { mediaType, watchRegion } = payload;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    if (mediaType === null) mediaType = "movie";
    if (watchRegion === null) watchRegion = "MY";
    const dataAPIURL = `https://api.themoviedb.org/3/watch/providers/${mediaType}?language=en-US&watch_region=${watchRegion}&api_key=${API_KEY}`;

    try {
      const response = await fetch(dataAPIURL, options);
      const data = await response.json();
      if (data && data.results.length > 0) {
        commit("SET_PROVIDER_DATA", data.results);
      }
    } catch (err) {
      console.error("Error fetching watch provider data:", err);
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
