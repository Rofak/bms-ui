<template>
  <v-app>
    <v-main>
      <v-container>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="6">
              <v-col>
                <v-text-field label="Title" v-model="title" :rules="titleRules" required></v-text-field>
              </v-col>
              <v-col>
                <v-text-field label="Author" v-model="author" v-bind:rules="authorRules" required></v-text-field>
              </v-col>
              <v-col>
                <v-textarea label="Description" v-model="description"></v-textarea>
              </v-col>
            </v-col>
            <v-col cols="6">
              <div>
                <v-img
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-width="500"
                  max-height="300"
                  :src="previewImage"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </div>
              <div>
                <input type="file" ref="fileInput" id="file" @input="pickFile">
              </div>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="select"
                :hint="`${select.title}`"
                :items="items"
                item-text="title"
                item-value="id"
                label="Select"
                persistent-hint
                return-object
                single-line
              ></v-select>
            </v-col>
            <v-col cols="6"></v-col>
            <v-col cols="6">
              <v-btn color="primary" @click="addBook">Add New</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
  export default {
    layout: 'header',
    data: () => ({
      valid: false,
      previewImage: null,
      title: '',
      file:'',
      items: [],
      select: {
        title: '',
        id: 0
      },
      titleRules: [
        v => !!v || 'Title is required'
      ],
      author: '',
      authorRules: [
        v => !!v || 'Author is required'
      ],
      description:'',
      thumbnail:''
    }),
    async fetch() {
      this.items = await fetch('http://localhost:3001/categories').then((res) =>
        res.json()
      )
    },
    computed:{
      book(){
        return{
          title:this.title,
          author:this.author,
          description:this.description,
          categoryId:this.select.id,
          thumbnail:this.thumbnail
        }
      }
    },
    mounted() {
      console.log(this.$store)
    },
    methods: {
      pickFile() {
        let input = this.$refs.fileInput
        let file = input.files
        this.file=file[0]
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }
      },
      addBook(){
        this.uploadImage().then((res)=>{
          this.thumbnail=res
          this.$store.dispatch('book/addBook',this.book)
        })
      },
     uploadImage(){
        let formData= new FormData()
        formData.append("photo",this.file)
       return this.$axios.$post("http://localhost:3001/file/upload",formData)
      }
    }

  }
</script>
<style scoped>
  .upload {
    background: blue;
    padding: 10px;
    color: white;
    cursor: pointer;
  }
</style>
