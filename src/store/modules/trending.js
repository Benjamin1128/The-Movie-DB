import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  trendingData: [],
};

const getters = {
  getTrendingData: (state) => state.trendingData,
};

const mutations = {
  SET_TRENDING_DATA(state, data) {
    state.trendingData = data;
  },
};

const actions = {
  async fetchTrendingData({ commit }, time_window) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    if (time_window === null) time_window = "day";
    const trendingShowsUrl = `https://api.themoviedb.org/3/trending/all/${time_window}?language=en-US&api_key=${API_KEY}`;

    try {
      const response = await fetch(trendingShowsUrl, options);
      const data = await response.json();
      if (data && data.results.length > 0) {
        commit("SET_TRENDING_DATA", data.results);
      }
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
