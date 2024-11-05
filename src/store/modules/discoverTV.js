import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    discoverTV: [],
    discoverTVTP: 0,
};

const getters = {
    getDiscoverTV: (state) => state.discoverTV,
    getDiscoverTVTP: (state) => state.discoverTVTP,
};

const mutations = {
    SET_DISCOVER_TV(state, data) {
        state.discoverTV = data;
    },
    SET_DISCOVERTV_TP(state, data) {
        state.discoverTVTP = data;
    }
};

const actions = {
    async fetchDiscoverTV({ commit }, payload) {
        let {
            sortby,
            currentpage,
            watchregion,
            watchproviders,
            monetization,
            releasetype,
            region,
            releaseDateGr,
            releaseDateLo,
            genres,
            certification,
            originalLanguage,
            voteaverageGr,
            voteaverageLo,
            voteCountGr,
            runtimeGr,
            runtimeLo,
            keywords,
            companies,
        } = payload;
        if (sortby === undefined) {
            sortby = "popularity.desc"
        }
        if (watchproviders && watchproviders.length > 1) {
            if (typeof watchproviders === "string") {
                watchproviders = watchproviders.replace(/,/g, "|");
            } else if (Array.isArray(watchproviders)) {
                watchproviders = watchproviders.join("|");
            }
        }
        if (keywords && keywords.length > 1) {
            if (typeof keywords === "string") {
                keywords = keywords.replace(/,/g, "|");
            } else if (Array.isArray(keywords)) {
                keywords = keywords.join("|");
            }
        }
        
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        let totalPages = 1;
        let allResults = [];

        try {
            for (let page = 1; page <= currentpage; page++) {
                let dataAPIUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortby}&api_key=${API_KEY}`;
                if (watchregion) {
                    dataAPIUrl += `&watch_region=${watchregion}`;
                }
                if (watchproviders) {
                    dataAPIUrl += `&with_watch_providers=${watchproviders}`;
                }
                if (monetization) {
                    dataAPIUrl += `&with_watch_monetization_types=${monetization}`
                }
                if (releasetype) {
                    dataAPIUrl += `&with_release_type=${releasetype}`;
                }
                if (region) {
                    dataAPIUrl += `&region=${region}`;
                }
                if (releaseDateGr) {
                    dataAPIUrl += `&primary_release_date.gte=${releaseDateGr}`;
                }
                if (releaseDateLo) {
                    dataAPIUrl += `&primary_release_date.lte=${releaseDateLo}`;
                }
                if (genres) {
                    dataAPIUrl += `&with_genres=${genres}`;
                }
                if (certification) {
                    dataAPIUrl += `&certification=${certification}`;
                }
                if (originalLanguage) {
                    dataAPIUrl += `&with_original_language=${originalLanguage}`;
                }
                if (voteaverageGr) {
                    dataAPIUrl += `&vote_average.gte=${voteaverageGr}`;
                }
                if (voteaverageLo) {
                    dataAPIUrl += `&vote_average.lt=${voteaverageLo}`;
                }
                if (voteCountGr) {
                    dataAPIUrl += `&vote_count.gte=${voteCountGr}`;
                }
                if (runtimeGr) {
                    dataAPIUrl += `&with_runtime.gte=${runtimeGr}`;
                }
                if (runtimeLo) {
                    dataAPIUrl += `&with_runtime.lte=${runtimeLo}`;
                }
                if (keywords) {
                    dataAPIUrl += `&with_keywords=${keywords}`;
                }
                if (companies) {
                    dataAPIUrl += `&with_companies=${companies}`;
                }

                const response = await fetch(dataAPIUrl, options);
                const data = await response.json();
                if (data && data.results.length > 0) {
                    allResults = allResults.concat(data.results);
                    totalPages = data.total_pages;
                }
            }
            commit ("SET_DISCOVER_TV", allResults);
            commit ("SET_DISCOVERTV_TP", totalPages);
    } catch (err) {
        console.error("Error fetching data:", err);
    }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}