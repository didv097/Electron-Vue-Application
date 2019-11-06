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
        Cheque Book
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        depressed
        color="primary"
        @click="requestNewCheckBook">
        Request New Chequebook
      </v-btn>
    </v-toolbar>
    <div
      style="background: white; position: absolute; top: 48px; left: 0; right: 0; bottom: 0; overflow: auto;">
      <div
        v-if="!loading"
        style="width: auto; max-width: 750px; display: block; margin: auto; padding: 10px;">
        <v-data-table
          :headers="headers"
          :items="data"
          style="display: block; margin: auto; width: auto; max-width: 750px;">
          <template v-slot:items="props">
            <td>{{ props.item.cust_act_number }}</td>
            <td>{{ props.item.cust_chkbook_number }}</td>
            <td>{{ props.item.isseu_date }}</td>
            <td>{{ props.item.status }}</td>
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
        { text: 'Customer Account Number', value: 'cust_act_number', sortable: false },
        { text: 'Cheque Book Number', value: 'cust_chkbook_number', sortable: false },
        { text: 'Request Date', value: 'isseu_date', sortable: false },
        { text: 'Status', value: 'status', sortable: false }
      ],
      data: [
        /* {
          customer_account_number: '12345678914',
          cheque_book_number: '027638922',
          request_data: 'Data',
          status: 'Active'
        } */
      ]
    }
  },
  computed: {
    onDialogChange: function () {
      return this.dialog
    }
  },
  watch: {
    onDialogChange: function (state) {
      if (state) {
        console.log('load checkbook data')
        this.renderCheckBookData()
      } else {
        this.loading = true
        this.data = []
      }
    }
  },
  mounted () {
    this.$root.$on('openCheque', () => {
      this.dialog = true
    })
  },
  methods: {
    ...mapActions([
      'fetchCheckbook',
      'requestCheckbook'
    ]),
    renderCheckBookData: function () {
      this.fetchCheckbook().then((data) => {
        console.log(data)
        data.forEach((entry) => {
          if (this.data.findIndex(x => x.cust_chkbook_number === entry.cust_chkbook_number) < 0) {
            const newObj = Object.assign({}, entry)
            if (newObj.isseu_date) {
              newObj.isseu_date = new Date(newObj.isseu_date).toLocaleString()
            }
            this.data.push(newObj)
          }
        })
        this.loading = false
      }).catch((err) => {
        // TODO Handle Error
        console.error(err)
        this.loading = false
      })
    },
    requestNewCheckBook: function () {
      this.$root.$emit('genericLoader/show')
      this.requestCheckbook().finally(() => {
        this.$root.$emit('genericLoader/hide')
        this.$root.$emit('genericMessage/show', {
          title: 'Success!',
          message: 'A new cheque has been requested. Our team will review your request.'
        })
        this.renderCheckBookData()
      })
    }
  }
}
</script>