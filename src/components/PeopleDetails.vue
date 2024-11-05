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
                            <q-item-label>Translations</q-item-label>
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
                            <q-item-label>Profiles</q-item-label>
                            <q-space />
                            <q-badge color="grey-3" text-color="black" label="0" />
                        </q-item>
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
                            align="left"
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
            <q-separator />
            <!-- Grid Content Section -->
            <div class="grid-container">
                <div>
                    <q-img
                        placeholder-src="../assets/defaultImg.svg"
                        :src="getImagePath(this.TargetPersonDetails)"
                        style=" width:320px; height: 480px; border-radius: 10px"
                        fit="cover"
                    />
                    <div class="row SectionBtnSocialMedia">
                        <div>
                            <q-img src="../assets/facebook.svg" class="social-media-btn" />
                            <q-tooltip style="font-size: medium; background-color: #042444">
                                Visit Facebook
                            </q-tooltip>
                        </div>
                        <div>
                            <q-img src="../assets/twitter.svg" class="social-media-btn" />
                            <q-tooltip style="font-size: medium; background-color: #042444">
                                Visit Twitter
                            </q-tooltip>
                        </div>
                        <div>
                            <q-img src="../assets/instagram.svg" class="social-media-btn" />
                            <q-tooltip style="font-size: medium; background-color: #042444">
                                Visit Instagram
                            </q-tooltip>
                        </div>
                        <div>
                            <q-img src="../assets/youtube.svg" class="social-media-btn" />
                            <q-tooltip style="font-size: medium; background-color: #042444">
                                Visit YouTube
                            </q-tooltip>
                        </div>
                        <q-separator vertical />
                        <div>
                            <q-img src="../assets/homelink.svg" class="social-media-btn" />
                            <q-tooltip style="font-size: medium; background-color: #042444">
                                Visit Homepage
                            </q-tooltip>
                        </div>
                    </div>
                    <div class="PersonalInfoSection">
                        <label class="title-big">Personal Info</label>
                        <div>
                            <label class="sub-title">Known For</label>
                            <div>
                                <label>
                                    {{ this.TargetPersonDetails.known_for_department }}
                                </label>
                            </div>
                        </div>
                        <div class="InfoSubtitle">
                            <label class="sub-title">Known Credit</label>
                            <div>
                                <label>
                                    {{ KnownCreditAmount }}
                                </label>
                            </div>
                        </div>
                        <div class="InfoSubtitle">
                            <label class="sub-title">Gender</label>
                            <div>
                                <label>
                                    {{ PersonGender }}
                                </label>
                            </div>
                        </div>
                        <div class="InfoSubtitle">
                            <label class="sub-title">Birthday</label>
                            <div>
                                <label>
                                    {{ formatDateAndAge(this.TargetPersonDetails.birthday) }}
                                </label>
                            </div>
                        </div>
                        <div class="InfoSubtitle">
                            <label class="sub-title">Place of Birth</label>
                            <div>
                                <label>
                                    {{ this.TargetPersonDetails.place_of_birth }}
                                </label>
                            </div>
                        </div>
                        <div class="InfoSubtitle">
                            <label class="sub-title">Also Known As</label>
                            <div v-for="name in AlternativeName" :key="name.id">
                                <label>
                                    {{ name }}
                                </label>
                            </div>
                        </div>
                        <div class="InfoSubtitle">
                            <label>Content Score</label>
                            <div class="ContentScore">
                                <div class="score">
                                    <p>100</p>
                                </div>
                                <div class="content">
                                    <p>Yes! Looking good!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btnEditPage">
                        <q-btn label="EDIT PAGE" class="btnEdit" />
                    </div>
                    <div class="btnKeyboardShortcut">
                        <q-img src="../assets/keyboardShortcut.svg" class="btnKeyboard" />
                        <span class="textKeyboard">Keyboard Shortcuts</span>
                    </div>
                    <div class="btnReportIssues">
                        <q-img src="../assets/reportIssues.svg" class="btnReport" />
                        <span class="textReport">Report an Issue</span>
                    </div>
                </div>

                <!-- Right Grid -->
                <div>
                    <div class="actor-name">
                        {{ this.TargetPersonDetails.name }}
                    </div>
                    <label class="SubTitleBio">Biography</label>
                    <div class="actor-overview">
                        {{ this.TargetPersonDetails.biography }}
                    </div>
                    <label class="SubTitleBio">Known For</label>
                    <div class="known-for-container">
                        <div 
                            v-for="item in KnownForProduct"
                            :key="item.id"
                            class="known-for-item"
                        >
                            <q-img
                                placeholder-src="../assets/defaultImg.svg"
                                :src="getImagePath(item)"
                                class="known-for-image"
                                fit="fill"
                                @click="handleImageClick(item)"
                            />
                            <div class="item-name" @click="handleImageClick(item)">
                                {{ item.name }}
                            </div>
                        </div>
                    </div>
                    <div class="ActingSection">
                        <div class="row FirstHeader">
                            <label class="SubDepartmentTitle">Acting</label>
                            <q-space />
                            <q-btn-dropdown no-caps flat label="All">
                                <q-list>
                                    <q-item
                                        clickable
                                        v-close-popup
                                        class="itemClass"
                                        @click="handleFilterClick('movie')"
                                    >
                                        <q-item-label>Movies</q-item-label>
                                    </q-item>
                                    <q-item
                                        clickable
                                        v-close-popup
                                        class="itemClass"
                                        @click="handleFilterClick('tv')"
                                    >
                                        <q-item-label>TV Shows</q-item-label>
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>

                            <q-btn-dropdown no-caps flat label="Department">
                                <q-list>
                                    <q-item
                                        clickable
                                        v-close-popup
                                        class="itemClass"
                                    >
                                        <q-item-label>Acting</q-item-label>
                                    </q-item>
                                    <q-item
                                        clickable
                                        v-close-popup
                                        class="itemClass"
                                    >
                                        <q-item-label>Production</q-item-label>
                                    </q-item>
                                </q-list>
                            </q-btn-dropdown>
                        </div>

                        <div class="WrapperActingContent">
                            <div
                                v-for="item in CreditActing"
                                :key="item.id" 
                            >
                                <div class="eachItemAct">
                                    <label>{{ item.year ? item.year : "0000" }}</label>
                                    <q-img
                                        src="../assets/circleIcon.svg"
                                        class="icon-small"
                                        fit="fill"
                                        @click="TargetItemOverview(item)"
                                    />
                                    <label class="NameOfItem" @click="handleLabelClick(item)">
                                        {{ item.name ? item.name : "No Specified" }}
                                    </label>
                                    <div class="CharacterSection">
                                        <label>
                                            as {{ item.character ? item.character : "No Specified" }}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-for="(items, department) in CreditOther"
                            :key="department"
                            class="SecondHeader"
                        >
                            <label class="SubDepartmentTitle">{{ department }}</label>
                            <div class="WrapperOtherContent">
                                <div
                                    v-for="item in items"
                                    :key="item.id"
                                >  
                                    <div class="eachItemAct">
                                        <label>{{ item.year ? item.year : "0000" }}</label>
                                        <q-img 
                                            src="../assets/circleIcon.svg"
                                            class="icon-small"
                                            fit="fill"
                                            @click="TargetItemOverview(item)"
                                        />
                                        <label class="NameOfItem" @click="handleLabelClick(item)">
                                            {{ item.name ? item.name : "No Specified" }}
                                        </label>
                                        <div class="CharacterSection">
                                            <label>
                                                ... {{ item.job ? item.job : "No Specified" }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <q-dialog v-model="isItemOpen">
                <q-card class="item-dialog">
                    <q-card-section class="row items-start"> 
                        <q-img 
                            class="item-image"
                            :src="getImagePath(this.TargetItemDetail)"
                            fit="fill"
                        />
                        <div class="item-details">
                            <div class="item-title">
                                {{ this.TargetItemDetail.title || this.TargetItemDetail.name }}
                            </div>
                            <div class="item-vote">
                                <q-icon name="star" />
                                {{ this.TargetItemDetail.vote_average }}
                            </div>
                            <div class="item-overview">
                                {{ truncateText(this.TargetItemDetail.overview, 50) }}
                            </div>
                        </div>
                    </q-card-section>
                    <q-card-section class="btnSection">
                        <q-btn icon="favorite" />
                        <q-btn icon="bookmark" />
                        <q-btn icon="star" />
                    </q-card-section>
                </q-card>
            </q-dialog>
        </q-page>
    </q-page-container>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            TargetPersonData: [],
            TargetPersonDetails: [],
            KnownCreditAmount: 0,
            PersonGender: "",
            AlternativeName: [],
            KnownForProduct: [],
            CreditActing: [],
            CreditOther: [],
            sortedCreditActing: [],
            groupedByDepartment: [],
            isItemOpen: false,
            TargetItemDetail: [],
        }
    },
    methods: {
        ...mapActions("getPersonDetails", ['fetchPersonDetails']),
        ...mapActions("CombinedCredit", ['fetchCombinedCredits']),
        ...mapActions("searchPerson", ['fetchSPersonData']),
        ...mapActions("getItemDetails", ['fetchItemDetails']),
        async TargetItemOverview(item) {
            await this.fetchItemDetails({
                mediaType: item.mediatype,
                itemId: item.id,
            }). then(() => {
                this.TargetItemDetail = this.getItemDetails;
            });
            this.isItemOpen = true;
        },
        navigateToSelectedItem(item) {
            this.$router.replace({
                path: `/ItemDetails`,
                query: {
                    item_id: item.id,
                    media_type: item.mediatype,
                },
            });
        },
        handleImageClick(item) {
            this.navigateToSelectedItem(item);
        },
        handleLabelClick(item) {
            this.navigateToSelectedItem(item);
        },
        handleFilterClick(MediaType) {
            switch (MediaType) {
                case "movie":
                    break;
                case "tv":
                    break;
            }
        },
        getImagePath(item) {
            return (
                "https://image.tmdb.org/t/p/original" +
                (item.profile_path 
                    ? item.profile_path
                    : item.backdrop_path
                    ? item.backdrop_path
                    : item.poster_path
                )
            )
        },
        formatDateAndAge(dateString) {
            const birthDate = new Date(dateString);
            const currentDate = new Date();
            const options = { year: "numeric", month: "long", day: "numeric" };
            const formattedDate = birthDate.toLocaleDateString("en-US", options);
            let age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = currentDate.getMonth() - birthDate.getMonth();
            if (
                monthDiff < 0 || 
                (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
            ) {
                age--;
            }
            return `${formattedDate} (${age} years old)`
        },
        truncateText(text, maxLength) {
            if (text && text.split(" ").length > maxLength) {
                return text.split(" ").slice(0, maxLength).join(" ")+" . . .";
            }
            return text;
        },   
    },
    computed: {
        ...mapGetters("getPersonDetails", ['getPersonDetails']),
        ...mapGetters("CombinedCredit", ['getCombinedCredits']),
        ...mapGetters("searchPerson", ['getSearchPersonData']),
        ...mapGetters("getItemDetails", ['getItemDetails']),
    },
    async created() {
        await this.fetchPersonDetails(this.$route.query.personId);
            this.TargetPersonDetails = this.getPersonDetails;
            const TargetName = this.getPersonDetails.name;
            await this.fetchSPersonData({
                targetSearch: TargetName,
                targetPage: 1,
            });
                this.TargetPersonData = this.getSearchPersonData.filter(
                (person) => person.name === TargetName
            );
        await this.fetchCombinedCredits(this.$route.query.personId);
        this.KnownCreditAmount = this.getCombinedCredits.cast.length;
        this.PersonGender =
            this.TargetPersonDetails.gender === 1
                ? "Female"
                : this.TargetPersonDetails.gender === 2
                ? "Male"
                : this.TargetPersonDetails.gender === 3
                ? "Non-binary"
                : "Not specified";
        this.AlternativeName = this.TargetPersonDetails.also_known_as;
        this.KnownForProduct = this.TargetPersonData[0].known_for.map((result) => ({
            id: result.id,
            name: result.name ? result.name : result.title,
            mediatype: result.media_type,
            backdrop_path: result.poster_path
                ? result.poster_path
                : result.backdrop_path,
        }));

        this.CreditActing = this.getCombinedCredits.cast.map((result) => ({
            id: result.id,
            name: result.name ? result.name : result.title,
            character: result.character,
            mediatype: result.media_type,
            year: result.release_date
                ? new Date(result.release_date).getFullYear()
                : result.first_air_date
                ? new Date(result.first_air_date).getFullYear()
                : null,
        }));
        this.sortedCreditActing = this.CreditActing.sort((a, b) => {
            const yearA = Number(a.year);
            const yearB = Number(b.year);
            if (isNaN(yearA) && isNaN(yearB)) return 0;
            if (isNaN(yearA)) return 1;
            if (isNaN(yearB)) return -1;
            return yearB - yearA;
        });
        this.CreditActing = this.sortedCreditActing;

        this.CreditOther = this.getCombinedCredits.crew.map((result) => ({
            id: result.id,
            name: result.name ? result.name : result.title,
            job: result.job,
            mediatype: result.media_type,
            department: result.department,
            year: result.release_date 
                ? new Date(result.release_date).getFullYear()
                : result.first_air_date
                ? new Date(result.first_air_date).getFullYear()
                : null,
        })); 
        const sortedCreditOther = this.CreditOther.sort((a, b) => {
            if (a.department > b.department) return 1;
            if (a.department < b.department) return -1;
            const yearA = Number(a.year);
            const yearB = Number(b.year);
            if (isNaN(yearA) && isNaN(yearB)) return 0;
            if (isNaN(yearA)) return 1;
            if (isNaN(yearB)) return -1;
            return yearB - yearA; 
        })
        this.groupedByDepartment = sortedCreditOther.reduce((acc, item) => {
            if (!acc[item.department]) {
                acc[item.department] = [];
            }
            acc[item.department].push(item);
            return acc;
        }, {});
        this.CreditOther = this.groupedByDepartment;
    }
}
</script>

