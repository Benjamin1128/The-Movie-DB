import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";

const state = {
  validationResult: null,
};

const getters = {
  getValidationResult: (state) => state.validationResult,
};

const mutations = {
  SET_VALIDATION_RESULT(state, data) {
    state.validationResult = data;
  },
};

const actions = {
  async validateRequestToken(
    { commit },
    { username, password, request_token }
  ) {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        username,
        password,
        request_token,
      }),
    };
    try {
      const dataApiURL = `https://api.themoviedb.org/4/auth/access_token`;
      const response = await fetch(dataApiURL, options);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.status_message || "Validation failed");
      }
      commit("SET_VALIDATION_RESULT", data);
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
