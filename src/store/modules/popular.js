import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  popularData: [],
};

const getters = {
  getPopularData: (state) => state.popularData,
};

const mutations = {
  SET_POPULAR_DATA(state, data) {
    state.popularData = data;
  },
};

const actions = {
  async fetchPopularData({ commit }, popularType) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    let popularAPIUrl = "";

    if (popularType === "streaming") {
        popularAPIUrl = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1&api_key=${API_KEY}`
    } else if (popularType === "tv") {
        popularAPIUrl = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1&api_key=${API_KEY}`
    } else if (popularType === "rent") {
        popularAPIUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`
    } else if (popularType === 'movie') {
        popularAPIUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${API_KEY}`
    }

    try {
      const response = await fetch(popularAPIUrl, options);
      const data = await response.json();
      if (data && data.results.length > 0) {
        commit("SET_POPULAR_DATA", data.results);
      }
    } catch (err) {
      console.error("Error fetching popular data:", err);
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
