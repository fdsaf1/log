<template>
  <div id="app">
    <div class="container">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <side-bar v-show="navSate" class="side-bar"  :authorize="authorize" :navList="navLists"></side-bar>
  </div>
</template>

<script>
import { mapGetters } from 'Vuex';
import sideBar from './components/SideBar';
export default {
  name: 'app',
  created () {
    this.$store.dispatch('getMember');

    this.$store.dispatch('getCurrentUserPermissions').then(data => {
        console.log('getCurrentUserPermissions', data);
        this.authorize = data;
    });
  },
  mounted () {
     
  },
  components: {
    sideBar
  },
  data () {
    return {
        authorize: null
    }
  },
  computed: {
    ...mapGetters(['navLists', 'navSate'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  overflow: hidden;
  height: 100%;
  position: relative;
}
.container {
  float: left;
  width: 100%;
}
.content {
  margin-left: 386px;
  min-height: 1146px;
}
.side-bar {
  position: absolute;
  top: 0;
  bottom: 0;
}
</style>
