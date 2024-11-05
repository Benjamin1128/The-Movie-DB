import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  welcomeBgImgURL: null,
};

const getters = {
  getwelcomeBgImgURL: (state) => state.welcomeBgImgURL,
};

const mutations = {
  SET_IMAGE_URL(state, data) {
    state.welcomeBgImgURL = data;
  },
};

const actions = {
  async fetchWelcomeBgImgURL({ commit }) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    const welcomeImgURL = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=${API_KEY}`;
    try {
      const response = await fetch(welcomeImgURL, options);
      const data = await response.json();
      if (data && data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const PosterPath = data.results[randomIndex].backdrop_path;
        commit("SET_IMAGE_URL", PosterPath);
      }
    } catch (err) {
      console.error("Error fetching welcome collection data:", err);
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
