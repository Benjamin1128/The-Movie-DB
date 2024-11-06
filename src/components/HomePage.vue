<template>
  <!-- Logout Section -->
  <div v-if="checklogout">
    <div class="logoutBackground">
      <p style="font-weight: bold">Logged Out!</p>
      <p>You have been successfully logged out.</p>
    </div>
  </div>

  <!-- Welcome Section  -->
  <div
    class="welcomeSection"
    :style="{
      backgroundImage: `url(https://image.tmdb.org/t/p/original/${getwelcomeBgImgURL})`,
    }"
  >
    <div class="welcomeContent">
      <h3>Welcome.</h3>
      <h4>Millions of movies, TV shows and people to discover. Explore now.</h4>
    </div>
    <div class="search-bar-container">
      <q-input
        rounded
        outlined
        v-model="searchtext"
        bg-color="white"
        style="font-size: medium"
        placeholder="Search for a movie, tv show, person......"
        @keydown.enter="this.handleSearch"
      >
        <template v-slot: append>
          <q-btn class="search-button" rounded @click="handleSearch"
            >Search</q-btn
          >
        </template>
      </q-input>
    </div>
  </div>

  <!-- Trending Section -->
  <div class="trendingSection">
    <div class="trendHeader">
      <h5>Trending</h5>
      <q-btn-toggle
        v-model="selectedTimeWindow"
        :options="timeWindowOptions"
        @click="fetchTrendingDataByTimeWindow"
        style="border: 2px solid rgb(3, 37, 65); width: 200px"
        spread
        no-caps
        rounded
        unelevated
        toggle-color="dark"
        toggle-text-color="green"
      />
    </div>
    <DataList :items="trendingData" />
  </div>

  <!-- Trailer Section -->
  <div
    class="latestTrailerSection"
    :style="{ backgroundImage: trailerCurrentImage }"
  >
    <div class="latestHeader">
      <h5>Latest Trailers</h5>
      <q-btn-toggle
        v-model="selectedTrailerTypes"
        @click="fetchTrailerDataByTypes()"
        :options="trailersTypesOptions"
        style="border: 2px solid #22d0a8; width: 550px"
        spread
        no-caps
        rounded
        unelevated
        toggle-color="teal"
        toggle-text-color="black"
      />
    </div>
    <div class="latestList">
      <q-scroll-area
        style="height: 340px; overflow-x: auto; white-space: nowrap"
      >
        <div class="row no-wrap">
          <div v-for="item in trailerData" :key="item.id" class="trailer-item">
            <div
              class="trailer-container"
              @mouseover="updateBackground(item.poster_path)"
            >
              <q-img
                placeholder-src="../assets/defaultImg.svg"
                :src="
                  'https://image.tmdb.org/t/p/original' +
                  (item.poster_path ? item.poster_path : item.backdrop_path)
                "
                style="height: 200px; border-radius: 8px"
                fit="cover"
              >
                <div class="play-button">
                  <q-icon
                    name="play_circle"
                    size="60px"
                    color="white"
                    @click="invokeYoutubeReact(item)"
                  />
                </div>
              </q-img>
              <OptionsButton :item="item" :ViewListOptions="false" />
              <div class="trailerContent">
                <label
                  class="trailerTitle clickable-label"
                  @click="handleLabelClick(item)"
                >
                  {{ item.name ? item.name : item.title }}</label
                >

                <div>
                  <label> {{ truncateText(item.overview, 20) }} </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </div>
    <q-dialog v-model="showVideoModel">
      <div class="video-model">
        <q-video
          v-if="selectedVideoUrl"
          style="height: 400px; width: 500px"
          :src="selectedVideoUrl"
        />
      </div>
    </q-dialog>
  </div>

  <!-- Popular Section -->
  <div class="popularSection">
    <div class="popularHeader">
      <h5>What's Popular</h5>
      <q-btn-toggle
        v-model="selectedPopularTypes"
        @click="fetchPopularDataByTypes"
        :options="popularTypesOptions"
        style="border: 2px solid #032541; width: 450px"
        spread
        no-caps
        rounded
        unelevated
        toggle-color="dark"
        toggle-text-color="green"
      />
    </div>
    <DataList :items="popularData" />
  </div>

  <!-- Free Section -->
  <div class="freeSection">
    <div class="freeHeader">
      <h5>Free to watch</h5>
      <q-btn-toggle
        v-model="selectedFreeTypes"
        @click="fetchFreeDataByTypes"
        :options="freeTypesOptions"
        style="border: 2px solid #032541; width: 200px"
        spread
        no-caps
        rounded
        unelevated
        toggle-color="dark"
        toggle-text-color="green"
      />
    </div>
    <DataList :items="freeData" />
  </div>

  <!-- Join Section -->
  <div v-if="!userlogin" class="joinSection">
    <h4>Join Today</h4>
    <div class="columns">
      <div class="column left-side">
        <p>
          Get access to maintain your own
          <span class="highlight">
            custom personal lists, track what you've seen
          </span>
          and search and filter for
          <span class="highlight"> what to watch next </span>
          —regardless if it's in theatres, on TV or available on popular
          streaming services like Hotstar, Netflix, iflix, Viu, and GuideDoc.
        </p>
        <q-btn
          style="
            color: white;
            background-color: rgb(128 91 231);
            height: auto;
            width: fit-content;
            font-weight: bold;
            font-size: medium;
          "
          no-caps
          @click="SignUp"
        >
          Sign Up</q-btn
        >
      </div>
      <div class="column right-side">
        <li>Enjoy TMDB ad free</li>
        <li>Maintain a personal watchlist</li>
        <li>
          Filter by your subscribed streaming services and find something to
          watch
        </li>
        <li>Log the movies and TV shows you've seen</li>
        <li>Build custom lists</li>
        <li>Contribute to and improve our database</li>
      </div>
    </div>
  </div>

  <!-- Leaderboard Section -->
  <div>
    <LeaderBoard />
  </div>
  <cookie-consent v-if="showCookieConsent" />
