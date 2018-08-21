<template>
  <div>
    <md-progress-bar class="md-accent" md-mode="indeterminate" v-if="loaded"></md-progress-bar>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Trucks</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by label..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No trucks found"
        :md-description="`No trucks found for this '${search}' query. Try a different search term.`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Vin" md-sort-by="vin">{{ item.vin }}</md-table-cell>
        <md-table-cell md-label="Label" md-sort-by="label">{{ item.label }}</md-table-cell>
        <md-table-cell md-label="Color" md-sort-by="color">{{ item.color }}</md-table-cell>
        <md-table-cell md-label="Make" md-sort-by="make">{{ item.make }}</md-table-cell>
        <md-table-cell md-label="Model" md-sort-by="model">{{ item.model }}</md-table-cell>
        <md-table-cell md-label="DeviceSerialNumber" md-sort-by="deviceSerialNumber">{{ item.deviceSerialNumber }}</md-table-cell>
        <md-table-cell md-label="Year" md-sort-by="year">{{ item.year }}</md-table-cell>
        <md-table-cell md-label="isAvailable" md-sort-by="isAvailable">{{ item.isAvailable }}</md-table-cell>
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
    return items.filter(item => toLower(item.label).includes(toLower(term)))
  }
  return items
}
export default {
  name: 'Trucks',
  data: () => ({
    url: 'http://localhost:3000/graphql',
    loaded: true,
    search: null,
    searched: [],
    trucks: null
  }),
  methods: {
    searchOnTable () {
      this.searched = searchByName(this.trucks, this.search)
    }
  },
  created () {
    axios.post(this.url, {
      query: `{trucks{id vin label color make model deviceSerialNumber year isAvailable } }`
    }).then(res => {
      this.trucks = res.data.data.trucks
      this.searched = this.trucks
      this.loaded = false
    })
  }
}
</script>
