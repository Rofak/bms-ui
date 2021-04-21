<template>
  <v-simple-table>
    <template #default>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Title</th>
          <th class="text-left">Thumbnail</th>
          <th class="text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>h</td>
          <td>H</td>
          <td>H</td>
          <td>H</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
}
</script>
