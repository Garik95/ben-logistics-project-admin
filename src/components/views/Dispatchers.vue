<template>
  <div>
    <md-progress-bar class="md-accent" md-mode="indeterminate" v-if="loaded"></md-progress-bar>
    <md-table v-model="searched" md-sort="name" md-sort-order="asc" md-card md-fixed-header>
      <md-table-toolbar>
        <div class="md-toolbar-section-start">
          <h1 class="md-title">Users</h1>
        </div>

        <md-field md-clearable class="md-toolbar-section-end">
          <md-input placeholder="Search by label..." v-model="search" @input="searchOnTable" />
        </md-field>
      </md-table-toolbar>

      <md-table-empty-state
        md-label="No users found"
        :md-description="`No users found for this '${search}' query. Try a different search term.`">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{ item.id }}</md-table-cell>
        <md-table-cell md-label="First name" md-sort-by="first_name">{{ item.first_name }}</md-table-cell>
        <md-table-cell md-label="Last name" md-sort-by="last_name">{{ item.last_name }}</md-table-cell>
        <md-table-cell md-label="Login" md-sort-by="login">{{ item.login }}</md-table-cell>
        <md-table-cell md-label="Created" md-sort-by="createdAt">{{ item.createdAt }}</md-table-cell>
        <md-table-cell md-label="Updated" md-sort-by="updatedAt">{{ item.updatedAt }}</md-table-cell>
        <md-table-cell md-label="Post" md-sort-by="post">{{ item.post }}</md-table-cell>
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
  name: 'Dispatchers',
  data: () => ({
    url: 'http://localhost:3000/graphql',
    loaded: true,
    search: null,
    searched: [],
    users: null
  }),
  methods: {
    searchOnTable () {
      this.searched = searchByName(this.users, this.search)
    }
  },
  created () {
    axios.post(this.url, {
      query: `{ users{ first_name last_name login createdAt updatedAt post } }`
    }).then(res => {
      this.users = res.data.data.users
      this.searched = this.users
      this.loaded = false
    })
  }
}
</script>
