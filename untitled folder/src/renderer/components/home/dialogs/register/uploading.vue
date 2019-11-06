<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="300"
  >
    <v-card
      color="primary"
      dark
    >
      <v-card-text>
        {{ message || 'Uploading files ...' }}
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
        dialog: false,
        message: ''
      }
    },
    mounted () {
      this.$root.$on('register/uploading/show', () => {
        this.dialog = true
      })
      this.$root.$on('register/uploading/hide', () => {
        this.dialog = false
      })
      this.$root.$on('register/uploading/message', (message) => {
        this.message = message || ''
      })
    }
  }
</script>

