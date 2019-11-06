<template>
  <v-dialog
    v-model="dialog"
    scrollable
    max-width="500">
    <v-card>
      <v-card-title
        class="headline">
        Messages
      </v-card-title>
      <v-card-text
        v-if="loading">
        <v-progress-circular
          class="hero-x"
          color="primary"
          indeterminate
          size="40"
          width="2" />
      </v-card-text>
      <v-card-text
        v-else-if="messages.length > 0"
        style="height: 300px;">
        <v-list
          two-line>
          <template v-for="(item, index) in messages">
            <v-list-tile
              :key="item.title"
              avatar
              @click="">
              <v-list-tile-avatar>
                <img :src="item.avatar || profileImage">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="`${item.sender} to <b>${item.receiver}</b>`"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.msg"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card-text>
      <v-card-text
        v-else>
        Messages are empty
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          depressed
          color="primary"
          @click="openNewMessage">
          New Message
        </v-btn>
        <v-btn
          depressed
          color="grey lighten-2"
          @click="dialog = false">
          close
        </v-btn>
      </v-card-actions>
      <v-divider />
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import profileImage from '@/assets/profile-placeholder.png'

export default {
  data () {
    return {
      profileImage,
      dialog: false,
      items: [
        { header: 'Today' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
        }
      ],
      messages: [],
      loading: true
    }
  },
  computed: {
    onChangeDialog: function () {
      return this.dialog
    }
  },
  watch: {
    onChangeDialog: function (state) {
      if (state) {
        this.fetchMessages().then((results) => {
          this.loading = false
          this.messages = Object.assign([], results)
        })
      } else {
        this.loading = true
      }
    }
  },
  mounted () {
    this.$root.$on('openMessages', () => {
      this.dialog = true
    })
  },
  methods: {
    ...mapActions([
      'fetchMessages'
    ]),
    openNewMessage: function () {
      this.dialog = false
      this.$root.$emit('openNewMessage')
    }
  }
}
</script>