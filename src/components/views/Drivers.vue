<template>
  <div>
    <md-progress-bar class="md-accent" md-mode="indeterminate" v-if="loaded"></md-progress-bar>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Drivers</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by label..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No drivers found"
        :md-description="`No drivers found for this '${search}' query. Try a different search term.`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="First name" md-sort-by="first_name">{{ item.first_name }}</md-table-cell>
        <md-table-cell md-label="Last name" md-sort-by="last_name">{{ item.last_name }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Truck ID" md-sort-by="truckid">{{ item.truckid }}</md-table-cell>
        <md-table-cell md-label="Active" md-sort-by="active">{{ item.active }}</md-table-cell>
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
  name: 'Drivers',
  data: () => ({
    url: 'http://localhost:3000/graphql',
    loaded: true,
    search: null,
    searched: [],
    drivers: null
  }),
  methods: {
    searchOnTable () {
      this.searched = searchByName(this.drivers, this.search)
    }
  },
  created () {
    axios.post(this.url, {
      query: `{ drivers{ id first_name last_name email truckid active } }`
    }).then(res => {
      this.drivers = res.data.data.drivers
      this.searched = this.drivers
      this.loaded = false
    })
  }
}
</script>
