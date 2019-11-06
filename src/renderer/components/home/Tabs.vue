<template>
  <v-tabs
    v-model="tabSelection"
    centered
    color="transparent"
    slider-color="transparent"
    @change="onTabChange(tabSelection)">
    <v-tab
      v-for="(item, index) in menu"
      :key="item.id"
      :style="
        `text-transform: Capitalize;
        font-family: ${tabSelection === index ? ' Roboto-Bold;' : ' Roboto-Regular;'};
        color: ${tabSelection === index ? ' #0C32F2' : ' #000000'};`
      ">
      {{ item.label }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true,
      default: () => { return [] }
    },
    onTabChange: {
      type: Function,
      required: true,
      default: () => {}
    }
  },
  data () {
    return {
      tabSelection: 0
    }
  }
}
</script>
