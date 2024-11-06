<template>
  <div class="row userDetails">
    <div class="column">
      <q-img src="../assets/profileImg7.jpg" class="userprofileImg" />
    </div>
    <div>
      <div class="row">
        <p class="username">{{ this.getUsername }}</p>
        <p class="userdate">Member since October 2024</p>
      </div>
      <div class="row score-info">
        <div class="scoreSection">
          <div class="movieAverage">
            <q-knob
              :min="0"
              :max="10"
              :model-value="normalizedRateAverage(averageMovieScore)"
              show-value
              size="80px"
              :thickness="0.2"
              :color="knobColor(averageMovieScore)"
              center-color="black"
              track-color="grey"
              class="text-white"
              :readonly="true"
            >
              <div style="font-size: 25px; font-weight: bold">
                {{
                  (normalizedRateAverage(averageMovieScore) * 10).toFixed(0)
                }}%
              </div>
            </q-knob>
            <span>Average Movie Score</span>
          </div>
          <q-separator vertical />
          <div class="movieAverage">
            <q-knob
              :min="0"
              :max="10"
              :model-value="normalizedRateAverage(averageTVScore)"
              show-value
              size="80px"
              :thickness="0.2"
              :color="knobColor(averageTVScore)"
              center-color="black"
              track-color="grey"
              class="text-white"
              :readonly="true"
            >
              <div style="font-size: 25px; font-weight: bold">
                {{ (normalizedRateAverage(averageTVScore) * 10).toFixed(0) }}%
              </div>
            </q-knob>
            <span>Average TV Score</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Drop Down Bar Section -->
  <div class="topDropDownWrapper">
    <q-btn-dropdown
      class="dropDownBtn"
      label="Overview"
      no-caps
      flat
      :class="{ active: activeButton === 'Overview' }"
      @click="activeButton = 'Overview'"
    >
      <q-list class="dropDownItemSection">
        <q-item clickable v-close-popup>
          <q-item-label>Main</q-item-label>
        </q-item>
        <q-btn-dropdown
          label="Favorites"
          no-caps
          flat
          menu-anchor="top right"
          menu-self="top left"
          align="left"
          class="discussionNested"
        >
          <q-item
            clickable
            v-close-popup
            class="itemSection"
            @click="NavigationContent('FavM')"
          >
            <q-item-label>Movies</q-item-label>
          </q-item>
          <q-item
            clickable
            v-close-popup
            class="itemSection"
            @click="NavigationContent('FavT')"
          >
            <q-item-label>TV Shows</q-item-label>
          </q-item>
        </q-btn-dropdown>
        <q-item-section>
          <q-btn-dropdown
            label="Recommendations"
            no-caps
            flat
            menu-anchor="top right"
            menu-self="top left"
            align="left"
            class="discussionNested"
          >
            <q-item
              clickable
              v-close-popup
              class="itemSection"
              @click="NavigationContent('RecM')"
            >
              <q-item-label>Movies</q-item-label>
            </q-item>
            <q-item
              clickable
              v-close-popup
              class="itemSection"
              @click="NavigationContent('RecT')"
            >
              <q-item-label>TV Shows</q-item-label>
            </q-item>
          </q-btn-dropdown>
          <q-item clickable v-close-popup>
            <q-item-label>Edit Profile</q-item-label>
          </q-item>
        </q-item-section>
      </q-list>
    </q-btn-dropdown>

    <q-btn
      class="dropDownBtn"
      label="Duscussions"
      no-caps
      flat
      :class="{ active: activeButton === 'Discussions' }"
      @click="activeButton = 'Discussions'"
    ></q-btn>

    <q-btn
      class="dropDownBtn"
      label="Lists"
      no-caps
      flat
      @click="handleListClick"
      :class="{ active: activeButton === 'Lists' }"
    ></q-btn>

    <q-btn-dropdown
      class="dropDownBtn"
      label="Ratings"
      no-caps
      flat
      :class="{ active: activeButton === 'Rating' }"
      @click="activeButton = 'Rating'"
    >
      <q-list class="dropDownItemSection">
        <q-item clickable v-close-popup @click="NavigationContent('RateM')">
          <q-item-label>Movies</q-item-label>
        </q-item>
        <q-item clickable v-close-popup @click="NavigationContent('RateT')">
          <q-item-label>TV Shows</q-item-label>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-btn-dropdown
      class="dropDownBtn"
      label="Watchlist"
      no-caps
      flat
      :class="{ active: activeButton === 'Watchlist' }"
      @click="activeButton = 'Watchlist'"
    >
      <q-list class="dropDownItemSection">
        <q-item clickable v-close-popup @click="NavigationContent('WatchM')">
          <q-item-label>Movies</q-item-label>
        </q-item>
        <q-item clickable v-close-popup @click="NavigationContent('WatchT')">
          <q-item-label>TV Shows</q-item-label>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
  <!-- User Content -->
  <div class="UserContents">
    <div v-if="ListIsClick">
      <MyList />
    </div>
    <div v-else-if="OtherIsClick">
      <DataList3 :mediaType="mediaSelect" :targetType="targetSelect" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MyList from "./MyList.vue";
