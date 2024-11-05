import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  sPersonData: [],
  personTR: 0,
};

const getters = {
  getSearchPersonData: (state) => state.sPersonData,
  getPersonTRData: (state) => state.personTR,
};

const mutations = {
  SET_SPERSON_DATA(state, data) {
    state.sPersonData = data;
  },
  SET_PERSONTR_DATA(state, data) {
    state.personTR = data;
  },
};

const actions = {
  async fetchSPersonData({ commit }, payload) {
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
    let searchAPIURL = `https://api.themoviedb.org/3/search/person?query=${searchText}&include_adult=false&language=en-US&page=${targetPage}&api_key=${API_KEY}`;
    try {
      const response = await fetch(searchAPIURL, options);
      const data = await response.json();
      totalResult = data.total_results;
      if (data && data.results.length > 0) {
        allResults = allResults.concat(data.results);
      }

      if (filterYear) {
        allResults = allResults.filter((result) => {
          if (result.known_for) {
            return result.known_for.some((item) => {
              const releaseYear = new Date(
                item.release_date ? item.release_date : item.first_air_date
              ).getFullYear();
              return Math.abs(releaseYear - filterYear) <= yearRange;
            });
          }
          return false;
        });
        totalResult = allResults.length;
      }
    } catch (err) {
      console.error("Error fetching target type search data:", err);
    }
    commit("SET_SPERSON_DATA", allResults);
    commit("SET_PERSONTR_DATA", totalResult);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
