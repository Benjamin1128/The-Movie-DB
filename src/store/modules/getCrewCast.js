import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  crewCastData: [],
};

const getters = {
  getCrewCastData: (state) => state.crewCastData,
};

const mutations = {
  SET_CREWCAST_DATA(state, data) {
    state.crewCastData = data;
  },
};

const actions = {
  async fetchCrewCastData({ commit }, payload) {
    const { mediaType, itemId } = payload;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };
    try {
      const dataAPIUrl = `https://api.themoviedb.org/3/${mediaType}/${itemId}/credits?language=en-US`;
      const response = await fetch(dataAPIUrl, options);
      const data = await response.json();
      commit("SET_CREWCAST_DATA", data);
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
