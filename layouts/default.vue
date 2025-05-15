<template>
  <v-layout class="rounded rounded-md border">
    <!-- Sidebar toggle model -->
    <v-navigation-drawer
      v-model="drawer"
      permanent
      class="gradient-drawer text-white"
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://img.freepik.com/free-psd/modern-glass-skyscraper-architectural-design_632498-26265.jpg"
          title="I Concept"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App bar -->
    <v-app-bar
      color="teal-darken-4"
    >
      <template #image>
        <v-img
          gradient="to top left, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <!-- Toggle drawer button -->
      <template #prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </template>

      <v-app-bar-title>Title</v-app-bar-title>

      <v-btn icon><v-icon>mdi-magnify</v-icon></v-btn>
      <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
      <v-btn icon><v-icon>mdi-dots-vertical</v-icon></v-btn>
    </v-app-bar>

    <!-- Page content -->
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(true)
</script>

<style scoped>
.gradient-drawer {
  background: linear-gradient(to top right, rgba(19,84,122,0.8), rgba(36, 126, 115, 0.8));
}
</style>

