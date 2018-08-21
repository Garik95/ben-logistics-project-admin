<template>
  <div>
    <md-progress-bar class="md-accent" md-mode="indeterminate" v-if="loaded"></md-progress-bar>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Trailers</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by label..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No trailers found"
        :md-description="`No trailers found for this '${search}' query. Try a different search term.`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
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
    trailers: null
  }),
  methods: {
    searchOnTable () {
      this.searched = searchByName(this.trailers, this.search)
    }
  },
  created () {
    axios.post(this.url, {
      query: `{trailers{ address city state name serial id lat lng zip moving movingStartTime stopped stoppedStartTime status } }`
    }).then(res => {
      this.trailers = res.data.data.trailers
      this.searched = this.trailers
      this.loaded = false
    })
  }
}
</script>
