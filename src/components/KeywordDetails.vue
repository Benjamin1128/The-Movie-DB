<template>
  <q-page-container>
    <q-page>
        <div class="keywordContainerTop">
            <div class="keyword-info">
                <label class="keyword-title">{{ TargetKeywordName }}</label>
                <div v-if="TargetLogoPath">
                    <q-img
                        :src="`https://image.tmdb.org/t/p/original` + TargetLogoPath" 
                        fit="fill"
                        class="logo"
                    />
                </div>
            </div>
            <div v-if="TargetCountry" class="country-info">
                <label>{{ TargetCountry }}</label>
            </div>
            <q-space />
            <div>
                <label class="movieCountSection">{{ movieCount }}</label>
            </div>
        </div>

        <!-- Drop Down Bar Section -->
        <div class="topDropDownWrapper">
            <q-btn-dropdown class="dropDownBtn" label="Overview" no-caps flat>
                <q-list class="dropDownItemSection">
                    <q-item clickable v-close-popup>
                        <q-item-label>Main</q-item-label>
                    </q-item>
                    <q-item clickable v-close-popup>
                        <q-item-label>Changes</q-item-label>
                    </q-item>
                    <q-item clickable v-close-popup>
                        <q-item-label>Edit</q-item-label>
                    </q-item>
                </q-list>
            </q-btn-dropdown>

            <q-btn-dropdown class="dropDownBtn" label="Movies" no-caps flat>
                <q-list class="dropDownItemSection">
                    <q-item clickable v-close-popup>
                        <q-item-label>Movies</q-item-label>
                    </q-item>
                    <q-item clickable v-close-popup>
                        <q-item-label>TV Shows</q-item-label>
                    </q-item>
                </q-list>
            </q-btn-dropdown>

            <q-btn-dropdown class="dropDownBtn" label="Sort" no-caps flat>
                <q-list class="dropDownItemSection">
                    <q-item-section>
                        <q-btn-dropdown
                            label="Popularity"
                            no-caps
                            flat
                            menu-anchor="top right"
                            menu-self="top left"
                            class="discussionNested"
                            align="left"
                        >
                            <q-item clickable v-close-popup class="itemSection">
                                <q-item-label>Ascending</q-item-label>
                            </q-item>
                            <q-item clickable v-close-popup class="itemSection">
                                <q-item-label>Descending</q-item-label>
                            </q-item>
                        </q-btn-dropdown>
                    </q-item-section>

                    <q-item-section>
                        <q-btn-dropdown
                            label="Rating"
                            no-caps
                            flat
                            menu-anchor="top right"
                            menu-self="top left"
                            class="discussionNested"
                            align="left"
                        >
                            <q-item clickable v-close-popup class="itemSection">
                                <q-item-label>Ascending</q-item-label>
                            </q-item>
                            <q-item clickable v-close-popup class="itemSection">
                                <q-item-label>Descending</q-item-label>
                            </q-item>
                        </q-btn-dropdown>
                    </q-item-section>

                    <q-item-section>
                        <q-btn-dropdown
                            label="Release Date"
                            no-caps
                            flat
                            menu-anchor="top right"
                            menu-self="top left"
                            class="discussionNested"
                            align="left"
                        >
                            <q-item clickable v-close-popup class="itemSection">
                                <q-item-label>Ascending</q-item-label>
                            </q-item>
                            <q-item clickable v-close-popup class="itemSection">
                                <q-item-label>Descending</q-item-label>
                            </q-item>
                        </q-btn-dropdown>
                    </q-item-section>
                </q-list>
            </q-btn-dropdown>
        </div>
        <q-separator />
        <!--Details Section -->
        <div class="DetailsSection">
            <div class="movieSections">
                <div
                    v-for="movie in keywordMovie"
                    :key="movie.id"
                    class="EachMovieSection"
                >
                    <div class="wrapperForImage">
                        <q-img 
                            class="moviePoster"
                            :src="getImagePath(movie)"
                            @click="handleImageClick(movie)"
                            placeholder-src="../assets/defaultImg.svg"
                        />
                    </div>
                    <div class="movieDetails">
                        <label class="movie-title clickable-label" @click="handleLabelClick(movie)">
                            {{ movie.title }}
                            <span v-if="movie.original_title && movie.original_title !== movie.title"
                                class="original-title"
                            >
                                ({{ movie.original_title }})
                            </span>
                        </label>
                        <label class="movieDate">
                            {{ formatDate(movie.release_date) }}
                        </label>
                        <label>{{ movie.overview }}</label>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
  </q-page-container>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            TargetKeywordName: "",
            TargetLogoPath: "",
            TargetCountry: "",
        }
    },
    methods: {
        ...mapActions("discoverMovie", ['fetchDiscoverMovie']),
        getImagePath(item) {
            return( 
                "https://image.tmdb.org/t/p/original" + 
                (item.poster_path ? item.poster_path : item.backdrop_path))
        },
        handleLabelClick(item) {
            this.$router.replace({
                path: `/ItemDetails`,
                query: {
                    item_id: item.id,
                    media_type: "movie",
                }
            })
        },
        handleImageClick(item) {
            this.$router.replace({
                path: `/ItemDetails`,
                query: {
                    item_id: item.id,
                    media_type: "movie",
                }
            })
        },
        formatDate(dateString) {
            if (dateString) {
                const date = new Date(dateString);
                const options = { year: "numeric", month: "long", day: "numeric"};
                return date.toLocaleDateString("en-US", options);
            } else {
                return "No specified date.";
            }
        }
    },
    computed: {
        ...mapGetters("discoverMovie", ['getDiscoverMovie']),
        keywordMovie() {
            return this.getDiscoverMovie;
        },
        movieCount() {
            const count = this.getDiscoverMovie.length;
            return `${count} ${count === 1 ? "movie" : "movies"}`;
        },
    },
    async created() {
        if (this.$route.query.keywordName) {
            this.TargetKeywordName = this.$route.query.keywordName;
            await this.fetchDiscoverMovie({
                sortby: "popularity.desc",
                currentpage: 1,
                keywords: this.$route.query.keywordId,
            });
        } else {
            this.TargetKeywordName = this.$route.query.companyName;
            this.TargetLogoPath = this.$route.query.companyPath;
            this.TargetCountry = this.$route.query.companyCountry;
            await this.fetchDiscoverMovie({
                sortby: "popularity.desc",
                currentpage: 1,
                companies: this.$route.query.companyId,
            });
        }
    }
}
</script>

