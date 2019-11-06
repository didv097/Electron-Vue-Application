<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="300">
    <v-card>
      <v-card-text>
        {{ message || 'Please stand by' }}
        <v-progress-linear
          indeterminate
          color="primary"
          class="mb-0">
        </v-progress-linear>
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
  computed: {
    onChangeDialog: function () {
      return this.dialog
    }
  },
  watch: {
    onChangeDialog: function (state) {
      if (!state) {
        this.message = ''
      }
    }
  },
  mounted () {
    this.$root.$on('loading/show', (message) => {
      if (message) {
        this.message = message
      }
      this.dialog = true
    })
    this.$root.$on('loading/hide', () => {
      this.dialog = false
    })
  }
}
</script>

