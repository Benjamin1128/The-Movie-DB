<template>
  <div class="row">
    <p>Popular People</p>
  </div>
  <div class="people-grid">
    <div class="person-card" v-for="item in peopleList" :key="item.id">
      <q-img
        @click="handleImageClick(item)"
        placeholder-src="../assets/defaultImg.svg"
        :src="getImagePath(item)"
        style="height: 300px; cursor: pointer"
        fit="cover"
      ></q-img>
      <div class="person-info">
        <h2 class="person-name clickable-label" @click="handleLabelClick(item)">
          {{ item.name }}
          <span
            v-if="item.original_name && item.original_name !== item.name"
            class="original-name"
          >
            ({{ item.original_name }})
          </span>
        </h2>
        <p class="person-known">
          {{ getKnownFor(item.known_for) }}
        </p>
      </div>
    </div>
  </div>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>Current Page :</span>
    <q-input
      v-model.number="pageInput"
      type="number"
      filled
      rounded
      dense
      style="width: 100px; font-size: large; padding: 0%"
      :min="1"
      :max="peopleListTP"
      placeholder="Current Page"
      @keydown.enter="goToPage(pageInput, peopleListTP)"
    />
    <span>/ Total Pages : {{ peopleListTP }}</span>
    <button
      @click="goToPage(pageInput, peopleListTP)"
      :disabled="!isValidPage(pageInput, peopleListTP)"
    >
      Go
    </button>
    <button
      @click="nextPage(peopleListTP)"
      :disabled="currentPage === peopleListTP"
    >
      Next
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      pageInput: 1,
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions("getPeopleList", ["fetchPeopleList"]),
    getImagePath(item) {
      return "https://image.tmdb.org/t/p/original" + item.profile_path;
    },
    handleLabelClick(item) {
      this.$router.replace({
        path: `/PeopleDetails`,
        query: {
          personId: item.id,
        },
      });
    },
    handleImageClick(item) {
      this.$router.replace({
        path: `/PeopleDetails`,
        query: {
          personId: item.id,
        },
      });
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchPeopleList(this.currentPage);
        this.pageInput = this.currentPage;
      }
    },
    async nextPage(totalPages) {
      if (this.currentPage < totalPages) {
        this.currentPage++;
        await this.fetchPeopleList(this.currentPage);
        this.pageInput = this.currentPage;
      }
    },
    async goToPage(targetPage, totalPages) {
      if (targetPage <= totalPages) {
        this.currentPage = targetPage;
        await this.fetchPeopleList(this.currentPage);
        this.pageInput = this.currentPage;
      } else {
        alert("Oops, Exceed the results pages.");
      }
    },
    isValidPage(page, totalPages) {
      return page !== "" && !isNaN(page) && page >= 1 && page <= totalPages;
    },
    getKnownFor(knownFor) {
      return knownFor
        .map(
          (movie) =>
            movie.title ||
            movie.original_title ||
            movie.name ||
            movie.original_name
        )
        .join(", ");
    },
  },
  computed: {
    ...mapGetters("getPeopleList", ["getPeopleList"]),
    ...mapGetters("getPeopleList", ["getPeopleListTP"]),
    peopleList() {
      return this.getPeopleList;
    },
    peopleListTP() {
      return this.getPeopleListTP;
    },
  },
  async created() {
    await this.fetchPeopleList("1");
  },
};
</script>

<style scoped>
.row {
  padding-top: 7%;
  padding-left: 3%;
}

.row p {
  font-weight: bold;
  font-size: 24px;
}

.people-grid {
  margin-left: 2%;
  margin-right: 2%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.person-card {
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
}

.person-info {
  padding-left: 3%;
}

.person-name {
  font-weight: bold;
  font-size: 18px;
  margin: 0 0 0 0;
  cursor: pointer;
}
.person-known {
  color: grey;
  margin: 0 0 0 0;
}

.original-name {
  font-weight: lighter;
  font-size: 18px;
}

.clickable-label {
  cursor: pointer;
  color: black;
}

.clickable-label:hover {
  color: #04b4e4;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2%;
}

.pagination button {
  cursor: pointer;
  min-width: 80px;
  height: auto;
  width: auto;
  background: linear-gradient(45deg, #90cea1, #01b4e4);
  color: white;
  font-size: medium;
  margin: 5px;
  border: none;
  border-radius: 20px;
}

.pagination q-input,
.pagination span {
  margin: 5px;
  font-weight: bold;
  font-size: medium;
  vertical-align: middle;
}
</style>
