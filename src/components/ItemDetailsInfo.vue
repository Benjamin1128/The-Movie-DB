<template>
    <q-page-container>
        <q-page>
            <div class="container">
                <div class="left-column">
                    <!-- Cast & Crew -->
                     <label class="TopCastLabel">Top Billed Cast</label>
                     <q-scroll-area
                        style="
                            height: 360px;
                            overflow-x: auto;
                            white-space: nowrap;
                            margin-top: 10px;
                        "
                     >
                        <div class="row no-wrap">
                            <div class="row no-wrap AllCastSection">
                                <div v-if="CastCrewData.cast" class="displayContent">
                                    <div 
                                        v-for="cast in CastCrewData.cast.slice(0,9)" 
                                        :key="cast.id"
                                        class="castCard"
                                    >
                                        <q-img
                                            class="cast-profile"
                                            :src="getProfilePath(cast)"
                                            placeholder-src="../assets/defaultImg.svg"
                                            fit="fill"
                                        />
                                        <div class="castInfo">
                                            <label class="cast-name">{{ cast.name }}</label>
                                            <label>{{ cast.character }}</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="view-more-container">
                                <q-btn 
                                    class="view-more-btn"
                                    no-caps
                                    flat
                                    icon-right="arrow_forward"
                                    label="View More"
                                />
                            </div>
                        </div>
                     </q-scroll-area>
                     <div class="full-cc-btn">
                        <label class="lbl-full-cc">Full Cast & Crew</label>
                     </div>
                     <q-separator />

                     <!-- Social Review Section -->
                     <div class="social-section">
                        <label class="TopCastLabel">Social</label>
                        <q-tabs v-model="selectedTab" dense>
                            <q-tab no-caps name="Reviews">
                                <q-item>
                                    <q-item-section> Reviews </q-item-section>
                                    <q-item-section side>
                                        <q-badge color="grey">1</q-badge>
                                    </q-item-section>
                                </q-item>
                            </q-tab>
                            <q-tab no-caps name="Discussions">
                                <q-item>
                                    <q-item-section> Discussions </q-item-section>
                                    <q-item-section side>
                                        <q-badge color="grey">1</q-badge>
                                    </q-item-section>
                                </q-item>
                            </q-tab>
                        </q-tabs>
                    </div>
                    <!-- Review Content -->
                    <div class="WrapperForSocialAndReview">
                        <div class="ReviewSection">
                            <q-img 
                                class="user-profile"
                                :src="getProfilePath(this.authorDetails)"
                                placeholder-src="../assets/defaultImg.svg"
                                fit="cover"
                            />
                            <div class="info-section">
                                <label class="usernameLabel">
                                    A review by {{ this.authorDetails.username }}
                                </label>
                                <div class="RatingAndDate">
                                    <q-badge class="ratingBadge">
                                        <q-icon name="star" /> 
                                        {{ authorDetails.rating * 10 }}%
                                    </q-badge>
                                    <label class="reviewDate">Written by {{ this.authorDetails.username }} on
                                        {{ formatDate(this.writtenDate) }}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="reviewContent">
                            {{ truncateText(this.UserReviewContent, 100) }}
                            <q-btn 
                                no-caps
                                flat
                                dense
                                class="read-allBtn"
                                v-if="isTruncate"
                            >
                            read the rest.
                            </q-btn>
                        </div>
                    </div>
                    <div class="full-cc-btn">
                        <label class="lbl-full-cc">Read All Reviews</label>
                    </div>
                    <q-separator />
                </div>
                
                <!-- Right Column -->
                <div class="right-column">
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
                        <q-separator vertical />
                        <div>
                            <q-img src="../assets/homelink.svg" class="social-media-btn" />
                            <q-tooltip style="font-size: medium; background-color: #042444">
                                Visit Homepage
                            </q-tooltip>
                        </div>
                    </div>
                    <div class="EachInfoSection">
                        <label class="SubTitle">Status</label>
                        <div>{{ items.status }}</div>
                    </div>
                    <div class="EachInfoSection">
                        <label class="SubTitle">Original Language</label>
                        <div>{{ LanguageNameChange(items.original_language) }}</div>
                    </div>
                    <div class="EachInfoSection">
                        <label class="SubTitle">Budget</label>
                        <div>$ {{ formatCurrency(items.budget) }}</div>
                    </div>
                    <div class="EachInfoSection">
                        <label class="SubTitle">Revenue</label>
                        <div>$ {{ formatCurrency(items.revenue)}}</div>
                    </div>
                    <div class="EachInfoSection">
                        <label class="SubTitle">Keywords</label>
                        <div class="keywords-container">
                            <div 
                                v-for="keyword in KeywordsData.keywords" 
                                :key="keyword.id"
                                class="keyword-tag"
                            >
                                {{ keyword.name }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </q-page>
    </q-page-container>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    props: {
        items: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            selectedTab: "Reviews",
            authorDetails: [],
            UserReviewContent: "",
            writtenDate: "",
            randomTargetReview: [],
            isTruncate: false,
        }
    },
    methods: {
        ...mapActions("getCrewCast", ['fetchCrewCastData']),
        ...mapActions('getKeywords', ['fetchKeywordsData']),
        ...mapActions("getLanguage", ['fetchLanguageData']),
        ...mapActions("getReviews", ['fetchReviewsData']),
        getProfilePath(item) {
            return (
                "https://image.tmdb.org/t/p/original" +
                (item.profile_path ? item.profile_path : item.avatar_path)
            );
        },
        LanguageNameChange(langIso) {
            const LanguageCheck = this.getLanguageData;
            const result = LanguageCheck.find(
                (language) => language.iso_639_1 === langIso
            );
            if (result) {
                return result.english_name ? result.english_name : result.name;
            } else {
                return langIso;
            };
        },
        formatCurrency(amount) {
        if (!isNaN(amount)) {
            return new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD',
            minimumFractionDigits: 2 
            }).format(amount).replace('$', '');
        } 
            return amount;
        },
        getRandomReview() {
            if (this.ReviewData) {
                if (this.ReviewData.length === 0) return null;
                const randomIndex = Math.floor(Math.random() * this.ReviewData.length);
                this.randomTargetReview = this.ReviewData[randomIndex];
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            return date.toLocaleDateString("en-US", options);
        },
        LoadData() {
            this.authorDetails = this.randomTargetReview.author_details;
            if (this.randomTargetReview.content) {
                this.UserReviewContent = this.randomTargetReview.content;
            }
            if (this.randomTargetReview.updated_at) {
                this.writtenDate = this.randomTargetReview.updated_at
                ? this.randomTargetReview.updated_at
                : this.randomTargetReview.created_at;
            }
        },
        truncateText(text, maxLength) {
            if (text && text.split(" ").length > maxLength) {
                this.isTruncate = true;
                return text.split(" ").slice(0, maxLength).join(" ") + " . . .";
            } else {
                this.isTruncate = false;
                return text;
            }
        }
    },
    computed: {
        ...mapGetters("getCrewCast", ['getCrewCastData']),
        ...mapGetters("getKeywords", ['getKeywordsData']),
        ...mapGetters("getLanguage", ['getLanguageData']),
        ...mapGetters("getReviews", ['getReviewsData']),
        CastCrewData() {
            return this.getCrewCastData;
        },
        ReviewData() {
            return this.getReviewsData;
        },
        KeywordsData() {
            return this.getKeywordsData;
        }
    },
    async created() {
        await this.fetchLanguageData();
        await this.fetchCrewCastData({
            mediaType: this.$route.query.media_type,
            itemId: this.$route.query.item_id,
        });
        await this.fetchReviewsData({
            mediaType: this.$route.query.media_type,
            itemId: this.$route.query.item_id,
        });
        await this.fetchKeywordsData({
            mediaType: this.$route.query.media_type,
            itemId: this.$route.query.item_id,
        });
        await this.getRandomReview();
        await this.LoadData();
    },



}
</script>

