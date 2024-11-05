<template>
    <div class="row">
        <p>{{ pageTitle }}</p>
    </div>
    <div class="content-section">
        <div class="column">
            <q-card class="filter-box">
                <!-- Sort box -->
                <q-expansion-item label="Sort">
                    <q-separator></q-separator>
                    <q-list>
                        <q-item>
                            <q-item-section>
                                <label class="lbl-filter">Sort Results By</label>
                                <q-select
                                    v-model="selectedSortBy"
                                    class="dropdownList"
                                    :options="sortByOptions"
                                >
                                </q-select>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-expansion-item>
            </q-card>
            <q-card class="filter-box">
                <!-- Where to Watch box -->
                <q-expansion-item label="Where To Watch">
                    <template v-slot:header>
                        <q-item-section class="whereToWatch">
                            <q-item-label>Where To Watch</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-badge
                                color="grey-3"
                                text-color="black"
                                :label="providerData.length"
                            />
                        </q-item-section>
                    </template>
                    <q-separator />
                    <q-list>
                        <!-- Service Checkbox Section -->
                        <q-item>
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>My Services</span>
                                    <q-icon 
                                        v-if="!userlogin"
                                        name="checklist"
                                        class="clickable-icon"
                                    />
                                    <q-tooltip style="font-size: small;  background-color: #042444">
                                            Log in to manage your subscribed services.
                                    </q-tooltip>
                                </div>
                                <q-checkbox
                                    class="checkBoxRestrict"
                                    v-model="checkBoxRestrict"
                                    label="Restrict searches to my subscribed services?"
                                    :disable="!userlogin"
                                /> 
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!-- Select Country Section -->
                        <q-item>
                            <q-item-section>
                                <label class="lbl-filter">Country</label>
                                <q-select
                                    v-model="selectedCountry"
                                    :options="countryOptions"
                                    option-value="iso_3166_1"
                                    option-label="english_name"
                                    label="Select a country"
                                    use-input
                                    input-debounce="0"
                                    class="countryClass"
                                    @filter="filterCountries"
                                    :model-value="selectedCountry"
                                    @update:model-value="handleProviderList(selectedCountry)"
                                >
                                    <template v-slot:option="scope">
                                        <q-item v-bind="scope.itemProps">
                                            <q-item-section avatar>
                                                <img 
                                                :src="`https://flagcdn.com/w20/${scope.opt.iso_3166_1.toLowerCase()}.png`"
                                                />
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label>
                                                    {{ scope.opt.english_name }}
                                                </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                </q-select>
                            </q-item-section>
                        </q-item>
                        <!-- watch provider section -->
                        <q-item>
                            <q-item-section>
                                <div v-if="providerData.length <= 0">
                                    <p
                                        style="font-size:medium; font-weight: lighter"
                                    >
                                    No watch providers ? Select another contry.</p>
                                </div>
                                <div v-else class="provider-icons">
                                    <div
                                        v-for="provider in providerData"
                                        :key="provider.provider_id"
                                        class="provider-icon-wrapper"
                                        @click="toggleSelection(provider)"
                                    >
                                        <q-img 
                                            :src="`https://image.tmdb.org/t/p/original` + 
                                            provider.logo_path"
                                            :alt="provider.provide_name"
                                            class="provider-icon"
                                        />
                                        <q-tooltip style="font-size: small;  background-color: #042444">
                                            {{ provider.provider_name }}
                                        </q-tooltip>
                                        <div
                                            class="icon-overlay"
                                            :class="{ selected: isSelected(provider) }"
                                        > 
                                            <img 
                                                src="../assets/ticked.svg" 
                                                alt="Tick" 
                                                class="tick-icon"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-expansion-item>
            </q-card>
            <q-card class="filter-box">
                <!-- Filters Box -->
                 <q-expansion-item label="Filters">
                    <q-separator />
                    <q-list>
                        <!-- Show Me Section -->
                        <q-item>
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>Show Me</span>
                                    <q-icon
                                        v-if="!userlogin"
                                        style="margin-left: 5px; color: grey; margin-bottom: 2px;"
                                        name="help"
                                    >
                                        <q-tooltip style="font-size: small;  background-color: #042444">
                                            Log in to filter items you've watched.
                                        </q-tooltip>
                                    </q-icon>
                                    <div class="lblOption">
                                        <q-option-group
                                            v-model="selectedShowMe"
                                            :options="showMeOptions"
                                            color="primary"
                                            :disable="!userlogin"
                                        />
                                    </div>
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!-- Availabilities Section -->
                        <q-item>
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>Availabilities</span>
                                    <div class="lblOption">
                                        <div class="checkbox-column">
                                            <q-checkbox
                                                v-model="selectAllAvail"
                                                label="Search all availablities?"
                                            />
                                            <div v-if="!selectAllAvail" class="checkbox-column">
                                                <q-checkbox v-model="selectStream" label="Stream" />
                                                <q-checkbox v-model="selectFree" label="Free" />
                                                <q-checkbox v-model="selectAds" label="Ads" />
                                                <q-checkbox v-model="selectRent" label="Rent" />
                                                <q-checkbox v-model="selectBuy" label="Buy" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!--Release Data Section -->
                        <q-item>
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>{{ movieTVDate }}</span>
                                    <div class="lblOption">
                                        <div v-if="ISmovie" class="checkbox-column">
                                            <q-checkbox
                                                v-model="selectAllRelease"
                                                label="Search all releases?"
                                            />
                                            <div v-if="!selectAllRelease" class="checkbox-column">
                                                <q-checkbox 
                                                    v-model="selectAllCountry"
                                                    label="Search all countries?"
                                                />
                                                <div v-if="!selectAllCountry">
                                                    <q-select
                                                        v-model="selectedCountry"
                                                        :options="countryOptions"
                                                        option-value="iso_3166_1"
                                                        option-label="english_name"
                                                        label="Select a country"
                                                        use-input
                                                        input-debounce="0"
                                                        class="countryClass"
                                                        @filter="filterCountries"
                                                        :model-value="selectedCountry"
                                                        @update:model-value="handleProviderList(selectedCountry)"
                                                    >
                                                        <template v-slot:option="scope">
                                                            <q-item v-bind="scope.itemProps">
                                                                <q-item-section avatar>
                                                                    <img 
                                                                    :src="`https://flagcdn.com/w20/${scope.opt.iso_3166_1.toLowerCase()}.png`"
                                                                    />
                                                                </q-item-section>
                                                                <q-item-section>
                                                                    <q-item-label>
                                                                        {{ scope.opt.english_name }}
                                                                    </q-item-label>
                                                                </q-item-section>
                                                            </q-item>
                                                        </template>
                                                    </q-select>
                                                </div>
                                                <q-checkbox 
                                                    v-model="selectTheaLimit"
                                                    label="Theatrical (limited)"
                                                />
                                                <q-checkbox 
                                                    v-model="selectTheatrical"
                                                    label="Theatrical"
                                                />
                                                <q-checkbox 
                                                    v-model="selectPremiere"
                                                    label="Premiere"
                                                />
                                                <q-checkbox 
                                                    v-model="selectDigital"
                                                    label="Digital"
                                                />
                                                <q-checkbox 
                                                    v-model="selectPhysical"
                                                    label="Physical"
                                                />
                                                <q-checkbox 
                                                    v-model="selectTV"
                                                    label="TV"
                                                />
                                            </div>
                                        </div>
                                        <div v-else class="checkbox-column">
                                            <q-checkbox 
                                                v-model="selectAllEpisodes"
                                                label="Search all episodes?"
                                            />
                                            <div v-if="!selectAllEpisodes">
                                                <q-checkbox 
                                                    v-model="selectFirstAirDate"
                                                    label="Search first air date?"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <!-- Date From -->
                                        <q-input
                                            v-model="dateFrom"
                                            label="From Date"
                                            readonly
                                            filled
                                            @click="showDatePickerFrom=true"
                                            class="datepickerInput"
                                        >
                                            <template #append>
                                                <q-btn
                                                    v-if="dateFrom !== null"
                                                    dense
                                                    flat
                                                    round
                                                    icon="close"
                                                    @click="clearDate('from')"
                                                />
                                            </template>
                                        </q-input>
                                        <q-date
                                            class="calendar"
                                            v-model="dateFrom"
                                            mask="YYYY-MM-DD"
                                            :default-view="'Calendar'"
                                            :min-date="null"
                                            :max-date="dateTo"
                                            @update:model-value="updateDateFrom"
                                            @load="console.log(updateDateFrom)"
                                            v-if="showDatePickerFrom"
                                        >
                                            <div class="row justify-end q-mb-sm">
                                                <q-btn
                                                    label="Close"
                                                    color="primary"
                                                    @click="showDatePickerFrom = false"
                                                />
                                            </div>
                                        </q-date>
                                        <!-- Date To -->
                                        <q-input
                                            v-model="dateTo"
                                            label="To Date"
                                            readonly
                                            filled
                                            @click="showDatePickerTo = true"
                                            class="datepickerInput"
                                        >
                                            <template #append>
                                                <q-btn
                                                    v-if="dateTo !== null"
                                                    dense
                                                    flat
                                                    round
                                                    icon="close"
                                                    @click="clearDate('to')"
                                                />
                                            </template>
                                        </q-input>
                                        <q-date
                                            class="calendar"
                                            v-model="dateTo"
                                            mask="YYYY-MM-DD"
                                            :default-view="'Calendar'"
                                            :min-date="dateFrom"
                                            :max-date="null"
                                            @update:model-value="updateDateTo"
                                            v-if="showDatePickerTo"
                                        >
                                            <div class="row justify-end q-mb-sm">
                                                <q-btn
                                                    label="Close"
                                                    color="primary"
                                                    @click="showDatePickerTo = false"
                                                />
                                            </div>
                                        </q-date>
                                    </div>
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!--Genres Section -->
                        <q-item>
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>Genres</span>
                                    <div class="genres-container">
                                        <div class="genres-grid">
                                            <q-btn
                                                v-for="genre in dataGenres"
                                                :key="genre.id"
                                                :label="genre.name"
                                                no-caps
                                                unelevated
                                                rounded
                                                class="genre-btn"
                                                :color="selectedGenres.includes(genre) ? 'blue' : 'white'"
                                                :text-color="selectedGenres.includes(genre) ? 'white' : 'black'"
                                                @click="toggleGenre(genre)"
                                            >

                                            </q-btn>
                                        </div>
                                    </div>
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!-- Certification Section -->
                        <q-item>
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>Certification</span>
                                    <div class="genres-container">
                                        <div class="genres-grid">
                                            <q-btn
                                                v-for="cert in dataCertification"
                                                :key="cert.id"
                                                :label="cert.certification"
                                                no-caps
                                                unelevated
                                                rounded
                                                class="genre-btn"
                                                :color="selectedCert.includes(cert) ? 'blue' : 'white'"
                                                :text-color="selectedCert.includes(cert) ? 'white' : 'black'"
                                                @click="toggleCert(cert)"
                                            >

                                            </q-btn>
                                        </div>
                                    </div>
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!-- Network Section -->
                        <q-item v-if="!ISmovie">
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>Network</span>
                                    <q-select
                                        class="keywordInput"
                                        filled
                                        v-model="networkModel"
                                        multiple
                                        use-input
                                        use-chips
                                        input-debounce="0"
                                        stack-label
                                        label="Filter by TV networks..."
                                        :options="options"
                                        option-value="id"
                                        option-label="name"
                                        @filter="filterFn"
                                    >
                                        <template v-slot:no-option>
                                            <q-item>
                                                <q-item-section class="text-grey">
                                                    No results
                                                </q-item-section>
                                            </q-item>
                                        </template>
                                    </q-select>
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!-- Language Section -->
                        <q-item>
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>Languages</span>
                                    <q-icon style="margin-left: 5px; color: grey; margin-bottom: 2px" name="help">
                                        <q-tooltip style="font-size: small; background-color: #042444">
                                            Filter items based on their original language.
                                        </q-tooltip>
                                    </q-icon>
                                </div>
                                <q-select
                                    v-model="selectedLanguage"
                                    :options="filteredLanguages"
                                    option-value="iso_639_1"
                                    option-label="english_name"
                                    label="Select a language"
                                    use-input
                                    clearable
                                    input-debounce="0"
                                    class="languageClass"
                                    @filter="filterLanguages"
                                >
                                    <template v-slot:option="scope">
                                        <q-item v-bind="scope.itemProps">
                                            <q-item-section>
                                                <q-item-label>
                                                    {{ scope.opt.english_name }}
                                                </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </template>
                                </q-select>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!-- User Score Section -->
                        <q-item>
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>User Score</span>
                                    <q-range
                                        class="rangeSlider"
                                        v-model="userscore"
                                        color="light-blue"
                                        markers
                                        :marker-labels="scorelabel"
                                        :min="0"
                                        :max="10"
                                        label
                                        :left-label-value="`Rated ${userscore.min}`"
                                        :right-label-value="`Rated ${userscore.max}`"
                                    >
                                    </q-range>
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!-- Minimum User Votes -->
                        <q-item>
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>Minimum User Votes</span>
                                    <q-slider
                                        class="rangeSlider"
                                        v-model="uservotes"
                                        color="light-blue"
                                        markers
                                        :marker-labels="votelabel"
                                        :min="0"
                                        :max="500"
                                        :step="50"
                                        label 
                                    >
                                    </q-slider>
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!-- Runtime Section -->
                        <q-item>
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>Runtime</span>
                                    <q-range
                                        class="rangeSlider"
                                        v-model="runtime"
                                        color="light-blue"
                                        markers
                                        :marker-labels="runtimelabel"
                                        :min="0"
                                        :max="400"
                                        :step="15"
                                        label 
                                        :left-label-value="`${runtime.min} minutes`"
                                        :right-label-value="`${runtime.max} minutes`"
                                    >
                                    </q-range>
                                </div>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!-- Keywords Section -->
                        <q-item>
                            <q-item-section>
                                <div class="lbl-filter">
                                    <span>Keywords</span>
                                    <q-select
                                        class="keywordInput"
                                        filled
                                        v-model="keywordModel"
                                        multiple
                                        use-input
                                        use-chips
                                        input-debounce="0"
                                        stack-label
                                        label="Filter by keywords..."
                                        :options="options"
                                        option-value="id"
                                        option-label="name"
                                        @filter="filterFn"
                                    >
                                        <template v-slot:no-option>
                                            <q-item>
                                                <q-item-section class="text-grey">
                                                    No results
                                                </q-item-section>
                                            </q-item>
                                        </template>
                                    </q-select>
                                </div>
                            </q-item-section>
                        </q-item>
                    </q-list>
                 </q-expansion-item>
            </q-card>
            <q-btn
                no-caps
                label="Search"
                class="btnSearch"
                ref="originalSearchButton"
                @click="handleSearch"
            >

            </q-btn>
        </div>
        <q-btn
            v-if="!isOriginalButtonVisible"
            no-caps
            label="Search"
            class="fixed-btnSearch"
            @click="handleSearch"
        >
        </q-btn>
        <!-- Data List -->
        <div class="column">
            <DataList2 :items="ArrayDataToDisplay" />
            <q-btn
                v-if="LoadMorePage"
                ref="loadMoreBtn"
                no-caps
                class="load-more-btn"
                label="Load More"
                @click="handleLoadMore"
            >
            </q-btn>
        </div>
    </div>
