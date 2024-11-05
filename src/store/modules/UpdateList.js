import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    updateListResponse: false,
};

const getters = {
    getUpdateListResponse: (state) => state.updateListResponse,
};
 
const mutations = { 
    SET_UPDATE_LIST(state, data) {
        state.updateListResponse = data;
    },
};

const actions = {
    async putUpdateList({ commit }, payload) {
        const { 
            accesstoken, 
            listId, 
            listname, 
            listdescription, 
            listPublicStatus, 
            sortBy, 
            imagePath 
        } = payload;

        let latestAccessToken = "";
        let TempPublic = true;
        if (accesstoken) {
            latestAccessToken = accesstoken;
        } else {
            latestAccessToken = ACCESS_TOKEN;
        }

        if (listPublicStatus == "Yes") {
            TempPublic = true;
        } else {
            TempPublic = false;
        }

        const body = {
            name: listname,
            description: listdescription,
            iso_3166_1: "US",
            iso_639_1: "en",
            public: TempPublic,
            backdrop_path: imagePath,
        }

        if (sortBy.value !== undefined) {
            body.sort_by = sortBy.value;
        }

        const options = {
            method: "PUT",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                Authorization: `Bearer ${latestAccessToken}`,
            },
            body: JSON.stringify(body),
        };

        try {
            const dataAPIUrl = `https://api.themoviedb.org/4/list/${listId}`;
            const response = await fetch(dataAPIUrl, options);
            const data = await response.json();
            commit("SET_UPDATE_LIST", data)
        } catch (err) {
            console.error("Error putting update list:", err);
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