<template>
  <v-dialog
    v-model="dialog"
    max-width="500">
    <v-card
      min-height="200">
      <v-card-title
        class="headline"
        primary-title>
        Customer Support
      </v-card-title>
      <v-card-text>
        <v-textarea
          label="How can we help you?"
          box>
        </v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          depressed
          color="grey lighten-2"
          @click="dialog = false">
          close
        </v-btn>
        <v-btn
          depressed
          color="primary">
          Send
          <v-icon right>send</v-icon>
        </v-btn>
      </v-card-actions>
      <v-divider />
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
    this.$root.$on('messageCustomerSupport', () => {
      this.dialog = true
    })
  }
}
</script>