</template>

<script>

import { ref } from "vue";
import { mapGetters, mapActions } from 'vuex';
import DataList2 from './DataList2.vue';

export default {
    components: {
        DataList2,
    },
    setup(props, { emit }) {
        // Provider Selection setup
        const selectedProviders = ref([]);
        const toggleSelection = (provider) => {
            const index = selectedProviders.value.findIndex(
                (p) => p.provider_id === provider.provider_id
            );
            if (index === -1) {
                selectedProviders.value.push(provider);
            } else {
                selectedProviders.value.splice(index, 1);
            }
            emit("update:selectedProviders", selectedProviders.value);
        };
        const isSelected = (provider) => {
            return selectedProviders.value.some(
                (p) => p.provider_id === provider.provider_id
            )
        };

        // Date Picker setup
        const dateFrom = ref(null);
        const dateTo = ref(null);
        const showDatePickerFrom = ref(false);
        const showDatePickerTo = ref(false);
        const updateDateFrom = (val) => {
            dateFrom.value = val;
            if (dateTo.value !== null && val !== null && val > dateTo.value) {
                dateTo.value = null;
            }
        };
        const updateDateTo = (val) => {
            dateTo.value = val;
            if (dateFrom.value !== null && val !== null && val < dateFrom.value) {
                dateFrom.value = null;
            }
        };

        const clearDate = (type) => {
            if (type === "from") {
                dateFrom.value = null;
            } else if (type === "to") {
                dateTo.value = null;
            }
        };

        // Genres options setup
        const selectedGenres = ref([]);
        const toggleGenre = (genre) => {
            const index = selectedGenres.value.indexOf(genre);
            if (index === -1) {
                selectedGenres.value.push(genre);
            } else {
                selectedGenres.value.splice(index, 1);
            }
        };

        // Cert options setup
        const selectedCert = ref([]);
        const toggleCert = (cert) => {
            const index = selectedCert.value.indexOf(cert);
            if (index === -1) {
                selectedCert.value.push(cert);
            } else {
                selectedCert.value.splice(index, 1);
            }
        };

        // User Score setup
        const userscore = ref({
            min: 0,
            max: 10,
        });
        const scorelabel = {
            0: "0",
            5: "5",
            10: "10",
        };

        // User Votes setup
        const uservotes = ref(0);
        const votelabel = {
            0: "0",
            100: "100",
            200: "200",
            300: "300",
            400: "400",
            500: "500",
        };

        // Runtime setup
        const runtime = ref({
            min: 0,
            max: 400,
        });
        const runtimelabel = {
            0: "0",
            120: "120",
            240: "240",
            360: "360"
        }

        return {
            // providers data
            selectedProviders,
            toggleSelection,
            isSelected,

            // date picker data
            dateFrom,
            showDatePickerFrom,
            dateTo,
            showDatePickerTo,
            updateDateFrom,
            updateDateTo,
            clearDate,

            // genres options
            selectedGenres, 
            toggleGenre,

            // cert options
            selectedCert,
            toggleCert,

            // user score options
            userscore,
            scorelabel,

            // user votes options   
            uservotes,
            votelabel,

            // runtime options
            runtime,
            runtimelabel,
        }
    },
    data() {
        return { 
            pageTitle: "Popular Movies",
            selectedSortBy: "popularity.desc",
            isOriginalButtonVisible: true,
            sortByOptions: [],
            checkBoxRestrict: false,
            selectedCountry: null,
            providerData: [],
            countryOptions: [],
            selectedShowMe: "every",
            showMeOptions: [],
            selectAllAvail: true,
            selectStream: true,
            selectFree: true,
            selectAds: true,
            selectRent: true,
            selectBuy: true,
            movieTVDate: "Release Dates",
            ISmovie: true,
            selectAllRelease: true,
            selectAllCountry: true,
            selectTheaLimit: true,
            selectTheatrical: true,
            selectPremiere: true,
            selectDigital: true,
            selectPhysical: true,
            selectTV: true,
            selectAllEpisodes: true,
            selectFirstAirDate: true,
            selectedLanguage: null,
            keywordModel: [],
            networkModel: [],
            options: [],
            filteredLanguages: [],
            ArrayDataToDisplay: [],
            LoadMorePage: true,
            loadedpage: 1,
            discoverMovieTP: 1,
            discoverTVTP: 1,
            DiscoveredSearch: false,
            debounceTimeout: null,
            debounceDelay: 5000,
        }
    },
    methods: {
        ...mapActions("watchProvider", ['fetchproviderData']),
        ...mapActions("movieList", ['fetchMovieList']),
        ...mapActions("tvList", ['fetchTVList']),
        ...mapActions("getRegions", ['fetchDataRegion']),
        ...mapActions("getGenre", ['fetchDataGenres']),
        ...mapActions("getCertification", ['fetchDataCertification']),
        ...mapActions("getLanguage", ['fetchLanguageData']),
        ...mapActions("getSearchKeyword", ['fetchKeywordList']),
        ...mapActions("discoverMovie", ['fetchDiscoverMovie']),
        ...mapActions("discoverTV", ['fetchDiscoverTV']),
        ...mapActions("checkSeenItem", ['fetchSeenItemData']),
        filterCountries(val, update) {
            if (val === "") {
                update(() => {
                    this.countryOptions = this.getDataRegion;
                });
                return;
            }
            update(() => {
                const needle = val.toLowerCase();
                this.countryOptions = this.getDataRegion.filter((country) =>
                    country.english_name.toLowerCase().includes(needle)
                );
            })
        },
        filterLanguages(val, update) {
            if (val === "") {
                update(() => {
                    this.filteredLanguages = this.getLanguageData;
                });
                return;
            }
            update(() => {
                const needle = val.toLowerCase();
                this.filteredLanguages = this.getLanguageData.filter((lang) =>
                    lang.english_name.toLowerCase().includes(needle)
                );
            })
        },
        filterFn(val, update, abort) {
            if (val === "") {
                update(() => {});
            } else {
                this.fetchKeywordList(val).then(() => {
                    update(() => {});
                });
            }
        },
        observeButtonVisibility() {
            const observer = new IntersectionObserver(
                (entries) => {
                entries.forEach((entry) => {
                    this.isOriginalButtonVisible = entry.isIntersecting;
                });
                },
                {
                root: null,
                threshold: 0,
                }
            );
            const originalButton = this.$refs.originalSearchButton.$el;
            observer.observe(originalButton);
        },
        observeLoadMoreVisibility() {
            const loadobserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && this.loadedpage > 1) {
                            this.handleLoadMore();
                        }
                    });
                },
                {
                    root: null,
                    threshold:0,
                }
            );
            this.$nextTick(() => {
                if (this.$refs.loadMoreBtn) {
                    loadobserver.observe(this.$refs.loadMoreBtn.$el);
                }
            })
        },
        replaceMovieWithTV(mediaType) {
            if (mediaType === "movie") {
                this.showMeOptions = [
                    { label: "Everything", value: "every" },
                    { label: "Movies I Haven't Seen", value: "nope" },
                    { label: "Movies I Have Seen", value: "seen" },
                ];

                this.sortByOptions = [
                    { label: "Popularity Descending", value: "popularity.desc"},
                    { label: "Popularity Ascending", value: "popularity.asc"},
                    { label: "Rating Descending", value: "vote_average.desc"},
                    { label: "Rating Ascending", value: "vote_average.asc"},
                    { label: "Release Date Descending", value: "primary_release_date.desc"},
                    { label: "Release Date Ascending", value: "primary_release_date.asc"},
                    { label: "Title (A-Z)", value: "title.desc"},
                    { label: "Title (Z-A)", value: "title.desc"},
                ]
            } else if (mediaType === "tv") {
                this.showMeOptions = [
                    { label: "Everything", value: "every" },
                    { label: "TV Shows I Haven't Seen", value: "nope" },
                    { label: "TV Shows I Have Seen", value: "seen" },
                ];

                this.sortByOptions = [
                    { label: "Popularity Descending", value: "popularity.desc"},
                    { label: "Popularity Ascending", value: "popularity.asc"},
                    { label: "Rating Descending", value: "vote_average.desc"},
                    { label: "Rating Ascending", value: "vote_average.asc"},
                    { label: "Release Date Descending", value: "primary_release_date.desc"},
                    { label: "Release Date Ascending", value: "primary_release_date.asc"},
                    { label: "Title (A-Z)", value: "title.desc"},
                    { label: "Title (Z-A)", value: "title.desc"},
                ]
            }
        },
        titleChange(mediaType, showsStatus) {
            switch (mediaType) {
                case "movie": 
                    if (showsStatus === "popular") {
                        this.pageTitle = "Popular Movies";
                    } else if (showsStatus === "now_playing") {
                        this.pageTitle = "Now Playing Movies";
                    } else if (showsStatus === "upcoming") {
                        this.pageTitle = "Upcoming Movies"; 
                    } else if (showsStatus === "top_rated") {
                        this.pageTitle = "Top Rated Movies";
                    }
                    this.movieTVDate = "Release Dates";
                    this.ISmovie = true;
                    break;

                case "tv": 
                    if (showsStatus === "popular") {
                        this.pageTitle = "Popular TV Shows";
                    } else if (showsStatus === "airing_today") {
                        this.pageTitle = "TV Shows Airing Today";
                    } else if (showsStatus === "on_the_air") {
                        this.pageTitle = "Currently Airing TV Shows"; 
                    } else if (showsStatus === "top_rated") {
                        this.pageTitle = "Top Rated TV Shows";
                    }
                    this.movieTVDate = "Air Dates";
                    this.ISmovie = false;
                    break;
            }
        },
        hideLoadButton(totalPages) {
            if (totalPages <= 1) {
                this.LoadMorePage = false;
            } else {
                this.LoadMorePage = true;
            } 
        },
        async LoadDataMovieTV(currentMediaType, currentPage) {
            const providerIds = this.selectedProviders.map(
                (provider) => provider.provider_id
            );

            let countryCode = null;
            if (this.selectedCountry) {
                countryCode = this.selectedCountry.iso_3166_1;
            } else {
                countryCode = "MY";
            }
            const StreamVal = "flatrate";
            const FreeVal = "free";
            const AdsVal = "ads";
            const RentVal = "rent";
            const BuyVal = "buy";
            let availabilities = "";
            if (!this.selectAllAvail) {
                let valuesToAdd = [];
                if (this.selectStream) {
                valuesToAdd.push(StreamVal);
                }
                if (this.selectFree) {
                valuesToAdd.push(FreeVal);
                }
                if (this.selectAds) {
                valuesToAdd.push(AdsVal);
                }
                if (this.selectRent) {
                valuesToAdd.push(RentVal);
                }
                if (this.selectBuy) {
                valuesToAdd.push(BuyVal);
                }
                availabilities = valuesToAdd.join("|");
            }

            const PremVal = "1";
            const TheaLiVal = "2";
            const TheaVal = "3";
            const DigiVal = "4";
            const PhysVal = "5";
            const TVVal = "6";
            let releaseType = "";
            let releaseCountry = "";
            if (!this.selectAllRelease) {
                let valuesToAdd = [];
                if (!this.selectAllCountry) {
                releaseCountry = countryCode;
                }
                if (this.selectTheatrical) {
                valuesToAdd.push(TheaVal);
                }
                if (this.selectPremiere) {
                valuesToAdd.push(PremVal);
                }
                if (this.selectDigital) {
                valuesToAdd.push(DigiVal);
                }
                if (this.selectPhysical) {
                valuesToAdd.push(PhysVal);
                }
                if (this.selectTV) {
                valuesToAdd.push(TVVal);
                }
                if (this.selectTheaLimit) {
                valuesToAdd.push(TheaLiVal);
                }
                releaseType = valuesToAdd.join("|");
            }

            const genresIds = this.selectedGenres.map((genre) => genre.id);
            const certIds = this.selectedCert.map((cert) => cert.certification);

            let languagetarget = "";
            if (this.selectedLanguage) {
                languagetarget = this.selectedLanguage.iso_639_1;
            }

            const minimumscore = this.userscore.min;
            const maximumscore = this.userscore.max;
            const minimumvotes = this.uservotes;
            const minimumruntime = this.runtime.min;
            const maximumruntime = this.runtime.max;

            const keywordIds = this.keywordModel.map((keyword) => keyword.id);

            if (currentMediaType === "tv") {
                await this.fetchDiscoverTV({
                sortby: this.selectedSortBy.value,
                currentpage: currentPage,
                watchregion: countryCode,
                watchproviders: providerIds,
                monetization: availabilities,
                firstairDateGr: this.dateFrom,
                firstairDateLo: this.dateTo,
                genres: genresIds,
                certification: certIds,
                originalLanguage: languagetarget,
                voteaverageGr: minimumscore,
                voteaverageLo: maximumscore,
                voteCountGr: minimumvotes,
                runtimeGr: minimumruntime,
                runtimeLo: maximumruntime,
                keywords: keywordIds,
                });
                let tempArrayWithRateState = await Promise.all(
                this.getDiscoverTV.map(async (item) => {
                    const ratedStatus = await this.checkIfRated(item, currentMediaType);
                    return { ...item, ratedStatus };
                })
                );
                switch (this.selectedShowMe) {
                case "seen":
                    this.ArrayDataToDisplay = tempArrayWithRateState.filter(
                    (item) => item.ratedStatus
                    );
                    break;
                case "nope":
                    this.ArrayDataToDisplay = tempArrayWithRateState.filter(
                    (item) => !item.ratedStatus
                    );
                    break;
                default:
                    this.ArrayDataToDisplay = this.getDiscoverTV;
                    break;
                }
                this.discoverTVTP = this.getDiscoverTVTP;
                this.hideLoadButton(this.discoverTVTP);
            } else {
                await this.fetchDiscoverMovie({
                sortby: this.selectedSortBy.value,
                currentpage: currentPage,
                watchregion: countryCode,
                watchproviders: providerIds,
                monetization: availabilities,
                releasetype: releaseType,
                region: releaseCountry,
                releaseDateGr: this.dateFrom,
                releaseDateLo: this.dateTo,
                genres: genresIds,
                certification: certIds,
                originalLanguage: languagetarget,
                voteaverageGr: minimumscore,
                voteaverageLo: maximumscore,
                voteCountGr: minimumvotes,
                runtimeGr: minimumruntime,
                runtimeLo: maximumruntime,
                keywords: keywordIds,
                });
                let tempArrayWithRateState = await Promise.all(
                this.getDiscoverMovie.map(async (item) => {
                    const ratedStatus = await this.checkIfRated(item, currentMediaType);
                    return { ...item, ratedStatus };
                })
                );
                switch (this.selectedShowMe) {
                case "seen":
                    this.ArrayDataToDisplay = tempArrayWithRateState.filter(
                    (item) => item.ratedStatus
                    );
                    break;
                case "nope":
                    this.ArrayDataToDisplay = tempArrayWithRateState.filter(
                    (item) => !item.ratedStatus
                    );
                    break;
                default:
                    this.ArrayDataToDisplay = this.getDiscoverMovie;
                    break;
                }
                this.discoverMovieTP = this.getDiscoverMovieTP;
                this.hideLoadButton(this.discoverMovieTP);
            }
        },
        async checkIfRated(item, mediaType) {
            await this.fetchSeenItemData({
                mediaType: mediaType,
                itemId: item.id,
            })
            let ratedStatus = this.getSeenItemData;
            return (ratedStatus = ratedStatus ? !!ratedStatus.rated : false);
        },
        async handleProviderList(selectedWPCountry) {
            this.selectedProviders = [];
            await this.fetchproviderData({
                mediaType: this.$route.query.mediaType,
                watchRegion: selectedWPCountry.iso_3166_1,
            });
            this.providerData = this.getproviderData;
        },
        async handleSearch() {
            this.loadedpage = 1;
            this.DiscoveredSearch = true;
            const currentMediaType = this.$route.query.mediaType;
            if (currentMediaType === "movie") {
                await this.LoadDataMovieTV(currentMediaType, 1);
            } else {
                await this.LoadDataMovieTV(currentMediaType, 1);
            }
        },
        async handleLoadMore() {
            const currentMediaType = this.$route.query.mediaType;
            switch (this.DiscoveredSearch) {
                case true:
                    if (this.$route.query.mediaType === "movie") {
                        if (this.loadedpage < this.discoverMovieTP) {
                            this.loadedpage++;
                        } else {
                            this.LoadMorePage = false;
                        }
                        await this.LoadDataMovieTV(currentMediaType, this.loadedpage);
                    } else {
                        if (this.loadedpage < this.discoverTVTP) {
                            this.loadedpage++;
                        } else {
                            this.LoadMorePage = false;
                        }
                        await this.LoadDataMovieTV(currentMediaType, this.loadedpage);
                    }
                    break;

                case false:
                    if (currentMediaType === "movie") {
                        if (this.loadedpage < this.movieListTP) {
                            this.loadedpage++;
                        } else {
                            this.LoadMorePage = false;
                        }
                        await this.fetchMovieList({
                            orderBy: this.$route.query.showsStatus,
                            currentPage: this.loadedpage,
                        });
                        this.ArrayDataToDisplay = this.getMovieList;
                    } else {
                        if (this.loadedpage < this.tvListTP) {
                            this.loadedpage++;
                        } else {
                            this.LoadMorePage = false;
                        }
                        await this.fetchTVList({
                            orderBy: this.$route.query.showsStatus,
                            currentPage: this.loadedpage,
                        });
                        this.ArrayDataToDisplay = this.getTVList;
                    }   
                    break;
            }
        },
        async setupInitialPage(mediaType, showsStatus) {
            this.loadedpage = 1;
            this.DiscoveredSearch = false;
            this.LoadMorePage = true;
            this.selectedGenres = [];
            this.selectedCert = [];
            await this.fetchDataRegion();
            this.countryOptions = this.getDataRegion;
            await this.fetchDataGenres(mediaType);
            await this.fetchDataCertification(mediaType);
            await this.fetchLanguageData();
            this.filiterLanguages = this.getLanguageData;
            await this.replaceMovieWithTV(mediaType);
            await this.titleChange(mediaType, showsStatus);
            if (mediaType === "movie") {
                await this.fetchMovieList({
                    orderBy: showsStatus,
                    currentPage: 1,
                });
                this.ArrayDataToDisplay = this.getMovieList;
            } else if (mediaType === "tv") {
                await this.fetchTVList({
                    orderBy: showsStatus,
                    currentPage: 1,
                });
                this.ArrayDataToDisplay = this.getTVList;
            }
        },
    },
    computed: {
        ...mapGetters("watchProvider", ['getproviderData']),
        ...mapGetters("movieList", ['getMovieList']),
        ...mapGetters("movieList", ['getMovieListTP']),
        ...mapGetters("tvList", ['getTVList']),
        ...mapGetters("tvList", ['getTVListTP']),
        ...mapGetters("getRegions", ['getDataRegion']),
        ...mapGetters("getGenre", ['getDataGenres']),
        ...mapGetters("getCertification", ['getDataCertification']),
        ...mapGetters("getLanguage", ['getLanguageData']),
        ...mapGetters("getSearchKeyword", ['getKeywordList']),
        ...mapGetters("discoverMovie", ['getDiscoverMovie']),
        ...mapGetters("discoverMovie", ['getDiscoverMovieTP']),
        ...mapGetters("discoverTV", ['getDiscoverTV']),
        ...mapGetters("discoverTV", ['getDiscoverTVTP']),
        ...mapGetters("checkSeenItem", ['getSeenItemData']),
        ...mapGetters("userdata", ['getUserLogin', 'getUsername', 'getUserLogout']),
        dataMovieList() {
            return this.getMovieList;
        },
        movieListTP() {
            return this.getMovieListTP;
        },
        dataTVList() {
            return this.getTVList;
        },
        tvListTP() {
            return this.getTVListTP;
        },
        availableRegion() {
            return this.getDataRegion;
        },
        dataGenres() {
            return this.getDataGenres;
        },
        dataCertification() {
            return this.getDataCertification;
        },
        userlogin() {
            return this.getUserLogin;
        },
    },
    watch: {
        getKeywordList(newList) {
            this.options = newList.map((item) => ({
                id: item.id,
                name: item.name,
            }));
        }
    },
    beforeRouteUpdate(to, from, next) {
        this.setupInitialPage(to.query.mediaType, to.query.showsStatus);
        next();
    },
    mounted() {
        this.observeButtonVisibility();
        this.observeLoadMoreVisibility();
    },
    async created() {
        await this.setupInitialPage(
            this.$route.query.mediaType,
            this.$route.query.showsStatus,
        )
    }
}
</script>

