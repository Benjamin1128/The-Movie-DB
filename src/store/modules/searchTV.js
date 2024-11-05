import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  sTVData: [],
  tvTR: 0,
};

const getters = {
  getSearchTVData: (state) => state.sTVData,
  getTVTRData: (state) => state.tvTR,
};

const mutations = {
  SET_STV_DATA(state, data) {
    state.sTVData = data;
  },
  SET_TVTR_DATA(state, data) {
    state.tvTR = data;
  },
};

const actions = {
  async fetchSTVData({ commit }, payload) {
    const { targetSearch, targetPage } = payload;
    const yearRange = 20;
    let filterYear;
    const parts = targetSearch.split("y:");
    const searchText = parts[0].trim();
    if (targetSearch && targetSearch.includes("y:")) {
      const yearMatch = targetSearch.match(/y:(\d{4})/);
      if (yearMatch) {
        filterYear = parseInt(yearMatch[1], 10);
      }
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    let totalResult = 0;
    let allResults = [];
    let searchAPIURL = `https://api.themoviedb.org/3/search/tv?query=${searchText}&include_adult=false&language=en-US&page=${targetPage}&api_key=${API_KEY}`;
    try {
      const response = await fetch(searchAPIURL, options);
      const data = await response.json();
      totalResult = data.total_results;
      if (data && data.results.length > 0) {
        allResults = allResults.concat(data.results);
      }

      if (filterYear) {
        allResults = allResults.filter((movie) => {
          const releaseYear = new Date(movie.first_air_date).getFullYear();
          return Math.abs(releaseYear - filterYear) <= yearRange;
        });
        totalResult = allResults.length;
      }
    } catch (err) {
      console.error("Error fetching target type search data:", err);
    }
    commit("SET_STV_DATA", allResults);
    commit("SET_TVTR_DATA", totalResult);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
