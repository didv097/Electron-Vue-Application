export default {
  setFundTransferType: function (state, type) {
    console.log('setFundTransferType', type)
    state.fundTransferType = type
  },
  setAccount: function (state, data) {
    state.account = Object.assign({}, data)
  },
  updateAccount: function (state, data) {
    if (data && data.constructor === {}.constructor && 'currency' in data && data.currency && 'currencyText' in data && data.currencyText) {
      state.account.currency = data.currency
      state.account.currencyText = data.currencyText
    }
  },
  setProfile: function (state, data) {
    state.profile = Object.assign({}, data)
    console.log(state.profile)
  },
  updateLastLogin: function (state, timestamp) {
    if (timestamp) {
      state.lastLogin = timestamp
    }
  },
  updateProfilePic: function (state, base64) {
    if (base64) {
      state.profilePic = base64
    }
  }
}
