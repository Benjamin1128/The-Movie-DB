<template>
  <div class="contentSection">
    <div class="column">
      <div class="search-results-card">
        <div class="card-header">
          Search Results </div>
          <q-list bordered separator>
            <q-item
              v-for="category in categories"
              :key="category.name"
              clickable
              v-ripple
              :active="selectedCategory === category.modelValue"
              active-class="selected-item"
              @click="selectCategory(category.modelValue)"
            >
              <q-item-section>{{ category.name }}</q-item-section>
              <q-item-section side>
                <q-badge 
                  color="grey-3"
                  text-color="black"
                  :label="category.count"
                />
              </q-item-section>
            </q-item>
          </q-list>
          <div class="tip-section">
            <q-img 
              src="../assets/tipIcon.svg"
              style="height: 20px; width: 20px"
            />
            <span class="tip-text">
              Tip: You can use the 'y:' filter to narrow your results
              by year. Example: 'starwars y:1977'.
            </span>
          </div>
      </div>
    </div>
    <div class="column">
      <div v-if="currentCategoryData.length > 0">
        <div
          v-for="result in currentCategoryData"
          :key="result.id"
          class="content-card card-content { display: flex; align-items: stretch; }"
        >
          <div
            v-if="this.selectedCategory == 'movie'"
            class="container-movie"
          > 
            <div class="movie-poster">
              <q-img
                placeholder-src="../assets/defaultImg.svg"
                :src="
                  `https://image.tmdb.org/t/p/original` +
                  (result.poster_path ? result.poster_path 
                  :result.backdrop_path ? result.backdrop_path
                  :result.profile_path)
                "
                :alt="result.title"
                fit="cover"
                clickable
                @click="handleImageClick(result)"
              />
            </div>
            <div class="movie-info">
              <h2
                class="movie-title clickable-label"
                @click="handleLabelClick(result)"
              >
                {{ result.title ? result.title : result.name }}
                <span
                  v-if="
                    ((result.original_name || result.original_title) &&
                    result.original_name !== result.name) ||
                    result.original_title != result.title
                  "
                  class="original-title"
                >
                  ({{ 
                    result.original_name ? result.original_name : result.original_title
                  }})
                </span>
              </h2>
              <p class="movie-date">
                {{ formatDate(
                  result.release_date 
                  ? result.release_date
                  : result.first_air_date
                ) }}
              </p>
              <p class="movie-overview">
                {{ truncateText(result.overview, 20) }}
              </p>
            </div>
          </div>

          <div
            v-else-if="this.selectedCategory == 'tv'"
            class="container-tv"
          > 
            <div class="tv-poster">
              <q-img
                placeholder-src="../assets/defaultImg.svg"
                :src="
                  `https://image.tmdb.org/t/p/original` +
                  (result.poster_path ? result.poster_path 
                  :result.backdrop_path ? result.backdrop_path
                  :result.profile_path)
                "
                :alt="result.title"
                fit="cover"
                clickable
                @click="handleImageClick(result)"
              />
            </div>
            <div class="tv-info">
              <h2
                class="tv-title clickable-label"
                @click="handleLabelClick(result)"
              >
                {{ result.title ? result.title : result.name }}
                <span
                  v-if="
                    ((result.original_name || result.original_title) &&
                    result.original_name !== result.name) ||
                    result.original_title != result.title
                  "
                  class="original-title"
                >
                  ({{ 
                    result.original_name ? result.original_name : result.original_title
                  }})
                </span>
              </h2>
              <p class="tv-date">
                {{ formatDate(
                  result.release_date 
                  ? result.release_date
                  : result.first_air_date
                ) }}
              </p>
              <p class="tv-overview">
                {{ truncateText(result.overview, 20) }}
              </p>
            </div>
          </div>

          <div
            v-else-if="this.selectedCategory == 'person'"
            class="container-person"
          > 
            <div class="person-poster">
              <q-img
                placeholder-src="../assets/personDefault.svg"
                :src="
                  `https://image.tmdb.org/t/p/original` +
                  result.profile_path
                "
                :alt="result.title"
                fit="cover"
                clickable
                @click="handlePersonImgClick(result)"
              />
            </div>
            <div class="person-info">
              <h2
                class="person-name clickable-label"
                @click="handlePersonlblClick(result)"
              >
                {{ result.name }}
                <span
                  v-if="
                    result.original_name && result.original_name !== result.name
                  "
                  class="original-name"
                >
                  ({{ 
                    result.original_name
                  }})
                </span>
              </h2>
              <div class="person-details">
                <p class="person-department">
                  {{ result.known_for_department }}
                </p>
                <div v-for="movies in result.known_for" :key="movies.id">
                  <p class="person-known">
                    | {{ movies.title ? movies.title : movies.original_title }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="this.selectedCategory == 'keyword'"  
            class="container-keyword"
          >
            <div class="keyword-info">
              <h2 class="keyword-name clickable-label" @click="handleKeywordlblClick(result)">
                {{ result.name }}
              </h2>
            </div>
          </div>

          <div
            v-else-if="this.selectedCategory == 'collection'"
            class="container-collection"
          > 
            <div class="collection-poster">
              <q-img
                placeholder-src="../assets/defaultImg.svg"
                :src="
                  `https://image.tmdb.org/t/p/original` +
                  (result.poster_path ? result.poster_path 
                  :result.backdrop_path)
                "
                :alt="result.title"
                fit="cover"
                clickable
                @click="handleImageClick(result)"
              />
            </div>
            <div class="collection-info">
              <h2
                class="collection-title clickable-label"
                @click="handleLabelClick(result)"
              >
                {{ result.title ? result.title : result.name }}
                <span
                  v-if="
                    ((result.original_name) &&
                    result.original_name !== result.name) 
                  "
                  class="original-title"
                >
                  ({{ 
                    result.original_name
                  }})
                </span>
              </h2>
              <p class="collection-overview">
                {{ truncateText(result.overview, 20) }}
              </p>
            </div>
          </div>

          <div
            v-else-if="this.selectedCategory == 'company'"
            class="container-company"
          > 
            <div class="company-info" style="display:flex; align-items:center; flex-direction: row;">
              <q-img
                v-if="result.logo_path"
                :src="`https://image.tmdb.org/t/p/original` + result.logo_path"
                fit="fill"
                @click="handleCompanyImgClick(result)"
                style="
                  max-width: 100px;
                  max-height: 50px;
                  margin-right: 15px;
                  cursor: pointer;
                "
              />
              <div
                style="display: flex; flex-direction: row; align-items: center;"
              >
                <h2 class="company-name clickable-label" @click="handleCompanylblClick(result)">
                  {{ result.name }}
                </h2>
                <span v-if="result.origin_country" class="country-badge">
                  {{ result.origin_country }}
                </span>
              </div>
            </div>
          </div>
          
        </div>
      <div class="pagnition">
        <button @click="prevPage" :disabled="currentPage === 1">
          Previous
        </button>
        <span>Current Page :</span>
        <q-input
          v-model.number="pageInput"
          type="number"
          filled
          rounded
          dense
          style="width:100px; background: #f8f9fa;"
          :min="1"
          :max="totalPages"
          placeholder="Current Page"
          @keydown.enter="goToPage(pageInput, totalPages)"
        />
        <span>/ Total Pages : {{ totalPages }}</span>
        <button @click="goToPage(pageInput, totalPages)">
          Go
        </button>
        <button @click="nextPage(totalPages)">
          Next
        </button>
      </div>
    </div>
    <div v-else>
      <p class="no-data-get">There are no data that matched your query.</p>
    </div>
   </div>  
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      categories: [
        { name: "Movies", count: 0, modelValue: "movie" },
        { name: "TV Shows", count: 0, modelValue: "tv" },
        { name: "People", count: 0, modelValue: "person" },
        { name: "Keywords", count: 0, modelValue: "keyword" },
        { name: "Collections", count: 0, modelValue: "collection" },
        { name: "Companies", count: 0, modelValue: "company" },
        { name: "Networks", count: 0, modelValue: "network" },
      ],
      currentPage: 1,
      pageInput: 1,
      selectedCategory: null,
    }
  },
  computed: {
    ...mapGetters("getTotalPages", ['getTotalPages']),
    totalPages() {
      return this.getTotalPages;
    },
    ...mapGetters("searchMovie", ['getSearchMovieData']),
    sMovieData() {
      return this.getSearchMovieData;
    },
    ...mapGetters("searchTV", ['getSearchTVData']),
    sTVData() {
      return this.getSearchTVData;
    },
    ...mapGetters("searchPerson", ['getSearchPersonData']),
    sPersonData() {
      return this.getSearchPersonData;
    },
    ...mapGetters("searchKeyword", ['getSearchKeyData']),
    sKeywordData() {
      return this.getSearchKeyData;
    },
    ...mapGetters("searchCollection", ['getSearchCollectionData']),
    sCollectionData() {
      return this.getSearchCollectionData;
    },
    ...mapGetters("searchCompany", ['getSearchCompanyData']),
    sCompanyData() {
      return this.getSearchCompanyData;
    },
    ...mapGetters("searchMovie", ['getMovieTRData']),
    ...mapGetters("searchTV", ['getTVTRData']),
    ...mapGetters("searchPerson", ['getPersonTRData']),
    ...mapGetters("searchKeyword", ['getKeyTRData']),
    ...mapGetters("searchCollection", ['getCollectionTRData']),
    ...mapGetters("searchCompany", ['getCompanyTRData']),
    currentCategoryData() {
      switch(this.selectedCategory) {
        case "movie": 
          return this.getSearchMovieData;
        case "tv":
          return this.getSearchTVData;
        case "person":
          return this.getSearchPersonData;
        case "keyword":
          return this.getSearchKeyData;
        case "collection":
          return this.getSearchCollectionData;
        case "company":
          return this.getSearchCompanyData;
        default: 
          return [];
      }
    },
  },
  methods: {
    ...mapActions("getTotalPages", ['fetchTotalPage']),
    ...mapActions("searchMovie", ['fetchSMovieData']),
    ...mapActions("searchTV", ['fetchSTVData']),
    ...mapActions("searchPerson", ['fetchSPersonData']),
    ...mapActions("searchKeyword", ['fetchSKeyData']),
    ...mapActions("searchCollection", ['fetchSCollectionData']),
    ...mapActions("searchCompany", ['fetchSCompanyData']),
    async fetchData(result, mediaType, defaultpage) {
      try {
        this.selectedCategory = mediaType;
        this.pageInput = 1;
        await Promise.all([
          this.fetchSMovieData({
            targetSearch: result,
            targetPage: defaultpage,
          }),
          this.fetchSTVData({
            targetSearch: result,
            targetPage: defaultpage,
          }),
          this.fetchSPersonData({
            targetSearch: result,
            targetPage: defaultpage,
          }),
          this.fetchSKeyData({
            targetSearch: result,
            targetPage: defaultpage,
          }),
          this.fetchSCollectionData({
            targetSearch: result,
            targetPage: defaultpage,
          }),
          this.fetchSCompanyData({
            targetSearch: result,
            targetPage: defaultpage,
          }),
          this.fetchTotalPage({
            targetSearch: result,
            targetType: mediaType,
          }),
        ]);
        this.categories[0].count = this.getMovieTRData;
        this.categories[1].count = this.getTVTRData;
        this.categories[2].count = this.getPersonTRData;
        this.categories[3].count = this.getKeyTRData;
        this.categories[4].count = this.getCollectionTRData;
        this.categories[5].count = this.getCompanyTRData;
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    },
    navigateToSelectedItem(item) {
      let currentMediaType = item.mediaType;
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
        }
      });
    },
    navigateToSelectedPerson(person) {
      this.$router.replace({
        path: `/PeopleDetails`,
        query: {
          personId: person.id,
        }
      })
    },
    navigateKeyCompany(result) {
      if (result.origin_country != undefined) {
        this.$router.replace({
          path: `/KeywordDetails`,
          query: {
            companyId: result.id,
            companyName: result.name,
            companyPath: result.logo_path,
            companyCountry: result.origin_country,
          }
        })
      } else {
        this.$router.replace({
          path: `/KeywordDetails`,
          query: {
            keywordId: result.id,
            keywordName: result.name,
          }
        })
      }
    },
    navigateToSelectedCollection(item) {
      this.$router.replace({
        path: `/CollectionDetails`,
        query: {
          item_id: item.id,
        }
      })
    },
    handleLabelClick(item) {
      if (item.popularity) {
        this.navigateToSelectedItem(item);
      } else {
        this.navigateToSelectedCollection(item);
      }
    },
    handleImageClick(item) {
      if (item.popularity) {
        this.navigateToSelectedItem(item);
      } else {
        this.navigateToSelectedCollection(item);
      }
    },
    handlePersonlblClick(person) {
      this.navigateToSelectedPerson(person);
    },
    handlePersonImgClick(person) {
      this.navigateToSelectedPerson(person);
    },
    handleKeywordlblClick(result) {
      this.navigateKeyCompany(result);
    },
    handleCompanylblClick(result) {
      this.navigateKeyCompany(result);
    },
    handleCompanyImgClick(result) {
      this.navigateKeyCompany(result);
    },
    selectCategory(category) {
      this.currentPage = 1;
      this.pageInt = 1;
      this.selectedCategory = category;
      this.fetchData(this.$route.query.result, category, this.currentPage)
    },
    formatDate(dateString) {
      if (dateString) {
        const options = {year: "numeric", month: "long", day: "numeric"};
        return new Date(dateString).toLocaleDateString("en-US", options);
      } else {
        return "Date Is Not Specified"
      }
    },
    truncateText(text, maxLength) {
      if (text && text.split(" ").length > maxLength) {
        return text.split(" ").slice(0, maxLength).join(" ") + " . . .";
      } else if (!text) {
        text="No overview or description for this.";
      }
      return text;
    },
    async prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        await this.fetchData(
          this.$route.query.result,
          this.selectedCategory,
          this.currentPage,
        );
        this.pageInput = this.currentPage;
      }
    },
    async nextPage(totalPages) {
      if (this.currentPage < totalPages) {
        this.currentPage++;
        await this.fetchData(
          this.$route.query.result,
          this.selectedCategory,
          this.currentPage,
        );
        this.pageInput = this.currentPage;
      }
    },
    async goToPage(targetPage, totalPages) {
      if (targetPage <= totalPages) {
        this.currentPage = targetPage;
        await this.fetchData(
          this.$route.query.result,
          this.selectedCategory,
          this.currentPage,
        );
        this.pageInput = this.currentPage;
      } else {
        alert("Opps, Exceed the results pages.")
      }
    },
    isValidPage(page, totalPages) {
      return page !== "" && !isNaN(page) && page >= 1 && page <= totalPages;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchData(to.query.result, to.query.mediaType, to.query.defaultpage);
    next();
  },
  async created() {
    await this.fetchData(
      this.$route.query.result,
      this.$route.query.mediaType,
      this.$route.query.defaultpage,
    )
  }
}
</script>