<style scoped>
.row {
    padding-top: 7%;
    padding-left: 3%;
}

.row p {
    font-size: 24px;
    font-weight: bold;
}

.content-section {
    height: auto;
    display: flex;
    align-content: center;
}

.column {
    padding-left: 2%;
    padding-bottom: 2%;
    padding-right: 2%;
}

.filter-box {
    margin-left: 2%;
    width: 270px;
    margin-right: 10px;
    margin-bottom: 20px;
    border-radius: 8px;
}

.q-expansion-item {
    font-weight: bold;
    font-size: medium;
}

/* Sort Box */
.lbl-filter {
    font-weight: lighter;
    font-size: 15px;
    margin-bottom: 2%;
}

.dropdownList {
    background-color: #c8ccd4;
    font-weight: lighter;
    font-size: 14px;
    height: 50px;
    padding: 0%;
    padding-left: 5%;
    border-radius: 5px;
}

/* Whr to Watch box */
.whereToWatch {
    padding: 0%;
}

.clickable-icon {
    margin-left: 10px;
    cursor: pointer;
}

.checkBoxRestrict {
    font-size: 14px;
    font-weight: lighter;
    padding: 0%;
}

.countryClass {
    background-color: #c8ccd4;
    font-weight: lighter;
    font-size: 14px;
    height: 50px;
    padding: 0%;
    padding-left: 5%;
    border-radius: 5px;
    margin: 0%;
}

