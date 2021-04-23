<template>
  <v-simple-table>
    <template #default>
      <thead class="text-center">
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Title</th>
          <th class="text-left">author</th>
          <th class="text-left">description</th>
          <th class="text-left">thumbnail</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.id }}</td>
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.description }}</td>
          <td>
            <v-img
              lazy-src="https://picsum.photos/id/11/10/6"
              max-height="100"
              max-width="200"
              :src="book.thumbnail"
            ></v-img>
          </td>
          <td>
            <v-btn color="primary">view</v-btn>
            <v-btn color="error" class="mx-3">delete</v-btn>
            <v-btn color="teal" class="white--text">update</v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  props: {
    books: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