<style scoped>
/* Drop Down Bar Section */
.topDropDownWrapper {
    display: flex;
    justify-content: center;
    gap: 20px;
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
}

.itemSection {
    font-size: 14px;
    min-height: 32px;
}

.discussionNested {
    font-weight: normal;
    width: 100%;
}

/* Grid Content Section */
.grid-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 30px;
    padding: 3%;
}

.SectionBtnSocialMedia {
    gap: 10px;
    margin-top: 10%;
}

.social-media-btn {
    cursor: pointer;
    height: 30px;
    width: 30px;
}

.PersonalInfoSection {
    color: black;
    margin-top: 10%;
}

.title-big {
    font-weight: bold;
    font-size: 20px;
}

.sub-title {
    font-weight: bold;
    font-size: 16px;
}

.InfoSubtitle {
    margin-top: 10%;
    font-size: medium;
}

.ContentScore {
    background: #d8d6d6;
    border-radius: 10px;
    overflow:hidden;
}

.score {
    padding-top: 2%;
    padding-left: 2%;
    background: #e3e3e3;
    font-weight: bold;
    font-size: 1em;
    align-content: center;
}

.content {
    padding-top: 2%;
    padding-left: 2%;
    background: #d8d6d6;
    align-content: center;
}

.btnKeyboardShortcut,
.btnReportIssues,
.btnEditPage {
    margin-top: 10%;
    cursor: pointer;
}

