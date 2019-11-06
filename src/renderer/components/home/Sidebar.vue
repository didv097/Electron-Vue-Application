<template>
  <v-navigation-drawer
    v-model="drawer"
    absolute
    temporary
    style="z-index: 500;">
    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile
        v-for="item in menu"
        :key="`sidebar_${item.id}`"
        @click="onClickSidebarItem(item)"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.label }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true,
      default: () => { return [] }
    },
    sidebar: {
      type: Boolean,
      required: true,
      default: () => { return false }
    },
    onChangeSidebar: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      drawer: false,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ]
    }
  },
  computed: {
    onSidebarChange: function () {
      return this.sidebar
    },
    onDrawerChange: function () {
      return this.drawer
    }
  },
  watch: {
    onSidebarChange: function (state) {
      if (state) {
        this.drawer = true
      }
    },
    onDrawerChange: function (state) {
      if (!state) {
        this.onChangeSidebar(false)
      }
    }
  },
  methods: {
    onClickSidebarItem: (item) => {
      item.callback()
    }
  }
}
</script>

