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
        Transfer
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        depressed
        color="primary"
        small
        @click="$root.$emit('selectTransferType') && (dialog = false)">
        New Fund Transfer
      </v-btn>
    </v-toolbar>
    <div
      style="background: white; position: absolute; top: 48px; left: 0; right: 0; bottom: 0; overflow: auto;">
      <div
        v-if="loading"
        class="hero-x"
        style="margin: 50px auto;">
        <v-progress-circular
          indeterminate
          color="primary"
          size="80"
          width="2" />
      </div>
      <div
        v-else>
        <v-data-table
          :headers="headers"
          :items="data"
          style="display: block; margin: auto; width: auto; max-width: 1200px;">
          <template v-slot:items="props">
            <td>{{ props.item.act_number }}</td>
            <td>{{ props.item.transaction_id }}</td>
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.chk_number }}</td>
            <td>{{ props.item.debited }}</td>
            <td>{{ props.item.credited }}</td>
            <td>{{ props.item.transaction_date }}</td>
            <td>{{ props.item.present_balance }}</td>
            <td>
              <v-chip
                :color="props.item.status.toLowerCase() === 'success'
                  ? 'primary'
                  : props.item.status.toLowerCase() === 'pending' ? 'warning'
                  : 'error'"
                text-color="white">
                  {{ props.item.status }}
                </v-chip>
            </td>
          </template>
        </v-data-table>
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      loading: true,
      dialog: false,
      headers: [
        { text: 'Account Number', value: 'act_number', sortable: false },
        { text: 'Transaction ID', value: 'transaction_id', sortable: false },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Check Number', value: 'chk_number', sortable: false },
        { text: 'Debited', value: 'debited', sortable: false },
        { text: 'Credited', value: 'credited', sortable: false },
        { text: 'Date Of Transaction', value: 'transaction_date', sortable: false },
        { text: 'Balance', value: 'present_balance', sortable: false },
        { text: 'Status', value: 'status', sortable: false }
      ],
      data: [
        /* {
          account_number: '12345678914',
          transaction_id: 'lu6v52',
          description: 'Sample Description',
          check_number: '7239722331',
          debited: '1,000.00',
          credited: '0',
          date: 'Sunday, March 10, 2019',
          balance: '-1,000.00',
          status: 'Success'
        } */
      ]
    }
  },
  computed: mapState({
    account: state => state.app.account,
    onChangeDialog: function () {
      return this.dialog
    }
  }),
  watch: {
    onChangeDialog: function (state) {
      if (state) {
        this.fetchTransactions().then((results) => {
          results.forEach((transactionItem) => {
            console.log(transactionItem)
            const targetId = this.data.findIndex(x => x.transaction_id === transactionItem.transaction_id)
            if (targetId < 0) {
              if (transactionItem.debited) {
                this.data.push(Object.assign(
                  {},
                  {
                    date: new Date(transactionItem.transaction_date).toLocaleDateString(),
                    act_number: this.account.accountNumber,
                    status: 'success'
                  },
                  transactionItem
                ))
              }
            }
          })
          this.loading = false
        })
      }
    }
  },
  mounted () {
    this.$root.$on('openTransfer', () => {
      this.dialog = true
    })
  },
  methods: {
    ...mapActions([
      'fetchTransactions'
    ])
  }
}
</script>