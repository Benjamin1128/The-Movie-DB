<template>
  <q-banner v-if="showBanner" class="fixed-bottom" dense>
    <q-icon name="cookie" size="md" />
    <span class="smallerText" size="q-ml-sm">
      By clicking “Accept All Cookies”, you agree to the storing of cookies on
      your device to enhance site navigation, analyze site usage, and assist in
      our marketing efforts.
    </span>
    <q-btn
      flat
      label="Decline"
      color="white"
      class="bg-blue q-ml-sm"
      @click="declineCookies"
    />
    <q-btn
      flat
      label="Accept All Cookies"
      color="white"
      class="bg-blue q-ml-sm"
      @click="acceptCookies"
    />
    <q-btn
      flat
      icon="close"
      color="black"
      class="q-ml-sm CloseBtn"
      @click="closeBanner"
    />
  </q-banner>
</template>

<script>
export default {
  data() {
    return {
      showBanner: true,
    };
  },
  methods: {
    acceptCookies() {
      localStorage.setItem("cookiesAccepted", "true");
      this.showBanner = false;
    },
    declineCookies() {
      this.showBanner = false;
    },
    closeBanner() {
      this.showBanner = false;
    },
  },
  mounted() {
    if (localStorage.getItem("cookiesAccepted") === "true") {
      this.showBanner = false;
    }
  },
};
</script>

<style scoped>
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.bg-blue {
  background-color: #1976d2;
  color: white;
}

.smallerText {
  font-size: medium;
  color: grey;
}
</style>