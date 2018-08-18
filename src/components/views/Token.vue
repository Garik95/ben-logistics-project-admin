<template>
    <div>
      <md-progress-bar class="md-accent" md-mode="indeterminate" v-if="loaded"></md-progress-bar>
      <md-card v-for="token in tokens" :key="token">
        <md-card-header>
          <div class="md-title">{{ token.name }}</div>
        </md-card-header>

        <md-card-content>
          <md-field>
            <label>Service Name</label>
            <md-input v-bind:value="token.service" v-bind:disabled="!editstatus" v-bind:name="token.name" ></md-input>
          </md-field>
          <md-field>
            <label>Token</label>
            <md-input v-bind:value="token.token" v-bind:disabled="!editstatus" v-bind:name="token.name" ></md-input>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <!-- <md-button :disabled="editstatus" >Submit</md-button> -->
          <md-button v-on:click = "edit(token.name)" v-text="input">Edit</md-button>
        </md-card-actions>
    </md-card>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Token',
  data: () => ({
    tokens: null,
    loaded: true,
    editstatus: false,
    input: 'Edit'
  }),
  methods: {
    edit: function (name) {
      alert(name)
      if (this.editstatus === false) {
        this.editstatus = true
        this.input = 'Save'
      } else if (this.editstatus === true) {
        this.editstatus = false
        this.input = 'Edit'
      }
    }
  },
  created: function () {
    axios.post(`http://logistics-api.eu-4.evennode.com/graphql`, {
      query: `{ tokens { name service token } }`
    }).then(response => {
      alert(JSON.stringify(response.data.data))
      if (response.data.data.tokens.length > 0) {
        this.tokens = response.data.data.tokens
        this.loaded = false
      } else alert('Something wrong!!!')
    }).catch(e => { console.log(e) })
  }
}
</script>

<style lang="scss" scoped>
  .md-card {
    width: 50%;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