<style scoped>

.contentSection {
  height: auto;
  display: flex;
  padding-top: 7%;
  padding-left: 2%;
  align-content: center;
  background-color: white;
  padding-bottom: 2%;
}

.column {
  padding-left: 2%;
  padding-right: 1%;
}

.search-results-card {
  width: 260px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #00b4e4;
  color:white;
  padding: 20px;
  font-weight: bold;
  font-size: 18px;
}

.tip-section {
  background-color: #f8f9fa;
  padding-top: 25px;
  display: flex;
  align-items: start; 
  font-size: 15px;
  padding-bottom: 20px;
}

.tip-text {
  flex: 1;
  line-height: 1.4;
  color: grey;
}

.content-card {
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2%;
  width: auto;
  height: auto;
}

.card-content {
  display: flex;
  align-items: stretch;
}

.container-movie,
.container-tv,
.container-person,
.container-keyword,
.container-collection,
.container-company {
  display: contents;
}

.movie-poster,
.tv-poster,
.collection-poster {
  cursor: pointer;
  flex: 0 0 100px;
  height: 150px;
}

.movie-poster .q-img,
.tv-poster .q-img,
.collection-poster .q-img{
  height: 100%;
}

.movie-info,
.tv-info,
.collection-info {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.movie-title,
.tv-title {
  margin-bottom: 0px;
  line-height: 1;
  font-size: large;
  font-weight: bold;
}

.collection-title {
  margin-bottom: 0px;
  line-height: 1;
  font-size: large;
  font-weight: bold;
  margin-bottom: 15px;
}

.original-title,
.original-name {
  color: grey;
  font-weight: lighter;
}

.movie-date,
.tv-date {
  color: #666;
  font-size: medium;
  margin-bottom: 15px;
}

.movie-overview,
.tv-overview,
.collection-overview {
  font-size: medium;
  line-height: 1;
  flex-grow: 1;
  overflow: hidden;
}

.person-poster {
  cursor: pointer;
  flex: 0 0 100px;
  height: 150px;
}

.person-poster q-img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.person-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
  flex: 1;
}

.person-name {
  line-height: 1;
  font-size: larger;
  font-weight: bold;
  margin-bottom: 10px;
}

.person-details {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}

.person-department {
  color: black;
  font-size: medium;
}

.keyword-infom
.company-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 15px;
}

.keyword-name,
.company-name {
  padding: 1px;
  line-height: 1;
  font-size: larger;
  margin-right: 10px;
}

.country-badge {
  background-color: rgba(0, 0, 0, .2);
  color: white;
  min-height: 25px;
  min-width: 40px;
  align-content: center;
  justify-content: center;
  text-align: center;
  border-radius: 5px;
  font-size: 13px;
  font-weight: bold;
}

.clickable-label {
  cursor: pointer;
  color: black;
}

.clickable-label:hover {
  color: #04b4e4;
}

.pagnition {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}

.pagnition button {
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

.pagnition q-input,
.pagnition span {
  margin: 5px;
  font-weight: bold;
  font-size: medium;
}

.no-data-get {
  font-size: large;
}

</style>