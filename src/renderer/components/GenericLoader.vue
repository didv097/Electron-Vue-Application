<template>
   <v-dialog
    v-model="dialog"
    persistent
    width="300">
    <v-card
      color="primary"
      dark>
      <v-card-text>
        Please stand by
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  mounted () {
    this.$root.$on('genericLoader/show', () => {
      this.dialog = true
    })
    this.$root.$on('genericLoader/hide', () => {
      this.dialog = false
    })
  }
}
</script>
