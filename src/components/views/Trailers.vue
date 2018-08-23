<template>
  <div>
    <md-progress-bar class="md-accent" md-mode="indeterminate" v-if="loaded"></md-progress-bar>
    <md-tabs class="md-accent" md-alignment="centered" @md-changed="tabs">
      <template slot="md-tab" slot-scope="{ tab }">
        {{ tab.label }} <i class="badge" v-if="tab.data.badge">{{ tab.data.badge }}</i>
      </template>
      <md-tab id="tab-reserved" md-label="Reserved" :md-template-data="{ badge: cnt.reserved }">
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <!-- <md-button @click="reshreshData()"><md-icon>refresh</md-icon></md-button><h1 class="md-title">Trailers</h1> -->
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="Search by label..." v-model="search" @input="searchOnTable" />
            </md-field>
          </md-table-toolbar>

          <md-table-empty-state
            md-label="No trailers found"
            :md-description="`No trailers found for this '${search}' query. Try a different search term.`">
          </md-table-empty-state>

          <md-table-row slot="md-table-row" slot-scope="{ item }" v-bind:style="rowStyle(item.status)">
            <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="serial" md-sort-by="serial">{{ item.serial }}</md-table-cell>
            <md-table-cell md-label="lat" md-sort-by="lat">{{ item.lat }}</md-table-cell>
            <md-table-cell md-label="lng" md-sort-by="lng">{{ item.lng }}</md-table-cell>
            <md-table-cell md-label="address" md-sort-by="address">{{ item.model }}</md-table-cell>
            <md-table-cell md-label="city" md-sort-by="city">{{ item.city }}</md-table-cell>
            <md-table-cell md-label="state" md-sort-by="state">{{ item.state }}</md-table-cell>
            <md-table-cell md-label="zip" md-sort-by="zip">{{ item.zip }}</md-table-cell>
            <md-table-cell md-label="status" md-sort-by="status">{{ item.status }}</md-table-cell>
            <md-table-cell md-label="moving" md-sort-by="moving">{{ item.moving }}</md-table-cell>
            <md-table-cell md-label="stopped" md-sort-by="stopped">{{ item.stopped }}</md-table-cell>
            <md-table-cell md-label="Actions"><md-menu md-size="medium" md-align-trigger>
                <md-button class="md-icon-button md-raised" md-menu-trigger @click="selectedTrailer = item.id">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-menu-content>
                    <md-menu-item @click="statusMenu('Available')">Available</md-menu-item>
                    <md-menu-item @click="statusMenu('Blocked')">Blocked</md-menu-item>
                </md-menu-content>
                </md-menu>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-tab>
      <md-tab id="tab-blocked" md-label="Blocked" :md-template-data="{ badge: cnt.blocked }">
                <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <!-- <md-button @click="reshreshData()"><md-icon>refresh</md-icon></md-button><h1 class="md-title">Trailers</h1> -->
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="Search by label..." v-model="search" @input="searchOnTable" />
            </md-field>
          </md-table-toolbar>

          <md-table-empty-state
            md-label="No trailers found"
            :md-description="`No trailers found for this '${search}' query. Try a different search term.`">
          </md-table-empty-state>

          <md-table-row slot="md-table-row" slot-scope="{ item }" v-bind:style="rowStyle(item.status)">
            <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="serial" md-sort-by="serial">{{ item.serial }}</md-table-cell>
            <md-table-cell md-label="lat" md-sort-by="lat">{{ item.lat }}</md-table-cell>
            <md-table-cell md-label="lng" md-sort-by="lng">{{ item.lng }}</md-table-cell>
            <md-table-cell md-label="address" md-sort-by="address">{{ item.model }}</md-table-cell>
            <md-table-cell md-label="city" md-sort-by="city">{{ item.city }}</md-table-cell>
            <md-table-cell md-label="state" md-sort-by="state">{{ item.state }}</md-table-cell>
            <md-table-cell md-label="zip" md-sort-by="zip">{{ item.zip }}</md-table-cell>
            <md-table-cell md-label="status" md-sort-by="status">{{ item.status }}</md-table-cell>
            <md-table-cell md-label="moving" md-sort-by="moving">{{ item.moving }}</md-table-cell>
            <md-table-cell md-label="stopped" md-sort-by="stopped">{{ item.stopped }}</md-table-cell>
            <md-table-cell md-label="Actions"><md-menu md-size="medium" md-align-trigger>
                <md-button class="md-icon-button md-raised" md-menu-trigger @click="selectedTrailer = item.id">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-menu-content>
                    <md-menu-item @click="statusMenu('Available')">Available</md-menu-item>
                    <md-menu-item @click="statusMenu('Blocked')">Blocked</md-menu-item>
                </md-menu-content>
                </md-menu>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-tab>
      <md-tab id="tab-new" md-label="New" :md-template-data="{ badge: cnt.unassigned }">
                <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <!-- <md-button @click="reshreshData()"><md-icon>refresh</md-icon></md-button><h1 class="md-title">Trailers</h1> -->
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="Search by label..." v-model="search" @input="searchOnTable" />
            </md-field>
          </md-table-toolbar>

          <md-table-empty-state
            md-label="No trailers found"
            :md-description="`No trailers found for this '${search}' query. Try a different search term.`">
          </md-table-empty-state>

          <md-table-row slot="md-table-row" slot-scope="{ item }" v-bind:style="rowStyle(item.status)">
            <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="serial" md-sort-by="serial">{{ item.serial }}</md-table-cell>
            <md-table-cell md-label="lat" md-sort-by="lat">{{ item.lat }}</md-table-cell>
            <md-table-cell md-label="lng" md-sort-by="lng">{{ item.lng }}</md-table-cell>
            <md-table-cell md-label="address" md-sort-by="address">{{ item.model }}</md-table-cell>
            <md-table-cell md-label="city" md-sort-by="city">{{ item.city }}</md-table-cell>
            <md-table-cell md-label="state" md-sort-by="state">{{ item.state }}</md-table-cell>
            <md-table-cell md-label="zip" md-sort-by="zip">{{ item.zip }}</md-table-cell>
            <md-table-cell md-label="status" md-sort-by="status">{{ item.status }}</md-table-cell>
            <md-table-cell md-label="moving" md-sort-by="moving">{{ item.moving }}</md-table-cell>
            <md-table-cell md-label="stopped" md-sort-by="stopped">{{ item.stopped }}</md-table-cell>
            <md-table-cell md-label="Actions"><md-menu md-size="medium" md-align-trigger>
                <md-button class="md-icon-button md-raised" md-menu-trigger @click="selectedTrailer = item.id">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-menu-content>
                    <md-menu-item @click="statusMenu('Available')">Available</md-menu-item>
                    <md-menu-item @click="statusMenu('Blocked')">Blocked</md-menu-item>
                </md-menu-content>
                </md-menu>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-tab>
      <md-tab id="tab-all" md-label="All" :md-template-data="{ badge: cnt.all }">
        <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
          <md-table-toolbar>
            <div class="md-toolbar-section-start">
              <md-button @click="reshreshData()"><md-icon>refresh</md-icon></md-button><h1 class="md-title">Trailers</h1>
            </div>

            <md-field md-clearable class="md-toolbar-section-end">
              <md-input placeholder="Search by label..." v-model="search" @input="searchOnTable" />
            </md-field>
          </md-table-toolbar>

          <md-table-empty-state
            md-label="No trailers found"
            :md-description="`No trailers found for this '${search}' query. Try a different search term.`">
          </md-table-empty-state>

          <md-table-row slot="md-table-row" slot-scope="{ item }" v-bind:style="rowStyle(item.status)">
            <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
            <md-table-cell md-label="name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="serial" md-sort-by="serial">{{ item.serial }}</md-table-cell>
            <md-table-cell md-label="lat" md-sort-by="lat">{{ item.lat }}</md-table-cell>
            <md-table-cell md-label="lng" md-sort-by="lng">{{ item.lng }}</md-table-cell>
            <md-table-cell md-label="address" md-sort-by="address">{{ item.model }}</md-table-cell>
            <md-table-cell md-label="city" md-sort-by="city">{{ item.city }}</md-table-cell>
            <md-table-cell md-label="state" md-sort-by="state">{{ item.state }}</md-table-cell>
            <md-table-cell md-label="zip" md-sort-by="zip">{{ item.zip }}</md-table-cell>
            <md-table-cell md-label="status" md-sort-by="status">{{ item.status }}</md-table-cell>
            <md-table-cell md-label="moving" md-sort-by="moving">{{ item.moving }}</md-table-cell>
            <md-table-cell md-label="stopped" md-sort-by="stopped">{{ item.stopped }}</md-table-cell>
            <md-table-cell md-label="Actions"><md-menu md-size="medium" md-align-trigger>
                <md-button class="md-icon-button md-raised" md-menu-trigger @click="selectedTrailer = item.id">
                    <md-icon>edit</md-icon>
                </md-button>
                <md-menu-content>
                    <md-menu-item @click="statusMenu('Available')">Available</md-menu-item>
                    <md-menu-item @click="statusMenu('Blocked')">Blocked</md-menu-item>
                </md-menu-content>
                </md-menu>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </md-tab>
    </md-tabs>
    <md-snackbar :md-active.sync="snackbar">{{ msg }}</md-snackbar>
  </div>
