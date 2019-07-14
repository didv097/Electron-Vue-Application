<template>
  <transition
    name="fade">
    <div
      v-if="dialog"
      id="dialog-select-account"
      @click="onClickDialog"
      class="custom-dialog-wrapper im-close">
      <div
        class="custom-dialog"
        style="height: 500px;">
        <div
          class="custom-dialog-art"
          style="background-image: url('static/backgrounds/pexels-photo-768125-2.jpeg')" />
        <div class="custom-dialog-info-wrapper">
          <div class="custom-dialog-title">
            Please select type of account
          </div>
          <v-btn
            depressed
            class="custom-dialog-button white--text"
            color="green"
            style="width: 60%;"
            @click="openSavingsAccount">
            Savings Account
          </v-btn>
          <v-btn
            depressed
            class="custom-dialog-button white--text"
            color="#535353"
            style="width: 60%;"
            @click="openInterestAccount">
            Interest Account
          </v-btn>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      statement: false
    }
  },
  mounted () {
    document.addEventListener('keyup', this.onKeyUp)
    this.$root.$on('selectAccount', (data) => {
      this.dialog = true
      if (data && data.constructor === {}.constructor && data.type && data.type === 'statement') {
        this.statement = true
      } else {
        this.statement = false
      }
    })
  },
  methods: {
    onClickAccount: function () {
      this.$root.$emit('openAccounts')
      this.dialog = false
    },
    onKeyUp: function (e) {
      if (e.keyCode === 27) {
        this.dialog = false
      }
    },
    onClickDialog: function (e) {
      if (e.target.className && e.target.className.includes('im-close')) {
        this.dialog = false
      }
    },
    openSavingsAccount: function () {
      this.dialog = false
      if (this.statement) {
        this.$root.$emit('openStatements', 'savings')
      } else {
        this.$root.$emit('openAccounts', 'savings')
      }
    },
    openInterestAccount: function () {
      this.dialog = false
      if (this.statement) {
        this.$root.$emit('openStatements', 'interest')
      } else {
        this.$root.$emit('openAccounts', 'interest')
      }
    }
  }
}
</script>
