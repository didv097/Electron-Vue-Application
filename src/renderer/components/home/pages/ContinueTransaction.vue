<template>
  <v-dialog
    v-model="dialog"
    hide-overlay
    fullscreen
    transition="dialog-bottom-transition">
    <v-toolbar
      flat
      fixed
      dense>
      <v-toolbar-side-icon
        :disabled="loading"
        @click="dialog = false">
        <v-icon>arrow_back</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>
        Pending Transfer
      </v-toolbar-title>
    </v-toolbar>
    <div
      style="background: white; position: absolute; top: 48px; left: 0; right: 0; bottom: 0; overflow: auto;">
      <div
        v-if="loading">
        <div
          id="fund-transfer-loader-2"
          class="hero-xy">
        </div>
      </div>
      <div
        v-else-if="finished">
        <div
          class="hero-xy">
          <div
            id="fund-transfer-success"
            style="height: 300px; width: 300px; display: block; margin: auto;" />
          <h1 class="display-1" style="text-align: center; margin-top: 40px;">Transaction Completed</h1>
        </div>
      </div>
      <div
        v-else
        style="width: auto; max-width: 500px; display: block; margin: auto; margin-top: 48px;">
        <v-text-field
          v-model="transferToken"
          label="Transfer Token"
          box
          style="margin-top: 50px;" />
        <v-btn
          depressed
          color="primary"
          large
          block
          @click="finishTransaction">
          Submit
        </v-btn>
        <v-btn
          depressed
          color="grey"
          class="white--text"
          large
          block
          @click="resendToken">
          Resend Ticket Number
        </v-btn>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const animationDataExchange = require('@/assets/lottie/4597-exchange.json')
const animationDataSuccess = require('@/assets/lottie/animation-w796-h714.json')
const lottie = require('lottie-web')

export default {
  data () {
    return {
      dialog: false,
      transactionId: '',
      transferToken: '',
      lottieHanlde: null,
      loading: false,
      finished: false,
      lottieHandleSuccess: null
    }
  },
  computed: mapState({
    fundTransferType: state => state.app.fundTransferType,
    onChangeLoading: function () {
      return this.loading
    },
    onChangeDialog: function () {
      return this.dialog
    },
    onChangeFinished: function () {
      return this.finished
    }
  }),
  watch: {
    onChangeLoading: function (status) {
      if (status) {
        this.showLoader()
      } else {
        this.hideLoader()
      }
    },
    onChangeDialog: function (state) {
      if (!state) {
        this.transferToken = ''
        this.transactionId = ''
        this.loading = false
        this.finished = false
      }
    },
    onChangeFinished: function (status) {
      if (status) {
        this.showSuccess()
      } else {
        this.hideSuccess()
      }
    }
  },
  mounted () {
    this.$root.$on('continueTransaction/show', (data) => {
      this.transactionId = data.transaction_id
      this.dialog = true
    })
  },
  methods: {
    ...mapActions([
      'resendTicketNumber',
      'verifyTransaction'
    ]),
    resendToken: function () {
      this.resendTicketNumber({ transactionId: this.transactionId }).then(() => {
        this.$root.$emit('genericMessage/show', {
          title: 'Check your email',
          message: 'Token number for this transaction is sent to your email.'
        })
      })
    },
    finishTransaction: function () {
      this.loading = true
      const self = this
      const waitTime = setInterval(() => {
        self.verifyTransaction({
          transactionId: self.transactionId,
          token: self.transferToken
        }).then(() => {
          self.loading = false
          self.finished = true
          self.$root.$emit('home/refreshBalance')
        }).catch((err) => {
          self.loading = false
          if (typeof err === 'string') {
            self.$root.$emit('genericMessage/show', {
              title: 'Invalid Token',
              message: err
            })
          } else {
            self.$root.$emit('genericMessage/show', {
              title: 'Unable to verify',
              message: 'Unable to verify the token. Please try again later.'
            })
          }
        })
        clearInterval(waitTime)
      }, 3000)
    },
    showLoader: function () {
      this.loading = true
      this.$nextTick(() => {
        this.lottieHanlde = lottie.loadAnimation({
          container: document.getElementById('fund-transfer-loader-2'),
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: animationDataExchange
        })
      })
    },
    hideLoader: function () {
      if (this.lottieHanlde) {
        this.lottieHanlde.destroy()
      }
    },
    showSuccess: function () {
      this.$nextTick(() => {
        this.lottieHandleSuccess = lottie.loadAnimation({
          container: document.getElementById('fund-transfer-success'),
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: animationDataSuccess
        })
      })
    },
    hideSuccess: function () {
      if (this.lottieHandleSuccess) {
        this.lottieHandleSuccess.destroy()
      }
    }
  }
}
</script>
