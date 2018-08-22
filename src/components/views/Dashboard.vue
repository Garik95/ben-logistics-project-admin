<template>
    <div>
      <md-progress-bar class="md-accent" md-mode="indeterminate" v-if="loaded"></md-progress-bar>
      <md-card>
        <md-card-header>
            <md-card-header-text>
            <div class="md-title">Trucks</div>
            <div class="md-subhead">{{ counters.truck }}({{ counters.newTruck }})</div>
            </md-card-header-text>

            <md-card-media>
              <md-avatar class="md-avatar-icon md-large md-accent">
                <md-icon>drive_eta</md-icon>
              </md-avatar>
            </md-card-media>
        </md-card-header>

        <md-card-actions>
            <md-button to="/trucks">View</md-button>
        </md-card-actions>
      </md-card>
      <md-card>
        <md-card-header>
            <md-card-header-text>
            <div class="md-title">Trailers</div>
            <div class="md-subhead">{{ counters.trailer }}({{ counters.newTrailer }})</div>
            </md-card-header-text>

            <md-card-media>
              <md-avatar class="md-avatar-icon md-large md-accent">
                <md-icon>local_shipping</md-icon>
              </md-avatar>
            </md-card-media>
        </md-card-header>

        <md-card-actions>
            <md-button to="/trailers">View</md-button>
        </md-card-actions>
      </md-card>
      <md-card>
        <md-card-header>
            <md-card-header-text>
            <div class="md-title">Drivers</div>
            <div class="md-subhead">{{ counters.driver }}</div>
            </md-card-header-text>

            <md-card-media>
              <md-avatar class="md-avatar-icon md-large md-accent">
                <md-icon>airline_seat_recline_normal</md-icon>
              </md-avatar>
            </md-card-media>
        </md-card-header>

        <md-card-actions>
            <md-button to="/drivers">View</md-button>
        </md-card-actions>
      </md-card>
      <md-card>
        <md-card-header>
            <md-card-header-text>
            <div class="md-title">Dispatchers</div>
            <div class="md-subhead">{{ counters.user }}</div>
            </md-card-header-text>

            <md-card-media>
              <md-avatar class="md-avatar-icon md-large md-accent">
                <md-icon>person</md-icon>
              </md-avatar>
            </md-card-media>
        </md-card-header>

        <md-card-actions>
            <md-button to="/dispatchers">View</md-button>
        </md-card-actions>
      </md-card>
      <md-card>
        <md-card-header>
            <md-card-header-text>
            <div class="md-title">Reserves</div>
            <div class="md-subhead">{{ counters.reserve }}({{ counters.newReserve }})</div>
            </md-card-header-text>

            <md-card-media>
              <md-avatar class="md-avatar-icon md-large md-accent">
                <md-icon>rv_hookup</md-icon>
              </md-avatar>
            </md-card-media>
        </md-card-header>

        <md-card-actions>
            <md-button to="/reserves">View</md-button>
        </md-card-actions>
      </md-card>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Dashboard',
  data: () => ({
    url: 'http://localhost:3000/graphql',
    loaded: true,
    counters: null
  }),
  created () {
    axios.post(this.url, {
      query: `{ vehiclecount{ trailer newTrailer truck newTruck driver user reserve newReserve} }`
    }).then(res => {
      this.counters = res.data.data.vehiclecount
      this.loaded = false
    }).catch(e => {
      console.log(e)
    })
  }
}
</script>
<style lang="scss" scoped>
  .md-card {
    width: 15%;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
