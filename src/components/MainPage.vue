<template>
  <div class="page-container md-layout-column" style="height:100vh !important min-height:100%">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">My Title</span>
      <div class="md-toolbar-section-end">
        <md-button @click="showSidepanel = true" class="md-icon-button md-dense md-accent">
          <md-icon class="md-size-2x">account_circle</md-icon>
        </md-button>
      </div>
    </md-toolbar>
      <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>

      <md-list>
        <md-list-item to="/dashboard">
          <md-icon>dashboard</md-icon>
          <span class="md-list-item-text">Dashboard</span>
        </md-list-item>

        <md-list-item  to="/trucks">
          <md-icon>drive_eta</md-icon>
          <span class="md-list-item-text">Trucks</span>
        </md-list-item>

        <md-list-item to="/trailers">
          <md-icon>local_shipping</md-icon>
          <span class="md-list-item-text">Trailers</span>
        </md-list-item>

        <md-list-item to="/drivers">
          <md-icon>people</md-icon>
          <span class="md-list-item-text">Drivers</span>
        </md-list-item>

        <md-list-item to="/dispatchers">
          <md-icon>person</md-icon>
          <span class="md-list-item-text">Users</span>
        </md-list-item>

        <md-list-item to="/reserves">
          <md-icon>rv_hookup</md-icon>
          <span class="md-list-item-text">Reserves</span>
        </md-list-item>

        <md-list-item to="/token">
          <md-icon>credit_card</md-icon>
          <span class="md-list-item-text">Access Tokens</span>
        </md-list-item>
      </md-list>
    </md-drawer>
        <md-drawer class="md-right" :md-active.sync="showSidepanel">
      <md-card>
      <md-card-media>
        <md-icon class="md-size-2x">account_circle</md-icon>
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{ first_name + " " + last_name }}</div>
        <div class="md-subhead">{{ "@" + username }}</div>
      </md-card-header>
      <md-card-area>
      <md-list>
        <md-list-item to="/phone">Change phone number</md-list-item>
        <md-list-item to="/password">Change password</md-list-item>
        <md-list-item @click="logout">
          Exit
          <md-icon class="color:red">exit_to_app</md-icon>
        </md-list-item>
      </md-list>
      </md-card-area>
    </md-card>
    </md-drawer>
      <dash v-if="page == '/dashboard'"></dash>
      <token v-if="page == '/token'"></token>
      <trucks v-if="page == '/trucks'"></trucks>
      <trailers v-if="page == '/trailers'"></trailers>
      <drivers v-if="page == '/drivers'"></drivers>
      <dispatchers v-if="page == '/dispatchers'"></dispatchers>
      <reserves v-if="page == '/reserves'"></reserves>
      <!-- <password v-if="page == '/password'"></password> -->
  </div>
</template>

<script>
import Token from './views/Token.vue'
import Dash from './views/Dashboard.vue'
import Trucks from './views/Trucks.vue'
import Trailers from './views/Trailers.vue'
import Drivers from './views/Drivers.vue'
import Dispatchers from './views/Dispatchers.vue'
import Reserves from './views/Reserves.vue'

// import io from 'socket.io-client'
// import Phone from './views/Phone.vue'
// import Password from './views/Password.vue'

export default {
  name: 'Temporary',
  data: () => ({
    first_name: '',
    last_name: '',
    username: '',
    showNavigation: false,
    showSidepanel: false,
    page: '/dashboard'
    // socket: io('localhost:8443')
  }),
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  created: function () {
    // this.socket.on('testerEvent', function (data) {
    //   alert(data.description)
    // })
    let cred = this.$session.get('creds')
    this.first_name = cred.first_name
    this.last_name = cred.last_name
    this.username = cred.login
  },
  watch: {
    $route (to, from, next) {
      this.page = to.path
      this.showNavigation = false
      this.showSidepanel = false
    }
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      //   this.socket.disconnect()
      this.$router.push('/')
    }
  },
  components: {
    Token,
    Dash,
    Trucks,
    Trailers,
    Drivers,
    Dispatchers,
    Reserves
  }
}
</script>

<style lang="scss" scoped>
  .page-container {
    min-height: 300px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .md-content {
    padding: 16px;
  }
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>
