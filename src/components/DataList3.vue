<template>
  <div v-if="targetType == 'rate'">
    <line-chart :data="chartData" :options="chartOptions" />
  </div>
  <div class="HeaderOfEachType">
    <div class="row EachItemOnHeader">
      <div class="TitleType">
        <label>My {{ DynamicTitle }} </label>
      </div>
      <div v-if="targetType != 'rec'" class="moreSection">
        <q-btn
          icon="more_horiz"
          flat
          rounded
          style="background: #cccccc"
          size="12px"
        >
          <q-menu>
            <q-list class="MoreOpts">
              <q-item clickable v-close-popup>
                <q-item-section>Import List</q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section>Export CSV</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <div class="mediaTabType">
        <q-tabs
          v-model="tabMediaType"
          @update:model-value="FetchDataOnTargetType"
        >
          <q-tab no-caps name="movies" label="Movies">
            <q-badge
              v-if="targetType != 'rec' && tabMediaType == 'movies'"
              color="purple"
              floating
            >
              {{ numberOfResult }}
            </q-badge>
          </q-tab>
          <q-tab no-caps name="tv" label="TV">
            <q-badge
              v-if="targetType != 'rec' && tabMediaType == 'tv'"
              color="purple"
              floating
            >
              {{ numberOfResult }}
            </q-badge>
          </q-tab>
        </q-tabs>
      </div>
      <q-space />
      <div v-if="targetType != 'rec'" class="row FilteringSection">
        <q-select
          class="selectFilter"
          v-model="filterBy"
          :options="filterOptions"
          label="Filter by: "
          dense
          options-dense
          map-options
          @update:model-value="sortByFilter(this.isAscending)"
        />
        <q-btn
          flat
          class="btnOrderAscDesc"
          no-caps
          label="Order: "
          :icon-right="isAscending ? 'arrow_upward' : 'arrow_downward'"
          @click="btnAscDesc"
        />
      </div>
    </div>
  </div>
  <div class="ContentOfEachType">
    <div v-for="item in finalDisplayData" :key="item.id" class="card">
      <div class="item-image">
        <q-img
          placeholder-src="../assets/defaultImg.svg"
          :src="getImagePath(item)"
          style="
            width: 140px;
            height: 220px;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          "
          @click="handleImageClick(item)"
          fit="cover"
        />
      </div>
      <div class="card-content">
        <div class="row firstRowSection">
          <div class="knob-container">
            <q-knob
              :min="0"
              :max="10"
              :model-value="normalizedVoteAverage(item)"
              show-value
              size="40px"
              :thickness="0.2"
              :color="knobColor(item)"
              center-color="black"
              track-color="grey"
              class="text-white"
              :readonly="true"
            >
              <div style="font-size: 14px; font-weight: bold">
                {{ (normalizedVoteAverage(item) * 10).toFixed(0) }}%
              </div>
            </q-knob>
          </div>
          <div class="text-container">
            <label
              class="default-title clickable-label"
              @click="handleLabelClick(item)"
            >
              {{ item.title ? item.title : item.name }}
              <span
                v-if="
                  ((item.original_name || item.original_title) &&
                    item.original_name !== item.name) ||
                  item.original_title !== item.title
                "
                class="original-title"
              >
                ({{
                  item.original_name ? item.original_name : item.original_title
                }})
              </span>
            </label>
            <label class="itemDate">
              {{
                formatDate(
                  item.release_date ? item.release_date : item.first_air_date
                )
              }}
            </label>
          </div>
        </div>
        <div class="itemOverview">
          <p>
            {{
              item.overview
                ? item.overview
                : "We don't have an overview translated in English. Help us expand our database by adding one."
            }}
          </p>
        </div>
        <div class="row btnRowSection">
          <q-btn
            no-caps
            flat
            dense
            :label="getButtonLabel(item.rated)"
            icon="star"
            :class="{
              'got-rating': item.rated,
              'not-rating': !item.rated,
            }"
            @click="btnRateStar(item)"
          >
            <q-badge
              v-if="item.rated"
              :label="item.rated.value * 10"
              text-color="white"
              class="rating-badge"
            />
            <q-menu>
              <div class="rateStar">
                <q-rating
                  v-model="rateStar"
                  min="0"
                  max="10"
                  size="2.5em"
                  color="yellow"
                  icon="star_border"
                  icon-selected="star"
                  @update:model-value="updateTargetRating(item)"
                />
                <q-btn
                  flat
                  dense
                  round
                  icon="delete"
                  color="grey-7"
                  @click="clearRating(item)"
                  class="clear-button"
                />
              </div>
            </q-menu>
          </q-btn>
          <q-btn
            no-caps
            flat
            dense
            label="Favorite"
            icon="favorite"
            :class="{
              'favorite-btn': item.favorite,
              'not-favorite-btn': !item.favorite,
            }"
          >
          </q-btn>
          <q-btn-dropdown
            no-caps
            flat
            dense
            label="Add to list"
            icon="list"
            dropdown-icon="none"
          >
            <q-list class="createListMenu">
              <q-btn
                icon="add"
                no-caps
                flat
                class="btnCreateList"
                @click="createNewList"
              >
                Create New List
              </q-btn>
              <q-item-section>
                <q-select
                  v-model="selectedList"
                  :options="filteredListFile"
                  option-value="id"
                  option-label="name"
                  label="Add to one of your lists..."
                  use-input
                  clearable
                  dark
                  filled
                  input-debounce="0"
                  bg-color="#082444"
                  class="btnListoflist"
                  @filter="filterListFile"
                  @update:model-value="HandleAddToList(item)"
                >
                  <template v-slot:option="scope">
                    <q-item v-bind="scope.itemProps">
                      <q-item-section>
                        <q-item-label>
                          {{ scope.opt.name }}
                          {{ itemCounting(scope.opt.number_of_items) }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-select>
              </q-item-section>
            </q-list>
          </q-btn-dropdown>
          <q-btn
            v-if="targetType != 'rec'"
            no-caps
            flat
            dense
            label="Remove"
            icon="close"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="ButtonLoadMore" v-if="targetType == 'rec'">
    <q-btn
      v-if="LoadMorePage"
      ref="loadMoreBtn"
      no-caps
      class="btnLoadMore"
      label="Load More"
      @click="handleLoadMore"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Notify } from "quasar";