<style scoped>

.keywordContainerTop {
    display: flex;
    height: 100px;
    background-size: fill;
    background-position: center;
    background-image: linear-gradient(to right, #3b3b83, #242c5c, #082444),
    url("../assets/userpageBG.svg");
    background-blend-mode: overlay;
    align-content: center;
    padding: 2%;
}   

.keyword-info {
    display: flex;
    align-items: center;
    gap: 20px;
}

.keyword-title {
    color: white;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
}

.logo {
    height: 50px;
    width: 50px;
    cursor: pointer;
    align-content: center;
}

.country-info {
    color: white;
    font-size: medium;
    margin-left: 1%;
    align-content: center;
}

.movieCountSection {
    color: white;
    font-size: large;
    font-weight: bold;
    align-items: center;
}

/* Drop Down Bar Section */
.topDropDownWrapper {
    display: flex;
    justify-content: center;
  }

  .dropDownBtn {
    font-size: medium;
    font-weight: normal;
    overflow: hidden;
  }
  
  .dropDownItemSection .q-item {
    font-size: 14px;
    min-height: 32px;
  }

  .nestedDropDown {
    font-weight: normal;
    width: 100%;
  }

  .itemSection {
    font-size: 14px;
    min-height: 32px;
  }

  .discussionNested {
    font-weight: normal;
    width: 100%;
  }

/* Details Section */
.DetailsSection {
    margin: 2%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.movieSections {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.EachMovieSection {
    width: 100%;
    border: 1px solid rgb(218, 216, 216);
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.moviePoster {
    height: 100%;
    width: 100px;
    border-radius: 10px;
    object-fit: fill;
    cursor: pointer;
}

.movieDetails {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.movie-title {
    font-weight: bold;
    font-size: large;
}

.original-title {
    color: grey;
    margin-bottom: 2%;
    font-size: medium;
}

.movieDate {
    color: grey;
    margin-bottom: 2%;
    font-size: medium;
}

.clickable-label {
    cursor:pointer;
    color: black;
}

.clickable-label:hover {
    color: #04b4e4;
}

</style>