<template>
  <q-header reveal class="sticky-header">
    <q-tool-bar class="toolbar-flex">
      <router-link to="/">
        <img src="../assets/tmdb_logo.svg" alt="TMDB Logo" class="logo" />
      </router-link>
      <!-- Movies Btn -->
      <q-btn
        class="custom-label"
        label="Movies"
        no-caps
        flat
        @mouseover="handleNavigationButton('movie')"
      >
        <q-menu v-model="showMoviesMenu" @mouseleave="showMoviesMenu = false">
          <q-list class="menu-size">
            <q-item clickable v-close-popup>
              <q-item-section
                @mousedown.prevent="handleNavigation('movie', 'popular')"
              >
                Popular
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                @mousedown.prevent="handleNavigation('movie', 'now_playing')"
              >
                Now Playing
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                @mousedown.prevent="handleNavigation('movie', 'upcoming')"
              >
                Upcoming
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                @mousedown.prevent="handleNavigation('movie', 'top_rated')"
              >
                Top Rated
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <!-- TV Shows Btn -->
      <q-btn
        class="custom-label"
        label="TV Shows"
        no-caps
        flat
        @mouseover="handleNavigationButton('tv')"
      >
        <q-menu v-model="showTvShowsMenu" @mouseleave="showTvShowsMenu = false">
          <q-list class="menu-size">
            <q-item clickable v-close-popup>
              <q-item-section
                @mousedown.prevent="handleNavigation('tv', 'popular')"
              >
                Popular
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                @mousedown.prevent="handleNavigation('tv', 'airing_today')"
              >
                Airing Today
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                @mousedown.prevent="handleNavigation('tv', 'on_the_air')"
              >
                On TV
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section
                @mousedown.prevent="handleNavigation('tv', 'top_rated')"
              >
                Top Rated
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <!-- People Btn -->
      <q-btn
        class="custom-label"
        label="People"
        no-caps
        flat
        @mouseover="handleNavigationButton('people')"
      >
        <q-menu v-model="showPeopleMenu" @mouseleave="showPeopleMenu = false">
          <q-list class="menu-size">
            <q-item clickable v-close-popup>
              <q-item-section
                @mousedown.prevent="handleNavigation('person', 'popular')"
              >
                Popular People
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <!-- More Btn -->
      <q-btn
        class="custom-label"
        label="More"
        no-caps
        flat
        @mouseover="handleNavigationButton('more')"
      >
        <q-menu v-model="showMoreMenu" @mouseleave="showMoreMenu = false">
          <q-list class="menu-size">
            <q-item clickable v-close-popup>
              <q-item-section> Discussions </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section> Leaderboard </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section> Support </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section @mousedown.prevent="openAPIDocumentation">
                API
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-space />
      <!-- Right Side Container -->
      <div class="icon-container">
        <q-btn icon="add" flat>
          <q-menu>
            <q-list class="menu-size compact-menu">
              <div v-if="!userlogin">
                <q-item clickable v-close-popup>
                  <q-item-section class="information-text">
                    Can't find a movie or TV show?<br />Login to create it.
                  </q-item-section>
                </q-item>
              </div>
              <div v-else class="add-icon-menu">
                <q-item clickable v-close-popup>
                  <q-item-section class> Add New Movie </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section> Add New TV Show </q-item-section>
                </q-item>
              </div>
            </q-list>
          </q-menu>
        </q-btn>

        <q-btn icon="language" flat></q-btn>

        <div v-if="userlogin" class="userprofilenoti">
          <q-btn icon="notifications" flat>
            <q-menu>
              <q-item class="column notificlass">
                <p class="notificationReceive">Unread Notification 0</p>
                <p class="notificationContent">
                  Good job! Looks like you're all caught up.
                  <a href="" class="link">View All</a>
                </p>
              </q-item>
            </q-menu>
          </q-btn>
          <q-btn icon="person" flat>
            <q-menu style="overflow: hidden">
              <q-list class="menu-size compact-menu">
                <q-item clickable class="column">
                  <p class="username">{{ username }}</p>
                  <p class="view-profile">View Profile</p>
                </q-item>
                <q-separator />
                <div class="profile-icon-menu">
                  <q-item clickable>Discussions</q-item>
                  <q-item clickable @click="NavigationProfile(`Lists`)"
                    >Lists</q-item
                  >
                  <q-item clickable @click="NavigationProfile(`RateM`)"
                    >Ratings</q-item
                  >
                  <q-item clickable @click="NavigationProfile(`WatchM`)"
                    >Watchlist</q-item
                  >
                  <q-separator />
                  <q-item clickable>Edit Profile</q-item>
                  <q-item clickable>Settings</q-item>
                  <q-separator />
                  <q-item clickable @click="logout">Logout</q-item>
                </div>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div v-else>
          <q-btn
            class="customer-label"
            label="Login"
            no-caps
            flat
            @click="Login"
          />
          <q-btn
            class="customer-label"
            label="Join TMDB"
            no-caps
            flat
            @click="SignUp"
          />
        </div>
        <q-btn
          :icon="searchIcon"
          dense
          class="custom-search-icon"
          style="font-size: medium"
          flat
          @click="toggleSearchBar"
        >
        </q-btn>
      </div>
    </q-tool-bar>

    <!-- Search bar section -->
    <div v-if="showSearchBar" class="search-bar-container">
      <q-input
        v-model="targetSearch"
        placeholder="Search for a movie, tv show, person..."
        dense
        class="search-bar"
        style="background-color: white"
        @update:model-value="onTextChange"
        @focus="isInputFocus = true"
        @blur="isInputFocus = false"
        @keydown.enter="this.handleEnter"
        autofocus
        before
        after
      >
        <template v-slot:before>
          <q-icon name="search" />
        </template>
        <template v-slot:after>
          <q-icon
            style="cursor: pointer"
            name="close"
            @click="clearSearchBar"
          />
        </template>
      </q-input>
    </div>
    <!-- Search bar's content -->
    <div v-if="isInputFocus && showSearchBar && targetSearch.trim() === ''">
      <div class="trending-column">
        <q-icon name="trending_up" class="recomend-icon" />
        <span>Trending</span>
      </div>
      <div
        v-for="result in trendingData.slice(0, 10)"
        :key="result.id"
        class="search-result-container"
      >
        <div
          class="search-result-item"
          @mousedown.prevent="
            handleResultClick(
              result.name ? result.name : result.title,
              result.media_type
            )
          "
        >
          <q-icon
            :name="getResultIcon(result.media_type)"
            class="result-icon"
          />
          <span>
            {{ result.name ? result.name : result.title }}
            <span
              v-if="
                ((result.original_name || result.original_title) &&
                  result.original_name !== result.name) ||
                result.original_title !== result.title
              "
              >({{
                result.original_name
                  ? result.original_name
                  : result.original_title
              }})</span
            >
          </span>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-if="isInputFocus && showSearchBar && searchData.length > 0"
        class="search-results"
      >
        <div
          v-for="result in searchData"
          :key="result.id"
          class="search-result-container"
        >
          <div
            class="search-result-item"
            @mousedown.prevent="
              handleResultClick(
                result.name ? result.name : result.title,
                result.media_type
              )
            "
          >
            <q-icon
              :name="getResultIcon(result.media_type)"
              class="result-icon"
            />
            <span>
              {{ result.name ? result.name : result.title }}
              <span
                v-if="
                  ((result.original_name || result.original_title) &&
                    result.original_name !== result.name) ||
                  result.original_title !== result.title
                "
                >({{
                  result.original_name
                    ? result.original_name
                    : result.original_title
                }})</span
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </q-header>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HeaderTMDB",
  data() {
    return {
      showMoviesMenu: false,
      showTvShowsMenu: false,
      showPeopleMenu: false,
      showMoreMenu: false,
      showSearchBar: false,
      targetSearch: "",
      isInputFocus: false,
    };
  },
  methods: {
    openAPIDocumentation() {
      window.open(
        "https://developer.themoviedb.org/docs/getting-started",
        "blank_"
      );
      this.$emit("close-popup");
    },
    ...mapActions("userdata", [
      "setUserLogin",
      "setUsername",
      "clearSession",
      "setUserLogout",
    ]),
    ...mapActions("searchMulti", ["fetchSearchData"]),
    ...mapActions("trending", ["fetchTrendingData"]),
    ...mapActions("logout", ["deleteAccTkn"]),
    onTextChange(targetSearch) {
      this.fetchSearchData(targetSearch);
    },
    handleResultClick(result, mediaType) {
      this.fetchSearchData(result);
      this.targetSearch = result;
      this.showSearchBar = !this.showSearchBar;
      this.$router.replace({
        path: `/SearchResults`,
        query: {
          result: result,
          mediaType: mediaType,
          defaultpage: 1,
        },
      });
    },
    getResultIcon(type) {
      switch (type) {
        case "movie":
          return "movie";
        case "tv":
          return "tv";
        case "person":
          return "person";
        default:
          return "search";
      }
    },
    handleNavigationButton(targetMenu) {
      this.showMoviesMenu = false;
      this.showTvShowsMenu = false;
      this.showPeopleMenu = false;
      this.showMoreMenu = false;
      if (targetMenu === "movie") {
        this.showMoviesMenu = true;
      } else if (targetMenu === "tv") {
        this.showTvShowsMenu = true;
      } else if (targetMenu === "people") {
        this.showPeopleMenu = true;
      } else if (targetMenu === "more") {
        this.showMoreMenu = true;
      }
    },
    handleNavigation(mediaType, showsStatus) {
      if (mediaType === "person") {
        this.$router.replace({
          path: `/PopularPeople`,
          query: {
            mediaType: mediaType,
            showsStatus: showsStatus,
          },
        });
      } else {
        this.$router.replace({
          path: `/FiltersPage`,
          query: {
            mediaType: mediaType,
            showsStatus: showsStatus,
          },
        });
      }
    },
    NavigationProfile(targetClick) {
      this.$router.replace({
        path: `/UserPage`,
        query: {
          targetMenu: targetClick,
        },
      });
    },
    toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },
    clearSearchBar() {
      this.targetSearch = "";
    },

    Login() {
      this.$router.replace({
        path: `/LoginPage`,
      });
    },
    SignUp() {
      window.location.href = "https://www.themoviedb.org/signup";
    },
    logout() {
      this.deleteAccTkn(this.getAccessToken);
      this.clearSession();
      this.setUserLogout(true);
      this.$router.replace({
        path: `/`,
        query: {
          logoutcheck: true,
        },
      });
    },
    handleEnter() {
      if (this.trendingData.length > 0 && this.targetSearch.trim() === "") {
        const firstResult = this.trendingData[0];
        this.handleResultClick(
          firstResult.name ? firstResult.name : firstResult.title,
          firstResult.media_type
        );
      } else if (
        this.targetSearch.trim() !== "" &&
        this.searchData.length > 0
      ) {
        const firstResult = this.searchData[0];
        if (this.targetSearch.includes("y:")) {
          this.handleResultClick(this.targetSearch, firstResult.media_type);
        } else {
          this.handleResultClick(
            firstResult.name ? firstResult.name : firstResult.title,
            firstResult.media_type
          );
        }
      }
    },
  },
  computed: {
    ...mapGetters("userdata", [
      "getUserLogin",
      "getUsername",
      "getAccessToken",
    ]),
    ...mapGetters("searchMulti", ["getSearchData"]),
    ...mapGetters("trending", ["getTrendingData"]),
    searchData() {
      return this.getSearchData;
    },
    searchIcon() {
      return this.showSearchBar ? "close" : "search";
    },
    trendingData() {
      return this.getTrendingData;
    },
    userlogin() {
      return this.getUserLogin;
    },
    username() {
      return this.getUsername;
    },
  },
  async created() {
    await this.fetchTrendingData("day");
    this.setUserLogout(false);
  },
};
</script>