import { Line as LineChart } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

export default {
  components: {
    LineChart,
  },
  props: {
    mediaType: {
      type: String,
      required: true,
    },
    targetType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isAscending: false,
      tabMediaType: "movies",
      numberOfResult: "...",
      filterBy: "Popularity",
      finalDisplayData: [],
      itemsPerYearArray: [],
      rateStar: 0,
      selectedList: "",
      filteredListFile: [],
      loadPage: 1,
      LoadMorePage: true,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Ratings By Year",
            backgroundColor: "#9884f4",
            borderColor: "#9884f4",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                size: 14,
              },
              color: "#333",
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.labels || "";
                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y.toFixed(0);
                }
                return label + "Items";
              },
            },
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Year",
            },
          },
          y: {
            title: {
              display: true,
              text: "Count",
            },
            beginAtZero: true,
          },
        },
        animation: {
          duration: 1000,
          easing: "linear",
        },
        elements: {
          line: {
            borderColor: "#9884f4",
            borderWidth: 2,
          },
          point: {
            radius: 5,
            backgroundColor: "9884f4",
          },
        },
      },
    };
  },
  methods: {
    ...mapActions("checkSeenItem", ["fetchSeenItemData"]),
    ...mapActions("getWatchList", ["fetchWatchListData"]),
    ...mapActions("getRating", ["fetchRatingData"]),
    ...mapActions("getFavourite", ["fetchFavouriteData"]),
    ...mapActions("AddRating", ["postMediaRating"]),
    ...mapActions("DeleteRating", ["deleteMediaRating"]),
    ...mapActions("AddItemToList", ["postMediaToList"]),
    ...mapActions("getListFile", ["fetchListFile"]),
    ...mapActions("getRecommendation", ["fetchRecommendation"]),
    navigateToSelectedItem(item) {
      let currentMediaType = "";
      if (item.title) {
        currentMediaType = "movie";
      } else if (item.name) {
        currentMediaType = "tv";
      }
      this.$router.replace({
        path: `/ItemDetails`,
        query: {
          item_id: item.id,
          media_type: currentMediaType,
        },
      });
    },
    handleImageClick(item) {
      this.navigateToSelectedItem(item);
    },
    handleLabelClick(item) {
      this.navigateToSelectedItem(item);
    },
    getImagePath(item) {
      return (
        "https://image.tmdb.org/t/p/original" +
        (item.poster_path ? item.poster_path : item.backdrop_path)
      );
    },
    btnAscDesc() {
      this.isAscending = !this.isAscending;
      this.sortByFilter(this.isAscending);
    },
    sortByFilter(orderAscDesc) {
      if (this.filterBy === "Release Date") {
        this.finalDisplayData = [...this.finalDisplayData].sort((a, b) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);
          return orderAscDesc ? dateA - dateB : dateB - dateA;
        });
      } else if (this.filterBy === "Popularity") {
        this.finalDisplayData = [...this.finalDisplayData].sort((a, b) => {
          const valueA = a.popularity || 0;
          const valueB = b.popularity || 0;
          return orderAscDesc ? valueA - valueB : valueB - valueA;
        });
      } else if (this.filterBy === "My Rating") {
        this.finalDisplayData = [...this.finalDisplayData].sort((a, b) => {
          const valueA = a.rating || 0;
          const valueB = b.rating || 0;
          return orderAscDesc ? valueA - valueB : valueB - valueA;
        });
      }
    },
    normalizedVoteAverage(item) {
      return item.vote_average !== null && !isNaN(item.vote_average)
        ? item.vote_average
        : 0;
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
    formatDate(dateString) {
      if (dateString) {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString("en-US", options);
      } else {
        return "No Specified Date.";
      }
    },
    getButtonLabel(rated) {
      return rated ? "Your rating" : "Rate it!";
    },
    btnRateStar(item) {
      if (item.rated.value === undefined) {
        this.rateStar = 0;
      } else {
        this.rateStar = item.rated.value;
      }
    },
    notifyRating(message) {
      this.notification = Notify.create({
        message,
        position: "top-right",
        timeout: 2000,
        color: "positive",
        closeBtn: true,
      });
    },
    updateTargetRating(item) {
      let currentMediaType = "";
      if (item.title) {
        currentMediaType = "movie";
      } else if (item.name) {
        currentMediaType = "tv";
      }
      this.postMediaRating({
        accesstoken: this.getAccessToken,
        sessionId: this.getSessionID,
        mediaType: currentMediaType,
        mediaId: item.id,
        rateValue: this.rateStar,
      });
      this.notifyRating("Your rating hsa been saved.");
    },
    clearRating(item) {
      let currentMediaType = "";
      if (item.title) {
        currentMediaType = "movie";
      } else if (item.name) {
        currentMediaType = "tv";
      }
      this.deleteMediaRating({
        accesstoken: this.getAccessToken,
        sessionId: this.getSessionID,
        mediaType: currentMediaType,
        mediaId: item.id,
      });
      this.rateStar = 0;
      this.notifyRating("The selected item's rating was successfully deleted.");
    },
    async GetItemStatus(item) {
      let tempMT = this.tabMediaType === "movies" ? "movie" : "tv";
      await this.fetchSeenItemData({
        mediaType: tempMT,
        itemId: item.id,
      });
      const status = this.getSeenItemData;
      return {
        favorite: status.favorite,
        rated: status.rated,
        watchlist: status.watchlist,
      };
    },
    async FetchDataOnTargetType() {
      this.numberOfResult = "...";
      this.itemsPerYearArray = [];
      switch (this.targetType) {
        case "watch":
          await this.fetchWatchListData({
            accesstoken: this.getAccessToken,
            mediaType: this.tabMediaType,
          }).then(() => {
            this.finalDisplayData = this.getWatchListData;
          });
          break;
        case "rate":
          await this.fetchRatingData({
            accesstoken: this.getAccessToken,
            mediaType: this.tabMediaType,
            AccountID: this.getAccountID,
          }).then(() => {
            this.finalDisplayData = this.getRatingData;
          });
          break;
        case "fav":
          await this.fetchFavouriteData({
            accesstoken: this.getAccessToken,
            mediaType: this.tabMediaType,
          }).then(() => {
            this.finalDisplayData = this.getFavouriteData;
          });
          break;
        case "rec":
          await this.fetchRecommendation({
            accesstoken: this.getAccessToken,
            mediaType: this.tabMediaType,
            AccountID: this.getAccountID,
            currentpage: this.loadPage,
          }).then(() => {
            this.finalDisplayData = this.getRecommendItem;
          });
          break;
      }
      const promises = this.finalDisplayData.map(async (item) => {
        const status = await this.GetItemStatus(item);
        return { ...item, ...status };
      });
      this.finalDisplayData = await Promise.all(promises);
      this.numberOfResult = this.finalDisplayData.length;
      if (this.targetType === "rate") {
        this.GenerateGraph(this.finalDisplayData);
      }
    },
    createNewList() {
      this.$router.replace({
        path: `/CreateList`,
      });
    },
    async HandleAddToList(item) {
      if (this.selectedList != null) {
        let currentMediaType = "";
        if (item.title) {
          currentMediaType = "movie";
        } else if (item.name) {
          currentMediaType = "tv";
        }
        await this.postMediaToList({
          accesstoken: this.getAccessToken,
          sessionId: this.getSessionID,
          targetMediaId: item.id,
          targetListId: this.selectedList.id,
          mediaType: currentMediaType,
        })
          .then(() => {
            this.selectedList = "";
            this.notifyRating("Item added");
          })
          .then(() => {
            this.fetchListFile({
              accesstoken: this.getAccessToken,
              AccountID: this.getAccountID,
              loadMorePage: 1,
            });
          })
          .then(() => {
            const LoadAllPage = this.getTPListFile;
            this.fetchListFile({
              accesstoken: this.getAccessToken,
              AccountID: this.getAccountID,
              loadMorePage: LoadAllPage,
            });
          })
          .then(() => {
            return (this.filteredListFile = this.getListFile);
          });
      }
    },
    filterListFile(val, update) {
      if (val === "") {
        update(() => {
          this.filteredListFile = this.getListFile;
        });
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.filteredListFile = this.getListFile.filter((lang) =>
          lang.name.toLowerCase().includes(needle)
        );
      });
    },
    itemCounting(itemCount) {
      if (itemCount > 1) {
        return `(${itemCount} items)`;
      } else {
        return `(${itemCount} item)`;
      }
    },
    observeLoadMoreVisibility() {
      const loadobserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && this.loadPage > 1) {
              this.handleLoadMore();
            }
          });
        },
        {
          root: null,
          threshold: 0,
        }
      );
      this.$nextTick(() => {
        if (this.$refs.loadMoreBtn) {
          loadobserver.observe(this.$refs.loadMoreBtn.$el);
        }
      });
    },
    async handleLoadMore() {
      if (this.loadPage < this.getRecommendItemTP) {
        this.loadPage++;
      } else {
        this.LoadMorePage = false;
      }
      await this.fetchRecommendation({
        accesstoken: this.getAccessToken,
        mediaType: this.tabMediaType,
        AccountID: this.getAccountID,
        currentpage: this.loadPage,
      }).then(() => {
        this.finalDisplayData = this.getRecommendItem;
      });
    },
    GenerateGraph(GraphData) {
      const yearCount = {};
      GraphData.forEach((item) => {
        const date = item.release_date || item.first_air_date;
        if (date) {
          const year = new Date(date).getFullYear();
          yearCount[year] = (yearCount[year] || 0) + 1;
        }
      });
      this.itemPerYearArray = Object.entries(yearCount).map(
        ([year, count]) => ({
          year: parseInt(year, 10),
          count,
        })
      );
      this.chartData.labels = this.itemPerYearArray.map((item) => item.year);
      this.chartData.datasets[0].data = this.itemPerYearArray.map(
        (item) => item.count
      );
    },
  },
  computed: {
    ...mapGetters("checkSeenItem", ["getSeenItemData"]),
    ...mapGetters("getWatchList", ["getWatchListData"]),
    ...mapGetters("getRating", ["getRatingData"]),
    ...mapGetters("getFavourite", ["getFavouriteData"]),
    ...mapGetters("userdata", [
      "getUserLogin",
      "getUsername",
      "getUserLogout",
      "getSessionID",
      "getAccountID",
      "getAccessToken",
    ]),
    ...mapGetters("getListFile", ["getListFile"]),
    ...mapGetters("getListFile", ["getTPListFile"]),
    ...mapGetters("getRecommendation", ["getRecommendItem"]),
    ...mapGetters("getRecommendation", ["getRecommendItemTP"]),
    ListFile() {
      return this.getListFile;
    },
    DynamicTitle() {
      return this.targetType === "watch"
        ? "Watchlist"
        : this.targetType === "rate"
        ? "Rating"
        : this.targetType === "fav"
        ? "Favourites"
        : this.targetType === "rec"
        ? "Recommendations"
        : "Nothing";
    },
    filterOptions() {
      switch (this.targetType) {
        case "fav":
          return ["Popularity", "Release Date", "Date Added"];
        case "watch":
          return ["Popularity", "Release Date", "Date Added", "Upcoming"];
        case "rate":
          return ["Popularity", "Release Date", "Date Added", "My Rating"];
        default:
          return ["Popularity", "Release Date"];
      }
    },
    checkMediaType() {
      return this.mediaType === "movies" || this.mediaType === "tv"
        ? this.mediaType
        : "default";
    },
    checkTargetType() {
      return this.targetType === "rate" ||
        this.targetType === "watch" ||
        this.targetType === "fav"
        ? this.targetType
        : "default";
    },
  },
  mounted() {
    this.observeLoadMoreVisibility();
  },
  watch: {
    checkMediaType(newValue, oldValue) {
      this.tabMediaType = newValue;
      this.FetchDataOnTargetType();
    },
    checkTargetType() {
      this.tabMediaType = this.mediaType;
      this.FetchDataOnTargetType();
    },
  },
  async created() {
    await this.FetchDataOnTargetType();
    await this.fetchListFile({
      accesstoken: this.getAccessToken,
      AccountID: this.getAccountID,
      loadMorePage: 1,
    });
    if (this.targetType === "rate") {
      console.log(this.finalDisplayData);
      await this.GenerateGraph(this.finalDisplayData);
    }
  },
};
</script>

