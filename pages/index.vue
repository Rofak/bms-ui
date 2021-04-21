<template>
  <v-app>
    <v-main>
      <v-container>
        <v-btn color="primary" elevation="2">add new</v-btn>
        <CustomTable></CustomTable>
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'header',
  async asyncData({ $axios }) {
   const res= await $axios.$get('http://localhost:3001/books').then((res) => {
      return{res}
    })
  },
  data() {
    return {
      books: [],
    }
  },
}
</script>
