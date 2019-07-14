<template>
  <v-dialog
    v-model="dialog"
    persistant
    max-width="520">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          depressed
          @click="dialog = false">
          close
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
  computed: {
    onChangeDialog: function () {
      return this.dialog
    }
  },
  watch: {
    onChangeDialog: function (state) {
      if (!state) {
        this.title = ''
        this.message = ''
      }
    }
  },
  mounted () {
    this.$root.$on('showError', (data) => {
      if (
        data && data.constructor === {}.constructor &&
        'title' in data && 'message' in data &&
        data.title && data.message
      ) {
        this.title = data.title
        this.message = data.message
        this.dialog = true
      }
    })
  }
}
</script>

