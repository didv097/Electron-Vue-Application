<template>
  <div
    id="transactions">
    <div
      v-if="!loading">
      <v-data-table
        :headers="headers"
        :items="data"
        style="display: block; margin: auto; width: auto; max-width: 750px;">
        <template v-slot:items="props">
          <td>{{ props.item.transaction_id }}</td>
          <td>{{ props.item.debited }}</td>
          <td>{{ props.item.credited }}</td>
          <td>{{ props.item.date }}</td>
          <td>{{ props.item.present_balance }}</td>
        </template>
      </v-data-table>
    </div>
    <div
      v-else
      style="height: 200px">
      <v-progress-circular
        class="hero-xy"
        color="primary"
        indeterminate
        size="80"
        width="2" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: true,
      headers: [
        { text: 'Transaction ID', value: 'transaction_id', sortable: false },
        { text: 'Debited', value: 'debited', sortable: false },
        { text: 'Credited', value: 'credited', sortable: false },
        { text: 'Date', value: 'date', sortable: false },
        { text: 'Balance', value: 'present_balance', sortable: false }
      ],
      data: [
        /* {
          transaction_id: 'lu6v52',
          debited: '1,000.00',
          credited: '',
          transaction_date: 'Sunday, March 10, 2019',
          balance: '-1,000.00'
        } */
      ]
    }
  },
  created () {
    this.fetchTransactions().then((results) => {
      results.forEach((transactionItem) => {
        const targetId = this.data.findIndex(x => x.transaction_id === transactionItem.transaction_id)
        if (targetId < 0) {
          this.data.push(Object.assign(
            {},
            {
              date: new Date(transactionItem.transaction_date).toLocaleDateString()
            },
            transactionItem
          ))
        }
      })
      this.loading = false
    }).catch((error) => {
      // TODO handle error
      console.error(error)
    })
  },
  methods: {
    ...mapActions([
      'fetchTransactions'
    ])
  }
}
</script>

<style scoped>
  #transactions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 45px;
    overflow: auto;
  }
</style>
