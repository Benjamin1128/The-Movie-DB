import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  freeData: [],
};

const getters = {
  getFreeData: (state) => state.freeData,
};

const mutations = {
  SET_FREE_DATA(state, data) {
    state.freeData = data;
  },
};

const actions = {
  async fetchFreeData({ commit }, freeType) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    let freeAPIUrl = "";

    if (freeType === "movie") {
        freeAPIUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`
    } else if (freeType === "tv") {
        freeAPIUrl = `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1&api_key=${API_KEY}`
    } 

    try {
      const response = await fetch(freeAPIUrl, options);
      const data = await response.json();
      if (data && data.results.length > 0) {
        commit("SET_FREE_DATA", data.results);
      }
    } catch (err) {
      console.error("Error fetching free data:", err);
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
