import { API_KEY, ACCESS_TOKEN } from "../../router/apiToken";
const state = {
  searchData: [],
};

const getters = {
  getSearchData: (state) => state.searchData,
};

const mutations = {
  SET_SEARCH_DATA(state, data) {
    state.searchData = data;
  },
};

const actions = {
  async fetchSearchData({ commit }, targetSearch) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    let searchAPIURL = `https://api.themoviedb.org/3/search/multi?query=${targetSearch}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

    try {
      const response = await fetch(searchAPIURL, options);
      const data = await response.json();
      if (data && data.results.length > 0) {
        const limitedResults = data.results.slice(0, 13);
        limitedResults.sort(customComparator);
        const arrangedData = rearrangeData(limitedResults);
        commit("SET_SEARCH_DATA", arrangedData);
      }
    } catch (err) {
      console.error("Error fetching search data:", err);
    }
  },
};

function customComparator(a, b) {
  const desiredOrder = ["movie", "tv", "person"];
  return (
    desiredOrder.indexOf(a.media_type) - desiredOrder.indexOf(b.media_type)
  );
}

function rearrangeData(data) {
  let firstThree = [];
  const mediaTypes = ["movie", "tv", "person"];
  mediaTypes.forEach((type) => {
    const index = data.findIndex((item) => item.media_type === type);
    if (index !== -1) {
      firstThree.push(...data.splice(index, 1));
    }
  });
  return firstThree.concat(data);
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
