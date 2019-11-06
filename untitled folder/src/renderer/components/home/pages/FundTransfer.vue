<template>
  <v-dialog
    v-model="dialog"
    hide-overlay
    fullscreen
    transition="dialog-bottom-transition">
    <div
      style="background: white; position: fixed; top: 0; left: 0; right: 0; bottom: 0; overflow: auto;">
      <div
        style="position: absolute; top: 0; left: 0; margin: 10px;">
        <v-btn
          color="primary"
          icon
          :disabled="loading"
          @click="dialog = false">
          <v-icon> close </v-icon>
        </v-btn>
      </div>
      <div
        v-if="loading">
        <div
          id="fund-transfer-loader"
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
        <h1
          style="text-align: center;">
          {{ verifyToken ? 'Verify Transfer Token' : 'Fund Transfer' }}
        </h1>
        <h4
          style="text-align: center;">
          {{ verifyToken ? 'Please verify transfer token number that is sent to your registered email address' : getTransferLabel(fundTransferType) }}
        </h4>
        <!-- Type 1 -->
        <div
          v-if="!verifyToken && fundTransferType === 0"
          style="margin: 20px 0;">
          <v-select
            box
            v-model="transferTypeA.principleDebit"
            :items="principleDebit"
            :menu-props="{ maxHeight: '400' }"
            label="Account Debit for principal" />
          <v-text-field
            v-model="transferTypeA.amount"
            :rules="[rules.isNumber]"
            box
            label="Amount" />
          <v-text-field
            disabled
            :menu-props="{ maxHeight: '400' }"
            :value="account.currencyText"
            box
            label="Currency" />
          <v-text-field
            v-model="transferTypeA.beneficiaryName"
            box
            label="Beneficiary Name" />
          <v-text-field
            v-model="transferTypeA.beneficiaryAccountNumber"
            box
            label="Beneficiary Account No/IBAN" />
          <v-btn
            color="primary"
            depressed
            block
            large
            @click="proceed">
            Proceed
          </v-btn>
        </div>
        <!-- Type 2 -->
        <div
          v-else-if="!verifyToken && fundTransferType === 1"
          style="margin: 20px 0;">
          <!-- Step 0 -->
          <div
            v-if="types.otherBank.step === 0">
            <v-select
              box
              v-model="transferTypeB.principleDebit"
              :items="principleDebit"
              label="Account Debit for principal" />
            <v-text-field
              v-model="transferTypeB.amount"
              box
              type="number"
              label="Amount" />
            <v-text-field
              disabled
              :menu-props="{ maxHeight: '400' }"
              :value="account.currencyText"
              box
              label="Currency" />
            <v-select
              v-model="transferTypeB.charges"
              :items="principleDebit"
              box
              label="Account to debit for commission, VAT and telex charges:" />
            <v-btn
              depressed
              color="primary"
              class="white--text"
              style="width: 50%; margin: auto; display: block;"
              large
              @click="otherBankTransferSwitch(1)">
              Next
            </v-btn>
          </div>
          <!-- Step 1 -->
          <div
            v-else-if="types.otherBank.step === 1">
            <v-text-field
              box
              v-model="transferTypeB.beneficiaryName"
              label="Beneficiary Name" />
            <v-textarea
              v-model="transferTypeB.address"
              box
              label="Beneficiary Address" />
            <v-select
              id="id-fund-transfer-modal"
              v-model="transferTypeB.country"
              box
              :items="countryList"
              persistent-hint
              label="Beneficiary Country" />
            <v-text-field
              v-model="transferTypeB.beneficiaryNo"
              box
              label="Beneficiary Account No/IBAN" />
            <v-btn
              depressed
              color="primary"
              class="white--text"
              style="width: 50%; margin: auto; display: block;"
              large
              @click="otherBankTransferSwitch(2)">
              Next
            </v-btn>
            <v-btn
              depressed
              style="width: 50%; margin: 10px auto; display: block;"
              large
              @click="otherBankTransferSwitch(0)">
              back
            </v-btn>
          </div>
          <!-- Step 2 -->
          <div
            v-else-if="types.otherBank.step === 2">
            <v-text-field
              v-model="transferTypeB.bankName"
              box
              label="Beneficiary Bank Name" />
            <v-textarea
              v-model="transferTypeB.bankAddress"
              box
              label="Beneficiary Bank Address" />
            <v-text-field
              v-model="transferTypeB.swiftCode"
              box
              label="Beneficiary Swift Code" />
            <v-text-field
              v-model="transferTypeB.sortCode"
              box
              label="Beneficiary Bank Routing No/Sort Code" />
            <v-btn
              depressed
              color="primary"
              class="white--text"
              style="width: 50%; margin: auto; display: block;"
              large
              @click="otherBankTransferSwitch(3)">
              Next
            </v-btn>
            <v-btn
              depressed
              style="width: 50%; margin: 10px auto; display: block;"
              large
              @click="otherBankTransferSwitch(1)">
              back
            </v-btn>
          </div>
          <!-- Step 3 -->
          <div
            v-else-if="types.otherBank.step === 3">
            <v-text-field
              v-model="transferTypeB.inBankName"
              box
              label="Intermediary Bank Name" />
            <v-text-field
              v-model="transferTypeB.inBankAddress"
              box
              label="Intermediary Bank Address" />
            <v-text-field
              v-model="transferTypeB.inBankSwiftCode"
              box
              label="Intermediary Bank BIC/SWIFT Code" />
            <v-text-field
              v-model="transferTypeB.inBankSortCode"
              box
              label="Intermediary Bank Routing No/Sort Code" />
            <v-btn
              depressed
              color="primary"
              class="white--text"
              style="width: 50%; margin: 10px auto; display: block;"
              large
              @click="otherBankTransferSwitch(4)">
              Next
            </v-btn>
            <v-btn
              depressed
              style="width: 50%; margin: 10px auto; display: block;"
              large
              @click="otherBankTransferSwitch(2)">
              back
            </v-btn>
          </div>
          <!-- Step 4 -->
          <div
            v-else-if="types.otherBank.step === 4">
            <v-text-field
              v-model="transferTypeB.accountWithInBank"
              box
              label="Beneficiary Bank Account With Intermediary Bank" />
            <v-textarea
              v-model="transferTypeB.purpose"
              box
              label="Purpose of Payment" />
            <v-btn
              depressed
              color="primary"
              class="white--text"
              block
              large
              @click="proceed">
              Submit
            </v-btn>
            <v-btn
              depressed
              style="width: 50%; margin: 10px auto; display: block;"
              large
              @click="otherBankTransferSwitch(3)">
              back
            </v-btn>
          </div>
        </div>
        <div
          v-if="verifyToken">
          <v-text-field
            v-model="transferToken"
            label="Transfer Token"
            box
            style="margin-top: 50px;" />
          <v-btn
            depressed
            color="primary"
            large
            block>
            Submit
          </v-btn>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

