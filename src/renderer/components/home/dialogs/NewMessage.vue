<template>
  <v-dialog
    v-model="dialog"
    scrollable
    persistent
    max-width="500">
    <v-card
      min-height="200">
      <v-card-title
        class="headline">
        Send message to customer support
      </v-card-title>
      <v-card-text>
        <v-textarea
          v-model="message"
          box
          label="Write your message" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="loading"
          depressed
          color="grey lighten-2"
          @click="dialog = false">
          close
        </v-btn>
        <v-btn
          depressed
          :loading="loading"
          color="primary"
          @click="onClickSendMessage">
          <v-icon
            left>
            send
          </v-icon>
          Send
        </v-btn>
      </v-card-actions>
      <v-divider />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      dialog: false,
      loading: false,
      message: ''
    }
  },
  mounted () {
    this.$root.$on('openNewMessage', () => {
      this.dialog = true
    })
  },
  methods: {
    ...mapActions([
      'sendMessage'
    ]),
    onClickSendMessage: function () {
      if (this.message) {
        this.loading = true
        this.sendMessage(this.message).finally(() => {
          this.loading = false
          this.dialog = false
        })
      }
    }
  }
}
</script>