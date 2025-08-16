<template>
  <div id="app">
    <Layout v-if="isAuthenticated">
      <router-view />
    </Layout>
    <router-view v-else />
  </div>
</template>

<script setup>
import { isAuthenticated } from './stores/auth'
import Layout from './components/Layout.vue'
</script>
