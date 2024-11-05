import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  ratingData: [],
};

const getters = {
  getRatingData: (state) => state.ratingData,
};

const mutations = {
  SET_RATING_DATA(state, data) {
    state.ratingData = data;
  },
};

const actions = {
  async fetchRatingData({ commit }, payload) {
    const { accesstoken, mediaType, AccountID } = payload;
    let latestAccessToken = "";
    if (accesstoken) {
      latestAccessToken = accesstoken;
    } else {
      latestAccessToken = ACCESS_TOKEN;
    }
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    let allResults = [];
    let page = 1;
    let totalPages = 1;
    try {
      while (page <= totalPages) {
        const dataApiURL = `https://api.themoviedb.org/3/account/${AccountID}/rated/${mediaType}?language=en-US&page=${page}&sort_by=created_at.asc`;
        const response = await fetch(dataApiURL, options);
        const data = await response.json();
        if (data && data.results.length > 0) {
          allResults = allResults.concat(data.results);
          totalPages = data.total_pages;
        }
        page++;
      }
      commit("SET_RATING_DATA", allResults);
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
