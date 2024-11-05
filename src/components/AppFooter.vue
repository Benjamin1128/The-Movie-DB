<template>
  <div class="footer-container">
    <div class="row">
      <div class="logo-column-content">
        <img src="../assets/footerLogo.svg" 
        alt="footerTMDB Logo"
        class="footer-logo">
        <br />
        <q-btn no-caps unelevated class="joinCom wrap-text">
          {{ joinCommunityBtn }}
        </q-btn>
      </div>

      <div class="header-column-content">
        <q-list class="menu-list">
          <label class="category-header">THE BASICS</label>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">About TMDB</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">Contact Us</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">Support Forums</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">API</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">System Status</q-item-section>
          </q-item>
        </q-list>
      </div>
      
      <div class="header-column-content">
        <q-list class="menu-list">
          <label class="category-header">GET INVOLVED</label>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">Contribution Bible</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">Add New Movie</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">Add New TV Show</q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="header-column-content">
        <q-list class="menu-list">
          <label class="category-header">COMMUNITY</label>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">Guidelines</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">Discussions</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">Leaderboard</q-item-section>
          </q-item>
        </q-list>
      </div>

      <div class="header-column-content">
        <q-list class="menu-list">
          <label class="category-header">LEGAL</label>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">Terms of Use</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">API Terms of Use</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">Privacy Policy</q-item-section>
          </q-item>
          <q-item clickable v-ripple>
            <q-item-section class="category-content">DMCA Policy</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'FooterTMDB',
    computed: {
      ...mapGetters("userdata", [
        'getUserLogin',
        'getUsername',
      ]),
      joinCommunityBtn() {
        if (this.getUserLogin) {
          return `Hi ${this.getUsername}!`
        } else {
          return "JOIN THE COMMUNITY";
        }
      }
    }
}
</script>

<style scoped>

.footer-container {
  background-color: #031d33;
  height: 320px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.joinCom {
  height: auto;
  width: auto;
  background: #fff;
  color: #01b4e4;
  font-size: medium;
  font-weight: bold;
  margin-top: 10px;
}

.footer-logo { 
  height: 100px;
  width: auto;
}

.logo-column-content {
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  padding-right: 30px;
}


.header-column-content {
  flex: 1 1 18%;
  padding: 10px;
  font-size: medium;
}

.category-header {
  font-weight: bold;
  text-transform: uppercase;
  font-size: large;
  color: #fff;
}

.category-content {
  display: inline-flex;
  color: #fff;
}

.menu-list .q-item {
  margin: 0;
}
</style>