import { store } from "quasar/wrappers"
import { createStore } from "vuex"
import welcome from "./modules/welcome"
import trending from "./modules/trending"
import trailer from "./modules/trailer"
import popular from "./modules/popular"
import freetowatch from "./modules/freetowatch"
import userdata from "./modules/userdata"
import getRequestToken from "./modules/getRequestToken"
import getRqtTknV3 from "./modules/getRqtTknV3"
import getSessionId from "./modules/getSessionId"
import validateUser from "./modules/validateUser"
import validateToken from "./modules/validateToken"
import logout from "./modules/logout"
import getItemDetails from "./modules/getItemDetails"
import getItemCertification from "./modules/getItemCertification"
import getGenre from "./modules/getGenre"
import getCrewCast from "./modules/getCrewCast"
import getVideos from "./modules/getVideos"
import getReviews from "./modules/getReviews"
import getLanguage from "./modules/getLanguage"
import getKeywords from "./modules/getKeywords"
import movieList from "./modules/movieList"
import tvList from "./modules/tvList"
import watchProvider from "./modules/watchProvider"
import getRegions from "./modules/getRegions"
import getCertification from "./modules/getCertification"
import getSearchKeyword from "./modules/getSearchKeyword"
import discoverMovie from "./modules/discoverMovie"
import discoverTV from "./modules/discoverTV"
import checkSeenItem from "./modules/checkSeenItem"
import getPeopleList from "./modules/getPeopleList"
import getPersonDetails from "./modules/getPersonDetails"
import CombinedCredit from "./modules/CombinedCredit"
import searchPerson from "./modules/searchPerson"
import searchMulti from "./modules/searchMulti"
import getTotalPages from "./modules/getTotalPages"
import searchMovie from "./modules/searchMovie"
import searchTV from "./modules/searchTV"
import searchKeyword from "./modules/searchKeyword"
import searchCollection from "./modules/searchCollection"
import searchCompany from "./modules/searchCompany"
import getCollection from "./modules/getCollection"
import getRating from "./modules/getRating"
import getListFile from "./modules/getListFile"
import getDetailList from "./modules/getDetailList"
import AddItemToList from "./modules/AddItemToList"
import AddFavourite from "./modules/AddFavourite"
import getFavourite from "./modules/getFavourite"
import AddWatchList from "./modules/AddWatchList"
import getWatchList from "./modules/getWatchList"
import AddRating from "./modules/AddRating"
import DeleteRating from "./modules/DeleteRating"
import CreateList from "./modules/CreateList"
import searchMovieTvTgt from "./modules/searchMovieTvTgt"
import UpdateList from "./modules/UpdateList"
import UpdateItemsComment from "./modules/UpdateItemsComment"
import RemoveItems from "./modules/RemoveItems"
import DeleteList from "./modules/DeleteList"
import getRecommendation from "./modules/getRecommendation"

export default store(function() {

  
  const Store = createStore({
    modules: {
      welcome,
      trending,
      trailer,
      popular,
      freetowatch,
      userdata,
      getRequestToken,
      getRqtTknV3,
      getSessionId,
      validateUser,
      validateToken,
      logout,
      getItemDetails, 
      getItemCertification,
      getGenre,
      getCrewCast,
      getVideos,
      getReviews,
      getLanguage,
      getKeywords,
      movieList,
      tvList,
      watchProvider,
      getRegions,
      getCertification,
      getSearchKeyword,
      discoverMovie,
      discoverTV,
      checkSeenItem,
      getPeopleList,
      getPersonDetails,
      CombinedCredit,
      searchPerson,
      searchMulti,
      getTotalPages,
      searchMovie,
      searchTV,
      searchKeyword,
      searchCollection,
      searchCompany,
      getCollection,
      getRating,
      getListFile,
      getDetailList,
      AddItemToList,
      AddFavourite,
      getFavourite,
      AddWatchList,
      getWatchList,
      AddRating,
      DeleteRating,
      CreateList,
      searchMovieTvTgt,
      UpdateList,
      UpdateItemsComment,
      RemoveItems,
      DeleteList,
      getRecommendation,
    },

    strict: process.env.DEBUGGING,
  })
  return Store;
})