</template>
  
  <script>
import { mapGetters, mapActions } from "vuex";
import LeaderBoard from "/src/components/LeaderBoard.vue";
import DataList from "/src/components/DataList.vue";
import OptionsButton from "./OptionsButton.vue";
import CookieConsent from "./CookieConsent.vue";

export default {
  components: {
    LeaderBoard,
    DataList,
    OptionsButton,
    CookieConsent,
  },
  data() {
    return {
      searchtext: "",
      showCookieConsent: true,
      selectedTimeWindow: "day",
      timeWindowOptions: [
        { label: "Today", value: "day" },
        { label: "This Week", value: "week" },
      ],
      selectedTrailerTypes: "popularity.desc",
      trailersTypesOptions: [
        { label: "Popular", value: "popularity.desc" },
        { label: "Streaming", value: "revenue.desc" },
        { label: "On TV", value: "vote_average.desc" },
        { label: "For Rent", value: "vote_count.desc" },
        { label: "In Theaters", value: "primary_release_date.desc" },
      ],
      selectedPopularTypes: "streaming",
      popularTypesOptions: [
        { label: "Streaming", value: "streaming" },
        { label: "On TV", value: "tv" },
        { label: "For Rent", value: "rent" },
        { label: "In Theaters", value: "movie" },
      ],
      selectedFreeTypes: "movie",
      freeTypesOptions: [
        { label: "Movies", value: "movie" },
        { label: "TV", value: "tv" },
      ],
      trailerCurrentImage: null,
      showVideoModel: false,
      selectedVideoUrl: "",
    };
  },
  computed: {
    ...mapGetters("welcome", ["getwelcomeBgImgURL"]),
    ...mapGetters("trending", ["getTrendingData"]),
    ...mapGetters("trailer", ["getTrailerData"]),
    ...mapGetters("popular", ["getPopularData"]),
    ...mapGetters("freetowatch", ["getFreeData"]),
    ...mapGetters("userdata", [
      "getUserLogin",
      "getUsername",
      "getUserLogout",
      "getAccessToken",
      "getSessionID",
    ]),
    trendingData() {
      return this.getTrendingData;
    },
    trailerData() {
      return this.getTrailerData;
    },
    popularData() {
      return this.getPopularData;
    },
    freeData() {
      return this.getFreeData;
    },
    userlogin() {
      return this.getUserLogin;
    },
    checklogout() {
      return this.getUserLogout;
    },
  },
  methods: {
    ...mapActions("welcome", ["fetchWelcomeBgImgURL"]),
    ...mapActions("trending", ["fetchTrendingData"]),
    ...mapActions("trailer", ["fetchTrailerData"]),
    ...mapActions("popular", ["fetchPopularData"]),
    ...mapActions("freetowatch", ["fetchFreeData"]),
    handleSearch() {
      this.$router.replace({
        path: `/SearchResults`,
        query: {
          result: this.searchtext,
          mediaType: "movie",
          defaultpage: 1,
        },
      });
    },
    fetchTrendingDataByTimeWindow() {
      this.fetchTrendingData(this.selectedTimeWindow);
    },
    fetchTrailerDataByTypes() {
      this.fetchTrailerData(this.selectedTrailerTypes);
    },
    navigateToSelectedItem(item) {
      let currentMediaType = item.media_type;
      if (item.title) {
        currentMediaType = "movie";
      } else if (item.title) {
        currentMediaType = "tv";
      }
      this.$router.replace({
        path: "/ItemDetails",
        query: {
          item_id: item.id,
          media_type: currentMediaType,
        },
      });
    },
    handleLabelClick(item) {
      this.navigateToSelectedItem(item);
    },
    invokeYoutubeReact(movie) {
      if (movie.videos.length > 0) {
        const keywords = ["Official", "Trailer", "Teaser"];
        const youtubeVideo = movie.videos.find(
          (video) =>
            video.site === "YouTube" &&
            keywords.some((keyword) => video.name.includes(keyword))
        );
        if (youtubeVideo !== null) {
          this.selectedVideoUrl = `https://www.youtube.com/embed/${youtubeVideo.key}`;
          this.showVideoModel = true;
        }
      } else {
        alert("No YouTube videos found for this movie.");
      }
    },
    fetchPopularDataByTypes() {
      this.fetchPopularData(this.selectedPopularTypes);
    },
    fetchFreeDataByTypes() {
      this.fetchFreeData(this.selectedFreeTypes);
    },
    truncateText(text, maxLength) {
      if (text && text.split(" ").length > maxLength) {
        return text.split(" ").slice(0, maxLength).join(" ") + " . . .";
      }
      return text;
    },
    updateBackground(imagePath) {
      this.trailerCurrentImage = `url(https://image.tmdb.org/t/p/original/${imagePath})`;
    },

    SignUp() {
      window.location.href = "https://www.themoviedb.org/signup";
    },
  },
  async created() {
    await this.fetchWelcomeBgImgURL();
    await this.fetchTrendingData(this.selectedTimeWindow);
    await this.fetchTrailerData(this.selectedTrailerTypes);
    await this.fetchPopularData(this.selectedPopularTypes);
    await this.fetchFreeData(this.selectedFreeTypes);
  },
  mounted() {
    if (localStorage.getItem("cookiesAccepted") === "true") {
      this.showCookieConsent = false;
    }
  },
};
</script>
  
