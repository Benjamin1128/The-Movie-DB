<template>
  <!-- Above Section -->
  <div
    class="AboveSection"
    :style="{
      backgroundSize: 'cover',
      backgroundPositio: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundBlendMode: 'overlay',
      backgroundImage: `url(https://image.tmdb.org/t/p/original/${BackdropPathUrl})`,
    }"
  >
    <h4 class="q-mt-none q-mb-sm ListTitle">
      {{ this.listName }}
    </h4>
    <p class="ListDescription">
      {{
        this.listDescription ? this.listDescription : "No description entered."
      }}
    </p>
    <div>
      <q-avatar size="50px">
        <q-img src="../assets/profileImg7.jpg"></q-img>
      </q-avatar>
      <span class="CreateByUser">
        A list by <span class="UserName">{{ this.createBy }}</span>
      </span>
    </div>
  </div>

  <!--Second Section -->
  <div class="row SecondSection">
    <q-btn
      no-caps
      flat
      label="Edit"
      color="grey"
      size="16px"
      @click="btnEditClick"
    />
    <q-btn
      no-caps
      flat
      label="Share"
      color="grey"
      size="16px"
      @click="btnShareClick"
    />
  </div>

  <!-- Third Section -->
  <div class="row ThirdSection">
    <div>
      <div class="text-h4">{{ this.itemOnList }}</div>
      <div class="text-caption MoreDetail">Item on this list</div>
    </div>
    <div>
      <div class="text-h4">{{ this.averageRate * 10 }}%</div>
      <div class="text-caption MoreDetail">Average Rating</div>
    </div>
    <div>
      <div class="text-h4">{{ this.totalRuntime }}</div>
      <div class="text-caption MoreDetail">Total Runtime</div>
    </div>
    <div>
      <div class="text-h4">{{ this.totalRevenue }}</div>
      <div class="text-caption MoreDetail">Total Revenue</div>
    </div>
  </div>

  <!-- Data List -->
  <div v-if="this.showList == false" class="NoDataList">
    There are no items added to the list.
  </div>
  <div v-else>
    <!-- Button Section -->
    <div class="btnSettingDisplay">
      <q-btn
        class="btn-gap"
        no-caps
        :label="CheckLabelGrid"
        :icon-right="CheckIconGrid"
        @click="ChangeGridViewState"
        outline
        rounded
      />

      <q-btn
        class="btn-gap"
        no-caps
        :label="CheckLabelCmt"
        @click="ChangeCommentState"
        outline
        rounded
      />

      <q-btn
        class="btn-gap"
        no-caps
        label="Sort By"
        icon-right="arrow_drop_down"
        outline
        rounded
      >
        <q-menu>
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section> Original Order </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section> Rating </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section> Release Date </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section> Title </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn
        class="btn-gap"
        no-caps
        label="Show Me"
        icon-right="arrow_drop_down"
        outline
        rounded
      >
        <q-menu>
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section> Everything </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section> Items I Have Seen </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section> Items I Haven't Seen </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <!-- Contents -->
    <div v-if="CurrentGridStatus">
      <div v-for="(item, index) in itemInList" :key="item.id">
        <div class="item">
          <div class="item-index">{{ index + 1 }}</div>
          <div class="item-details">
            <div class="item-title" @click="handleLabelClick(item)">
              {{ item.title ? item.title : item.name }}
            </div>
            <div v-if="!CurrentShowComment">
              <div class="comments-item">
                {{ getComments(item) }}
              </div>
            </div>
            <q-space />
            <div class="item-rating">
              <div class="rating-circle">
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
              <div :class="['item-type', CheckingItemType(item)]">
                {{ formatMediaType(item) }}
              </div>
              <div class="item-date">
                {{
                  formatDate(
                    item.release_date ? item.release_date : item.first_air_date
                  )
                }}
              </div>
              <div class="item-duration">
                {{ this.formatTime(item.runtime) }}
              </div>
              <div class="item-revenue">
                {{ formatRevenue(item.revenue) }}
              </div>
              <q-space />
              <OptionsButton :item="item" :ViewListOptions="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="grid-container">
        <div
          v-for="(item, index) in this.itemInList"
          :key="item.id"
          class="grid-item"
        >
          <div class="imageContent">
            <div class="imageWrapper">
              <div
                style="
                  position: absolute;
                  top: 10px;
                  left: 10px;
                  z-index: 10;
                  background-color: #bbb8b8;
                  color: grey;
                  text-align: center;
                  border-radius: 50%;
                  height: 20px;
                  width: 20px;
                "
              >
                {{ index + 1 }}
              </div>

              <q-img
                @click="handleImageClick(item)"
                placeholder-src="../assets/defaultImg.svg"
                :src="getImagePath(item)"
                style="
                  width: 200px;
                  height: 300px;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                "
                fit="cover"
              ></q-img>
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
                style="
                  position: relative;
                  bottom: 20px;
                  left: 10px;
                  z-index: 10;
                "
              >
                <div style="font-size: 14px; font-weight: bold">
                  {{ (normalizedVoteAverage(item) * 10).toFixed(0) }}%
                </div>
              </q-knob>
            </div>
            <OptionsButton :item="item" :ViewListOptions="false" />

            <div class="itemDetails">
              <label
                class="itemTitle clickable-label"
                @click="handleLabelClick(item)"
              >
                {{ item.name ? item.name : item.title }}
              </label>
            </div>

            <div>
              <label class="itemDate">
                {{
                  formatDate(
                    item.release_date ? item.release_date : item.first_air_date
                  )
                }}
              </label>
              <div v-if="!CurrentShowComment">
                <div class="grid-comments-item">
                  {{ getComments(item) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="showDialog">
    <q-card style="min-width: 600px">
      <q-card-section class="row items-center justfiy-between container">
        <div class="text-h6">Share {{ this.listName }}</div>
        <q-space />
        <q-btn icon="close" flat rounded dense v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section>
        <div class="text-subtitle2 q-mb-sm">URL</div>
        <q-input
          outlined
          v-model="shareUrl"
          readonly
          :input-style="{ fontSize: '14px' }"
        >
          <template v-slot:after>
            <q-btn
              flat
              dense
              icon="content_copy"
              @click="copyToClipboard"
            ></q-btn>
          </template>
        </q-input>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Notify } from "quasar";
import OptionsButton from "./OptionsButton.vue";

export default {
  components: {
    OptionsButton,
  },
  data() {
    return {
      listName: "",
      listDescription: "",
      createBy: "",
      BackdropPathUrl: "",
      itemOnList: "",
      averageRate: "",
      totalRuntime: "",
      totalRevenue: "",
      showList: false,
      seenNotSeenList: [],
      itemInList: [],
      originalItemInList: [],
      CurrentGridStatus: true,
      CurrentShowComment: true,
      showDialog: false,
      shareUrl: "",
    };
  },
  methods: {
    ...mapActions("getDetailList", ["fetchDetailList"]),
    ...mapActions("getItemDetails", ["fetchItemDetails"]),
    ...mapActions("checkSeenItem", ["fetchSeenItemData"]),
    formatTime(time) {
      let hours = Math.floor(time / 60);
      let minutes = time % 60;
      if (hours || minutes) {
        return `${hours}h ${minutes}m`;
      }
    },
    formatMediaType(item) {
      if (item.title) {
        return "Movie";
      } else if (item.name) {
        return "TV Shows";
      } else {
        return "Movie";
      }
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    formatRevenue(revenue) {
      if (revenue >= 1000000000) {
        return "$" + (revenue / 1000000000).toFixed(1) + "B";
      } else if (revenue >= 1000000) {
        return "$" + (revenue / 1000000).toFixed(1) + "M";
      } else if (revenue >= 1000) {
        return "$" + (revenue / 1000).toFixed(1) + "K";
      } else if (revenue >= 0) {
        return "$" + revenue;
      }
    },
    LoadUserListData(item) {
      let listName = item.map((item) => item.name);
      listName = listName.join(", ");
      this.listName = listName;

      let listDescription = item.map((item) => item.description);
      listDescription = listDescription.join(", ");
      this.listDescription = listDescription;

      let userName = item.map((item) => item.created_by.username);
      userName = userName.join(", ");
      this.createBy = userName;

      let itemCount = item.map((item) => item.item_count);
      itemCount = itemCount.join(", ");
      this.itemOnList = itemCount;

      let averageRate = item.map((item) => item.average_rating);
      averageRate = averageRate.join(", ");
      this.averageRate = averageRate;

      let totalRuntime = item.map((item) => item.runtime);
      totalRuntime = totalRuntime.join(", ");
      this.totalRuntime = this.formatTime(totalRuntime);

      let totalRevenue = item.map((item) => item.revenue);
      totalRevenue = totalRevenue.join(", ");
      let formattedRevenue = parseInt(totalRevenue);
      if (formattedRevenue >= 1000000) {
        formattedRevenue = (formattedRevenue / 1000000).toFixed(1) + "M";
      } else if (formattedRevenue >= 1000) {
        formattedRevenue = Math.round(formattedRevenue / 1000) + "K";
      }
      this.totalRevenue = "$" + formattedRevenue;
    },
    async LoadItemListData(item) {
      const ItemBackdrop = item.flatMap((item) => item.backdrop_path);
      if (ItemBackdrop) {
        this.BackdropPathUrl = ItemBackdrop;
      }
      const allItem = item.flatMap((item) => item.results);
      const itemData = allItem.map((result) => ({
        id: result.id,
        media_type: result.media_type,
      }));
      for (const data of itemData) {
        try {
          await this.fetchItemDetails({
            itemId: data.id,
            mediaType: data.media_type,
          });
          await this.fetchSeenItemData({
            itemId: data.id,
            mediaType: data.media_type,
          });
          this.seenNotSeenList.push(this.getSeenItemData);
          this.itemInList.push(this.getItemDetails);
          this.originalItemInList = [...this.itemInList];
          this.seen;
        } catch (err) {
          console.error(`Failed to fetch details for ID ${data.id}:`, err);
        }
      }
      if (this.itemInList.length <= 0) {
        this.showList = false;
      } else {
        this.showList = true;
      }
    },
    ChangeGridViewState() {
      this.CurrentGridStatus = !this.CurrentGridStatus;
    },
    ChangeCommentState() {
      this.CurrentShowComment = !this.CurrentShowComment;
    },
    getComments(item) {
      const allComments = this.getDetailList.flatMap(
        (comments) => comments.comments
      );
      let tempMediatype = "movie";
      if (item.title) {
        tempMediatype = "movie";
      } else if (item.name) {
        tempMediatype = "tv";
      }
      let key = `${tempMediatype}:${item.id}`;
      let singleComment = "No comment";
      for (const commentGroup of allComments) {
        if (commentGroup[key]) {
          singleComment = commentGroup[key];
        }
      }
      return singleComment;
    },
    getImagePath(item) {
      return (
        "https://image.tmdb.org/t/p/original" +
        (item.poster_path ? item.poster_path : item.backdrop_path)
      );
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
    CheckingItemType(item) {
      const MediaType = this.formatMediaType(item);
      if (MediaType === "Movie") {
        return "item-typemv";
      } else {
        return "item-typetv";
      }
    },
    btnShareClick() {
      this.showDialog = true;
      this.shareUrl = window.location.href;
    },
    btnEditClick() {
      this.$router.replace({
        path: `/EditList`,
        query: {
          listId: this.$route.query.listId,
        },
      });
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.shareUrl);
      this.notifySuccess("URL copied to clipboard");
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
    notifyError(message) {
      this.notification = Notify.create({
        message,
        position: "top-right",
        timeout: 2000,
        color: "negative",
        closeBtn: true,
      });
    },
    navigateToSelectedItem(item) {
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
    handleLabelClick(item) {
      this.navigateToSelectedItem(item);
    },
    handleImageClick(item) {
      this.navigateToSelectedItem(item);
    },
  },

  computed: {
    ...mapGetters("getDetailList", ["getDetailList"]),
    ...mapGetters("getItemDetails", ["getItemDetails"]),
    ...mapGetters("checkSeenItem", ["getSeenItemData"]),
    CheckIconGrid() {
      return this.CurrentGridStatus ? "grid_view" : "list";
    },
    CheckLabelGrid() {
      return this.CurrentGridStatus ? "Use Grid View" : "Use List View";
    },
    CheckLabelCmt() {
      return this.CurrentShowComment ? "Show Comments" : "Hide Comments";
    },
  },
  async created() {
    await this.fetchDetailList(this.$route.query.listId);
    await this.LoadItemListData(this.getDetailList);
    await this.LoadUserListData(this.getDetailList);
  },
};
</script>

<style scoped>
.AboveSection {
  position: relative;
  margin-top: 2%;
  padding: 3%;
  color: white;
  background-color: #083454;
}

.ListTitle {
  font-weight: bold;
  cursor: pointer;
}

.ListDescription {
  font-size: large;
}

.CreateByUser {
  font-size: 25px;
  padding-left: 1%;
}

.UserName {
  cursor: pointer;
  color: #7faecf;
  font-weight: bold;
}

.UserName:hover {
  text-decoration: underline;
}

/* Second Section */
.SecondSection {
  background-color: #081c2c;
  padding-left: 2%;
}

/* Third Section */
.ThirdSection {
  color: white;
  background-color: #08141c;
  gap: 50px;
  padding-left: 3%;
  padding-top: 2%;
  padding-bottom: 2%;
}

.MoreDetail {
  font-weight: bold;
  font-size: 16px;
}

/* Data List */
.NoDataList {
  font-size: medium;
  font-weight: bold;
  text-align: center;
  padding: 2%;
}

.btnSettingDisplay {
  padding: 2%;
  text-align: center;
}

.btn-gap {
  margin-right: 15px;
}

/* List View Container */

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  margin-right: 2%;
  margin-left: 2%;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.item-index {
  flex: 0 0 30px;
  color: grey;
  font-size: medium;
}

.item-details {
  flex: 1;
  display: flex;
  align-items: center;
}

.item-title {
  cursor: pointer;
  font-weight: bold;
  font-size: medium;
  width: 30%;
}

.comments-item {
  border-left: 1px solid #bbb8b8;
  padding: 10px;
  font-size: small;
  color: grey;
}

.item-rating {
  display: flex;
  align-items: center;
  text-align: right;
  gap: 15px;
  width: 35%;
}

.rating-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-type,
.item-date {
  padding: 6px 10px;
  border-radius: 20px;
  color: #fff;
}

.item-typemv {
  background: linear-gradient(45deg, #f8ae6d, #e46a82);
}

.item-typetv {
  background: linear-gradient(45deg, #ac74fc, #ac3cfc);
}

.item-date {
  background-color: #08141c;
}

.item-duration,
.item-revenue {
  color: grey;
}

/* Grid View Container */
.grid-container {
  display: flex;
  flex-wrap: wrap;
  padding: 2%;
  gap: 15px;
}

.grid-item {
  box-sizing: border-box;
  border: 1px solid rgb(209, 206, 206);
  border-radius: 10px;
  width: 203px;
  height: 100%;
  margin-bottom: 3%;
}

.imageContent {
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-bottom: 10px;
}

.imageWrapper {
  position: relative;
}

.itemTitle {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  display: block;
  font-weight: bold;
  font-size: larger;
  margin-left: 10px;
}

.itemDate {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  display: block;
  margin-left: 10px;
}

.grid-comments-item {
  margin-top: 2%;
  border-top: 1px solid #bbb8b8;
  padding: 10px;
  font-size: small;
  color: grey;
}

.clickable-label {
  cursor: pointer;
  color: black;
}

.clickable-label:hover {
  color: #04b4e4;
  text-decoration: underline;
}

.container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>