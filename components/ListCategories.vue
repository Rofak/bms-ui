<template>
  <v-row>
    <v-col cols="6">
      <v-list v-for="category in categories" :key="category.id">
        <v-list-item class="pa-0">
          <v-list-item-content>
            <v-list-item-title>{{category.title}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <div class="d-flex justify-start">
              <v-btn color="error" class="mr-3" @click="deleteCategory(category.id)">Delete</v-btn>
              <v-btn color="primary" class="mr-3" @click="showDialog(category.id)">Update</v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title><span class="text-uppercase">Update Category</span></v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field label="Title" v-model="title" :rules="titleRules"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn cla right text @click="dialog=false">Close</v-btn>
            <v-btn cla right text @click="updateCategory">Update</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    data() {
      return {
        dialog: false,
        categoryId:0,
        title:'',
        titleRules: [
          v => !!v || 'Title is required'
        ],
      }
    },
    props: {
      categories: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      deleteCategory(id) {
        this.$store.dispatch('category/deleteCategory', id)
      },
      updateCategory(){
        this.$store.dispatch('category/updateCategory', {
          title:this.title,
          id:this.categoryId
        })
        this.dialog=false
      },
      showDialog(id){
        this.dialog=true
        this.categoryId=id
      }
    }
  }
</script>