</template>

<script>
import axios from 'axios'

const toLower = text => {
  return text.toString().toLowerCase()
}
const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.name).includes(toLower(term)))
  }
  return items
}
export default {
  name: 'Trailers',
  data: () => ({
    url: 'http://localhost:3000/graphql',
    loaded: true,
    search: null,
    searched: [],
    trailers: null,
    selectedTrailer: null,
    newPosts: 1,
    snackbar: false,
    cnt: null,
    msg: null
  }),
  methods: {
    tabs (activeTab) {
      if (activeTab === 'tab-reserved') { this.loaded = true; this.countStatus(); this.fetchReservedData() }
      if (activeTab === 'tab-blocked') { this.loaded = true; this.countStatus(); this.fetchBlockedData() }
      if (activeTab === 'tab-new') { this.loaded = true; this.countStatus(); this.fetchNewData() }
      if (activeTab === 'tab-all') { this.loaded = true; this.countStatus(); this.fetchData() }
    },
    searchOnTable () {
      this.searched = searchByName(this.trailers, this.search)
    },
    rowStyle (st) {
      if (st === null) return 'background-color:yellow'
      if (st === 'Blocked') return 'background-color:red'
    },
    statusMenu (id) {
      axios.post(this.url, {
        query: `mutation{ setTrailerStatus(id:` + this.selectedTrailer + `,status:"` + id + `"){ status } }`
      }).then(res => {
        this.msg = 'Status changed'
        this.snackbar = true
      })
      // alert(this.selectedTrailer)
      // alert(id)
      this.selectedTrailer = null
    },
    reshreshData () {
      this.loaded = true
      this.trailers = null
      this.fetchData()
    },
    fetchData () {
      axios.post(this.url, {
        query: `{trailers{ address city state name serial id lat lng zip moving movingStartTime stopped stoppedStartTime status } }`
      }).then(res => {
        this.trailers = res.data.data.trailers
        this.searched = this.trailers
        this.loaded = false
      })
    },
    fetchReservedData () {
      axios.post(this.url, {
        query: `{reservedTrailers{ address city state name serial id lat lng zip moving movingStartTime stopped stoppedStartTime status } }`
      }).then(res => {
        this.trailers = res.data.data.reservedTrailers
        this.searched = this.trailers
        this.loaded = false
      })
    },
    fetchBlockedData () {
      axios.post(this.url, {
        query: `{blockedTrailers{ address city state name serial id lat lng zip moving movingStartTime stopped stoppedStartTime status } }`
      }).then(res => {
        this.trailers = res.data.data.blockedTrailers
        this.searched = this.trailers
        this.loaded = false
      })
    },
    fetchNewData () {
      axios.post(this.url, {
        query: `{unassignedTrailers{ address city state name serial id lat lng zip moving movingStartTime stopped stoppedStartTime status } }`
      }).then(res => {
        this.trailers = res.data.data.unassignedTrailers
        this.searched = this.trailers
        this.loaded = false
      })
    },
    countStatus () {
      axios.post(this.url, {
        query: `{ countTrailer{ all unassigned reserved blocked }}`
      }).then(res => {
        this.cnt = res.data.data.countTrailer
      })
    }
  },
  created () {
    this.countStatus()
    this.fetchReservedData()
  }
}
</script>

<style lang="scss" scoped>
  .badge {
    width: 19px;
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 2px;
    right: 2px;
    background: red;
    border-radius: 100%;
    color: #fff;
    font-size: 10px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -.05em;
    font-family: 'Roboto Mono', monospace;
  }
</style>
