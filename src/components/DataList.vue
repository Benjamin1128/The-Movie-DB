<template>
  <div>
    <q-scroll-area style="height: 340px; overflow-x: auto; white-space: nowrap">
      <div class="row no-wrap">
        <div
          v-for="item in items"
          :key="item.id"
          style="
            width: 160px;
            height: 100%;
            display: inline-block;
            margin-right: 10px;
          "
        >
          <div class="imageContent">
            <q-img
              @click="handleImageClick(item)"
              placeholder-src="../assets/defaultImg.svg"
              :src="
                'https://image.tmdb.org/t/p/original' +
                (item.poster_path ? item.poster_path : item.backdrop_path)
              "
              style="width: 150px; height: 230px; border-radius: 10px"
              fit="fill"
            >
            </q-img>
            <OptionsButton :item="item" :ViewListOptions="false" />
          </div>
          <div>
            <q-knob
              :min="0"
              :max="10"
              :model-value="normalizedVoteAverage(item)"
              show-value
              size="38px"
              :thickness="0.2"
              :color="knobColor(item)"
              center-color="black"
              track-color="grey"
              class="text-white"
              :readonly="true"
              style="position: absolute; top: 210px; margin-left: 8px"
            >
              <div style="font-size: 12px; font-weight: bold">
                {{ (normalizedVoteAverage(item) * 10).toFixed() }}%
              </div>
            </q-knob>

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
    </q-scroll-area>
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
    formatDate(dataString) {
      if (dataString) {
        const date = new Date(dataString);
        const options = { year: "numeric", month: "short", day: "2-digit" };
        return date.toLocaleDateString("en-US", options);
      } else {
        return "No specified date.";
      }
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
  },
};
</script>

<style scoped>
.imageContent {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.itemTitle {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  display: block;
  font-weight: bold;
  font-size: 16px;
  padding-top: 12%;
  padding-left: 4%;
}

.itemDate {
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  display: block;
  padding-left: 4%;
}

.clickable-label {
  cursor: pointer;
  color: black;
}

.clickable-label:hover {
  color: rgb(1, 180, 228);
}
</style>