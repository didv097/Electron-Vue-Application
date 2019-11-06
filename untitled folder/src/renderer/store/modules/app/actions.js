/* eslint-disable camelcase */
// const mysql = require('mysql')
// const uid = require('uniqid')
const axios = require('axios')
const API = `https://interbanksettlements.com/api`

/* let connection = mysql.createConnection({
  host: 'localhost',
  user: 'intetfxm_f_bank',
  password: 'intetfxm_f_bank',
  database: 'intetfxm_f_bank'
}) */

function getCurrencySymbol (type) {
  let currency = `${type}`.toUpperCase()
  switch (currency) {
    case 'USD':
      return '&#36;'
    case 'EUR':
      return '&#8364;'
    case 'GBP':
      return '&#163;'
    case 'JPY':
      return '&#165;'
    case 'CAD':
      return '&#36;'
    case 'AUD':
      return '&#36;'
    default:
      return '&#36;'
  }
}

/* function getCurrencyName (symbol) {
  switch (symbol) {
    case '&#36;':
      return 'USD'
    case '&#8364;':
      return 'EUR;'
    case '&#163;':
      return 'GBP;'
    case '&#165;':
      return 'JPY;'
    case '&#36;':
      return 'CAD;'
    case '&#36;':
      return 'AUD;'
    default:
      return 'USD'
  }
} */

