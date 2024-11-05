import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  getListFile: [],
  getTPListFile: 0,
};

const getters = {
  getListFile: (state) => state.getListFile,
  getTPListFile: (state) => state.getTPListFile,
};

const mutations = {
  SET_FILE_LIST(state, data) {
    state.getListFile = data;
  },
  SET_LIST_TP(state, data) {
    state.getTPListFile = data;
  },
};

const actions = {
  async fetchListFile({ commit }, payload) {
    const { accesstoken, AccountID, loadMorePage } = payload;
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
      for (let page = 1; page <= loadMorePage; page++) {
        const dataApiURL = `https://api.themoviedb.org/4/account/${AccountID}/lists?page=${page}`;
        const response = await fetch(dataApiURL, options);
        const data = await response.json();
        if (data && data.results.length > 0) {
          allResults = allResults.concat(data.results);
          totalPages = data.total_pages;
        }
      }
      commit("SET_FILE_LIST", allResults);
      commit("SET_LIST_TP", totalPages);
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
