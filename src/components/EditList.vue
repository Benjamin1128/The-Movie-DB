<template>
  <div class="row wrapperAll">
    <div class="col-3">
      <q-card class="my-card">
        <q-card-section class="sectionHeader">
          <div class="text-h6">Edit</div>
        </q-card-section>
        <q-list bordered separator>
          <q-item
            v-for="category in categories"
            :key="category.name"
            clickable
            v-ripple
            :active="selectedCategory === category.modelValue"
            active-class="selected-item"
            class="SideBarSection"
            @click="selectCategory(category.modelValue)"
          >
            <q-item-section>{{ category.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
    <div class="col-9 formCreatelist">
      <div v-if="EditList">
        <h5>{{ this.listname }}</h5>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input filled v-model="listname" label="Name" />
          <q-input
            filled
            v-model="listdescription"
            type="textarea"
            label="Description"
          />
          <q-select
            filled
            v-model="publicList"
            :options="['Yes', 'No']"
            label="Public List?"
          />
          <q-select
            filled
            v-model="showComments"
            :options="['Yes', 'No']"
            label="Show Comments"
          />
          <q-select
            filled
            v-model="sortBy"
            :options="[
              { label: 'Original Ascending', value: 'original_order.asc' },
              { label: 'Original Descending', value: 'original_order.desc' },
              { label: 'Rating Ascending', value: 'vote_average.asc' },
              { label: 'Rating Descending', value: 'vote_average.desc' },
              { label: 'Release Date Ascending', value: 'release_date.asc' },
              { label: 'Release Date Descending', value: 'release_date.desc' },
              {
                label: 'Primary Release Date Ascending',
                value: 'primary_release_date.asc',
              },
              {
                label: 'Primary Release Date Descending',
                value: 'primary_release_date.desc',
              },
              { label: 'Title (A-Z)', value: 'title.asc' },
              { label: 'Title (Z-A)', value: 'title.desc' },
            ]"
            label="Sort By"
          />
          <q-btn no-caps label="Save" type="submit" class="btnContinue" />
        </q-form>
      </div>
      <div v-else-if="EditItem">
        <h5>{{ this.listname }}</h5>
        <label>Add Item (Movie or TV Show)</label>
        <q-input
          ref="searchInput"
          v-model="targetSearch"
          placeholder="Search for a movie or TV show..."
          dense
          @update:model-value="onTextChange"
          @focus="isInputFocus = true"
          @blur="isInputFocus = false"
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
        <div v-if="isInputFocus" class="results-container">
          <div
            v-for="tgtItem in searchTgtData"
            :key="`${tgtItem.id}-${tgtItem.media_type}`"
            class="result-item"
          >
            <div
              class="row itemInfo"
              @mousedown.prevent="handleResultClick(tgtItem)"
            >
              <q-img
                :src="getImagePath(tgtItem)"
                class="result-icon"
                placeholder-src="../assets/defaultImg.svg"
              />
              <div class="result-text">
                <div>
                  {{ tgtItem.name ? tgtItem.name : tgtItem.title }}
                  <span
                    v-if="
                      ((tgtItem.original_name || tgtItem.original_title) &&
                        tgtItem.original_name !== tgtItem.name) ||
                      tgtItem.original_title !== tgtItem.title
                    "
                  >
                    ({{
                      tgtItem.original_name
                        ? tgtItem.original_name
                        : tgtItem.original_title
                    }})
                  </span>
                </div>
                <div class="subtext">
                  <span
                    :class="['mediaText', mediaTypeClass(tgtItem.media_type)]"
                  >
                    {{ DISPLAYMEDIATYPE(tgtItem.media_type) }}
                  </span>
                  <span
                    :class="['blackDot', mediaTypeClassDot(tgtItem.media_type)]"
                  ></span>
                  <span class="dateText">
                    {{
                      tgtItem.release_date
                        ? tgtItem.release_date
                        : tgtItem.first_air_date
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="itemListWithComment && itemListWithComment.length > 0">
          <div
            v-for="(item, index) in itemListWithComment"
            :key="item.id"
            class="eachItemSection"
          >
            <div class="row items-center">
              <div class="listitemTitle col">
                {{ index + 1 }}. {{ item.name ? item.name : item.title }}
              </div>
              <q-btn
                flat
                round
                dense
                icon="delete"
                @click="btnDeleteTarget(item)"
              />
            </div>
            <div class="row">
              <q-input
                v-model="item.comment"
                autogrow
                outlined
                placeholder="Write comment here..."
                class="ItemComment"
                @update:model-value="onCommentChange(item)"
              />
              <q-space />
              <q-btn
                :disable="!item.comment"
                label="Save"
                class="btnSaveItemComment"
                @click="btnSaveComment(item)"
              />
            </div>
          </div>
        </div>
        <div v-else class="NoItemList">
          There are no items added to this list.
        </div>
      </div>
      <div v-else-if="ChooseImg">
        <h5>{{ this.listname }}</h5>
        <div class="item-container">
          <div
            v-for="(item, index) in itemListWithComment"
            :key="item.id"
            class="item-image"
          >
            <div class="titleSection">
              {{ index + 1 }} . {{ item.title ? item.title : item.name }}
            </div>
            <div class="imageWrapper">
              <q-img
                fit="fill"
                class="imageForSelect"
                :src="getImagePath(item)"
                placeholder-src="../assets/defaultImg.svg"
                @click="handleSelectThisImage(item)"
              />
              <div v-if="item.selectedImage" class="keepLay">
                <div class="overlayText" @click="handleSelectThisImage(item)">
                  SELECTED
                </div>
              </div>
              <div v-else class="overlay">
                <div class="overlayText" @click="handleSelectThisImage(item)">
                  {{ item.selectedImage ? "SELECTED" : "SELECT THIS IMAGE" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="DltList">
        <h5>{{ this.listname }}</h5>
        <label>
          Click the button below if you are sure you want to delete this list.
        </label>
        <div class="btnDeleteSection">
          <q-btn label="Delete" class="btnDeleteList" @click="btnDeleteList" />
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="isDeleteOpen" persistent>
    <q-card class="delete-dialog">
      <q-card-section class="row items-center q-pb-none">
        <div class="deleteTitle">Are you sure?</div>
        <q-space />
        <q-btn size="x-large" icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator />
      <q-card-section class="deleteSubtitle">
        <div>By clicking yes, this list will be permanently deleted.</div>
      </q-card-section>
      <q-card-section class="btnConfirmDelete">
        <q-btn
          no-caps
          style="
            width: 50%;
            background-color: grey;
            border-radius: 10px;
            font-weight: bold;
            font-size: medium;
          "
          v-close-popup
          >No</q-btn
        >
        <q-btn
          no-caps
          style="
            width: 50%;
            background-color: red;
            border-radius: 10px;
            font-weight: bold;
            font-size: medium;
          "
          @click="deleteTargetList"
          >Yes</q-btn
        >
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { Notify } from "quasar";
export default {
  data() {
    return {
      listname: "",
      listdescription: "",
      publicList: "Yes",
      showComments: "Yes",
      sortBy: "Original Ascending",
      selectedCategory: "addmovie",
      categories: [
        { name: "Edit List", modelValue: "editlist" },
        { name: "Add/Edit Items", modelValue: "addmovie" },
        { name: "Choose Image", modelValue: "chsimg" },
        { name: "Delete List", modelValue: "dltlist" },
      ],
      EditList: false,
      EditItem: true,
      ChooseImg: false,
      DltList: false,
      isDeleteOpen: false,
      isInputFocus: false,
      targetSearch: "",
      itemComment: "",
      itemListWithComment: [],
      imageSelected: false,
    };
  },
  methods: {
    ...mapActions("searchMovieTvTgt", ["fetchSearchTgtData"]),
    ...mapActions("getDetailList", ["fetchDetailList"]),
    ...mapActions("AddItemToList", ["postMediaToList"]),
    ...mapActions("DeleteList", ["deleteList"]),
    ...mapActions("UpdateList", ["putUpdateList"]),
    ...mapActions("RemoveItems", ["removeItem"]),
    ...mapActions("UpdateItemsComment", ["putCommentItem"]),
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
    async onSubmit() {
      if (this.listname) {
        await this.putUpdateList({
          accesstoken: this.getAccessToken,
          listId: this.$route.query.listId,
          listname: this.listname,
          listdescription: this.listdescription,
          listPublicstatus: this.publicList,
          sortBy: this.sortBy,
        });
        this.notifySuccess("Your changes have been successfully saved.");
      } else {
        this.notifyError("The name of the list is required.");
      }
    },
    MapListDataAsName(item) {
      const allName = item.map((item) => item.name);
      return allName.join(", ");
    },
    MapListDataAsDescirption(item) {
      const allName = item.map((item) => item.description);
      return allName.join(", ");
    },
    MapListDataAsPublic(item) {
      const allName = item.map((item) => item.public);
      let tempPub = "";
      if (allName.join(", ") === "true") {
        tempPub = "Yes";
      } else {
        tempPub = "No";
      }
      return tempPub;
    },
    MapListDataAsSortBy(item) {
      let allName = item.map((item) => item.sort_by);
      allName = allName.join(", ");
      let tempSort = "";
      if (allName === "original_order.asc") {
        tempSort = "Original Ascending";
      } else if (allName === "original_order.desc") {
        tempSort = "Original Descending";
      } else if (allName === "vote_average.asc") {
        tempSort = "Rating Ascending";
      } else if (allName === "vote_average.desc") {
        tempSort = "Rating Descending";
      } else if (allName === "release_date.asc") {
        tempSort = "Release Date Ascending";
      } else if (allName === "release_date.desc") {
        tempSort = "Release Date Descending";
      } else if (allName === "Primary Release Date Ascending") {
        tempSort = "primary_release_date.asc";
      } else if (allName === "Primary Release Date Descending") {
        tempSort = "primary_release_date.desc";
      } else if (allName === "title.asc") {
        tempSort = "Title (A-Z)";
      } else if (allName === "title.desc") {
        tempSort = "Title (Z-A)";
      }
      return tempSort;
    },
    selectCategory(category) {
      this.selectedCategory = category;
      this.EditList = false;
      this.EditItem = false;
      this.ChooseImg = false;
      this.DltList = false;
      switch (this.selectedCategory) {
        case "editlist":
          this.EditList = true;
          break;
        case "addmovie":
          this.EditItem = true;
          break;
        case "chsimg":
          this.ChooseImg = true;
          break;
        case "dltlist":
          this.DltList = true;
          break;
      }
    },
    clearSearchBar() {
      this.targetSearch = "";
    },
    btnDeleteList() {
      this.isDeleteOpen = true;
    },
    async deleteTargetList() {
      await this.deleteList({
        accesstoken: this.getAccessToken,
        listId: this.$route.query.listId,
      });
      this.notifySuccess("Target list deleted.");
      this.$router.replace({
        path: `/UserPage`,
        query: {
          targetMenu: "Lists",
        },
      });
    },
    getImagePath(item) {
      return (
        "https://image.tmdb.org/t/p/original" +
        (item.backdrop_path ? item.backdrop_path : item.poster_path)
      );
    },
    DISPLAYMEDIATYPE(item) {
      if (item === "movie") {
        return "MOVIE";
      } else if (item === "tv") {
        return "TV SHOW";
      }
    },
    mediaTypeClass(mediaType) {
      if (mediaType === "tv") {
        return "tvColor";
      } else if (mediaType === "movie") {
        return "movieColor";
      }
    },
    mediaTypeClassDot(mediaType) {
      if (mediaType === "tv") {
        return "tvDot";
      } else if (mediaType === "movie") {
        return "movieDot";
      }
    },
    async onTextChange() {
      await this.fetchSearchTgtData(this.targetSearch);
    },
    async handleResultClick(item) {
      await this.postMediaToList({
        accesstoken: this.getAccessToken,
        sessionId: this.getSessionID,
        targetMediaId: item.id,
        targetListId: this.$route.query.listId,
        mediaType: item.media_type,
      })
        .then(() => {
          this.isInputFocus = false;
          this.targetSearch = "";
          this.$refs.searchInput.blur();
          this.notifySuccess("Item added!");
        })
        .then(() => {
          return this.fetchDetailList(this.$route.query.listId);
        })
        .then(() => {
          return this.LoadItemList(this.getDetailList);
        });
    },
    LoadItemList(item) {
      const ExistBackPath = item.flatMap((items) => items.backdrop_path);
      const allItems = item.flatMap((items) => items.results);
      const allComments = item.flatMap((comments) => comments.comments);
      this.itemListWithComment = allItems.map((result) => {
        const id = result.id;
        const mediaType = result.media_type;
        const commentKey = `${mediaType}:${id}`;
        let singleComment = "";
        let checkedImage = false;
        if (
          ExistBackPath.includes(
            result.backdrop_path ? result.backdrop_path : result.poster_path
          )
        ) {
          checkedImage = true;
        }
        for (const commentGroup of allComments) {
          if (commentGroup[commentKey]) {
            singleComment = commentGroup[commentKey];
          }
        }
        return {
          ...result,
          comment: singleComment,
          selectedImage: checkedImage,
        };
      });
    },
    async btnSaveComment(item) {
      await this.putCommentItem({
        accesstoken: this.getAccessToken,
        mediaType: item.media_type,
        mediaId: item.id,
        mediaComment: this.itemComment,
        listId: this.$route.query.listId,
      }).then(() => {
        this.notifySuccess("Comment updated!");
      });
    },
    async btnDeleteTarget(item) {
      await this.removeItem({
        accesstoken: this.getAccessToken,
        listId: this.$route.query.listId,
        mediaType: item.media_type,
        mediaId: item.id,
      })
        .then(() => {
          this.isInputFocus = false;
          this.targetSearch = "";
          this.$refs.searchInput.blur();
          this.notifySuccess("Item removed!");
        })
        .then(() => {
          return this.fetchDetailList(this.$route.query.listId);
        })
        .then(() => {
          return this.LoadItemList(this.getDetailList);
        });
    },
    onCommentChange(item) {
      this.itemComment = item.comment;
    },
    async handleSelectThisImage(item) {
      await this.putUpdateList({
        accesstoken: this.getAccessToken,
        listId: this.$route.query.listId,
        listname: this.listname,
        listdescription: this.listdescription,
        listPublicstatus: this.publicList,
        sortBy: this.sortBy,
        imagePath: item.backdrop_path ? item.backdrop_path : item.poster_path,
      })
        .then(() => {
          this.notifySuccess("Image saved!");
        })
        .then(() => {
          return this.fetchDetailList(this.$route.query.listId);
        })
        .then(() => {
          return this.LoadItemList(this.getDetailList);
        });
    },
  },
  computed: {
    ...mapGetters("userdata", [
      "getUserLogin",
      "getUsername",
      "getUserLogout",
      "getSessionID",
      "getAccessToken",
    ]),
    ...mapGetters("getDetailList", ["getDetailList"]),
    ...mapGetters("searchMovieTvTgt", ["getSearchTgtData"]),
    searchTgtData() {
      return this.getSearchTgtData;
    },
  },
  async created() {
    await this.fetchDetailList(this.$route.query.listId);
    this.listname = this.MapListDataAsName(this.getDetailList);
    this.listdescription = this.MapListDataAsDescirption(this.getDetailList);
    this.publicList = this.MapListDataAsPublic(this.getDetailList);
    this.sortBy = this.MapListDataAsSortBy(this.getDetailList);
    await this.LoadItemList(this.getDetailList);
  },
};
</script>

<style scoped>
.wrapperAll {
  margin: 3%;
}
.my-card {
  margin-top: 25%;
  width: 100%;
  max-width: 250px;
  border-radius: 10px;
}
.sectionHeader {
  color: white;
  background-color: #08b4e4;
}

.SideBarSection {
  font-size: medium;
}
.SideBarSection:hover {
  color: aqua;
}

.formCreatelist {
  margin-top: 3%;
}

.formCreatelist h5 {
  font-weight: bold;
}

.formCreatelist label {
  font-size: medium;
}

.btnContinue {
  color: white;
  background-color: #08b4e4;
  border-radius: 10px;
}

.selected-item {
  font-weight: bold;
  background-color: rgba(68, 70, 71, 0.1);
}

.eachItemSection {
  margin-top: 5%;
}

.btnSaveItemComment {
  color: white;
  background-color: #08b4e4;
  height: 20px;
  border-radius: 10px;
}

.btnDeleteSection {
  margin-top: 2%;
}

.btnDeleteList {
  color: white;
  background-color: red;
  height: 20px;
  border-radius: 10px;
}

.ItemComment {
  height: 10px;
  width: 85%;
}

.delete-dialog {
  border-radius: 20px;
  width: auto;
  min-width: 300px;
  overflow: hidden;
  color: #042444;
}

.deleteTitle {
  font-size: 28px;
  font-weight: bold;
}

.deleteSubtitle {
  font-size: medium;
}
.btnConfirmDelete {
  text-align: center;
}

.results-container {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
}

.result-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
}

.itemInfo {
  cursor: pointer;
  align-items: center;
}

.result-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.result-icon {
  width: 50px;
  height: 80px;
  object-fit: fill;
  margin-right: 10px;
  margin-left: 10px;
}

.result-text {
  flex: 1;
  font-size: 14px;
  font-weight: bold;
}

.subtext {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 5px;
}

.mediaText {
  font-size: 14px;
}

.dateText {
  font-size: 14px;
  color: #888;
}

.blackDot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.tvColor {
  color: darkgreen;
}

.movieColor {
  color: aqua;
}

.tvDot {
  background-color: darkgreen;
}

.movieDot {
  background-color: aqua;
}

.listitemTitle {
  font-size: medium;
  font-weight: bold;
}
.titleSection {
  font-weight: bold;
  font-size: medium;
}

.imageForSelect {
  cursor: pointer;
  height: 300px;
  width: 450px;
  border-radius: 10px;
  transition: filter 0.3s ease;
}

.imageForSelect:hover {
  filter: grayscale(100%);
}

.item-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.item-image {
  width: 450px;
}

.imageWrapper {
  position: relative;
  width: 100%;
}
.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #08b4e4;
  color: white;
  padding: 10px;
  width: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.imageWrapper:hover .overlay {
  cursor: pointer;
  opacity: 1;
}

.keepLay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #08b4e4;
  color: white;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  opacity: 1;
  transition: opacity 0.3s ease;
}
.overlayText {
  font-size: 16px;
  text-align: center;
}

.NoItemList {
  margin-top: 5%;
  font-size: medium;
}
</style>
