<template>
  <q-page-container>
    <q-page>
      <!-- Drop Down Bar Section -->
      <div class="topDropDownWrapper">
        <q-btn-dropdown class="dropDownBtn" label="Overview" no-caps flat>
          <q-list class="dropDownItemSection">
            <q-item clickable v-close-popup>
              <q-item-label>Main</q-item-label>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Translations</q-item-label>
            </q-item>
            <q-space />
            <q-item clickable v-close-popup>
              <q-item-label>Changes</q-item-label>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Report</q-item-label>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Edit</q-item-label>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown class="dropDownBtn" label="Media" no-caps flat>
          <q-list class="dropDownItemSection">
            <q-item clickable v-close-popup>
              <q-item-label>Backdrops</q-item-label>
              <q-space />
              <q-badge color="grey-3" text-color="black" label="0" />
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Posters</q-item-label>
              <q-space />
              <q-badge color="grey-3" text-color="black" label="0" />
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown class="dropDownBtn" label="Fandom" no-caps flat>
          <q-list class="dropDownItemSection">
            <q-btn-dropdown
              label="Discussions"
              no-caps
              flat
              menu-anchor="top right"
              menu-self="top left"
              class="discussionNested"
            >
              <q-item clickable v-close-popup class="itemSection">
                <q-item-label>Overview</q-item-label>
              </q-item>
              <q-item clickable v-close-popup class="itemSection">
                <q-item-label>General</q-item-label>
                <q-space />
                <q-badge color="grey-3" text-color="black" label="0" />
              </q-item>
              <q-item clickable v-close-popup class="itemSection">
                <q-item-label>Content Issues</q-item-label>
                <q-space />
                <q-badge color="grey-3" text-color="black" label="0" />
              </q-item>
            </q-btn-dropdown>
          </q-list>
        </q-btn-dropdown>

        <q-btn-dropdown class="dropDownBtn" label="Share" no-caps flat>
          <q-list class="dropDownItemSection">
            <q-item clickable v-close-popup>
              <q-item-label>Share Link</q-item-label>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Facebook</q-item-label>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Tweet</q-item-label>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>

      <!-- Background Section -->
      <div
        class="itemOverview"
        :style="{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            Collection.backdrop_path
              ? Collection.backdrop_path
              : Collection.poster_path
          })`,
        }"
      >
        <div class="column left-column">
          <q-img
            class="itemPoster"
            :src="getImagePath(Collection)"
            placeholder-src="../assets/defaultImg.svg"
            fit="fill"
          />
        </div>
        <!-- Right Column Content -->
        <div class="column right-column">
          <div class="header-section">
            <div class="title-row">
              <div>
                <label class="clickable-label">
                  {{ Collection.name ? Collection.name : Collection.title }}
                </label>
                <div class="meta-info">
                  <div v-for="(genre, index) in genreNames" :key="genre">
                    <span class="genreClass">{{ genre }}</span>
                    <span v-if="!isLastGenre(index)">,</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Vibe Section -->
          <div class="vibe-section">
            <q-knob
              :min="0"
              :max="10"
              :model-value="normalizedVoteAverage(this.AverageUserScore)"
              show-value
              size="70px"
              :thickness="0.2"
              :color="knobColor(this.AverageUserScore)"
              center-color="black"
              track-color="grey"
              class="text-white"
              :readonly="true"
            >
              <div style="font-size: 20px; font-weight: bold">
                {{
                  (normalizedVoteAverage(this.AverageUserScore) * 10).toFixed(
                    0
                  )
                }}%
              </div>
            </q-knob>
            <span class="UserScClass">User Score</span>
          </div>

          <!-- Overview Section -->
          <div class="overview-section">
            <div class="overview-label">
              <label>Overview</label>
              <p>{{ Collection.overview }}</p>
            </div>
          </div>

          <!-- Number Section -->
          <div class="number-section">
            <div class="numbers">
              Number of Movies: {{ collectionPartsLength }}
            </div>
            <div class="numbers">Revenue: -</div>
          </div>
        </div>
      </div>

      <!-- Details Section -->
      <div class="DetailsSection">
        <label class="SubtitleClass">Featured Cast</label>
        <div class="castSection">
          <div
            v-for="cast in featureCast"
            :key="cast.id"
            class="EachCastSection"
          >
            <q-img
              class="castProfile"
              :src="getProfilePath(cast)"
              placeholder-src="../assets/defaultImg.svg"
              fit="cover"
              @click="handleImageClick(cast)"
            />
            <div class="castDetails">
              <label class="castName" @click="handleLabelClick(cast)">
                {{ cast.name }}
              </label>
              <label>{{ cast.character }}</label>
            </div>
          </div>
        </div>
        <q-separator />
        <label class="SubtitleClass">Featured Crew</label>
        <div class="castSection">
          <div
            v-for="crew in writingCrew"
            :key="crew.id"
            class="EachCastSection"
          >
            <q-img
              class="castProfile"
              :src="getProfilePath(crew)"
              placeholder-src="../assets/defaultImg.svg"
              fit="cover"
              @click="handleImageClick(crew)"
            />
            <div class="castDetails">
              <label class="castName" @click="handleLabelClick(crew)">
                {{ crew.name }}</label
              >
              <label>{{ crew.jobs }}</label>
            </div>
          </div>
        </div>
        <q-separator />
        <label class="SubtitleClass">{{ collectionPartsLength }} movies</label>
        <div class="movieSection">
          <div
            v-for="movie in movieList"
            :key="movie.id"
            class="EachMovieSection"
          >
            <div class="wrapperForImage">
              <q-img
                class="moviePoster"
                :src="getImagePath(movie)"
                placeholder-src="../assets/defaultImg.svg"
                fit="cover"
                @click="handleMovieClick(movie)"
              />
            </div>
            <div class="movieDetails">
              <label class="movieTitle" @click="handleMovieClick(movie)">
                {{ movie.title }}
              </label>
              <label class="movieDate">{{
                formatDate(movie.release_date)
              }}</label>
              <label>{{ movie.overview }}</label>
            </div>
          </div>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      genreNames: [],
      writingCrew: [],
      featureCast: [],
      movieList: [],
      AverageUserScore: 0,
    };
  },
  methods: {
    ...mapActions("getCollection", ["fetchCollectionData"]),
    ...mapActions("getGenre", ["fetchDataGenres"]),
    ...mapActions("getCrewCast", ["fetchCrewCastData"]),
    navigateToSelectedPerson(person) {
      this.$router.replace({
        path: `/PeopleDetails`,
        query: {
          personId: person.id,
        },
      });
    },
    handleLabelClick(item) {
      this.navigateToSelectedPerson(item);
    },
    handleImageClick(item) {
      this.navigateToSelectedPerson(item);
    },
    handleMovieClick(item) {
      this.$router.replace({
        path: `/ItemDetails`,
        query: {
          item_id: item.id,
          media_type: "movie",
        },
      });
    },
    getImagePath(item) {
      return (
        "https://image.tmdb.org//t/p/original" +
        (item.poster_path ? item.poster_path : item.backdrop_path)
      );
    },
    getProfilePath(item) {
      if (item.profile_path) {
        return "https://image.tmdb.org/t/p/original" + item.profile_path;
      }
    },
    formatDate(dateString) {
      if (dateString) {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
      } else {
        return "No Specified Date.";
      }
    },
    getGenreNamesById(genreIds, genres) {
      const genreMap = genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
      return genreIds.map((id) => genreMap[id] || "Unknown Genre");
    },
    isLastGenre(index) {
      return index === this.genreNames.length - 1;
    },
    GetUserScore(item) {
      let movies = item.parts;
      if (movies) {
        const validMovies = movies.filter(
          (movie) => movie.vote_average !== 0 && !isNaN(movie.vote_average)
        );
        const sum = validMovies.reduce(
          (acc, movie) => acc + movie.vote_average,
          0
        );
        const average = validMovies.length > 0 ? sum / validMovies.length : 0;
        this.AverageUserScore = average.toFixed(1);
      }
    },
    normalizedVoteAverage(item) {
      if (item !== null && !isNaN(item)) {
        return parseFloat(item);
      }
      return 0;
    },
    knobColor(item) {
      const value = this.normalizedVoteAverage(item);
      if (value >= 7) {
        return "teal";
      } else if (value >= 4) {
        return "yellow";
      } else {
        return "red";
      }
    },
    async GettingRequiredInfo(item) {
      const genreIds = item.parts[0].genre_ids;
      const partIds = item.parts[0].id;
      this.genreNames = this.getGenreNamesById(genreIds, this.getDataGenres);
      await this.fetchCrewCastData({
        mediaType: "movie",
        itemId: partIds,
      });
      let CrewMember = this.getCrewCastData.crew;
      if (CrewMember) {
        this.writingCrew = CrewMember.filter(
          (member) =>
            member.department === "Writing" || member.department === "Directing"
        );
        const combinedJobs = Object.values(
          this.writingCrew.reduce((acc, member) => {
            if (!acc[member.id]) {
              acc[member.id] = {
                id: member.id,
                name: member.name,
                jobs: member.job,
                profile_path: member.profile_path,
              };
            } else {
              acc[member.id].jobs += `, ${member.job}`;
            }
            return acc;
          }, {})
        ).map((member) => ({
          id: member.id,
          name: member.name,
          jobs: member.jobs,
          profile_path: member.profile_path,
        }));
        this.writingCrew = combinedJobs;
      }
      this.featureCast = this.getCrewCastData.cast;
      this.movieList = item.parts;
    },
  },
  computed: {
    ...mapGetters("getCollection", ["getCollectionData"]),
    ...mapGetters("getGenre", ["getDataGenres"]),
    ...mapGetters("getCrewCast", ["getCrewCastData"]),
    Collection() {
      return this.getCollectionData;
    },
    collectionPartsLength() {
      return this.Collection && this.Collection.parts
        ? this.Collection.parts.length
        : 0;
    },
  },
  async created() {
    await this.fetchCollectionData(this.$route.query.item_id);
    await this.fetchDataGenres("movie");
    await this.GettingRequiredInfo(this.getCollectionData);
    await this.GetUserScore(this.getCollectionData);
  },
};
</script>

<style scoped>
/* Drop Down Bar Section */
.topDropDownWrapper {
  display: flex;
  justify-content: center;
}

.dropDownBtn {
  font-size: medium;
  font-weight: normal;
  overflow: hidden;
  width: 200px;
}

.dropDownItemSection .q-item {
  font-size: 14px;
  min-height: 32px;
}

.nestedDropDown {
  font-weight: normal;
  width: 100%;
  padding-right: 55%;
}

.itemSection {
  font-size: 14px;
  min-height: 32px;
}

.discussionNested {
  font-weight: normal;
  width: 100%;
  padding-right: 38%;
}

/* Background Section */

.column {
  display: flex;
  flex-direction: column;
}

.left-column {
  flex: 0 0 300px;
  margin-right: 3%;
}

.right-column {
  flex: 1;
}

.itemOverview {
  display: flex;
  height: auto;
  padding: 3%;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.8);
  background-blend-mode: overlay;
  color: white;
}

.itemPoster {
  height: 460px;
  width: 100%;
  border-radius: 10px;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-row {
  margin-top: 5%;
}

.title-row label {
  margin: 0;
  font-size: 2.5em;
  font-weight: bold;
}

.meta-info {
  display: flex;
  gap: 10px;
  align-items: center;
}

.meta-info span {
  font-size: 15px;
}

.genreClass:hover {
  cursor: pointer;
  color: #c0c0be;
}

.vibe-section {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  align-items: center;
}

.UserScClass {
  font-weight: bold;
  font-size: 1.1em;
  width: 50px;
}

.overview-section {
  margin: 20px 0 0 0;
}

.overview-label label {
  font-weight: bold;
  font-size: 20px;
}

.overview-label p {
  font-size: 16px;
}

.number-section {
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
  row-gap: 15px;
  margin-top: 10px;
}

.numbers {
  font-weight: bold;
  font-size: medium;
}

.clickable-label {
  cursor: pointer;
}

.clickable-label:hover {
  color: #c0c0be;
}

/* Details Section */
.DetailsSection {
  margin-left: 2%;
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.SubtitleClass {
  font-size: 24px;
  font-weight: bold;
}

.castSection {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 2%;
}

.castProfile {
  cursor: pointer;
  height: 70px;
  width: 70px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.EachCastSection {
  width: 300px;
  border: 1px solid rgb(218, 216, 216);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.castDetails {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  text-overflow: ellipsis;
}

.castDetails label {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.castName {
  font-size: medium;
  font-weight: bold;
  cursor: pointer;
}

.castName:hover {
  color: #c0c0be;
}

.movieSection {
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
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  object-fit: cover;
  cursor: pointer;
}

.movieDetails {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.movieTitle {
  font-weight: bold;
}

.movieTitle:hover {
  color: #04b4e4;
}

.movieDate {
  color: grey;
  margin-bottom: 2%;
}
</style>