.provider-icons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.provider-icon-wrapper {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    overflow: hidden; /* Fixed the unfunctionable border radius */
    cursor: pointer;
}

.provider-icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.icon-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #04a4cc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.icon-overlay.selected {
    opacity: 1;
}

.tick-icon {
    width: 20px;
    height: 20px;
}

/* Filters Box */
.lblOption {
    font-weight: light;
    font-size: 14px;
}

.checkbox-column {
    display: flex;
    flex-direction: column;
}

.checkbox-column .q-checkbox {
    margin: 0;
    padding: 0;
}

.datepickerInput {
    width: 240px;
}

.calendar {
    width: 100%;
    margin: 0 auto;
}

.genres-container {
    margin: 0 auto;
}

.genres-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 2%;
}

.genre-btn {
    font-size: 13px;
    font-weight: light;
    flex: 0 0 auto;
    border: 2px solid #ccc;
}

.languageClass {
    background-color: #c8ccd4;
    font-weight: lighter;
    font-size: 14px;
    height: 50px;
    padding: 0%;
    padding-left: 5%;
    border-radius: 5px;
    margin: 0%;
}

.rangeSlider {
    font-weight: light;
    font-size: small;
    color: grey;
}

.keywordInput {
    margin: 0;
    padding: 0;
    font-size: small;
    background-color: white;
}

.btnSearch {
    background-color: #08b4e4;
    color: white;
    border-radius: 20px;
    font-size: medium;
    height: auto;
    width: auto;
}

.fixed-btnSearch {
    background-color: #08b4e4;
    color: white;
    font-size: medium;
    position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 1000;
}

.btnSearch:hover,
.fixed-btnSearch:hover {
    background-color: #082444;
}

/* Data List */
.load-more-btn {
    background-color: #01B4E4;
    color: white;
    font-size: large;
    font-weight: bold;
    width: 100%;
    border-radius: 10px;
    margin-top: 30px;
}

.load-more-btn:hover {
    color: black;
}

</style>