import DataList3 from "./DataList3.vue";

export default {
  components: {
    MyList,
    DataList3,
  },
  data() {
    return {
      movieRatingData: [],
      tvRatingData: [],
      averageMovieScore: 0,
      averageTVScore: 0,
      mediaSelect: "movies",
      targetSelect: "",
      ListIsClick: false,
      OtherIsClick: false,
      activeButton: "Lists",
    };
  },
  methods: {
    ...mapActions("getRating", ["fetchRatingData"]),
    normalizedRateAverage(item) {
      const parsedItem = parseFloat(item);
      return parsedItem !== null && !isNaN(parsedItem) ? parsedItem : 0;
    },
    knobColor(item) {
      const value = this.normalizedRateAverage(item);
      if (value >= 7) {
        return "teal";
      } else if (value >= 4) {
        return "yellow";
      } else {
        return "red";
      }
    },
    calculateAverageScore(itemtarget) {
      const allRating = itemtarget.map((item) => item.rating);
      const totalSum = allRating.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const averageScore = totalSum / allRating.length;
      const roundedAverage = averageScore.toFixed(1);
      return roundedAverage;
    },
    handleListClick() {
      this.activeButton = "Lists";
      this.NavigationContent("Lists");
    },
    NavigationContent(TargetClick) {
      this.ListIsClick = false;
      this.OtherIsClick = false;
      switch (TargetClick) {
        case "Lists": {
          this.ListIsClick = true;
          break;
        }
        case "RateM": {
          this.OtherIsClick = true;
          this.mediaSelect = "movies";
          this.targetSelect = "rate";
          break;
        }
        case "RateT": {
          this.OtherIsClick = true;
          this.mediaSelect = "tv";
          this.targetSelect = "rate";
          break;
        }
        case "WatchM": {
          this.OtherIsClick = true;
          this.mediaSelect = "movies";
          this.targetSelect = "watch";
          break;
        }
        case "WatchT": {
          this.OtherIsClick = true;
          this.mediaSelect = "tv";
          this.targetSelect = "watch";
          break;
        }
        case "FavM": {
          this.OtherIsClick = true;
          this.mediaSelect = "movies";
          this.targetSelect = "fav";
          break;
        }
        case "FavT": {
          this.OtherIsClick = true;
          this.mediaSelect = "tv";
          this.targetSelect = "fav";
          break;
        }
        case "RecM": {
          this.OtherIsClick = true;
          this.mediaSelect = "movies";
          this.targetSelect = "rec";
          break;
        }
        case "RecT": {
          this.OtherIsClick = true;
          this.mediaSelect = "tv";
          this.targetSelect = "rec";
          break;
        }
      }
    },
  },
  computed: {
    ...mapGetters("getRating", ["getRatingData"]),
    ...mapGetters("userdata", [
      "getUserLogin",
      "getUsername",
      "getUserLogout",
      "getSessionID",
      "getAccessToken",
      "getAccountID",
    ]),
  },
  beforeRouteUpdate(to, from, next) {
    this.NavigationContent(to.query.targetMenu);
    next();
  },
  async created() {
    await this.fetchRatingData({
      accesstoken: this.getAccessToken,
      mediaType: "movies",
      AccountID: this.getAccountID,
    });
    this.movieRatingData = this.getRatingData;
    this.averageMovieScore = await this.calculateAverageScore(
      this.movieRatingData
    );
    await this.fetchRatingData({
      accesstoken: this.getAccessToken,
      mediaType: "tv",
      AccountID: this.getAccountID,
    });
    this.tvRatingData = this.getRatingData;
    this.averageTVScore = await this.calculateAverageScore(this.tvRatingData);
    await this.NavigationContent(this.$route.query.targetMenu);
  },
};
</script>

<style scoped>
.userDetails {
  display: flex;
  height: 250px;
  background-size: fill;
  background-position: center;
  background-image: linear-gradient(to right, #3b3b83, #242c5c, #082444),
    url("../assets/userpageBG.svg");
  background-blend-mode: overlay;
  align-content: center;
  margin-top: 2%;
  padding: 5%;
  gap: 50px;
}

.userprofileImg {
  height: 150px;
  width: 150px;
  border-radius: 50%;
}

.username {
  font-size: 35px;
  color: white;
  font-weight: bold;
}

.userdate {
  padding-left: 8px;
  padding-top: 16px;
  font-size: 20px;
  color: grey;
}

.score-info {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.scoreSection {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

.movieAverage {
  display: flex;
  gap: 10px;
  align-items: center;
}

.movieAverage span {
  margin-left: 1%;
  font-size: large;
  width: 100px;
}

.q-separator {
  margin: 0 10px;
  background: white;
}

/* Drop Down Bar Section */
.topDropDownWrapper {
  display: flex;
  height: 50px;
  justify-content: center;
  gap: 20px;
}

.dropDownBtn {
  font-size: medium;
  font-weight: normal;
  overflow: hidden;
  width: auto;
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

.UserContents {
  border-top: 1px solid rgb(216, 211, 211);
  padding: 2%;
}

.active {
  border-bottom: 4px solid #9884f4; /* Example styling */
  font-weight: bold;
}
</style>