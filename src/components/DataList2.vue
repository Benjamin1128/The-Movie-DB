<template>
  <div class="grid-container">
    <div v-if="items.length === 0" class="no-items-message">
      No items were found that match your query.
    </div>
    <div v-else class="got-items">
      <div v-for="item in items" :key="item.id" class="grid-item">
        <div class="imageContent">
          <div class="imageWrapper">
            <q-img
              @click="handleImageClick(item)"
              placeholder-src="../assets/defaultImg.svg"
              :src="getImagePath(item)"
              style="
                width: 153px;
                height: 230px;
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
              style="position: relative; top: -20px; left: 10px; z-index: 10"
            >
              <div style="font-size: 14px; font-weight: bold">
                {{ (normalizedVoteAverage(item) * 10).toFixed() }}%
              </div>
            </q-knob>
          </div>
          <OptionsButton :item="item" :ViewListOptions="false" />

          <div class="movieDetails">
            <label
              class="itemTitle clickable-label"
              @click="handleLabelClick(item)"
            >
              {{ item.name ? item.name : item.title }}
            </label>
            <div>
              <label class="itemDate">
                {{
                  formatDate(
                    item.release_date ? item.release_date : item.first_air_date
                  )
                }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OptionsButton from "./OptionsButton.vue";

export default {
  components: {
    OptionsButton,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getImagePath(item) {
      return (
        "https://image.tmdb.org/t/p/original" +
        (item.poster_path ? item.poster_path : item.backdrop_path)
      );
    },
    navigateToSelectedItem(item) {
      let currentMediaType = item.media_type;
      if (item.title) {
        currentMediaType = "movie";
      } else if (item.name) {
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
    handleImageClick(item) {
      this.navigateToSelectedItem(item);
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
    formatDate(dataString) {
      if (dataString) {
        const date = new Date(dataString);
        const options = { year: "numeric", month: "short", day: "2-digit" };
        return date.toLocaleDateString("en-US", options);
      } else {
        return "No specified date.";
      }
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}

.grid-item {
  width: 160px;
  margin-bottom: 10px;
}

.itemTitle {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  display: block;
  font-weight: bold;
  font-size: larger;
  padding-left: 8px;
  padding-right: 8px;
}

.itemDate {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  display: block;
  padding-left: 8px;
  padding-bottom: 10px;
}

.imageContent {
  position: relative;
  display: inline-block;
  cursor: pointer;
  box-sizing: border-box;
  border: 1px solid rgb(209, 206, 206);
  border-radius: 10px;
  width: 155px;
  height: 100%;
}

.clickable-label {
  cursor: pointer;
  color: black;
}

.clickable-label:hover {
  color: #04b4e4;
}

.imageWrapper {
  position: relative;
}

.q-knob {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
}

.no-items-message {
  font-size: 16px;
  color: black;
  text-align: center;
}

.got-items {
  display: contents;
}
</style>