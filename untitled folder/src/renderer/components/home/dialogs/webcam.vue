<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition">
    <v-card
      style="position: relative; background: black;">
      <v-toolbar dark color="primary"
        style="z-index: 500;">
        <v-btn icon dark @click="dialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Capture Image</v-toolbar-title>
        <v-spacer />
        <v-btn
          @click="capture">
          <v-icon left>camera</v-icon>
          Capture
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <div
          id="webcam-area"
          class="hero-xy"
          style="width: 1024px; height: 720px;" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
const WebCamera = require('webcamjs')

export default {
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    onChangeDialog: function () {
      return this.dialog
    }
  },
  watch: {
    onChangeDialog: function (state) {
      if (state) {
        this.$nextTick(() => {
          WebCamera.attach('webcam-area')
        })
      } else {
        WebCamera.reset()
      }
    }
  },
  mounted () {
    this.$root.$on('webcam/show', () => {
      this.dialog = true
    })
    this.$root.$on('webcam/hide', () => {
      this.dialog = false
    })
  },
  methods: {
    capture: function () {
      const self = this
      WebCamera.snap(function (uri) {
        self.$root.$emit('view/picture/data', {
          base64: uri,
          file: 'file.png'
        })
        self.dialog = false
        self.$root.$emit('view/picture/show')
      })
    }
  }
}
</script>
