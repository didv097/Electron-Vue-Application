<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    width="800">
    <v-card>
      <v-card-title
          class="headline grey lighten-2"
          primary-title>
          New Image
        </v-card-title>
        <img
          v-if="base64"
          :src="base64"
          style="width: auto; height: 400px; display: block; margin: auto;">
        <div
          v-else
          style="height: 300px; position: relative;">
          <div
            class="hero-xy"
            style="text-align: center;">
            Something went wrong.<br>
            Unable to capture the image. Please try again!
          </div>
        </div>
      <v-card-actions>
        <v-spacer />
        <v-btn
          depressed
          @click="dialog = false">
          Close
        </v-btn>
        <v-btn
          v-if="base64"
          depressed
          color="primary"
          @click="attachFile">
          Attach
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
      base64: '',
      file: ''
    }
  },
  mounted () {
    this.$root.$on('view/picture/show', () => {
      this.dialog = true
    })
    this.$root.$on('view/picture/data', (data) => {
      if (
        data &&
        'file' in data && data.file &&
        'base64' in data && data.base64
      ) {
        this.file = data.file
        this.base64 = data.base64
      }
    })
    this.$root.$on('view/picture/hide', () => {
      this.dialog = false
    })
  },
  methods: {
    attachFile: function () {
      this.$root.$emit('register/webcam/attach', {
        file: this.file,
        base64: this.base64
      })
      this.dialog = false
    }
  }
}
</script>
