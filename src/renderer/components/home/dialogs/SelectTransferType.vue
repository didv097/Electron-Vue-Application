<template>
  <transition
    name="fade">
    <div
      v-if="dialog"
      id="dialog-select-trasfer-type"
      @click="onClickDialog"
      class="custom-dialog-wrapper im-close">
      <div
        class="custom-dialog"
        style="height: 550px;">
        <div
          class="custom-dialog-art"
          style="background-image: url('static/backgrounds/money-transfer-3588301_640.jpg'); background-position: center;" />
        <div class="custom-dialog-info-wrapper">
          <div class="custom-dialog-title">
            Fund Transfer Request
          </div>
          <v-btn
            depressed
            class="custom-dialog-button white--text"
            color="green"
            style="width: 60%;"
            @click="selectTransferType(0)">
            Transfer To Interbank Settlement A/C
          </v-btn>
          <v-btn
            depressed
            class="custom-dialog-button white--text"
            color="#535353"
            style="width: 60%;"
            @click="selectTransferType(1)">
            Transfer to Other Banks (Instant)
          </v-btn>
          <v-btn
            depressed
            class="custom-dialog-button white--text"
            color="#535353"
            style="width: 60%;"
            @click="pendingTransfer">
            Pending Transfer
          </v-btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      dialog: false
    }
  },
  mounted () {
    document.addEventListener('keyup', this.onKeyUp)
    this.$root.$on('selectTransferType', () => {
      this.dialog = true
    })
  },
  methods: {
    ...mapActions([
      'setFundTransferType'
    ]),
    onClickAccount: function () {
      this.dialog = false
    },
    onKeyUp: function (e) {
      if (e.keyCode === 27) {
        this.dialog = false
      }
    },
    selectTransferType: function (type) {
      this.setFundTransferType(type)
      this.dialog = false
      this.$root.$emit('openFundTransfer')
    },
    pendingTransfer: function () {
      this.$root.$emit('openPendingTransfer')
    },
    onClickDialog: function (e) {
      if (e.target.className && e.target.className.includes('im-close')) {
        this.dialog = false
      }
    }
  }
}
</script>
