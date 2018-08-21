<template>
  <div>
    <md-progress-bar class="md-accent" md-mode="indeterminate" v-if="loaded"></md-progress-bar>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Reserves</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by label..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No reserves found"
        :md-description="`No reserves found for this '${search}' query. Try a different search term.`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="_id" md-numeric>{{ item._id }}</md-table-cell>
        <md-table-cell md-label="Trailer ID" md-sort-by="trailerid">{{ item.trailerid }}</md-table-cell>
        <md-table-cell md-label="Truck ID" md-sort-by="truckid">{{ item.truckid }}</md-table-cell>
        <md-table-cell md-label="Reserved" md-sort-by="reserved">{{ item.reserved }}</md-table-cell>
        <md-table-cell md-label="Latitude" md-sort-by="lat">{{ item.lat }}</md-table-cell>
        <md-table-cell md-label="Longtitude" md-sort-by="long">{{ item.long }}</md-table-cell>
        <md-table-cell md-label="time" md-sort-by="time">{{ item.time }}</md-table-cell>
        <md-table-cell md-label="User" md-sort-by="user">{{ item.user }}</md-table-cell>
        <md-table-cell md-label="Status" md-sort-by="status">{{ item.status }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios'

const toLower = text => {
  return text.toString().toLowerCase()
}
const searchByName = (items, term) => {
  if (term) {
    return items.filter(item => toLower(item.first_name).includes(toLower(term)))
  }
  return items
}
export default {
  name: 'Reserves',
  data: () => ({
    url: 'http://localhost:3000/graphql',
    loaded: true,
    search: null,
    searched: [],
    reserves: null
  }),
  methods: {
    searchOnTable () {
      this.searched = searchByName(this.reserves, this.search)
    }
  },
  created () {
    axios.post(this.url, {
      query: `{ activeReserves { _id trailerid reserved lat long time truckid user status } }`
    }).then(res => {
      this.reserves = res.data.data.activeReserves
      this.searched = this.reserves
      this.loaded = false
    })
  }
}
</script>
