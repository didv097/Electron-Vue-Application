<template>
  <div
    id="app-login">
    <div
      id="auth-info">
      <div
        class="hero-y banner">
        <h1
          style="font-family: Roboto-Light; font-size: 38px;">
          Welcome to the InterBank Settlement Secure Transactions Platform
        </h1>
        <ul
          class="list">
          <li>
            <v-icon class="white--text">star</v-icon>
            <span>Secure</span>
          </li>
          <li>
            <v-icon class="white--text">star</v-icon>
            <span>Fast</span>
          </li>
          <li>
            <v-icon class="white--text">star</v-icon>
            <span>Efficient</span>
          </li>
        </ul>
      </div>
      <div
        class="copyright-info">
        <span>&copy; 2019 Interbank Settlements. All rights reserved</span>
      </div>
    </div>
    <div
      id="auth-box">
      <div
        v-if="step === 'login'">
        <div
          class="hero-xy"
          style="width: 400px;">
          <img
            class="auth-logo"
            src="@/assets/logo.png">
          <div
            style="margin: 20px 0">
            <v-text-field
              v-model="login.userId"
              :disabled="loading"
              label="User ID" />
            <v-text-field
              v-model="login.token"
              :disabled="loading"
              type="password"
              label="Pin/Token" />
            <v-text-field
              v-model="login.custId"
              :disabled="loading"
              label="Customer ID" />
          </div>
          <v-btn
            :loading="loading"
            block
            depressed
            class="primary"
            style="height: 60px; font-size: 18px; font-weight: bold;"
            @click="onClickLogin">
            Login
          </v-btn>
        </div>
      </div>
      <div
        v-else>
        <div
          class="hero-xy"
          style="width: 400px;">
          <!-- Info 1 -->
          <div
            v-if="register.step == 'info_1'">
            <v-text-field
              v-model="submit.fullName"
              :rules="[rules.required]"
              label="Full Name (*)"/>
            <v-text-field
              v-model="submit.securityNumber"
              :rules="[rules.required]"
              label="Social Security / National ID Number (*)"/>
            <v-text-field
              v-model="submit.dateOfBirth"
              :rules="[rules.required]"
              label="Date of Birth" />
            <v-text-field
              v-model="submit.motherMaindenName"
              :rules="[rules.required]"
              label="Mother's Maiden Name" />
            <v-text-field
              v-model="submit.emailAddress"
              :rules="[rules.required, rules.emailValid]"
              label="Email Address" />
            <v-text-field
              v-model="submit.confirmEmailAddress"
              :rules="[rules.required, rules.emailValid, rules.emailMatch]"
              label="Confirm Email Address" />
          </div>
          <!-- Info 2 -->
          <div
            v-else-if="register.step === 'info_2'">
            <v-textarea
              label="Residential Address"
              />
            <v-layout
              row
              wrap>
              <v-flex
                xs12
                md6
                lg6
                xl6>
                <v-text-field
                  v-model="submit.city"
                  :rules="[rules.required]"
                  label="City" />
              </v-flex>
              <v-flex
                xs12
                md6
                lg6
                xl6>
                <v-text-field
                  v-model="submit.state"
                  :rules="[rules.required]"
                  label="State"
                  style="padding-left: 5px;" />
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap>
              <v-flex
                xs12
                md6
                lg6
                xl6>
                <v-select
                  :items="countryList"
                  label="Country" />
              </v-flex>
              <v-flex
                xs12
                md6
                lg6
                xl6>
                <v-text-field
                  v-model="submit.zip"
                  :rules="[rules.required]"
                  label="Zip"
                  style="padding-left: 5px;" />
              </v-flex>
            </v-layout>
            <v-text-field
              v-model="submit.phoneNumber"
              :rules="[rules.required]"
              label="Phone Number" />
            <v-text-field
              v-model="submit.confirmPhoneNumber"
              :rules="[rules.required, rules.phoneMatch]"
              label="Confirm Phone Number" />
          </div>
          <!-- Info 3 -->
          <div
            v-else-if="register.step === 'info_3'">
            <v-select
              v-model="submit.accountType"
              :rules="[rules.required]"
              :items="register.values.accountType"
              label="Account Type" />
            <v-select
              v-model="submit.accountCurrency"
              :rules="[rules.required]"
              :items="register.values.accountCurrency"
              label="Account Currency" />
          </div>
          <!-- Info 4 -->
          <div
            v-else-if="register.step === 'info_4'">
            <v-select
              v-model="submit.securityQuestion1"
              :rules="[rules.required]"
              :items="register.values.securityQuestions"
              box
              label="Security Question 1" />
            <v-text-field
              v-model="submit.securityQuestion1Ans"
              :rules="[rules.required]"
              label="Answer Security Question 1" />
            <v-select
              v-model="submit.securityQuestion2"
              :rules="[rules.required]"
              :items="register.values.securityQuestions"
              box
              label="Security Question 2" />
            <v-text-field
              v-model="submit.securityQuestion2Ans"
              :rules="[rules.required]"
              label="Answer Security Question 2" />
          </div>
          <!-- Info 5 -->
          <div
            v-else-if="register.step === 'info_5'">
            <v-btn
              block
              depressed
              @click="selectPhoto">
              <v-icon left>attach_file</v-icon>
              Upload a clear passport size photograph
            </v-btn>
            <div
              style="height: 400px;">
              <v-avatar
                tile
                size="255"
                color="grey lighten-4"
                class="hero-y"
                style="display: block; margin: auto;">
                <img :src="submit.photo ? `data:image/png;base64,${submit.photo}` : BlanckProfilePicture" alt="avatar">
              </v-avatar>
            </div>
          </div>
           <!-- Info 6 -->
          <div
            v-else-if="register.step === 'info_6'">
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  block
                  depressed
                  color="blue"
                  class="white--text"
                  v-on="on">
                  <v-icon
                    left>
                    attach_file
                  </v-icon>
                  Attach ID
                </v-btn>
              </template>
              <v-list>
                <v-list-tile
                  v-for="(item, index) in attachMenu"
                  :key="index"
                  @click="item.callback">
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <p
              class="body"
              style="text-align: center;">
              Upload a valid Government issued Identification: <b>Passport, Driver's License, National ID Card</b>
            </p>
            <div
              style="position: relative; height: 400px; overflow-y: auto; margin: 10px 0;">
              <div
                v-if="submit.register.attachments.length < 1"
                class="hero-xy">
                No Attachments
              </div>
              <div
                v-else>
                <v-list
                  two-line>
                  <v-list-tile
                    v-for="item in submit.register.attachments"
                    :key="item.title"
                    avatar>
                    <v-list-tile-avatar>
                      <v-icon>
                        insert_drive_file
                      </v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      {{ item.path }}
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn
                        icon
                        ripple
                        @click="removeAttachment(item)">
                        <v-icon
                          color="red">
                          delete
                        </v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider />
                </v-list>
              </div>
            </div>
          </div>
           <!-- Info 7 -->
          <div
            v-else-if="register.step === 'info_7'">
            <v-btn
              block
              depressed
              color="blue"
              class="white--text"
              @click="attachFromWebcam">
              <v-icon
                left>
                attach_file
              </v-icon>
              Verify Subitted document
            </v-btn>
            <p
              class="body"
              style="text-align: center;">
              Data Verification, <b>use of web cam</b>, user must hold up form of identification submitted near his face to take the picture using webcam
            </p>
            <div
              style="position: relative; height: 350px; overflow-y: auto; margin: 10px 0;">
              <div
                v-if="submit.register.proof.length < 1"
                class="hero-xy">
                No Attachments
              </div>
              <div
                v-else>
                <v-list
                  two-line>
                  <v-list-tile
                    v-for="item in submit.register.proof"
                    :key="item.title"
                    avatar>
                    <v-list-tile-avatar>
                      <v-icon>
                        insert_drive_file
                      </v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      {{ item.file }}
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-btn
                        icon
                        ripple
                        @click="removeProof(item)">
                        <v-icon
                          color="red">
                          delete
                        </v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider />
                </v-list>
              </div>
            </div>
          </div>
          <v-btn
            depressed
            color="primary"
            class="white--text"
            block
            @click="nextRegisterStep">
            {{ register.step === 'info_7' ? 'Submit' : 'Next' }}
          </v-btn>
          <v-btn
            v-if="register.step !== 'info_1'"
            depressed
            color="grey"
            class="white--text"
            block
            @click="prevRegisterStep">
            Back
          </v-btn>
        </div>
      </div>
      <v-layout
        row
        class="position: absolute; top: 0; right: 0; left: 0; margin: 10px; font-weight: bold;">
        <v-spacer />
        <v-btn
          :disabled="loading"
          depressed
          class="white"
          small
          @click="$router.replace('/')">
          Go to widgets
        </v-btn>
        <v-btn
          :disabled="loading"
          depressed
          class="primary"
          small
          @click="step === 'login' ? step = 'register' : step = 'login'">
          {{ step === 'login' ? 'Create a new account' : 'Already have an account?'}}
        </v-btn>
      </v-layout>
    </div>
    <webcam />
    <viewpicture />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BlanckProfilePicture from '@/assets/blank-profile-picture-973460.svg'
