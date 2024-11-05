<template>
  <q-layout view="hHh LpR fFf">
    <AppHeader />
    <router-view />
    <AppFooter />
  </q-layout>
</template>

<script>
import AppHeader from "src/components/AppHeader.vue"
import AppFooter from "src/components/AppFooter.vue"
import { useRouter } from "vue-router";

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
}
</script>

<style>

</style>
