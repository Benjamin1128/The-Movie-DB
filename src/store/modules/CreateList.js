import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  createListresponse: false,
  craetedListId: "",
};

const getters = {
  getCreateListResponse: (state) => state.createListresponse,
  getCreatedListID: (state) => state.craetedListId,
};

const mutations = {
  SET_CREATE_LIST(state, data) {
    state.createListresponse = data;
  },
  SET_CREATE_LISTID(state, data) {
    state.craetedListId = data;
  },
};

const actions = {
  async postCreateList({ commit }, payload) {
    const {
      accesstoken,
      sessionId,
      listname,
      listdescription,
      listPublicstatus,
      sortBy,
    } = payload;
    let latestAccessToken = "";
    let TempSortBy = "";
    let TempPublic = true;
    if (accesstoken) {
      latestAccessToken = accesstoken;
    } else {
      latestAccessToken = ACCESS_TOKEN;
    }
    if (sortBy.value == undefined) {
      TempSortBy = "original_order.asc";
    } else {
      TempSortBy = sortBy.value;
    }
    if (listPublicstatus == "Yes") {
      TempPublic = 1;
    } else {
      TempPublic = 0;
    }
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: `Bearer ${latestAccessToken}`,
      },
      body: JSON.stringify({
        name: listname,
        description: listdescription,
        iso_3166_1: "US",
        iso_639_1: "en",
        public: TempPublic,
        sort_by: TempSortBy,
      }),
    };
    try {
      const dataApiURL = `https://api.themoviedb.org/4/list?session_id=${sessionId}`;
      const response = await fetch(dataApiURL, options);
      const data = await response.json();
      commit("SET_CREATE_LIST", data);
      commit("SET_CREATE_LISTID", data.id);
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