<style scoped>
.HeaderOfEachType {
  padding-top: 2%;
  padding-bottom: 2%;
}

.EachItemOnHeader {
  gap: 10px;
}

.TitleType {
  align-content: center;
  font-size: 25px;
  font-weight: bold;
}

.moreSection {
  align-content: center;
}

.MoreOpts {
  background-color: #082444;
  color: white;
}

.mediaTabType {
  color: #885ce4;
}

.FilteringSection {
  align-content: center;
  gap: 10px;
}

.selectFilter {
  font-size: medium;
}

.btnOrderAscDesc {
  font-weight: normal;
  font-size: medium;
}

.ContentOfEachType {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  display: flex;
  align-items: flex-start;
  border: 1px solid rgb(205, 203, 203);
  border-radius: 10px;
  overflow: hidden;
}

.item-image {
  cursor: pointer;
  width: 140px;
  height: 220px;
  border-radius: 10px;
}

.card-content {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.row.firstRowSection {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 1%;
}

.knob-container {
  display: flex;
  align-items: center;
}

.text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.default-title {
  font-size: 20px;
  font-weight: bold;
}

.original-title {
  color: grey;
  font-weight: lighter;
}

.itemDate {
  font-size: medium;
  color: grey;
}

.itemOverview {
  font-size: medium;
  line-height: 1.2;
  flex-grow: 1;
  overflow: hidden;
  margin-top: 2%;
}

.btnRowSection {
  color: grey;
  gap: 20px;
}

.rating-badge {
  position: absolute;
  top: 50%;
  right: 75%;
  width: 25%;
  height: 80%;
  color: none;
  border-radius: 60%;
  background-color: none;
  transform: translateY(-50%);
}

.rateStar {
  display: flex;
  align-items: center;
  background-color: #082444;
  padding: 8px;
  border-radius: 4px;
}

.clear-button {
  margin-left: 5px;
}

.got-rating {
  color: aqua;
  font-weight: bold;
}

.not-rating {
  color: grey;
  font-weight: normal;
}

.favorite-btn {
  color: palevioletred;
  font-weight: bold;
}

.not-favorite-btn {
  color: grey;
  font-weight: normal;
}

.createListMenu {
  height: auto;
  width: 300px;
  background-color: #04b4e4;
  color: white;
  align-content: center;
  overflow: hidden;
  padding: 2%;
}

.btnCreateList {
  font-weight: bold;
}

.btnListoflist {
  width: 90%;
  margin-left: 5%;
  background-color: #082444;
}

.clickable-label {
  cursor: pointer;
  color: black;
}

.clickable-label:hover {
  color: #04b4e4;
}

.ButtonLoadMore {
  margin-top: 2%;
}

.btnLoadMore {
  background-color: #885ce4;
  color: white;
  font-size: large;
  width: 100%;
  border-radius: 10px;
}

.btnLoadMore:hover {
  color: black;
}
</style>