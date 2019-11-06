<template>
  <v-dialog
    v-model="dialog"
    hide-overlay
    scrollable
    persistent
    width="500">
    <v-card
      min-height="300">
      <v-card-text>
        <div
          style="margin: 20px 0;">
          <v-subheader>App Notification</v-subheader>
          <v-btn
            depressed
            color="grey lighten-2"
            style="margin-left: 15px;"
            @click="$root.$emit('showSnackbar', { message: 'This is a sample notification' })">
            Show App Notification
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          depressed
          color="black"
          class="white--text"
          @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const remote = require('electron').remote

export default {
  data () {
    return {
      dialog: false
    }
  },
  mounted () {
    this.$root.$on('openAPI', () => {
      this.dialog = true
    })
  },
  methods: {
    showSystemNotification: function () {
      let myNotification = new remote.Notification({
        title: 'Sample Notification',
        body: 'Hello InterBank User!'
      })
      myNotification.show()
    }
  }
}
</script>