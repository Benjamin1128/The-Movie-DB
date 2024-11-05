import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  recommendItemData: [],
  recommendItemTP: 0,
};

const getters = {
  getRecommendItem: (state) => state.recommendItemData,
  getRecommendItemTP: (state) => state.recommendItemTP,
};

const mutations = {
  SET_REC_ITEM(state, data) {
    state.recommendItemData = data;
  },
  SET_REC_TP(state, data) {
    state.recommendItemTP = data;
  },
};

const actions = {
  async fetchRecommendation({ commit }, payload) {
    let { accesstoken, mediaType, AccountID, currentpage } = payload;
    if (mediaType === "movies") {
        mediaType = "movie";
    }
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
        Authorization: `Bearer ${latestAccessToken}`,
      },
    };

    let totalPages = 1;
    let allResults = [];
    try {
      for (let page = 1; page <= currentpage; page++) {
        const dataApiURL = `https://api.themoviedb.org/4/account/${AccountID}/${mediaType}/recommendations?page=${page}&language=en-US`;
        const response = await fetch(dataApiURL, options);
        const data = await response.json();
        if (data && data.results.length > 0) {
          allResults = allResults.concat(data.results);
          totalPages = data.total_pages;
        }
      }
      commit("SET_REC_ITEM", allResults);
      commit("SET_REC_TP", totalPages);
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
