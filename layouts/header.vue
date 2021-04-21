<template>
  <div>
    <!--    <v-navigation-drawer v-model="sidebar" app>-->
    <!--      <v-list>-->
    <!--        <v-list-item-group v-model="selectedItem">-->
    <!--          <v-list-item v-for="(item, i) in items" :key="i">-->
    <!--            <v-list-item-icon>-->
    <!--              <v-icon v-text="item.icon"></v-icon>-->
    <!--            </v-list-item-icon>-->
    <!--            <v-list-item-content>-->
    <!--              <v-list-item-title v-text="item.text"></v-list-item-title>-->
    <!--            </v-list-item-content>-->
    <!--          </v-list-item>-->
    <!--        </v-list-item-group>-->
    <!--      </v-list>-->
    <!--    </v-navigation-drawer>-->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>

      <v-toolbar-title>BMS</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items
        v-for="(item, index) in items"
        :key="index"
        class="hidden-xs-only"
      >
        <v-btn text :to="{ path: item.link }">
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <Nuxt></Nuxt>
  </div>
</template>
<script>
export default {
  data: () => ({
    selectedItem: 1,
    sidebar: true,
    items: [
      { text: 'Home', icon: 'mdi-home', link: '/' },
      { text: 'Category', icon: 'mdi-application-cog', link: '/category' },
    ],
  }),
}
</script>
