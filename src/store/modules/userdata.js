

const state = {
  userlogin: false,
  username: "",
  checklogout: false,
  accountId: "",
  accesstoken: "",
  sessionId: "",
};

const getters = {
  getUserLogin: (state) => state.userlogin,
  getUsername: (state) => state.username,
  getUserLogout: (state) => state.checklogout,
  getAccountID: (state) => state.accountId,
  getAccessToken: (state) => state.accesstoken,
  getSessionID: (state) => state.sessionId,
};

const mutations = {
  SET_USER_LOGIN(state, value) {
    state.userlogin = value;
    sessionStorage.setItem("userlogin", value.toString());
  },
  SET_USER_NAME(state, value) {
    state.username = value;
    sessionStorage.setItem("username", value);
  },
  SET_USER_LOGOUT(state, value) {
    state.checklogout = value;
    sessionStorage.setItem("checklogout", value.toString());
  },
  SET_ACCOUNT_ID(state, value) {
    state.accountId = value;
    sessionStorage.setItem("accountid", value);
  },
  SET_ACCESS_TOKEN(state, value) {
    state.accesstoken = value;
    sessionStorage.setItem("accesstoken", value);
  },
  SET_SESSION_ID(state, value) {
    state.sessionId = value;
    sessionStorage.setItem("sessionid", value);
  },
  CLEAR_SESSION(state) {
    state.userlogin = false;
    state.username = "";
    state.checklogout = false;
    state.accesstoken = "";
    state.accountId = "";
    state.sessionId = "";
    sessionStorage.removeItem("sessionid");
    sessionStorage.removeItem("userlogin");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("checklogout");
    sessionStorage.removeItem("accesstoken");
    sessionStorage.removeItem("accountid");
  },
};

const actions = {
  setUserLogin({ commit }, value) {
    commit("SET_USER_LOGIN", value);
  },
  setUsername({ commit }, value) {
    commit("SET_USER_NAME", value);
  },
  setUserLogout({ commit }, value) {
    commit("SET_USER_LOGOUT", value);
  },
  setAccountId({ commit }, value) {
    commit("SET_ACCOUNT_ID", value);
  },
  setAccessToken({ commit }, value) {
    commit("SET_ACCESS_TOKEN", value);
  },
  setSessionId({ commit }, value) {
    commit("SET_SESSION_ID", value);
  },
  clearSession({ commit }) {
    commit("CLEAR_SESSION");
  },
};

const savedUserLogin = sessionStorage.getItem("userlogin");
const savedUsername = sessionStorage.getItem("username");
const savedUserLogout = sessionStorage.getItem("checklogout");
const savedAccessToken = sessionStorage.getItem("accesstoken");
const savedAccountId = sessionStorage.getItem("accountid");
const savedSessionId = sessionStorage.getItem("sessionid");

if (savedUserLogin !== null) {
  state.userlogin = savedUserLogin === "true";
}

if (savedUsername !== null) {
  state.username = savedUsername;
}

if (savedUserLogout !== null) {
  state.checklogout = savedUserLogout === "true";
}

if (savedAccessToken !== null) {
  state.accesstoken = savedAccessToken;
}

if (savedAccountId !== null) {
  state.accountId = savedAccountId;
}

if (savedSessionId !== null) {
  state.sessionId = savedSessionId;
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
