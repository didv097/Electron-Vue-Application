<template>
  <v-snackbar
    v-model="snackbar"
    bottom
    color="primary"
    multi-line
    light
    :timeout="10000"
    style="z-index: 600;">
    {{ message }}
    <v-btn
      color="white"
      flat
      icon
      @click="snackbar = false">
      <v-icon>close</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      snackbar: false,
      message: ''
    }
  },
  mounted () {
    const self = this
    this.$root.$on('showSnackbar', function ({ message }) {
      self.message = message
      self.snackbar = true
    })
  }
}
</script>

