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
        @click="dialog = false">
        <v-icon>arrow_back</v-icon>
      </v-toolbar-side-icon>
      <v-toolbar-title>
        Statement
      </v-toolbar-title>
    </v-toolbar>
    <div
      style="background: white; position: absolute; top: 48px; left: 0; right: 0; bottom: 0; overflow: auto;">
      <div
      class="page-content">
        <div
          v-if="loading"
          class="hero-x"
          style="margin: 50px 0;">
          <v-progress-circular
            indeterminate
            color="primary"
            size="80"
            width="2" />
        </div>
        <v-data-table
          v-else
          :headers="type === 'savings' ? savingsHeaders : interestHeaders"
          :items="data"
          style="display: block; margin: auto; width: auto; max-width: 900px;">
          <template v-slot:items="props">
            <td>{{ props.item.act_number }}</td>
            <td>{{ props.item.transaction_id }}</td>
            <td>{{ props.item.debited }}</td>
            <td>{{ props.item.credited }}</td>
            <td>{{ props.item.transaction_date }}</td>
            <td>{{ props.item.present_balance }}</td>
            <td v-if="type === 'interest'">
              {{props.item.interest_account ? '5%' : '-'}}
            </td>
          </template>
        </v-data-table>
      </div>
    </div>
  </v-dialog>
</template>

<script>
/* eslint-disable camelcase */

import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: true,
      type: '',
      dialog: false,
      savingsHeaders: [
        { text: 'Account Number', value: 'act_number', sortable: false },
        { text: 'Transaction ID', value: 'transaction_id', sortable: false },
        { text: 'Debited', value: 'debited', sortable: false },
        { text: 'Credited', value: 'credited', sortable: false },
        { text: 'Date', value: 'transaction_date', sortable: false },
        { text: 'Balance', value: 'present_balance', sortable: false }
      ],
      interestHeaders: [
        { text: 'Account Number', value: 'act_number', sortable: false },
        { text: 'Transaction ID', value: 'transaction_id', sortable: false },
        { text: 'Debited', value: 'debited', sortable: false },
        { text: 'Credited', value: 'credited', sortable: false },
        { text: 'Date', value: 'transaction_date', sortable: false },
        { text: 'Balance', value: 'present_balance', sortable: false },
        { text: 'Interest', value: 'interest', sortable: false }
      ],
      data: [],
      accountBalance: '',
      currencyLabel: ''
    }
  },
  computed: mapState({
    account: state => state.app.account,
    profile: state => state.app.profile,
    onChangeDialog: function () {
      return this.dialog
    }
  }),
  watch: {
    onChangeDialog: function (state) {
      if (state) {
        this.fetchPresentSavingsBalance().then((balance) => {
          console.log(balance)
          if (balance !== null) {
            this.accountBalance = balance
          }
        }).catch((err) => {
          // Error while fetching balance
          if (err.message === 'ENOACC') {
            this.$router.replace('/')
          }
        })
        this.fetchTransactions().then((results) => {
          results.forEach((transactionItem) => {
            const targetId = this.data.findIndex(x => x.transaction_id === transactionItem.transaction_id)
            if (targetId < 0) {
              this.data.push(Object.assign(
                {},
                {
                  date: new Date(transactionItem.transaction_date).toLocaleDateString(),
                  act_number: this.account.accountNumber
                },
                transactionItem
              ))
            }
          })
          this.loading = false
        })
      }
    }
  },
  mounted () {
    this.$root.$on('openStatements', (type) => {
      this.dialog = true
      this.type = type || 'savings'
    })
  },
  methods: {
    ...mapActions([
      'fetchPresentSavingsBalance',
      'fetchTransactions'
    ])
  }
}
</script>