<style scoped>
/* Logout Section */
.logoutBackground {
  font-size: 24px;
  padding-top: 5%;
  background-color: #01b4e4;
  align-content: center;
  text-align: center;
  color: white;
}

/* Welcome Section */
.welcomeSection {
  height: 450px;
  justify-content: space-between;
  background-size: cover;
  background-position: center;
  background-color: #03485b;
  background-blend-mode: overlay;
  background-repeat: no-repeat;
}

.welcomeSection h3 {
  color: white;
  font-weight: bold;
}

.welcomeSection h4 {
  color: white;
  font-weight: bold;
}

.welcomeContent {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 10% 5% 3% 5%;
}

.welcomeContent h3,
.welcomeContent h4 {
  margin: 0 auto;
  line-height: 1.2;
  width: 100%;
  text-align: left;
}

.search-bar-container {
  max-width: auto;
  margin: 10 auto 10px;
  color: white;
  padding: 0% 5% 3% 5%;
}

.search-button {
  text-transform: none;
  width: 8em;
  height: 4em;
  background: linear-gradient(45deg, #90cea1, #01b4e4, #0d253f);
  color: white;
  margin-right: -13px;
  font-weight: bold;
}

/* Trending Section */
.trendingSection {
  height: 450px;
  padding-left: 2%;
  background-image: url("../assets/trendingBackground.svg");
  background-size: contain;
  background-position: bottom;
  background-repeat: no-repeat;
}

.trendingSection h5 {
  font-weight: bold;
}

.trendHeader {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Latest Trailer Section */

.latestTrailerSection {
  height: 450px;
  padding-left: 2%;
  justify-content: space-between;
  background-size: fill;
  background-position: center;
  background-blend-mode: darken;
  background-color: #454749;
  background-repeat: no-repeat;
  transition: background-image 0.5 ease;
}

.latestTrailerSection h5 {
  font-weight: bold;
}

.latestHeader {
  display: flex;
  align-items: center;
  gap: 20px;
  color: white;
}

.latestList {
  justify-content: center;
  align-items: center;
}

.trailer-container {
  width: 300px;
  position: relative;
}

.trailerContent {
  text-align: center;
  color: white;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  display: block;
}

.trailerTitle {
  font-weight: bold;
  font-size: larger;
  color: white;
}

.trailer-item {
  margin-right: 20px;
}

.play-button {
  position: absolute;
  cursor: pointer;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0);
}

.clickable-label {
  cursor: pointer;
  color: white;
}

.clickable-label:hover {
  color: #04b4e4;
}

.video-model {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 200vh;
}

/* Popular Section */

.popularSection {
  height: 450px;
  padding-left: 2%;
}

.popularSection h5 {
  font-weight: bold;
}

.popularHeader {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Free Section */
.freeSection {
  height: 450px;
  padding-left: 2%;
  margin-bottom: 2%;
}

.freeSection h5 {
  font-weight: bold;
}

.freeHeader {
  display: flex;
  align-items: center;
  gap: 20px;
}

/* Join Section */
.joinSection {
  height: auto;
  padding-left: 2%;
  padding-bottom: 2%;
  background-image: url("../assets/signUpBg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.joinSection h4 {
  color: white;
  padding-top: 30px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 30px;
}

.columns {
  display: flex;
  width: 100%;
  gap: 100px;
}

.column {
  color: white;
  flex: 1;
  box-sizing: border-box;
}

.left-side {
  font-size: large;
}

.right-side {
  color: rgb(187, 181, 181);
  font-size: medium;
}

.highlight {
  color: grey;
  font-style: italic;
}
</style>
