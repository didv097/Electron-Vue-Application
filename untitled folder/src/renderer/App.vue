<template>
  <div
    id="app">
    <v-app>
      <transition
        name="fade"
        mode="out-in">
        <router-view></router-view>
      </transition>
      <error />
      <uploading />
      <submitted />
      <loading />
      <generic-loader />
      <generic-message />
    </v-app>
  </div>
</template>

<script>
  import Error from './components/home/dialogs/Error'
  import Uploading from './components/home/dialogs/register/uploading'
  import Submitted from './components/home/dialogs/register/submitted'
  import Loading from './components/Loading'
  import GenericLoader from './components/GenericLoader'
  import GenericMessage from './components/GenericMessage'

  export default {
    name: 'ibsecureapp',
    components: {
      Error,
      Uploading,
      Submitted,
      Loading,
      GenericLoader,
      GenericMessage
    },
    mounted () {
      this.$nextTick(() => {
        /* this.$root.$emit('register/submitted/title', 'Test')
        this.$root.$emit('register/submitted/message', 'Test Message')
        this.$root.$emit('register/submitted/show') */
      })
    }
  }
</script>

<style lang="sass">
  @import "./styles/app"
  @import "./styles/layouts"
  /* CSS */
</style>