.btnEdit {
    border-radius: 20px;
    color: white;
    background-color: #08b4e4;
    font-size: medium;
    font-weight: bold;
}

.btnEdit:hover {
    background-color: #000;
}

.btnKeyboard,
.btnReport {
    height: 30px;
    width: 30px;
    margin-right: 2px;
}

.textKeyboard,
.textReport {
    color: grey;
}

.textKeyboard:hover,
.textReport:hover {
    color: #08b4e4;
}

/* Right Grid */
.actor-name {
    cursor: pointer;
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 2%;
}

.SubTitleBio {
    font-weight: bold;
    font-size: 25px;
}

.actor-overview {
    text-align: justify;
    margin-bottom: 2%;
    font-size: medium;
}

.known-for-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.known-for-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 130px;
}

.known-for-image {
    cursor: pointer;
    width: 130px;
    height: 220px;
    border-radius: 10px;
    margin-bottom: 8px;
}

.item-name {
    font-size: 14px;
    color: #333;
}

.item-name:hover {
    cursor: pointer;
    color: #08b4e4;
}

/* Acting Section */
.ActingSection {
    margin-top: 2%;
    align-content: center;
}

.FirstHeader {
    padding: 2%;
}

.SecondHeader {
    margin-top: 3%;
}

.SubDepartmentTitle {
    font-weight: bold;
    font-size: 20px;
}

.itemClass {
    font-size: 14px;
    min-height: 32px;
}

.WrapperActingContent {
    border: 1px solid rgb(190, 189, 189);
}

.WrapperOtherContent {
    border: 1px solid rgb(190,189,189);
}

.eachItemAct {
    padding: 2%;
}

.icon-small {
    width: 20px;
    height: 20px;
    margin-left: 2%;
    margin-right: 2%;
}


.NameOfItem {
    cursor: pointer;
    font-size: medium;
    font-weight: bold;
}

.NameOfItem:hover {
    color: #08b4e4;
}

.CharacterSection {
    margin-left: 10%;
    color: grey;
}

.item-dialog {
    overflow: hidden;
    width: auto;
    height: auto;
    padding: 2%;
}

.item-image {
    height: 250px;
    flex-shrink: 0;
    border-radius: 10px;
}

.item-details {
    display: flex;
    flex-direction: column;
    text-align: justify;
}

.item-title {
    font-size: 24px;
    font-weight: bold;
}

.item-vote {
    font-size: 18px;
    color: grey;
    margin-top: 5%;
}

.item-overview {
    text-align: justify;
    margin-top: 10px;
}

.btnSection {
    text-align: center;
    gap: 10px;
}

</style>