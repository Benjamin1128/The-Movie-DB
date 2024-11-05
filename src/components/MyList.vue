<template>
  <div>
    <div class="row headerRow">
      <div class="titleMyList">My Lists</div>
      <q-space />
      <q-btn no-caps class="btnCreateList" @click="btnCreateList"
        >Create List</q-btn
      >
    </div>
    <div class="grid-container">
      <div v-for="item in ListFile" :key="item.id">
        <q-img
          class="listCard"
          :src="getImagePath(item)"
          @click="OpenListTarget(item)"
          :style="{
            cursor: 'pointer',
            height: '240px',
            width: '460px',
            'border-radius': '10px',
            'background-color': 'rgb(3,37,65)',
          }"
        >
          <div class="ListItem">
            <div class="titleList">{{ item.name }}</div>
            <div class="row SecondDetailRow">
              <div class="countItem">{{ item.number_of_items }} items</div>
              <div class="publicityList">
                {{ item.public ? "PUBLIC" : "PRIVATE" }}
              </div>
            </div>
            <div class="createdAt">
              Updated about {{ getTimePassed(item.updated_at) }} ago
            </div>
          </div>
        </q-img>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loadedpage: 1,
    };
  },
  methods: {
    ...mapActions("getListFile", ["fetchListFile"]),
    getImagePath(item) {
      let finalPath = `/defaultImg.svg`;
      if (item.backdrop_path || item.poster_path) {
        finalPath =
          "https://image.tmdb.org/t/p/original" +
          (item.backdrop_path ? item.backdrop_path : item.poster_path);
      }
      return finalPath;
    },
    OpenListTarget(item) {
      this.$router.replace({
        path: `/ViewList`,
        query: {
          listId: item.id,
        },
      });
    },
    getTimePassed(timestamp) {
      if (!timestamp) {
        return "Invalid timestamp";
      }
      const updatedTime = new Date(timestamp.replace("UTC", "Z"));
      if (isNaN(updatedTime.getTime())) {
        return "Invalid date";
      }
      const now = new Date();
      const diffInMs = now - updatedTime;
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const days = Math.floor(diffInSeconds / (3600 * 24));
      const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      if (days > 0) {
        return `${days} day${days > 1 ? "s" : ""}`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? "s" : ""}`;
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? "s" : ""}`;
      } else {
        return "less than a minute";
      }
    },
    btnCreateList() {
      this.$router.replace({
        path: `/CreateList`,
      });
    },
  },
  computed: {
    ...mapGetters("getListFile", ["getListFile"]),
    ...mapGetters("getListFile", ["getTPListFile"]),
    ...mapGetters("userdata", [
      "getUserLogin",
      "getUsername",
      "getUserLogout",
      "getSessionID",
      "getAccessToken",
      "getAccountID",
    ]),
    ListFile() {
      return this.getListFile;
    },
  },
  async created() {
    await this.fetchListFile({
      accesstoken: this.getAccessToken,
      AccountID: this.getAccountID,
      loadMorePage: this.loadedpage,
    });
  },
};
</script>

<style scoped>
.headerRow {
  padding-top: 2%;
  padding-right: 3%;
}

.titleMyList {
  margin-left: 1%;
  font-size: 25px;
  font-weight: bold;
}

.btnCreateList {
  color: white;
  background-color: #885ce4;
  border-radius: 10px;
  font-size: medium;
  font-weight: bold;
}

.btnCreateList:hover {
  background-color: #082444;
}

.grid-container {
  margin: 2% 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  align-content: center;
}

.ListItem {
  height: 240px;
  width: 460px;
  border-radius: 10px;
  text-align: center;
  align-content: center;
  cursor: pointer;
}

.titleList {
  color: white;
  font-size: 30px;
  font-weight: bold;
  font-style: italic;
  white-space: normal;
}

.SecondDetailRow {
  justify-content: center;
  gap: 20px;
  margin-top: 1%;
}

.countItem {
  color: white;
  font-size: 17px;
  font-weight: bold;
  font-style: italic;
}

.publicityList {
  color: white;
  background-color: grey;
  width: 80px;
  font-size: medium;
  border-radius: 5px;
  height: auto;
  align-content: center;
  align-items: center;
}

.createdAt {
  color: white;
  margin-top: 1%;
  font-size: medium;
}
</style>