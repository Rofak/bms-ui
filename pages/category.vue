<template>
  <v-app>
    <v-main>
      <v-container>
        <v-form class="mb-15">
          <v-row>
            <v-col>
              <v-text-field label="Title" v-model="title"></v-text-field>
              <v-btn color="primary" @click="addCategory">Add</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <list-categories :categories="getCategories"></list-categories>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    layout: 'header',
    middleware:'auth',
    data() {
      return {
        title:''
      }
    },
    computed:{
        ...mapGetters({
          getCategories:'category/getCategories'
        })
    },
    methods:{
      addCategory(){
        this.$store.dispatch('category/addCategory',this.title)
      }
    },
    async mounted() {
      const categories = await fetch('http://localhost:3001/categories',{
        headers:{
          'Authorization':this.$auth.strategy.token.get()
        }
      }).then(res => res.json())
      this.$store.commit('category/setCategories',categories)
      console.log(this.$auth.loggedIn)
    }
  }
</script>
