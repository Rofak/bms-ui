<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="150"
              max-width="250"
              :src="book.thumbnail"
            ></v-img>
          </v-col>
          <v-col cols="9" class="d-flex flex-column">
            <h1 class="text-uppercase">{{book.title}}</h1>
            <p><span class="font-weight-thin">author </span> {{book.author}}</p>
            <p class="text-justify">{{book.description}}</p>

          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>
<script>
  export default {
    layout: 'header',
    data() {
      return {
        book: Object

      }
    },

    async mounted() {
      this.book = await fetch('http://localhost:3001/books/' + this.$route.params.id, {
        headers: {
          'Authorization': this.$auth.strategy.token.get()
        }
      }).then(res => res.json())
    }
  }
</script>
