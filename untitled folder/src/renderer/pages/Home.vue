<template>
  <div
    id="app-home">
    <!-- Page buttons -->
    <v-btn
      class="menu-button"
      icon
      flat
      large
      @click="toggleSidebar">
      <v-icon class="white--text"> menu </v-icon>
    </v-btn>
    <div
      class="user-button">
      <!-- <notifications /> -->
      <v-chip
        v-if="account"
        color="indigo"
        text-color="white"
        style="font-size: 11px;"
        small>
        <v-avatar>
          <v-icon small>access_time</v-icon>
        </v-avatar>
        Last Login - <b>{{ account.last_login || 'First Time' }}</b>
      </v-chip>
      <v-btn
        icon
        flat
        large
        @click="$root.$emit('openProfile')">
        <v-avatar
          v-if="profilePic"
          :size="35">
          <img
            :src="`data:image/png;base64, ${profilePic}`"
            alt="User">
        </v-avatar>
        <v-avatar
          v-else
          :size="35">
          <img
            src="@/assets/profile-placeholder.png"
            alt="User">
        </v-avatar>
      </v-btn>
    </div>
    <v-menu
      class="add-button"
      offset-y>
      <v-btn
        class="primary"
        icon
        flat
        large
        slot="activator">
        <v-icon class="white--text"> add </v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in addMenu"
          :key="index"
          @click="item.callback"
        >
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <!-- Sidebar -->
    <sidebar
      :menu="menu"
      :sidebar="sidebar.state"
      :onChangeSidebar="onChangeSidebar" />
    <!-- Account Balance -->
    <div
      v-ripple
      class="info-balance">
      <div
        class="hero-xy"
        style="color: #FFFFFF; width: auto; text-align: center;">
        <div
          style="padding: 15px 20px; border-radius: 10px; display: inline-block;">
          <div
            id="home-page-account-type"
            style="margin: 10px;">
            <div
              class="account-type"
              :active="accountType === 'savings'"
              @click="changeAccountTypeForBalance('savings')">
              SAVINGS ACCOUNT
            </div>
            <!-- <div
              class="account-type"
              :active="accountType === 'interest'"
              @click="changeAccountTypeForBalance('interest')">
              INTEREST ACCOUNT
            </div> --->
            <v-btn
              small
              icon
              flat
              class="white--text"
              @click="fetchBalance">
              <v-icon
                small>
                refresh
              </v-icon>
            </v-btn>
          </div>
          <h1
            v-if="!accountBalance.loading"
            style="font-family: Roboto-Light; font-size: 52px;">
            <span v-html="account.currency" /> {{ accountType === 'savings' ? accountBalance.savingsValue : accountBalance.savingsValue && '-' }}
          </h1>
          <v-progress-circular
            v-else
            indeterminate
            size="50"
            width="2"
            style="margin: 20px 0;" />
          <div
            v-if="!accountBalance.loading"
            style="font-size: 11px; font-family: Roboto-Regular;">
            ACCOUNT BALANCE
          </div>
        </div>
      </div>
    </div>
    <!-- Pages -->
    <profile />
    <accounts />
    <statement />
    <transfer />
    <cheque-book />
    <API />
    <app-notification />
    <fund-transfer
      :balance="accountBalance.savingsValue" />
    <continue-transaction />
    <pending-transfer />
    <!-- Dialogs -->
    <select-account />
    <select-transfer-type />
    <customer-support />
    <messages />
    <new-message />
    <!-- Info Menu -->
    <div
      class="info-menu">
      <tabs
        :menu="tabMenu"
        :onTabChange="onTabChange" />
      <main-menu
        v-if="tabIndex === 0"
        :menu="menu"/>
      <transactions
        v-if="tabIndex === 1" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Tabs from '@/components/home/Tabs'
import Sidebar from '@/components/home/Sidebar'
import MainMenu from '@/components/home/MainMenu'
import Transactions from '@/components/home/Transactions'
import Notifications from '@/components/home/Notifications'
import Profile from '@/components/home/pages/Profile'
import Accounts from '@/components/home/pages/Accounts'
import Statement from '@/components/home/pages/Statement'
import Transfer from '@/components/home/pages/Transfer'
import FundTransfer from '@/components/home/pages/FundTransfer'
import ContinueTransaction from '@/components/home/pages/ContinueTransaction'
import PendingTransfer from '@/components/home/pages/PendingTransfer'
import ChequeBook from '@/components/home/pages/ChequeBook'
import SelectAccount from '@/components/home/dialogs/SelectAccount'
import SelectTransferType from '@/components/home/dialogs/SelectTransferType'
import CustomerSupport from '@/components/home/dialogs/CustomerSupport'
import Messages from '@/components/home/dialogs/Messages'
import NewMessage from '@/components/home/dialogs/NewMessage'
import AppNotification from '@/components/home/AppNotification'

// Demo Component
import API from '@/components/home/pages/API'

