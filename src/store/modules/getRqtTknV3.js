import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  requestToken: null,
};

const getters = {
  getRqtTknV3: (state) => state.requestToken,
};

const mutations = {
  SET_REQUEST_TOKEN(state, data) {
    state.requestToken = data;
  },
};

const actions = {
  async fetchRqtTknV3({ commit }) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    try {
      const dataApiURL = `https://api.themoviedb.org/3/authentication/token/new`;
      const response = await fetch(dataApiURL, options);
      const data = await response.json();
      commit("SET_REQUEST_TOKEN", data.request_token);
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
