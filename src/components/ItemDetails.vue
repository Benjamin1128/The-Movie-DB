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
              <q-item-label>Alternative Titles</q-item-label>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Cast & Crew</q-item-label>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Episode Groups</q-item-label>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Season</q-item-label>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Translations</q-item-label>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Watch Now</q-item-label>
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
              <q-item-label>Logos</q-item-label>
              <q-space />
              <q-badge color="grey-3" text-color="black" label="0" />
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-label>Posters</q-item-label>
              <q-space />
              <q-badge color="grey-3" text-color="black" label="0" />
            </q-item>
            <q-btn-dropdown
              label="Videos"
              no-caps
              flat
              menu-anchor="top right"
              menu-self="top left"
              class="nestedDropDown"
            >
              <q-item clickable v-close-popup class="itemSection">
                <q-item-label>Behind the Scenes</q-item-label>
                <q-space />
                <q-badge color="grey-3" text-color="black" label="0" />
              </q-item>
              <q-item clickable v-close-popup class="itemSection">
                <q-item-label>Teasers</q-item-label>
                <q-space />
                <q-badge color="grey-3" text-color="black" label="0" />
              </q-item>
              <q-item clickable v-close-popup class="itemSection">
                <q-item-label>Trailers</q-item-label>
                <q-space />
                <q-badge color="grey-3" text-color="black" label="0" />
              </q-item>
            </q-btn-dropdown>
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
            <q-item clickable v-close-popup>
              <q-item-label>Reviews</q-item-label>
            </q-item>
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

      <!-- Overview-Main Section -->
      <div
        class="itemOverview"
        :style="{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${
            itemDetails.backdrop_path
              ? itemDetails.backdrop_path
              : itemDetails.poster_path
          })`,
        }"
      >
        <div class="column left-column">
          <q-img
            class="itemPoster"
            :src="getImagePath(itemDetails)"
            placeholder-src="../assets/defaultImg.svg"
            fit="fill"
          />
        </div>
        <!-- Right Column Content -->
        <div class="column right-column">
          <div class="header-section">
            <div class="title-row">
              <div>
                <label
                  class="clickableTitle"
                  @click="navigatetoItemDetails(itemDetails)"
                >
                  {{ itemDetails.name ? itemDetails.name : itemDetails.title }}
                </label>
                <span class="itemYear">
                  ({{
                    releaseYear(
                      itemDetails.release_date
                        ? itemDetails.release_date
                        : itemDetails.first_air_date
                    )
                  }})
                </span>
                <div class="meta-info">
                  <q-badge class="cert-badge">
                    {{ getCertification(itemDetails) }}
                  </q-badge>
                  <span v-if="itemDetails.release_date">
                    {{ formattedDate(itemDetails.release_date) }}
                  </span>
                  <span>({{ getCountryCode(itemDetails) }})</span>
                  <span class="blackDot"></span>
                  <div
                    class="removeGenreSpacing"
                    v-for="(genre, index) in itemDetails.genres"
                    :key="genre.id"
                  >
                    <span class="genreClass"
                      >{{ genre.name }}
                      <span v-if="index !== itemDetails.genres.length - 1"
                        >,</span
                      ></span
                    >
                  </div>
                  <span class="blackDot"></span>
                  <span v-if="itemDetails.runtime">
                    {{ formattedTime(itemDetails) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Vibe? Section -->
          <div class="vibe-section">
            <q-knob
              :min="0"
              :max="10"
              :model-value="normalizedVoteAverage(itemDetails)"
              show-value
              size="66px"
              :thickness="0.2"
              :color="knobColor(itemDetails)"
              center-color="black"
              track-color="grey"
              class="text-white"
              :readonly="true"
            >
              <div style="font-size: 20px; font-weight: bold">
                {{ (normalizedVoteAverage(itemDetails) * 10).toFixed() }}%
              </div>
            </q-knob>
            <span class="user-score">User Score</span>
            <q-btn
              v-if="vibeButtonText"
              no-caps
              class="vibe-btn"
              @click="btnGiveRate"
              >Your Vibe
              <span :class="vibeButtonTextClass">{{ vibeButtonText }}</span
              >%</q-btn
            >
            <q-btn v-else no-caps class="vibe-btn" @click="btnGiveRate">
              What's your <label class="btnVibe"> Vibe </label>?
              <q-icon
                name="info"
                style="
                  margin-left: 5px;
                  color: white;
                  font-style: italic;
                  font-size: 18px;
                "
              >
                <q-tooltip
                  style="
                    font-size: medium;
                    background-color: #042444;
                    width: 260px;
                  "
                >
                  {{ textVibing }}
                </q-tooltip>
              </q-icon>
            </q-btn>
          </div>

          <!--Button Section -->
          <div class="button-section">
            <div class="tooltip-wrapper">
              <q-tooltip style="font-size: medium; background-color: #042444">
                {{ textAddToList }}
              </q-tooltip>
              <q-btn-dropdown
                class="btns"
                icon="list"
                dropdown-icon="none"
                size="small"
                align="left"
                @click="btnAddList"
              >
                <q-list class="createListMenu">
                  <q-btn
                    icon="add"
                    no-caps
                    flat
                    @click="createNewList"
                    class="btnCreateList"
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
                      @update:model-value="HandleAddToList"
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
            </div>
            <q-btn
              class="btns"
              icon="favorite"
              size="small"
              @click="btnFavourite"
              :text-color="colorFavourite"
            >
              <q-tooltip style="font-size: medium; background-color: #042444">
                {{ textMarkasFav }}
              </q-tooltip>
            </q-btn>
            <q-btn
              class="btns"
              icon="bookmark"
              size="small"
              @click="btnWatchList"
              :text-color="colorWatchList"
            >
              <q-tooltip style="font-size: medium; background-color: #042444">
                {{ textAddToWatch }}
              </q-tooltip>
            </q-btn>
            <q-btn
              v-if="itemVideo && itemVideo.length > 0"
              icon="play_circle"
              flat
              no-caps
              class="btnPlayTrailer"
              @click="invokeYoutubeReact(itemVideo)"
            >
              Play Trailer
            </q-btn>
          </div>

          <!--Overview Content -->
          <div class="overview-section">
            <label class="tagLine">{{ itemDetails.tagline }}</label>
            <div class="overview-content">
              <label>Overview</label>
              <p>{{ itemDetails.overview }}</p>
            </div>
          </div>

          <!-- Crew Section -->
          <div class="crew-section">
            <div
              v-for="crews in this.writingCrew"
              :key="crews.id"
              class="crewrowSpacing"
            >
              <div class="crew-name">
                {{ crews.name }}
              </div>
              <div class="crew-job">{{ crews.jobs }}</div>
            </div>
          </div>
        </div>

        <!-- Open Youtube -->
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

      <!-- Open Rate -->
      <q-dialog v-model="isRatingOpen" persistent>
        <q-card class="rating-dialog">
          <q-card-section class="row items-center q-pb-none">
            <div class="ratingTitle">Rating</div>
            <q-space />
            <q-btn
              size="x-large"
              icon="close"
              flat
              rounded
              dense
              v-close-popup
            />
          </q-card-section>
          <q-card-section>
            <div class="ratingSubtitle">
              What did you think of
              {{ itemDetails.title ? itemDetails.title : itemDetails.name }}
            </div>
            <q-slider
              class="ratingSlider"
              v-model="userRate"
              :color="dynamicColorSlider"
              markers
              :marker-labels="Ratelabel"
              :min="0"
              :max="100"
              :step="10"
              label
              track-size="15px"
              thumb-size="35px"
              :label-value="`${customizeLabelRate}`"
              @update:model-value="UpdateTargetRating"
            >
            </q-slider>
          </q-card-section>
          <q-card-section class="row justify-between items-center">
            <div class="row">
              <div class="ratingUserScore">
                {{ (normalizedVoteAverage(itemDetails) * 10).toFixed(0) }}
              </div>
              % user score
            </div>
            <q-btn
              flat
              class="ratingClear"
              label="Clear my rating"
              @click="clearRating"
              no-caps
            />
          </q-card-section>
        </q-card>
      </q-dialog>

      <!-- Item Info Section -->
      <div style="margin-left: 3%">
        <ItemDetailsInfo :items="itemDetails" />
      </div>
    </q-page>
  </q-page-container>
</template>
  
  <script>
import { mapGetters, mapActions } from "vuex";
import ItemDetailsInfo from "./ItemDetailsInfo.vue";
import { Notify } from "quasar";

export default {
  components: {
    ItemDetailsInfo,
  },
  data() {
    return {
      writingCrew: [],
      showVideoModel: false,
      selectedVideoUrl: "",
      selectedList: "",
      filteredListFile: [],
      colorFavourite: "white",
      targetIsFavourite: false,
      favMediatype: "",
      colorWatchList: "white",
      targetIsWatchList: false,
      vibeButtonText: "",
      isRatingOpen: false,
      userRate: 0,
      Ratelabel: {
        0: "0",
        10: "10",
        20: "20",
        30: "30",
        40: "40",
        50: "50",
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      customLabels: [
        "Dumpster Fire",
        "Absolute Trash",
        "Garbage",
        "Truly Bad",
        "Not Good",
        "Passable",
        "It's Alright",
        "Pretty Decent",
        "Really Good",
        "Greatness",
        "Champion",
      ],
    };
  },
  mounted() {
    if (this.$route.query.media_type === "movie") {
      this.favMediatype = "movies";
    } else {
      this.favMediatype = "tv";
    }
    this.checkFavouriteExist();
    this.checkWatchListExist();
    this.checkRatingExist();
  },
  methods: {
    ...mapActions("getItemDetails", ["fetchItemDetails"]),
    ...mapActions("getItemCertification", ["fetchItemCert"]),
    ...mapActions("getCrewCast", ["fetchCrewCastData"]),
    ...mapActions("getVideos", ["fetchItemVideo"]),
    ...mapActions("getListFile", ["fetchListFile"]),
    ...mapActions("AddItemToList", ["postMediaToList"]),
    ...mapActions("AddFavourite", ["postFavouriteMedia"]),
    ...mapActions("getFavourite", ["fetchFavouriteData"]),
    ...mapActions("AddWatchList", ["postWatchListMedia"]),
    ...mapActions("getWatchList", ["fetchWatchListData"]),
    ...mapActions("AddRating", ["postMediaRating"]),
    ...mapActions("getRating", ["fetchRatingData"]),
    ...mapActions("DeleteRating", ["deleteMediaRating"]),
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
    async HandleAddToList() {
      if (this.selectedList != null) {
        await this.postMediaToList({
          accesstoken: this.getAccessToken,
          sessionId: this.getSessionID,
          targetMediaId: this.$route.query.item_id,
          targetListId: this.selectedList.id,
          mediaType: this.$route.query.media_type,
        })
          .then(() => {
            this.selectedList = "";
            this.notifySuccess("Item added!");
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
    btnFavourite() {
      if (this.userLogin) {
        let finalFavourite = !this.targetIsFavourite;
        this.postFavouriteMedia({
          accesstoken: this.getAccessToken,
          sessionId: this.getSessionID,
          mediaType: this.$route.query.media_type,
          mediaId: this.$route.query.item_id,
          favouriteState: finalFavourite,
        })
          .then(() => {
            return this.fetchFavouriteData({
              accesstoken: this.getAccessToken,
              mediaType: this.favMediatype,
            });
          })
          .then(() => {
            const allIds = this.getFavouriteData.map((item) => item.id);
            this.targetIsFavourite = allIds.includes(
              parseInt(this.$route.query.item_id)
            );
            this.colorFavourite = this.targetIsFavourite ? "pink" : "white";
          })
          .catch((err) => {
            console.error("Error updating favourite state:", err);
          });
      } else {
        this.$router.replace({
          path: `/LoginPage`,
        });
      }
    },
    btnWatchList() {
      if (this.userLogin) {
        let finalWatchList = !this.targetIsWatchList;
        this.postWatchListMedia({
          accesstoken: this.getAccessToken,
          sessionId: this.getSessionID,
          mediaType: this.$route.query.media_type,
          mediaId: this.$route.query.item_id,
          watchlistState: finalWatchList,
        })
          .then(() => {
            return this.fetchWatchListData({
              accesstoken: this.getAccessToken,
              mediaType: this.favMediatype,
            });
          })
          .then(() => {
            const allIds = this.getWatchListData.map((item) => item.id);
            this.targetIsWatchList = allIds.includes(
              parseInt(this.$route.query.item_id)
            );
            this.colorWatchList = this.targetIsWatchList ? "red" : "white";
          })
          .catch((err) => {
            console.error("Error updating watchlist state:", err);
          });
      } else {
        this.$router.replace({
          path: `/LoginPage`,
        });
      }
    },
    notifySuccess(message) {
      this.notification = Notify.create({
        message,
        position: "top-right",
        timeout: 2000,
        color: "positive",
        closeBtn: true,
      });
    },
    getImagePath(item) {
      return (
        "https://image.tmdb.org/t/p/original" +
        (item.poster_path ? item.poster_path : item.backdrop_path)
      );
    },
    releaseYear(releaseDate) {
      if (releaseDate) {
        return releaseDate.split("-")[0];
      } else {
        return "Unknown Year";
      }
    },
    navigatetoItemDetails(item) {
      let currentMediaType = item.media_type;
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
    getCountryCode(itemDetails) {
      if (
        itemDetails &&
        itemDetails.production_countries &&
        itemDetails.production_countries.length > 0
      ) {
        let targetCountryCode = itemDetails.production_countries[0].iso_3166_1;
        return targetCountryCode;
      } else {
        return "MY";
      }
    },
    getCertification(itemDetails) {
      let targetCode = this.getCountryCode(itemDetails);
      let arrayItemCert = this.getItemCert;
      let countryData = arrayItemCert.find(
        (country) => country.iso_3166_1 === targetCode
      );
      let certification = "Unrated";
      if (countryData) {
        if (countryData.release_dates && countryData.release_dates.length > 0) {
          for (let i = 0; i < countryData.release_dates.length; i++) {
            const currentCertification =
              countryData.release_dates[i].certification;
            if (currentCertification) {
              certification = currentCertification;
              break;
            }
          }
        } else if (countryData.rating) {
          certification = countryData.rating;
        }
      }
      return certification;
    },
    formattedDate(releaseDate) {
      if (releaseDate) {
        const [year, month, day] = releaseDate.split("-");
        return `${month}/${day}/${year}`;
      } else {
        return "Unknown Date";
      }
    },
    isLastGenre(genre) {
      this.itemDetails.genres.indexOf(genre) ===
        this.itemDetails.genres.length - 1;
    },
    formattedTime(itemDetails) {
      let targetTime = itemDetails.runtime;
      let hours = Math.floor(targetTime / 60);
      let minutes = targetTime % 60;
      let formattedTime = `${hours}h ${minutes}m`;
      return formattedTime;
    },
    normalizedVoteAverage(item) {
      if (item) {
        return item.vote_average !== null && !isNaN(item.vote_average)
          ? item.vote_average
          : 0;
      }
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
    getCrewCast() {
      let CrewMember = this.getCrewCastData.crew;
      if (CrewMember) {
        const writingCrew = CrewMember.filter(
          (member) =>
            member.department === "Writing" || member.department === "Directing"
        );
        const combinedJobs = Object.values(
          writingCrew.reduce((acc, member) => {
            if (!acc[member.id]) {
              acc[member.id] = {
                id: member.id,
                name: member.name,
                jobs: member.job,
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
        }));
        this.writingCrew = combinedJobs;
      }
    },
    invokeYoutubeReact(movie) {
      if (movie.length > 0) {
        const keywords = ["Official", "Trailer", "Teaser"];
        const youtubeVideo = movie.find(
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
    async UpdateTargetRating() {
      let finalValue = Math.floor(this.userRate / 10);

      this.postMediaRating({
        accesstoken: this.getAccessToken,
        sessionId: this.getSessionID,
        mediaType: this.$route.query.media_type,
        mediaId: this.$route.query.item_id,
        rateValue: finalValue,
      });
      this.vibeButtonText = this.userRate;
    },
    btnAddList() {
      if (!this.userLogin) {
        this.$router.replace({
          path: `/LoginPage`,
        });
      }
    },
    btnGiveRate() {
      if (this.userLogin) {
        this.isRatingOpen = true;
      } else {
        this.$router.replace({
          path: `/LoginPage`,
        });
      }
    },
    clearRating() {
      this.deleteMediaRating({
        accesstoken: this.getAccessToken,
        sessionId: this.getSessionID,
        mediaType: this.$route.query.media_type,
        mediaId: this.$route.query.item_id,
      });
      this.vibeButtonText = "";
      this.userRate = 0;
      this.notifySuccess("Your changes have been successfully saved.");
    },
    createNewList() {
      this.$router.replace({
        path: `/CreateList`,
      });
    },
    itemCounting(itemCount) {
      if (itemCount > 1) {
        return `(${itemCount} items)`;
      } else {
        return `(${itemCount} item)`;
      }
    },
    checkFavouriteExist() {
      if (this.userLogin) {
        const allIds = this.getFavouriteData.map((item) => item.id);
        this.targetIsFavourite = allIds.includes(
          parseInt(this.$route.query.item_id)
        );
        this.colorFavourite = this.targetIsFavourite ? "pink" : "white";
      }
    },
    checkWatchListExist() {
      if (this.userLogin) {
        const allIds = this.getWatchListData.map((item) => item.id);
        this.targetIsWatchList = allIds.includes(
          parseInt(this.$route.query.item_id)
        );
        this.colorWatchList = this.targetIsWatchList ? "red" : "white";
      }
    },
    checkRatingExist() {
      if (this.userLogin) {
        const targetItem = this.getRatingData.find(
          (item) => item.id === parseInt(this.$route.query.item_id)
        );
        if (targetItem) {
          const formmatedRate = targetItem.rating * 10;
          this.vibeButtonText = formmatedRate;
          this.userRate = formmatedRate;
        } else {
          this.vibeButtonText = "";
        }
      }
    },
  },
  computed: {
    ...mapGetters("getItemDetails", ["getItemDetails"]),
    ...mapGetters("getItemCertification", ["getItemCert"]),
    ...mapGetters("getCrewCast", ["getCrewCastData"]),
    ...mapGetters("userdata", [
      "getUserLogin",
      "getUsername",
      "getUserLogout",
      "getSessionID",
      "getAccessToken",
      "getAccountID",
    ]),
    ...mapGetters("getVideos", ["getItemVideo"]),
    ...mapGetters("getListFile", ["getListFile"]),
    ...mapGetters("getListFile", ["getTPListFile"]),
    ...mapGetters("getFavourite", ["getFavouriteData"]),
    ...mapGetters("getWatchList", ["getWatchListData"]),
    ...mapGetters("getRating", ["getRatingData"]),
    ListFile() {
      return this.getListFile;
    },
    userLogin() {
      return this.getUserLogin;
    },
    itemDetails() {
      return this.getItemDetails;
    },
    itemVideo() {
      return this.getItemVideo;
    },
    textVibing() {
      return this.userLogin
        ? "Welcome to Vibes, TMDB's new rating system! For more information, visit the contribution bible."
        : "Login to use TMDB's new rating system.";
    },
    customizeLabelRate() {
      const index = Math.floor(this.userRate / 10);
      return this.customLabels[index];
    },
    dynamicColorSlider() {
      if (this.userRate <= 30) {
        return "red";
      } else if (this.userRate <= 60) {
        return "orange";
      } else {
        return "light-green";
      }
    },
    vibeButtonTextClass() {
      if (this.vibeButtonText <= 30) {
        return "vibePercentageR";
      } else if (this.vibeButtonText <= 60) {
        return "vibePercentageY";
      } else {
        return "vibePercentageG";
      }
    },
    textAddToList() {
      return this.userLogin
        ? "Add to list"
        : "Login to create and edit custom list";
    },
    textMarkasFav() {
      return this.userLogin
        ? "Mark as favourite"
        : "Login to add this movie to your favourite list";
    },
    textAddToWatch() {
      return this.userLogin
        ? "Add to your watchlist"
        : "Login to add this movie to your watchlist";
    },
  },
  async created() {
    await this.fetchItemDetails({
      mediaType: this.$route.query.media_type,
      itemId: this.$route.query.item_id,
    });
    if (this.userLogin) {
      await this.fetchFavouriteData({
        accesstoken: this.getAccessToken,
        mediaType: this.favMediatype,
      });

      await this.checkFavouriteExist();

      await this.fetchWatchListData({
        accesstoken: this.getAccessToken,
        mediaType: this.favMediatype,
      });

      await this.checkWatchListExist();

      await this.fetchRatingData({
        accesstoken: this.getAccessToken,
        mediatype: this.favMediatype,
        AccountID: this.getAccountID,
      });
      await this.checkRatingExist();
    }

    await this.fetchItemCert({
      mediaType: this.$route.query.media_type,
      itemId: this.$route.query.item_id,
    });
    await this.fetchCrewCastData({
      mediaType: this.$route.query.media_type,
      itemId: this.$route.query.item_id,
    });
    await this.getCrewCast();
    await this.fetchItemVideo({
      mediaType: this.$route.query.media_type,
      targetId: this.$route.query.item_id,
    });

    await this.fetchListFile({
      accesstoken: this.getAccessToken,
      AccountID: this.getAccountID,
      loadMorePage: 1,
    });
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

/* Overview-Main section */
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

.column {
  display: flex;
  flex-direction: column;
}

.left-column {
  flex: 0 0 300px;
  margin-right: 3%;
}

.itemPoster {
  height: 460px;
  width: 100%;
  border-radius: 10px;
}

/* Right Column Content */
.right-column {
  flex: 1;
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
  font-weight: bold;
  font-size: 2.2em;
}

.itemYear {
  font-size: 2.2em;
  color: #c0c0be;
  font-weight: normal;
}

.clickableTitle {
  cursor: pointer;
}

.clickableTitle:hover {
  color: #c0c0be;
}

/* Meta info */
.meta-info {
  display: flex;
  gap: 10px;
  align-items: center;
}

.meta-info span {
  font-size: 14px;
}

.blackDot {
  display: inline-block;
  width: 5px;
  height: 5px;
  background-color: white;
  border-radius: 50%;
}

.genreClass:hover {
  cursor: pointer;
  color: #c0c0be;
}

.cert-badge {
  font-size: 14px;
  border-radius: 2px;
  border: 1px solid #c0c0be;
  background: none;
  color: #c0c0be;
  height: 1.5em;
}

/* Vibe Section */
.vibe-section {
  display: flex;
  gap: 10px;
  margin: 20px 0;
  align-items: center;
}

.user-score {
  font-weight: bold;
  font-size: 1.1em;
  width: 50px;
}

.vibe-btn {
  width: 200px;
  background-color: #042444;
  color: white;
  font-weight: bold;
  font-size: medium;
  height: 40px;
  border-radius: 30px;
}

.btnVibe {
  position: relative;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  margin-left: 2%;
  margin-right: 2%;
}

.btnVibe::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 2px;
  width: 100%;
  height: 2px;
  background-color: #04b4e4;
  display: block;
}

.vibePercentageR {
  margin-left: 3%;
  color: red;
}

.vibePercentageY {
  margin-left: 3%;
  color: orange;
}

.vibePercentageG {
  margin-left: 3%;
  color: lightgreen;
}

/* Button Section */
.button-section {
  display: flex;
  gap: 20px;
  align-items: center;
}

.btns {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #042444;
  color: white;
}

.createListMenu {
  height: auto;
  width: 300px;
  background-color: #042444;
  color: white;
  align-content: center;
  overflow: hidden;
  padding: 2%;
}

.btnCreateList {
  font-size: larger;
  font-weight: bold;
}

.btnListoflist {
  width: 90%;
  margin-left: 5%;
  background-color: #082444;
}

.btnPlayTrailer {
  border-radius: 10px;
  color: white;
  font-size: medium;
  padding-left: 5px;
}

/* Overview Content */
.overview-section {
  margin: 20px 0 0 0;
}

.tagLine {
  color: #c0c0be;
  font-style: italic;
  font-size: medium;
  margin-bottom: 10px;
}

.overview-content label {
  font-weight: bold;
  font-size: 20px;
}

.overview-content p {
  font-size: 16px;
  margin-top: 8px;
}

/* Crew Section */
.crew-section {
  display: relative;
  column-count: 3;
  column-gap: 10px;
  margin-top: 20px;
}

.crewrowSpacing {
  margin-bottom: 15px;
}

.crew-name {
  font-weight: bold;
  font-size: medium;
}

.crew-name:hover {
  cursor: pointer;
  color: #c0c0be;
}

.crew-job {
  color: #c0c0be;
}

.video-model {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 200vh;
}

/* Open Rating */
.rating-dialog {
  border-radius: 20px;
  width: auto;
  min-width: 650px;
  overflow: hidden;
  color: #042444;
}

.ratingTitle {
  font-size: 35px;
  font-weight: bold;
}

.ratingSubtitle {
  font-style: italic;
  font-size: medium;
  margin-bottom: 2%;
}

.ratingSlider {
  color: grey;
}

.ratingUserScore {
  font-weight: bold;
}

.ratingClear {
  color: #04b4e4;
  font-style: italic;
  font-size: medium;
}
</style>