<style scoped>

.container {
    display: flex;
    justify-content: space-between;
}

.left-column {
    flex: 9;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
}

.right-column {
    flex: 3;
    display: flex;
    flex-direction: column;
    padding-left: 2%;
}

.TopCastLabel {
    font-weight: bold;
    font-size: 1.4em;
}

/* Cast & Crew Section */

.AllCastSection {
    gap: 10px;
}

.displayContent {
    display: contents;
}

.castCard {
    width: 140px;
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    box-sizing: border-box;
    border: 1px solid rgb(209, 206, 206);
    border-radius: 10px;
}

.cast-profile {
    height: 200px;
    width: 138px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    cursor: pointer;
}

.castInfo {

    margin-top: 5px;
    word-wrap: break-word;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 4px;
    padding-bottom: 10px;
}

.castInfo label {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    width: 100%;
}

.cast-name {
    padding-top: 10px;
    font-weight: bold;
    font-size: medium;
}

.view-more-container {
    display: flex;
    align-items: center;
    width: 200px;
    margin-left: 1%;
}

.view-more-btn {
    font-weight: bold;
    font-size: medium;
}

.full-cc-btn {
    margin-top: 2%;
    font-weight: bold;
    font-size: medium;
    margin-bottom: 3%;
}

.lbl-full-cc:hover {
    color: rgb(0 0 0 / 50%);
    cursor: pointer;
}

/* Social Review Section */
.social-section {
    margin-top: 2%;
    display: flex;
    align-items: center;
    gap: 30px;
}

.WrapperForSocialAndReview {
    border: 1px solid rgb(206,205,205);
    padding: 2%;
    border-radius: 10px;
}

.ReviewSection {
    display: flex;
    align-items: flex-start;
    margin-bottom: 2%;
}

.user-profile {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 20px;
    cursor:pointer;
}

.info-section {
    display: flex;
    flex-direction: column;
}

.RatingAndDate {
    gap: 10px;
    display: flex;
    align-items: center;
}

.ratingBadge {
    font-size: 14px;
    background-color: rgb(3, 37, 65);
}

.usernameLabel {
    font-weight: bold;
    font-size: 20px;
}

.usernameLabel:hover {
    color: grey; 
    cursor: pointer;
}

.reviewDate {
    font-size: 1em;
    color: #666;
}

.reviewContent {
    text-align: justify;
}

.read-allBtn {
    text-decoration: underline;
}

.read-allBtn:hover {
    color: grey;
}

/* Social Media Btn */
.SectionBtnSocialMedia {
    gap: 10px;
}

.social-media-btn {
    cursor: pointer;
    height: 30px;
    width: 30px;
}

/* Info Section */
.EachInfoSection {
    margin-top: 7%;
    font-size: medium;
}

.SubTitle {
    font-weight: bold;
}

.keywords-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px; 
    margin-bottom: 5%;
}

.keyword-tag {
    background-color: #f0f0f0;
    color: #333; 
    padding: 6px 10px; 
    border-radius: 8px;
    border: 1px solid #ccc; 
    font-size: 14px; 
    cursor: pointer; 
    transition: all 0.3s ease; 
}

.keyword-tag:hover {
    background-color: #dfe6e9; 
    border-color: #b2bec3; 
}

.keyword-tag:active {
    background-color: #81ecec; 
    border-color: #00cec9; 
    color: white; 
}

</style>