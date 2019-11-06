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
        Pending Transfer
      </v-toolbar-title>
    </v-toolbar>
    <div
      style="background: white; position: absolute; top: 48px; left: 0; right: 0; bottom: 0; overflow: auto;">
      <div
        v-if="!loading"
        style="width: auto; max-width: 900px; display: block; margin: auto; padding: 10px;">
        <v-data-table
          :headers="headers"
          :items="data"
          style="display: block; margin: auto; width: auto; max-width: 900px;">
          <template v-slot:items="props">
            <td>{{ props.item.act_number }}</td>
            <td>{{ props.item.transaction_id }}</td>
            <td>{{ props.item.debited }}</td>
            <td>{{ props.item.credited }}</td>
            <td>{{ props.item.transaction_date }}</td>
            <td>{{ props.item.present_balance }}</td>
            <td>
              <v-btn
                small
                depressed
                color="primary"
                @click="onContinueTransaction(props.item)">
                Continue
              </v-btn>
            </td>
          </template>
        </v-data-table>
      </div>
      <div
        v-else
        class="hero-xy">
        <v-progress-circular
          color="primary"
          indeterminate
          size="60"
          width="2" />
      </div>
    </div>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: true,
      dialog: false,
      headers: [
        { text: 'Account Number', value: 'act_number', sortable: false },
        { text: 'Transaction ID', value: 'transaction_id', sortable: false },
        { text: 'Debited', value: 'debited', sortable: false },
        { text: 'Credited', value: 'credited', sortable: false },
        { text: 'Date', value: 'transaction_date', sortable: false },
        { text: 'Balance', value: 'present_balance', sortable: false },
        { text: 'Action', value: 'action', sortable: false }
      ],
      data: []
    }
  },
  computed: {
    onDialogChange: function () {
      return this.dialog
    }
  },
  watch: {
    onDialogChange: function (state) {
      if (!state) {
        this.data = []
        this.loading = true
      }
    }
  },
  mounted () {
    const self = this
    this.$root.$on('openPendingTransfer', () => {
      this.dialog = true
      this.$nextTick(() => {
        this.fetchPendingTransfer().then((data) => {
          if (data && data.constructor === [].constructor) {
            self.data = data
          }
        }).finally(() => {
          this.loading = false
        })
      })
    })
  },
  methods: {
    ...mapActions([
      'fetchPendingTransfer'
    ]),
    onContinueTransaction: function (data) {
      this.$root.$emit('continueTransaction/show', (data))
      this.dialog = false
    }
  }
}
</script>