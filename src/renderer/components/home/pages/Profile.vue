<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="500">
    <v-card
      min-height="600">
      <div
        style="position: absolute; top: 0; left: 0; margin: 10px; z-index: 600;">
        <v-layout
          row>
          <v-btn
            dark
            icon
            @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-btn
            :flat="!edit"
            :depressed="edit"
            dark
            @click="onClickOption"
            style="margin-left: -5px;">
            {{ edit ? 'Save' : 'Edit' }}
          </v-btn>
        </v-layout>
      </div>
      <div
        class="dialog-profile-dp-wrapper">
        <div
          class="hero-xy"
          style="margin-top: 30px">
          <v-avatar
            size="120"
            color="grey lighten-4"
            style="display: block; margin: auto;">
            <img
              v-if="profilePic"
              :src="`data:image/png;base64, ${profilePic}`"
              alt="avatar">
            <img
              v-else
              src="@/assets/profile-placeholder.png"
              alt="avatar">
          </v-avatar>
          <v-btn
            v-if="edit"
            depressed
            style="margin-bottom: -15px; margin-top: 5px;"
            @click="onClickUploadProfilePic">
            Update Profile Picture
          </v-btn>
        </div>
      </div>
      <v-card-text
        v-if="profile && !edit">
        <h1
          style="margin-top: 25px; margin-bottom: 28px;text-align: center; font-family: 'Roboto-Bold';">
          {{ profile.cust_name }}
        </h1>
        <v-layout
          class="p-list-item"
          row>
          <p class="p-list-key">
            <v-icon class="p-list-icon">face</v-icon>
            Gender
          </p>
          <v-spacer />
          <p class="p-list-value">
            {{ profile.cust_sex }}
          </p>
        </v-layout>
        <v-divider />
        <v-layout
          class="p-list-item"
          row>
          <p class="p-list-key">
            <v-icon class="p-list-icon">email</v-icon>
            Mail ID
          </p>
          <v-spacer />
          <p class="p-list-value">
            {{ profile.cust_mail }}
          </p>
        </v-layout>
        <v-divider />
        <v-layout
          class="p-list-item"
          row>
          <p class="p-list-key">
            <v-icon class="p-list-icon">phone</v-icon>
            Phone Number
          </p>
          <v-spacer />
          <p class="p-list-value">
            {{ profile.cust_phone }}
          </p>
        </v-layout>
        <v-divider />
        <v-layout
          class="p-list-item"
          row>
          <p class="p-list-key">
            <v-icon class="p-list-icon">contact_mail</v-icon>
            Address
          </p>
          <v-spacer />
          <p
            class="p-list-value">
            {{ profile.cust_address }}
          </p>
        </v-layout>
        <v-divider />
        <v-layout
          class="p-list-item"
          row>
          <p class="p-list-key">
            <v-icon class="p-list-icon">account_balance</v-icon>
            Branch Name
          </p>
          <v-spacer />
          <p class="p-list-value">
            {{ profile.cust_branch_name }}
          </p>
        </v-layout>
        <v-divider />
        <v-layout
          class="p-list-item"
          row>
          <p class="p-list-key">
            <v-icon class="p-list-icon">merge_type</v-icon>
            Account Type
          </p>
          <v-spacer />
          <p class="p-list-value">
            {{ profile.cust_atc_type }}
          </p>
        </v-layout>
      </v-card-text>
      <v-card-text
        v-else-if="edit"
        style="margin-top: 40px;">
        <v-text-field
          v-model="submit.name"
          :rules="[rules.required]"
          label="Name"
           />
        <v-select
          v-model="submit.gender"
          :rules="[rules.required]"
          :items="['Male', 'Female']"
          label="Gender" />
        <v-text-field
          v-model="submit.email"
          :rules="[rules.required, rules.emailValid]"
          label="Email" />
        <v-text-field
          v-model="submit.phone"
          :rules="[rules.required]"
          label="Phone Number" />
        <v-textarea
          v-model="submit.address"
          :rules="[rules.required]"
          label="Address" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const validator = require('validator')
const base64 = require('base64-js')
const fs = require('fs')

export default {
  data () {
    return {
      dialog: false,
      edit: false,
      submit: {
        name: '',
        gender: '',
        email: '',
        phone: '',
        address: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        emailValid: value => validator.isEmail(value) || 'Email is not valid'
      }
    }
  },
  computed: mapState({
    account: state => state.app.account,
    profile: state => state.app.profile,
    profilePic: state => state.app.profilePic,
    onDialogChange: function () {
      return this.dialog
    }
  }),
  watch: {
    onDialogChange: function (state) {
      if (state) {
        this.fetchProfile()
        this.getProfilePic()
      } else {
        this.edit = false
      }
    }
  },
  mounted () {
    this.$root.$on('openProfile', (id) => {
      if (!this.dialog) {
        this.dialog = true
      }
    })
    console.log(this.account, this.profile)
  },
  methods: {
    ...mapActions([
      'fetchProfile',
      'getProfilePic',
      'updateProfile',
      'uploadProfilePic'
    ]),
    onClickOption: function () {
      if (this.edit) {
        // Save
        const {
          name,
          gender,
          email,
          phone,
          address
        } = this.submit

        if (!(name && gender && email && phone && address)) {
          return
        }
        this.updateProfile({
          name,
          gender,
          email,
          phone,
          address
        }).finally(() => {
          this.dialog = false
          this.edit = false
          this.fetchProfile()
        })
      } else {
        this.edit = true
        this.submit.name = this.profile.cust_name
        this.submit.gender = `${this.profile.cust_sex[0].toUpperCase()}${this.profile.cust_sex.substring(1)}`
        this.submit.email = this.profile.cust_mail
        this.submit.phone = this.profile.cust_phone
        this.submit.address = this.profile.cust_address
      }
    },
    onClickUploadProfilePic: function () {
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
        const stats = fs.statSync(selection[0])
        console.log(stats.size)
        if (stats.size > 50000) {
          this.$root.$emit('genericMessage/show', {
            title: 'File size',
            message: 'File size should be lessthan 30 KB. Please select profile picture that is less than or equal to 30 KB and try again.'
          })
          return
        }

        const byteArray = fs.readFileSync(selection[0])
        const base64Data = base64.fromByteArray(byteArray)
        if (base64Data) {
          this.$root.$emit('genericLoader/show')
          this.uploadProfilePic({
            base64: base64Data
          }).then(() => {
            console.log('done')
          }).catch((err) => {
            console.log(err)
          }).finally(() => {
            this.$root.$emit('genericLoader/hide')
          })
        }
      }
    }
  }
}
</script>
