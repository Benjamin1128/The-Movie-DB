import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    dataCertification: [],
};

const getters = {
    getDataCertification: (state) => state.dataCertification,
};

const mutations = {
    SET_CERT_DATA(state, data) {
        state.dataCertification = data;
    },
};

const actions = {
    async fetchDataCertification({ commit }, mediaType) {
        const options = {
            method: "GET", 
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };
        let allResults = [];
        try {
            const dataAPIUrl = `https://api.themoviedb.org/3/certification/${mediaType}/list`
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            if (data && data.certifications.MY.length > 0) {
                allResults = allResults.concat(data.certifications.MY);
            }
            commit("SET_CERT_DATA", allResults)
        } catch (err) {
            console.error("Error fetching certification data:", err);
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations, 
    actions,
}