export default {
  connectSql: function () {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  },
  authenticateUser: function (context, { userId, token, custId }) {
    console.log(userId)
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/login?uid=${userId}&cid=${custId}&pin=${token}`
      }).then((res) => {
        console.log(res.data)
        if ('data' in res && res.data && res.data.auth) {
          context.commit('setAccount', { userId, token, custId, accountNumber: res.data.accountNumber, currency: getCurrencySymbol(res.data.currency), last_login: res.data.last_login })
          context.commit('updateLastLogin', new Date().toLocaleString())
          context.dispatch('updateAccount')
          resolve()
        } else {
          reject(new Error(res.data.reason))
        }
      }).catch((err) => {
        console.error(err)
        reject(new Error(err))
      })
      /* connection.query(
        `select * from act_holder_details where user_id="${userId}" AND cust_password="${token}" AND customer_id="${custId}"`,
        function (error, results, fields) {
          if (error) {
            reject(error)
          }
          if (results && results.length > 0) {
            connection.query(
              `select cust_act_number from act_holder_details where user_id=${userId}`,
              function (error, results, fields) {
                if (error) {
                  reject(error)
                } else {
                  if (results && results.length > 0) {
                    context.commit('setAccount', { userId, token, custId, accountNumber: results[0].cust_act_number })
                    resolve()
                  }
                }
              }
            )
          } else {
            reject(new Error('Account not found'))
          }
        }) */
    })
  },
  updateAccount: function (context) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/fetchAccount?uid=${account.userId}`
      }).then((res) => {
        if ('data' in res && res.data && res.data.status) {
          context.commit('updateAccount', { currency: getCurrencySymbol(res.data.currency), currencyText: res.data.currency })
          resolve()
        } else {
          reject(new Error('Account not found'))
        }
      })
    })
  },
  fetchPresentSavingsBalance: function (context) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      if (!account) {
        reject(new Error('ENOACC'))
      }
      axios({
        method: 'get',
        url: `${API}/getPresentSavingsbalance?accountNumber=${account.accountNumber}`
      }).then((res) => {
        console.log(res.data)
        if ('data' in res && res.data && res.data.result) {
          resolve(res.data.result)
          resolve()
        } else {
          reject(new Error('Account not found'))
        }
      }).catch((err) => {
        console.error(err)
        reject(new Error('Account not found'))
      })
      /* connection.query(
        `SELECT present_balance FROM transaction where act_number=${account.accountNumber}`,
        function (err, results) {
          if (err) {
            reject(err)
          } else {
            if (results && results.length > 0) {
              resolve(results.pop().present_balance)
            } else {
              resolve(null)
            }
          }
        }) */
    })
  },
  fetchSavingsBalance: function (context) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      if (!account) {
        reject(new Error('ENOACC'))
      }
      /*
      connection.query(
        `SELECT cust_balance, cust_currency FROM cust_act_details where cust_act_no=${account.accountNumber}`,
        function (error, results, fields) {
          if (error) {
            reject(error)
          } else {
            if (results && results.length > 0) {
              resolve({
                balance: results[0].cust_balance,
                currency: getCurrencySymbol(results[0].cust_currency),
                currencyLabel: results[0].cust_currency
              })
            } else {
              resolve({
                balance: 0,
                currency: getCurrencySymbol(0)
              })
            }
          }
        }
      ) */
    })
  },
  fetchTransactions: function (context, type) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/getTransactions?accountNumber=${account.accountNumber}`
      }).then((res) => {
        console.log(res.data)
        if ('data' in res && res.data && res.data.result) {
          resolve(res.data.result)
          resolve()
        } else {
          reject(new Error('Account not found'))
        }
      }).catch((err) => {
        console.error(err)
        reject(new Error('Account not found'))
      })
      /* connection.query(
        `SELECT transaction_id, transaction_date, description, debited, credited, present_balance from transaction where act_number="${account.accountNumber}"`,
        function (error, results) {
          if (error) {
            reject(error)
          } else {
            resolve(results)
          }
        }
      ) */
    })
  },
  getProfilePic: function (context) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/getProfilePic?userId=${account.userId}`
      }).then((res) => {
        console.log(res.data)
        if ('data' in res && res.data) {
          if (res.data.status && res.data.base64) {
            context.commit('updateProfilePic', res.data.base64)
          } else {
            reject(new Error('Unable to fetch profile pic'))
          }
        } else {
          reject(new Error('Unable to find data'))
        }
      })
    })
  },
  fetchProfile: function (context) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/fetchProfile?userId=${account.userId}`
      }).then((res) => {
        if ('data' in res && res.data && res.data.result) {
          console.log(res.data.result)
          context.commit('setProfile', res.data.result)
          resolve(res.data.result)
        } else {
          reject(new Error('Account not found'))
        }
      }).catch((err) => {
        console.error(err)
        reject(new Error('Account not found'))
      })
      /* connection.query(
        `SELECT cust_photo, cust_name, cust_sex, cust_mail, cust_phone, cust_address, cust_branch_name, cust_atc_type from act_holder_details where user_id="${account.userId}"`,
        function (err, results) {
          if (err) {
            reject(err)
          }
          if (results && results.length > 0) {
            const {
              cust_address,
              cust_atc_type,
              cust_branch_name,
              cust_mail,
              cust_name,
              cust_phone,
              cust_photo,
              cust_sex
            } = results[0]
            context.commit('setProfile', {
              cust_address,
              cust_atc_type,
              cust_branch_name,
              cust_mail,
              cust_name,
              cust_phone,
              cust_photo,
              cust_sex
            })
            resolve(results)
          }
        }
      ) */
    })
  },
  updateProfile: function (context, data) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/updateProfile?profile=${JSON.stringify(data)}&userId=${account.userId}`
      }).then((res) => {
        console.log(res.data)
        if ('data' in res && 'status' in res.data && res.data.status) {
          resolve()
        } else {
          reject(new Error('Unable to send message'))
        }
      }).catch((err) => {
        console.error(err)
        reject(new Error('Account not found'))
      })
    })
  },
  fetchCheckbook: function (context) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/getCheckbook?accountNumber=${account.accountNumber}`
      }).then((res) => {
        console.log(res.data)
        if ('data' in res && res.data && res.data.result) {
          console.log(res.data.result)
          resolve(res.data.result)
        } else {
          reject(new Error('Error reading data'))
        }
      }).catch((err) => {
        console.error(err)
        reject(new Error('Account not found'))
      })
    })
  },
  requestCheckbook: function (context) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/requestCheckbook?accountNumber=${account.accountNumber}`
      }).then((res) => {
        console.log(res.data)
        if ('data' in res && 'status' in res.data && res.data.status) {
          resolve()
        } else {
          reject(new Error('Unable to send message'))
        }
      }).catch((err) => {
        console.error(err)
        reject(new Error('Account not found'))
      })
    })
  },
  setFundTransferType: function (context, type) {
    if (typeof type === 'number') {
      context.commit('setFundTransferType', type)
    }
  },
  fetchMessages: function (context) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/fetchMessages?accountNumber=${account.accountNumber}`
      }).then((res) => {
        if ('data' in res && res.data && res.data.result) {
          resolve(res.data.result)
        } else {
          reject(new Error('Account not found'))
        }
      }).catch((err) => {
        console.error(err)
        reject(new Error('Account not found'))
      })
      /* connection.query(
        `SELECT id, msg, date, sender, receiver, reply_id from msg where sender="${account.accountNumber}"`,
        function (err, results) {
          if (err) {
            reject(err)
          } else if (results && results.length > 0) {
            resolve(results)
          }
        }
      ) */
    })
  },
  sendMessage: function (context, message) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      console.log(account.accountNumber)
      axios({
        method: 'get',
        url: `${API}/sendMessage?accountNumber=${account.accountNumber}&message=${message.replace(' ', '+')}`
      }).then((res) => {
        console.log(res.data)
        if ('data' in res && 'status' in res.data && res.data.status) {
          resolve()
        } else {
          reject(new Error('Unable to send message'))
        }
      }).catch((err) => {
        console.error(err)
        reject(new Error('Account not found'))
      })
      /* connection.query(
        `SELECT id, msg, date, sender, receiver, reply_id from msg where sender="${account.accountNumber}"`,
        function (err, results) {
          if (err) {
            reject(err)
          } else if (results && results.length > 0) {
            const date = new Date()
            const id = uid()
            const timestamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            connection.query(
              `INSERT INTO msg (id, msg, date, sender, receiver, reply_id) VALUES ("${id}", "${message}", "${timestamp}", "${account.accountNumber}", "customer support", "${id}")`,
              function (err) {
                if (err) {
                  reject(err)
                } else {
                  resolve()
                }
              }
            )
          }
        }
      ) */
    })
  },
  initiateTransfer: function (context, data) {
    const account = context.getters.getAccount
    const profile = context.getters.getProfile
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/initiateTransfer?accountNumber=${account.accountNumber}&name=${profile.cust_name}&amount=${data.amount}&beneficiaryName=${data.beneficiaryName}&beneficiaryAccountNumber=${data.beneficiaryAccountNumber}`
      }).then((res) => {
        console.log(res.data)
        if ('data' in res && res.data && res.data.result) {
          resolve()
        } else {
          reject(new Error(res.data.reason))
        }
      }).catch((err) => {
        console.error(err)
        reject(new Error(err.message))
      })
      /* connection.query(
        `SELECT cust_balance from cust_act_details where cust_act_no=${account.accountNumber}`,
        function (err, result) {
          if (err) {
            reject(err)
          } else if (result && result.length > 0) {
            const balance = result[0].cust_balance
            if (!isNaN(balance)) {
              const date = new Date()
              const newBalance = parseInt(balance) - parseInt(data.amount)
              const query = `INSERT INTO transaction ( act_number, transaction_id, transaction_date, debited, present_balance, description, status, branch_add, branch_name, cust_name, stage, mini_statment)
              VALUES ("${account.accountNumber}", "${uid()}", "${date.getFullYear()}-${date.getMonth()}-${date.getDate()}", "${parseInt(data.amount)}", "${newBalance}", "debited", "4", "Sanger, US", "Interbank settlement,Sang", "${profile.cust_name}", "0", "1")`
              connection.query(
                query,
                function (err) {
                  if (err) {
                    reject(err)
                  } else {
                    connection.query(
                      `UPDATE cust_act_details SET cust_balance = "${newBalance}" WHERE cust_act_no = "${account.accountNumber}"`,
                      function (err) {
                        if (err) {
                          reject(err)
                        } else {
                          resolve()
                        }
                      }
                    )
                  }
                }
              )
            }
          }
        }
      ) */
    })
  },
  uploadProfilePic: function (context, data) {
    // updateProfilePic
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      if (
        data && data.constructor === {}.constructor &&
        'base64' in data && data.base64
      ) {
        axios({
          method: 'post',
          url: `${API}/updateProfilePic`,
          data: {
            uid: account.userId,
            base64: data.base64
          }
        }).then((res) => {
          console.log(res)
          if (res && res.data && res.data.success) {
            context.commit('updateProfilePic', res.data.base64)
            resolve()
          } else {
            reject(new Error('Unable to upload profile pic.'))
          }
        }).catch((err) => {
          reject(err)
        })
      } else {
        reject(new Error('Invalid files'))
      }
    })
  },
  uploadRegistrationFile: function (context, data) {
    // const profile = context.getters.getProfile
    return new Promise((resolve, reject) => {
      if (
        data && data.constructor === {}.constructor &&
        'base64' in data && data.base64 &&
        'file' in data && data.file &&
        'id' in data && data.id &&
        'regId' in data && data.regId
      ) {
        axios({
          method: 'post',
          url: `${API}/uploadRegistrationFile`,
          data: {
            id: data.id,
            file: data.file,
            regId: data.regId,
            base64: data.base64
          }
        }).then((res) => {
          if ('data' in res && res.data && res.data.success) {
            resolve()
          } else {
            reject(new Error('Unable to upload data. Please try again later.'))
          }
        }).catch((err) => {
          console.error(err)
          reject(new Error('Unable to upload data. Please try again later.'))
        })
      } else {
        reject(new Error('Invalid data'))
      }
    })
  },
  newUserRegistration: function (context, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${API}/newUserRegistration`,
        data
      }).then((res) => {
        console.log(res)
        if ('data' in res && res.data && res.data.success) {
          resolve()
        } else {
          reject(new Error('Unable to upload data'))
        }
      }).catch((err) => {
        reject(err)
      })
    })
  },
  fetchPendingTransfer: function (context) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/fetchPendingTransfer?accountNumber=${account.accountNumber}`
      }).then((res) => {
        console.log(res.data)
        if ('data' in res && 'result' in res.data && res.data.result) {
          resolve(res.data.result)
        } else {
          reject(new Error('Account not found'))
        }
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
    })
  },
  newThirdPartyTransfer: function (context, data) {
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: `${API}/thirdPartyTransfer?accountNumber=${account.accountNumber}&amount=${data.amount}&beneficiaryName=${data.beneficiaryName}&beneficiaryAccountNumber=${data.beneficiaryNo}`
      }).then((res) => {
        if ('data' in res && res.data.result) {
          resolve(res.data)
        } else {
          reject(new Error(res.data.reason))
        }
      }).catch((err) => {
        console.error(err)
        reject(err.message)
      })
    })
  },
  resendTicketNumber: function (context, data) {
    console.log(data)
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      if (data && 'transactionId' in data && data.transactionId) {
        axios({
          method: 'get',
          url: `${API}/resendVerificationToken?accountNumber=${account.accountNumber}&transactionId=${data.transactionId}`
        }).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          console.error(err)
          reject(err)
        })
      } else {
        reject(new Error('Invalid transactionId'))
      }
    })
  },
  verifyTransaction: function (context, data) {
    console.log('here', data)
    const account = context.getters.getAccount
    return new Promise((resolve, reject) => {
      if (data && 'transactionId' in data && data.transactionId && 'token' in data && data.token) {
        axios({
          method: 'get',
          url: `${API}/verifyTransaction?accountNumber=${account.accountNumber}&transactionId=${data.transactionId}&token=${data.token}`
        }).then((res) => {
          console.log(res.data)
          if (res && 'data' in res && res.data && 'status' in res.data) {
            if (res.data.status) {
              resolve()
            } else {
              reject(new Error('Unable to verify token number. Please check your token number and try again.'))
            }
          }
        }).catch((err) => {
          reject(err)
        })
      } else {
        reject(new Error('Invalid transactionId'))
      }
    })
  }
}
