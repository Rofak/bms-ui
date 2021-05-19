<template>
  <v-app>
    <v-main>
      <v-container>
        <v-btn color="primary" :to="{ path: '/new' }">Add New</v-btn>
        <template>
          <v-data-table
            :headers="header"
            :items="books"
            :items-per-page="10"
            class="elevation-1"
          >
            <template #item.thumbnail="{ item }">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="100"
                max-width="200"
                :src="item.thumbnail"
              ></v-img>
            </template>
            <template #item.actions="{item}">
              <v-btn color="success" :to="{path:`${item.id}`}">View</v-btn>
              <v-btn color="error" @click="deleteBook(item.id)">Delete</v-btn>
              <v-btn color="teal" class="white--text" @click="showDialog(item.id)">Update</v-btn>
            </template>
          </v-data-table>
        </template>
        <v-dialog persistent v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="text-uppercase">Update Book</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Title" v-model="title"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field label="Author" v-model="author"></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea label="Description" rows="3" v-model="description"></v-textarea>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="select"
                      :items="categories"
                      label="Select"
                      :hint="`${select.title}`"
                      item-text="title"
                      item-value="id"
                      return-object
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="6" class="d-flex align-center">
                    <input type="file" ref="fileInput" id="file" @input="pickFile">
                  </v-col>
                  <v-col cols="6">
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      max-height="150"
                      max-width="250"
                      :src="previewImage"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="updateBook">Update</v-btn>
              <v-btn @click="dialog=false" text>Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    layout: 'header',
    middleware: 'auth',
    data() {
      return {
        books: [],
        title: '',
        author: '',
        description: '',
        select: {
          title: '',
          id: ''
        },
        bookId:0,
        previewImage: '',
        file: '',
        thumbnail: '',
        dialog: false,
        header: [
          { text: 'Title', value: 'title' },
          { text: 'Author', value: 'author' },
          { text: 'Description', value: 'description' },
          { text: 'Thumbnail', value: 'thumbnail' },
          { text: 'Action', value: 'actions', sortable: false, align: 'center' }
        ]
      }
    },
    computed: {
      ...mapGetters({
        categories: 'category/getCategories'
      }),
      book() {
        return {
          title: this.title,
          author: this.author,
          description: this.description,
          categoryId: this.select.id,
          thumbnail: this.thumbnail
        }
      }
    },
    async mounted() {
      const categories = await fetch('http://localhost:3001/categories',{
        headers:{
          'Authorization':this.$auth.strategy.token.get()
        }
      }).then(res => res.json())
      this.$store.commit('category/setCategories', categories)
      console.log(this.$auth.loggedIn)
    },
    async fetch() {
      this.books = await this.getBooks()
    },
    methods: {
      getBooks() {
        return fetch('http://localhost:3001/books',{
          headers:{
            'Authorization':this.$auth.strategy.token.get()
          }
        }).then(res => res.json())
      },
      deleteBook(id) {
        this.$axios.$delete('http://localhost:3001/books/' + id).then(async (res) => {
          this.books = await this.getBooks()

        })
      },
      pickFile() {
        let file = this.$refs.fileInput.files
        this.files = file[0]
        if (file && file[0]) {
          let reader = new FileReader()
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }
      },
      uploadImage() {
        let formData = new FormData()
        formData.append('photo', this.files)
        return this.$axios.$post('http://localhost:3001/file/upload',formData)
      },
      showDialog(id){
        this.bookId=id
        this.dialog=true
      },
      updateBook() {
        this.uploadImage().then((res)=>{
          this.thumbnail=res
          this.$axios.$put('http://localhost:3001/books/' + this.bookId,this.book).then(async (res) => {
            this.books = await this.getBooks()
            this.dialog=false
          })
        })

      }
    }
  }
</script>
