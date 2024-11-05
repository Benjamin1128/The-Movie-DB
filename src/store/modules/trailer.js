import { API_KEY, ACCESS_TOKEN } from "src/router/apiToken";

const state = {
    trailerData: [],
};

const getters = {
    getTrailerData: (state) => state.trailerData,
};

const mutations = { 
    SET_TRAILER_DATA(state, data) {
        state.trailerData = data;
    },
};

const actions = {
    async fetchTrailerData({ commit }, trailerType) {
        const options = {
            method: "GET",
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };

        const trailerShowsUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${trailerType}&api_key=${API_KEY}`
    
        try {
            const response = await fetch(trailerShowsUrl, options);
            const data = await response.json();
            if (data && data.results.length > 0) {
                const trailersWithVideos = await Promise.all(
                    data.results.map(async (movie) => {
                        const videoResponse = await fetch(
                            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`,
                            options
                        );
                        const VideoData = await videoResponse.json();
                        return {
                            ...movie,
                            videos: VideoData.results,
                        }
                    })
                );
                commit("SET_TRAILER_DATA", trailersWithVideos);
            }

        } catch (err) {
            console.error("Error fetching trailer data:", err);
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}