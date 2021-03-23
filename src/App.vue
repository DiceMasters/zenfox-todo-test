<template>
  <v-app>
    <div class="d-flex flex-column">
      <v-app-bar color="deep-purple" dark>
        <v-toolbar-title>User's Todo list</v-toolbar-title>
      </v-app-bar>
      <router-view/>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>
