<template>
  <div
    :class="{
      'options-true': ViewListOptions,
      'options-false': !ViewListOptions,
    }"
  >
    <q-btn
      icon="more_horiz"
      dense
      rounded
      class="option-btn"
      @click="LoadAllData"
    >
      <q-menu v-if="userlogin">
        <q-list class="column vertical-menu">
          <q-btn-dropdown
            dropdown-icon="none"
            class="custom-btn"
            icon="list"
            label="Add to list"
            no-caps
            flat
            menu-anchor="top left"
            menu-self="top right"
          >
            <q-list class="createListMenu">
              <q-btn
                icon="add"
                no-caps
                flat
                @click="createNewList"
                class="btnCreateList"
                >Create New List</q-btn
              >
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
                  class="btnListtolist"
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
          <q-btn
            class="custom-btn"
            icon="favorite"
            label="Favourite"
            no-caps
            align="left"
            flat
            :text-color="colorFavourite"
            @click="btnFavourite"
          />
          <q-btn
            class="custom-btn"
            icon="bookmark"
            label="Watchlist"
            no-caps
            align="left"
            flat
            :text-color="colorWatchList"
            @click="btnWatchList"
          />
          <q-btn
            class="custom-btn"
            icon="star"
            label="Your rating"
            no-caps
            align="left"
            flat
            :text-color="colorRating"
          >
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
                  @update:model-value="updateTargetRating"
                />
                <q-btn
                  flat
                  dense
                  round
                  icon="delete"
                  color="grey-7"
                  @click="clearRating"
                  class="clear-button"
                />
              </div>
            </q-menu>
          </q-btn>
        </q-list>
      </q-menu>
      <q-menu v-else>
        <q-list class="column vertical-menu">
          <q-item>
            <q-item-section>
              <span class="menu-text">
                Want to rate or add this item to a list?
              </span>
            </q-item-section>
          </q-item>
          <q-btn
            class="custom-btn"
            no-caps
            flat
            align="left"
            @click="Login"
            icon-right="arrow_forward"
            >Login</q-btn
          >
          <q-separator />
          <q-item>
            <q-item-section>
              <span class="menu-text"> Not a member? </span>
            </q-item-section>
          </q-item>
          <q-btn
            class="custom-btn"
            no-caps
            flat
            align="left"
            @click="Register"
            icon-right="arrow_forward"
          >
            Sign up and join the community
          </q-btn>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Notify } from "quasar";

