import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";

const state = {
  userValidation: null,
};

const getters = {
  getUserValidation: (state) => state.userValidation,
};

const mutations = {
  SET_VALIDATION_USER(state, data) {
    state.userValidation = data;
  },
};

const actions = {
  async validateUserInfo({ commit }, { username, password, request_token }) {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        username: username,
        password: password,
        request_token: request_token,
      }),
    };

    try {
      const dataApiURL = `https://api.themoviedb.org/3/authentication/token/validate_with_login`;
      const response = await fetch(dataApiURL, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.status_message || "Validation failed");
      }
      commit("SET_VALIDATION_USER", data);
      return data;
    } catch (err) {
      console.error("Error validating request token:", err);
      throw err;
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