import Webcam from '@/components/home/dialogs/webcam'
import Viewpicture from '@/components/home/dialogs/viewpicture'

const fs = require('fs')
const path = require('path')
const validator = require('validator')
const uid = require('uniqid')
const base64 = require('base64-js')
const aforeach = require('async-foreach').forEach
const countryList = require('country-list')

const regId = uid()

export default {
  components: {
    Webcam,
    Viewpicture
  },
  data () {
    return {
      BlanckProfilePicture,
      countryList: countryList.getNames(),
      loading: false,
      step: 'login',
      login: {
        userId: '',
        token: '',
        custId: ''
      },
      register: {
        step: 'info_1',
        values: {
          accountType: [
            'Corporate',
            'USD Domiciliary',
            'Premium',
            'Current',
            'GBP Domiciliary',
            'EU Domiciliary',
            'Diamond',
            'Savings'
          ],
          accountCurrency: [
            'USD',
            'EUR',
            'GBP',
            'JPY',
            'CAD',
            'AUD',
            'MYR'
          ],
          securityQuestions: [
            'What is the name of your favorite book?',
            'What is the last name of your mother?',
            'What is the name of your first pet?',
            'what is the last name of your best friend?'
          ]
        }
      },
      attachMenu: [
        { title: 'From Computer', callback: this.attachFromComputer }/* ,
        { title: 'Webcam', callback: this.attachFromWebcam } */
      ],
      rules: {
        required: value => !!value || 'Required.',
        emailValid: value => validator.isEmail(value) || 'Email is not valid',
        emailMatch: value => this.submit.emailAddress === this.submit.confirmEmailAddress || 'Email does not match',
        phoneMatch: value => this.submit.phoneNumber === this.submit.confirmPhoneNumber || 'Phone numbers does not match'
      },
      submit: {
        register: {
          attachments: [],
          proof: []
        },
        fullName: '',
        securityNumber: '',
        dateOfBirth: '',
        motherMaindenName: '',
        emailAddress: '',
        confirmEmailAddress: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        phoneNumber: '',
        confirmPhoneNumber: '',
        accountType: '',
        accountCurrency: 'USD',
        securityQuestion1: '',
        securityQuestion1Ans: '',
        securityQuestion2: '',
        securityQuestion2Ans: '',
        photo: ''
      }
    }
  },
  mounted () {
    this.$root.$on('register/webcam/attach', (data) => {
      if (
        this.register.step === 'info_7' &&
        'file' in data && data.file &&
        'base64' in data && data.base64
      ) {
        const id = uid()
        const extname = path.extname(data.file)
        this.submit.register.proof.push({
          id,
          file: `${id}${extname && extname.split('.')[1] ? extname : ''}.base64`,
          regId,
          base64: data.base64
        })
        console.log(this.submit.register.proof)
      }
    })
  },
  methods: {
    ...mapActions([
      'connectSql',
      'authenticateUser',
      'uploadRegistrationFile',
      'newUserRegistration'
    ]),
    attachFromComputer: function () {
      const selection = this.$electron.remote.dialog.showOpenDialog(
        this.$electron.remote.getCurrentWindow(),
        {
          filters: [
            {
              name: 'images',
              extensions: [
                'jpg',
                'png',
                'gif',
                'jpeg',
                'pdf',
                'doc',
                'docx'
              ]
            }
          ],
          properties: [
            'openFile'
          ]
        }
      )
      if (selection && selection.constructor === [].constructor) {
        const file = selection[0]
        if (this.submit.register.attachments.findIndex(x => x.path === file) < 0) {
          const byteArray = fs.readFileSync(file)
          const id = uid()
          const extname = path.extname(file)
          this.submit.register.attachments.push({
            path: file,
            file: `${id}-${extname && extname.split('.')[1] ? extname : ''}.base64`,
            id,
            regId,
            base64: base64.fromByteArray(byteArray)
          })
          console.log(this.submit.register.attachments)
        }
      }
    },
    attachFromWebcam: function () {
      this.$root.$emit('webcam/show')
    },
    removeAttachment: function ({ id }) {
      if (id) {
        const ti = this.submit.register.attachments.findIndex(x => x.id === id)
        if (ti > -1) {
          this.submit.register.attachments.splice(ti, 1)
        }
      }
    },
    removeProof: function ({ id }) {
      if (id) {
        const ti = this.submit.register.proof.findIndex(x => x.id === id)
        if (ti > -1) {
          this.submit.register.proof.splice(ti, 1)
        }
      }
    },
    nextRegisterStep: function () {
      switch (this.register.step) {
        case 'info_1':
          if (
            !(this.submit.fullName && this.submit.securityNumber &&
            this.submit.dateOfBirth && this.submit.motherMaindenName &&
            this.submit.emailAddress && this.submit.confirmEmailAddress)
          ) {
            return
          }
          if ((this.submit.emailAddress !== this.submit.confirmEmailAddress)) {
            // Email is invalid
            return
          }
          this.register.step = 'info_2'
          break
        case 'info_2':
          this.register.step = 'info_3'
          break
        case 'info_3':
          this.register.step = 'info_4'
          break
        case 'info_4':
          this.register.step = 'info_5'
          break
        case 'info_5':
          if (!this.submit.photo) {
            return
          }
          this.register.step = 'info_6'
          break
        case 'info_6':
          if (this.submit.register.attachments.length < 1) {
            return
          }
          this.register.step = 'info_7'
          break
        case 'info_7':
          if (this.submit.register.proof.length < 1) {
            return
          }
          this.$root.$emit('loading/show', 'Submitting your registration form ...')
          this.onClickUpload()
          break
        default:
          break
      }
    },
    prevRegisterStep: function () {
      switch (this.register.step) {
        case 'info_2':
          this.register.step = 'info_1'
          break
        case 'info_3':
          this.register.step = 'info_2'
          break
        case 'info_4':
          this.register.step = 'info_3'
          break
        case 'info_5':
          this.register.step = 'info_4'
          break
        case 'info_6':
          this.register.step = 'info_5'
          break
        case 'info_7':
          this.register.step = 'info_6'
          break
        default:
          break
      }
    },
    selectProfilePic: function () {
      const selection = this.$electron.remote.dialog.showOpenDialog(
        this.$electron.remote.getCurrentWindow(),
        {
          filters: [
            {
              name: 'images',
              extensions: [
                'jpg',
                'png',
                'gif',
                'jpeg'
              ]
            }
          ],
          properties: [
            'openFile'
          ]
        }
      )
      if (selection && selection.constructor === [].constructor) {
        const file = selection[0]
        console.log(file)
      }
    },
    onClickLogin: function () {
      this.connectSql().then(() => {
        const {
          userId,
          token,
          custId
        } = this.login
        if (!(userId && token && custId)) {
          this.$root.$emit('showError', {
            title: 'Incomplete Details',
            message: 'Login failed! Please check your credentials and try again!'
          })
          return
        }
        this.loading = true
        this.authenticateUser({
          userId,
          token,
          custId
        }).then(() => {
          this.$router.replace('/home')
        }).catch((message) => {
          this.$root.$emit('showError', {
            title: 'Login Failed!',
            message: message
          })
        }).finally(() => {
          this.loading = false
        })
      }).catch(() => {
        this.$root.$emit('showError', {
          title: 'Server not connected!',
          message: 'Login failed! Please check your server connection and try again!'
        })
      })
    },
    onClickUpload: function () {
      const self = this
      const fileLength = this.submit.register.attachments.length
      const newUserObj = Object.assign({}, { regId }, this.submit)
      delete newUserObj.register
      if (fileLength < 1) {
        return
      }
      const attachments = Object.assign(
        [],
        this.submit.register.attachments
      ).concat(
        this.submit.register.proof
      )
      const id = uid()
      let fCount = 0
      attachments.push({
        file: `${id}-png.base64`,
        id,
        regId,
        type: 'passport-size-photo',
        base64: this.submit.photo
      })
      if (attachments && attachments.constructor === [].constructor) {
        this.$root.$emit('register/uploading/show')
        aforeach(attachments, function (item, index) {
          var asyncDone = this.async()
          const attachmentObject = Object.assign({}, item)
          if ('path' in attachmentObject) {
            delete attachmentObject.path
          }
          self.uploadRegistrationFile(attachmentObject).then(() => {
            // done one item
          }).catch((err) => {
            console.error(err)
          }).finally(() => {
            self.$root.$emit('register/uploading/hide')
            asyncDone()
          })
        }, function () {
          // submit into sql
          self.newUserRegistration(newUserObj).catch((err) => {
            console.log(err)
            fCount = fCount + 1
          }).finally(() => {
            self.$root.$emit('loading/hide')
            if (fCount) {
              self.$root.$emit('register/submitted/title', 'Failed')
              self.$root.$emit('register/submitted/message', 'Unable to register your application form. Please try again later!')
              self.$root.$emit('register/submitted/show')
            } else {
              self.$root.$emit('register/submitted/title', 'Success')
              self.$root.$emit('register/submitted/message', 'Your registration form submitted successfully, Our team will review your application soon. Thank you!')
              self.$root.$emit('register/submitted/show')
            }
            console.log('::submitform::all done')
            self.step = 'login'
          })
        })
      }
    },
    selectPhoto: function () {
      const selection = this.$electron.remote.dialog.showOpenDialog(
        this.$electron.remote.getCurrentWindow(),
        {
          filters: [
            {
              name: 'images',
              extensions: [
                'jpg',
                'png',
                'gif',
                'jpeg'
              ]
            }
          ],
          properties: [
            'openFile'
          ]
        }
      )
      if (selection && selection.constructor === [].constructor) {
        const file = selection[0]
        this.$root.$emit('loading/show')
        const byteArray = fs.readFileSync(file)
        const extname = path.extname(file)
        if (byteArray) {
          const base64String = base64.fromByteArray(byteArray)
          const id = uid()
          this.submit.photo = base64String
          this.submit.register.attachments.push({
            path: file,
            file: `${id}-${extname && extname.split('.')[1] ? extname : ''}.base64`,
            id,
            base64: base64String
          })
          console.log(this.submit.register.attachments)
        }
        this.$root.$emit('loading/hide')
      }
    }
  }
}
</script>

