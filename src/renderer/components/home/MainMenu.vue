<template>
  <div
    class="hero-y"
    style="left: 0; right: 0;">
    <div
      style="width: auto; max-width: 900px; display: block; margin: auto; padding: 10px;">
      <div
        v-for="item in menu"
        :key="item.id"
        class="info-menu-button">
        <div
          class="menu-button"
          @click="item.callback">
          <div
            class="hero-xy">
            <v-icon
              large
              class="black--text">
              {{ item.icon }}
            </v-icon>
          </div>
        </div>
        <div
          class="menu-button-label">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true,
      default: () => { return [] }
    }
  }
}
</script>

