<template>
  <v-dialog
      v-model="dialog"
      width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ message }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      title: '',
      message: ''
    }
  },
  mounted () {
    this.$root.$on('register/submitted/title', (title) => {
      this.title = title || ''
    })
    this.$root.$on('register/submitted/message', (message) => {
      this.message = message || ''
    })
    this.$root.$on('register/submitted/show', () => {
      this.dialog = true
    })
    this.$root.$on('register/submitted/hide', () => {
      this.dialog = false
    })
  }
}
</script>