<style scoped>
.toolbar-flex {
  display: flex;
  width: 100%;
}

.q-header {
  background-color: #032541;
  height: auto;
}

.logo {
  margin-top: 6%;
  height: 20px;
  width: 154px;
  padding-left: 28px;
  padding-right: 10px;
}

/* Custom labels & Menu size */
.custom-label {
  text-transform: none;
  font-weight: bold;
  font-size: 15px;
}

.menu-size {
  min-width: 120px;
  font-size: 15px;
}

/* Right side container */
.icon-container {
  display: flex;
  gap: 10px;
  padding-right: 15px;
}

.information-text {
  font-size: medium;
  margin-inline: 5px;
  margin-block: 5px;
}

.add-icon-menu {
  font-size: medium;
  margin-block: 5px;
}

.add-icon-menu .q-item:hover {
  background-color: #032541;
  color: white;
}

.notificlass {
  max-width: 300px;
  padding-bottom: 0%;
}

.notificationReceive {
  font-weight: bold;
  font-size: 20px;
  color: black;
}

.notificationContent {
  font-size: 14px;
}

.profile-icon-menu {
  font-size: medium;
  margin-block: 5px;
}

.profile-icon-menu .q-item:hover {
  background-color: #032541;
  color: #fff;
}

.link {
  color: grey;
  text-decoration: underline;
}

.custom-search-icon {
  color: #01b4e4;
}

.compact-menu .q-item {
  padding-top: 5%;
  padding-bottom: 5%;
  font-size: small;
  min-height: 32px;
  color: rgb(80, 78, 78);
}

/* Profile icon */
.username {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 0px;
  color: black;
}

.view-profile {
  font-size: 12px;
  margin-bottom: 0px;
}

/* Search icon */
.search-bar-container {
  display: flex;
  align-items: center;
  background-color: white;
  padding-left: 2%;
  padding-right: 2%;
}

.search-bar {
  font-size: medium;
  width: 100%;
  font-style: italic;
  color: grey;
}

.trending-column {
  padding-left: 2%;
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  background-color: #f0f0f0;
  color: black;
}

.recommend-icon {
  margin-right: 15px;
  font-weight: bold;
  font-size: 1.2em;
}

.search-result-container {
  display: flex;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  background-color: white;
  color: black;
  margin-bottom: 0px;
  padding-left: 2%;
  padding-right: 2%;
}

.search-result-item {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: medium;
  border-bottom: 1px solid #ccc;
}

.result-icon {
  margin-right: 15px;
}

.search-results {
  margin-top: 0px;
}
</style>