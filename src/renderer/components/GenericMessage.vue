<template>
  <v-dialog
    v-model="dialog"
    width="500">
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title>
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
          @click="dialog = false">
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
  computed: {
    onDialogChange: function () {
      return this.dialog
    }
  },
  watch: {
    onDialogChange: function (state) {
      if (!state) {
        this.title = ''
        this.message = ''
      }
    }
  },
  mounted () {
    this.$root.$on('genericMessage/show', (data) => {
      if (
        data && data.constructor === {}.constructor &&
        'title' in data && data.title &&
        'message' in data && data.message
      ) {
        this.title = data.title
        this.message = data.message
        this.dialog = true
      }
    })
    this.$root.$on('genericMessage/hide', (data) => {
      this.dialog = false
    })
  }
}
</script>