export default {
  name: "OptionsButton",
  data() {
    return {
      colorFavourite: "black",
      favMediatype: "",
      targetIsFavourite: false,
      colorWatchList: "black",
      colorRating: "black",
      targetIsWatchList: false,
      rateStar: 0,
      selectedList: "",
      filteredListFile: [],
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    ViewListOptions: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    ...mapActions("AddFavourite", ["postFavouriteMedia"]),
    ...mapActions("getFavourite", ["fetchFavouriteData"]),
    ...mapActions("AddWatchList", ["postWatchListMedia"]),
    ...mapActions("getWatchList", ["fetchWatchListData"]),
    ...mapActions("AddRating", ["postMediaRating"]),
    ...mapActions("getRating", ["fetchRatingData"]),
    ...mapActions("DeleteRating", ["deleteMediaRating"]),
    ...mapActions("getListFile", ["fetchListFile"]),
    ...mapActions("AddItemToList", ["postMediaToList"]),
    Login() {
      this.$router.replace({
        path: `/LoginPage`,
      });
    },
    Register() {
      window.location.href = "https://www.themoviedb.org/signup";
    },
    createNewList() {
      this.$router.replace({
        path: `/CreateList`,
      });
    },
    LoadAllData() {
      if (this.item.title) {
        this.favMediatype = "movies";
      } else if (this.item.name) {
        this.favMediatype = "tv";
      } else {
        this.favMediatype = "";
      }
      this.fetchFavouriteData({
        accesstoken: this.getAccessToken,
        mediaType: this.favMediatype,
      })
        .then(() => {
          const allIds = this.getFavouriteData.map((item) => item.id);
          this.targetIsFavourite = allIds.includes(parseInt(this.item.id));
          this.colorFavourite = this.targetIsFavourite ? "pink" : "black";
        })
        .catch((err) => {
          console.error("Error fetching favourite data:", err);
        });
      this.fetchWatchListData({
        accesstoken: this.getAccessToken,
        mediaType: this.favMediatype,
      })
        .then(() => {
          const allIds = this.getWatchListData.map((item) => item.id);
          this.targetIsWatchList = allIds.includes(parseInt(this.item.id));
          this.colorWatchList = this.targetIsWatchList ? "red" : "black";
        })
        .catch((err) => {
          console.error("Error fetching watch list data:", err);
        });
      this.fetchRatingData({
        accesstoken: this.getAccessToken,
        mediaType: this.favMediatype,
        AccountID: this.getAccountID,
      })
        .then(() => {
          const targetItem = this.getRatingData.find(
            (item) => item.id === parseInt(this.item.id)
          );
          if (targetItem) {
            this.rateStar = targetItem.rating;
            this.colorRating = "orange";
          } else {
            this.colorRating = "black";
          }
        })
        .catch((err) => {
          console.error("Error fetching rating data:", err);
        });
      this.fetchListFile({
        accesstoken: this.getAccessToken,
        AccountID: this.getAccountID,
        loadMorePage: 1,
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
        })
        .catch((err) => {
          console.error("Error fetching list file:", err);
        });
    },
    notifySuccess(title, action, type) {
      const TargetTitle = title;
      const actionTarget = action ? "added to" : "removed from";
      let message = `${TargetTitle} was ${actionTarget} your ${type} list.`;
      this.notification = Notify.create({
        message,
        position: "top-right",
        timeout: 2000,
        color: "positive",
        closeBtn: true,
      });
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
        let currentMediaType = this.item.media_type;
        if (this.item.title) {
          currentMediaType = "movie";
        } else if (this.item.name) {
          currentMediaType = "tv";
        }
        await this.postMediaToList({
          accesstoken: this.getAccessToken,
          sessionId: this.getSessionID,
          targetMediaId: this.item.id,
          targetListId: this.selectedList.id,
          mediatype: currentMediaType,
        })
          .then(() => {
            this.selectedList = "";
            this.notifyRating("Item added!");
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
    itemCounting(itemCount) {
      if (itemCount > 1) {
        return `(${itemCount} items)`;
      } else {
        return `(${itemCount} item)`;
      }
    },
    btnFavourite() {
      let currentMediaType = this.item.media_type;
      if (this.item.title) {
        currentMediaType = "movie";
      } else if (this.item.name) {
        currentMediaType = "tv";
      }
      let finalFavourite = !this.targetIsFavourite;
      this.postFavouriteMedia({
        accesstoken: this.getAccessToken,
        sessionId: this.getSessionID,
        mediaType: currentMediaType,
        mediaId: this.item.id,
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
          this.targetIsFavourite = allIds.includes(parseInt(this.item.id));
          this.colorFavourite = this.targetIsFavourite ? "pink" : "black";
          this.notifySuccess(
            this.item.title ? this.item.title : this.item.name,
            this.targetIsFavourite,
            "favourite"
          );
        })
        .catch((err) => {
          console.error("Error updating favourite state:", err);
        });
    },
    btnWatchList() {
      let currentMediaType = this.item.media_type;
      if (this.item.title) {
        currentMediaType = "movie";
      } else {
        currentMediaType = "tv";
      }
      let finalWatchList = !this.targetIsWatchList;
      this.postWatchListMedia({
        accesstoken: this.getAccessToken,
        sessionId: this.getSessionID,
        mediaType: currentMediaType,
        mediaId: this.item.id,
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
          this.targetIsWatchList = allIds.includes(parseInt(this.item.id));
          this.colorWatchList = this.targetIsWatchList ? "red" : "black";
          this.notifySuccess(
            this.item.title ? this.item.title : this.item.name,
            this.targetIsWatchList,
            "watchlist"
          );
        })
        .catch((err) => {
          console.error("Error updating watchlist state:", err);
        });
    },
    clearRating() {
      let currentMediaType = this.item.media_type;
      if (this.item.title) {
        currentMediaType = "movie";
      } else {
        currentMediaType = "tv";
      }
      this.deleteMediaRating({
        accesstoken: this.getAccessToken,
        sessionId: this.getSessionID,
        mediaType: currentMediaType,
        mediaId: this.item.id,
      });
      this.colorRating = "black";
      this.rateStar = 0;
      this.notifyRating("The selected item's rating was successfully deleted.");
    },
    updateTargetRating() {
      let currentMediaType = this.item.media_type;
      if (this.item.title) {
        currentMediaType = "movie";
      } else {
        currentMediaType = "tv";
      }
      let finalValue = this.rateStar;
      this.postMediaRating({
        accesstoken: this.getAccessToken,
        sessionId: this.getSessionID,
        mediaType: currentMediaType,
        mediaId: this.item.id,
        rateValue: finalValue,
      });
      this.colorRating = "orange";
      this.notifyRating("Your rating has been saved.");
    },
  },
  computed: {
    ...mapGetters("userdata", [
      "getUserLogin",
      "getUsername",
      "getSessionID",
      "getUserLogout",
      "getAccountID",
      "getAccessToken",
    ]),
    ...mapGetters("getFavourite", ["getFavouriteData"]),
    ...mapGetters("getWatchList", ["getWatchListData"]),
    ...mapGetters("getRating", ["getRatingData"]),
    ...mapGetters("getListFile", ["getListFile"]),
    ...mapGetters("getListFile", ["getTPListFile"]),
    userlogin() {
      return this.getUserLogin;
    },
    ListFile() {
      return this.getListFile;
    },
  },
};
</script>

<style scoped>
.options-false {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

.options-true {
  background-color: rgba(240, 240, 240, 0.6);
  color: grey;
}

.options-true .option-btn {
  font-size: 10px;
  color: grey;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(240, 240, 240, 0.6);
  transition: background-color 0.3s, color 0.3s;
}

.options-true .option-btn:hover {
  background-color: #04b4e4;
  color: white;
}

.options-false .option-btn {
  font-size: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: grey;
  background-color: rgba(240, 240, 240, 0.6);
  transition: background-color 0.3s, color 0.3s;
}

.options-false .option-btn:hover {
  background-color: #04b4e4;
  color: white;
}

.vertical-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0px;
  padding: 0;
}

.vertical-menu .menu-text {
  width: 100%;
  font-size: 14px;
  color: black;
  font-weight: bold;
}

.vertical-menu .custom-btn {
  border-radius: 0;
  width: 100%;
  color: black;
  background-color: transparent;
  transition: background-color 0.3s, color 0.3s;
}

.vertical-menu .custom-btn:hover {
  background-color: #032541;
  color: white;
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
  font-size: larger;
  font-weight: bold;
}

.btnListtolist {
  width: 90%;
  margin-left: 5%;
  background-color: #082444;
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
</style>