export default {
  components: {
    Tabs,
    Sidebar,
    MainMenu,
    Transactions,
    Notifications,
    Profile,
    Accounts,
    Transfer,
    FundTransfer,
    ContinueTransaction,
    PendingTransfer,
    ChequeBook,
    SelectAccount,
    SelectTransferType,
    CustomerSupport,
    Messages,
    NewMessage,
    API,
    AppNotification,
    Statement
  },
  data () {
    return {
      sidebar: {
        state: false
      },
      tabMenu: [
        { label: 'Menu', id: 'home-tab-menu' },
        { label: 'Transactions', id: 'home-tab-transactions' }
      ],
      tabIndex: 0,
      menu: [
        { icon: 'account_balance_wallet', label: 'Accounts', id: 'menu-transfer-funds', callback: () => { this.$root.$emit('selectAccount') } },
        { icon: 'account_circle', label: 'Profile', id: 'menu-account-statements', callback: () => { this.$root.$emit('openProfile', 'id_2') } },
        { icon: 'swap_horizontal_circle', label: 'Transfer', id: 'menu-account-accounts', callback: () => { this.$root.$emit('openTransfer') } },
        { icon: 'description', label: 'Statement', id: 'menu-account-cards', callback: () => { this.$root.$emit('selectAccount', { type: 'statement' }) } },
        // { icon: 'supervised_user_circle', label: 'References', id: 'menu-references', callback: () => { this.$root.$emit('selectAccount') } },
        { icon: 'money', label: 'Cheque', id: 'menu-cheque', callback: () => { this.$root.$emit('openCheque') } },
        { icon: 'message', label: 'Messages', id: 'menu-messages', callback: () => { this.$root.$emit('openMessages') } },
        { icon: 'contact_support', label: 'Customer Support', id: 'menu-support', callback: () => { this.$root.$emit('openNewMessage') } },
        { icon: 'exit_to_app', label: 'Logout', id: 'menu-exit', callback: () => { this.$router.replace('/') } }
        // { icon: 'code', label: 'API Demo', id: 'menu-api', callback: () => { this.$root.$emit('openAPI') } }
      ],
      addMenu: [
        { title: 'New Fund Transfer', callback: () => { this.$root.$emit('selectTransferType') } }
      ],
      notifications: false,
      accountType: 'savings',
      accountBalance: {
        savingsValue: 0,
        interestValue: 0,
        loading: true
      },
      currency: '&#36;'
    }
  },
  computed: mapState({
    lastLogin: state => state.app.lastLogin,
    account: state => state.app.account,
    profilePic: state => state.app.profilePic
  }),
  created () {
    this.fetchSavingsBalance().then(({ balance, currency }) => {
      // this.accountBalance.savingsValue = balance
      this.currency = currency
      // this.accountBalance.loading = false
    }).catch((err) => {
      // Error while fetching balance
      if (err.message === 'ENOACC') {
        this.$router.replace('/')
      }
    })
    this.refreshBalance()
    this.fetchProfile()
    this.getProfilePic()
    this.$root.$on('home/refreshBalance', () => {
      this.refreshBalance()
    })
  },
  methods: {
    ...mapActions([
      'fetchSavingsBalance',
      'fetchProfile',
      'getProfilePic',
      'fetchPresentSavingsBalance',
      'updateAccount'
    ]),
    refreshBalance: function () {
      this.fetchPresentSavingsBalance().then((balance) => {
        if (balance !== null) {
          this.accountBalance.savingsValue = balance
          this.accountBalance.loading = false
        }
      }).catch((err) => {
        // Error while fetching balance
        if (err.message === 'ENOACC') {
          this.$router.replace('/')
        }
      })
    },
    toggleSidebar: function () {
      if (this.sidebar.state) {
        this.onChangeSidebar(false)
      } else {
        this.onChangeSidebar(true)
      }
    },
    onChangeSidebar: function (state) {
      this.sidebar.state = state
    },
    onTabChange: function (index) {
      this.tabIndex = index
    },
    changeAccountTypeForBalance: function (type) {
      this.accountType = type
    },
    setAccountBalance: function ({ currency, balance }) {
      balance && (this.savingsAccountBalance.savingsValue = balance)
      this.currency = currency || '&#8377;'
    },
    fetchBalance: function () {
      this.fetchSavingsBalance().then(({ balance, currency }) => {
        this.currency = currency
      }).catch((err) => {
        // Error while fetching balance
        if (err.message === 'ENOACC') {
          this.$router.replace('/')
        }
      })
      this.fetchPresentSavingsBalance().then((balance) => {
        if (balance !== null) {
          this.accountBalance.savingsValue = balance
          this.accountBalance.loading = false
        }
      }).catch((err) => {
        // Error while fetching balance
        if (err.message === 'ENOACC') {
          this.$router.replace('/')
        }
      })
      this.updateAccount()
    }
  }
}
</script>
