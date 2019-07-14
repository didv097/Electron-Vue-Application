<template>
  <v-menu
    v-model="active"
    :close-on-content-click="false"
    :nudge-width="300"
    transition="slide-y-transition"
    offset-x
    style="display: inline-block;">
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        flat
        large
        v-on="on">
        <v-icon class="white--text"> notification_important </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>Notifications</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              @click="active = false">
              <v-icon>close</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list
        two-line
        dense>
        <template v-for="(item, index) in notifications">
          <v-subheader
            v-if="item.header"
            :key="item.header">
            {{ item.header }}
          </v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset" />

          <v-list-tile
            v-else
            :key="item.title"
            avatar
            @click="">
            <v-list-tile-avatar>
              <v-icon>priority_high</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data () {
    return {
      active: false,
      notifications: [
        {
          title: 'Fund Transfer',
          subtitle: '<span>Fund transfer is completed.</span>'
        },
        {
          title: 'Profile',
          subtitle: '<span>Your profile is successfully updated.</span>'
        },
        {
          title: 'Customer Support',
          subtitle: '<span>You have a new message from customer support.</span>'
        }
      ]
    }
  }
}
</script>