const animationDataExchange = require('@/assets/lottie/4597-exchange.json')
const animationDataSuccess = require('@/assets/lottie/animation-w796-h714.json')
const lottie = require('lottie-web')
const countryList = require('country-list')

export default {
  props: {
    balance: {
      type: Number,
      required: true,
      default: () => { return 0 }
    }
  },
  data () {
    return {
      dialog: false,
      loading: false,
      finished: false,
      transferToken: '',
      verifyToken: false,
      lottieHanlde: null,
      lottieHandleSuccess: null,
      values: {
        currency: 'USD'
      },
      types: {
        otherBank: {
          step: 0
        }
      },
      transferTypeB: {
        principleDebit: '',
        amount: '',
        currency: 'USD',
        charges: '',
        beneficiaryName: '',
        address: '',
        country: '',
        beneficiaryNo: '',
        bankName: '',
        bankAddress: '',
        swiftCode: '',
        sortCode: '',
        inBankName: '',
        inBankAddress: '',
        inBankSwiftCode: '',
        inBankSortCode: '',
        accountWithInBank: '',
        purpose: ''
      },
      countryList: countryList.getNames(),
      principleDebit: [],
      transferTypeA: {
        principleDebit: '',
        amount: '',
        currency: 'USD',
        beneficiaryName: '',
        beneficiaryAccountNumber: ''
      },
      rules: {
        isNumber: value => !isNaN(value) || 'Invalid amount'
      }
    }
  },
  computed: mapState({
    account: state => state.app.account,
    fundTransferType: state => state.app.fundTransferType,
    onChangeLoading: function () {
      return this.loading
    },
    onChangeFinished: function () {
      return this.finished
    },
    onChangeDialog: function () {
      return this.dialog
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
    onChangeDialog: function (status) {
      if (!status) {
        this.types.otherBank.step = 0
        this.finished = false
      } else {
        const account = this.getAccount()
        this.principleDebit.push(account.accountNumber)
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
    this.$root.$on('openFundTransfer', () => {
      this.dialog = true
    })
  },
  methods: {
    ...mapActions([
      'fetchTransactions',
      'initiateTransfer',
      'newThirdPartyTransfer'
    ]),
    ...mapGetters([
      'getAccount'
    ]),
    proceed: function () {
      if (this.balance < 1) {
        this.$root.$emit('genericMessage/show', {
          title: 'Insufficient balance',
          message: `Failed to proceed with the transfer. You don't have sufficient balance to proceed with fundtransfer.`
        })
        return
      }
      switch (this.fundTransferType) {
        case 0:
          const {
            principleDebit,
            amount,
            currency,
            beneficiaryName,
            beneficiaryAccountNumber
          } = this.transferTypeA
          if (
            principleDebit && amount &&
            !isNaN(amount) &&
            currency && beneficiaryName &&
            beneficiaryAccountNumber
          ) {
            this.loading = true
            const self = this
            this.initiateTransfer({
              principleDebit,
              amount,
              currency,
              beneficiaryName,
              beneficiaryAccountNumber
            }).then(() => {
              // ToDo: Update app data
              console.log('Transfer Success')
              const waitTime = setInterval(() => {
                self.loading = false
                self.finished = true
                // self.$root.$emit('showSnackbar', { message: 'Your Transfer Request is Initiated' })
                clearInterval(waitTime)
              }, 4000)
            }).catch((err) => {
              // ToDo: Update app data
              self.$root.$emit('genericMessage/show', {
                title: 'Failed to complete transfer',
                message: err
              })
              self.loading = false
              self.finished = false
            })
          } else {
            this.$root.$emit('genericMessage/show', {
              title: 'Incomplete Information',
              message: 'Please fill all the information to continue.'
            })
          }
          break
        case 1:
          this.onProceedFormB()
          break
        default:
          break
      }
    },
    onProceedFormB: function () {
      const {
        principleDebit,
        amount,
        currency,
        charges,
        beneficiaryName,
        address,
        country,
        beneficiaryNo,
        bankName,
        bankAddress,
        swiftCode,
        sortCode,
        inBankName,
        inBankAddress,
        inBankSwiftCode,
        inBankSortCode,
        accountWithInBank,
        purpose
      } = this.transferTypeB
      console.log(
        {
          principleDebit,
          amount,
          currency,
          charges,
          beneficiaryName,
          address,
          country,
          beneficiaryNo,
          bankName,
          bankAddress,
          swiftCode,
          sortCode,
          inBankName,
          inBankAddress,
          inBankSwiftCode,
          inBankSortCode,
          accountWithInBank,
          purpose
        }
      )
      if (!(amount && beneficiaryName && beneficiaryNo)) {
        return
      }
      if (isNaN(amount)) {
        return
      }
      this.newThirdPartyTransfer({
        amount,
        beneficiaryName,
        beneficiaryNo
      }).then((data) => {
        // this.$root.$emit('openPendingTransfer')
        this.$root.$emit('continueTransaction/show', (data))
        this.dialog = false
      }).catch((err) => {
        console.error(err)
        this.$root.$emit('genericMessage/show', {
          title: 'Unable to complete Transfer',
          message: err
        })
      })
    },
    showLoader: function () {
      this.loading = true
      this.$nextTick(() => {
        this.lottieHanlde = lottie.loadAnimation({
          container: document.getElementById('fund-transfer-loader'),
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
    },
    getTransferLabel: function (type) {
      switch (type) {
        case 0:
          return 'Transfer To Interbank Settlement A/C'
        case 1:
          return 'Transfer to Other Banks (Instant)'
        default:
          break
      }
    },
    otherBankTransferSwitch: function (step) {
      this.types.otherBank.step = step
    }
  }
}
</script>

<style scoped>
  ::-webkit-scrollbar {
    width: 5px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: grey;
  }
</style>
