<template>
  <v-app>
  <Navbar></Navbar>
    <router-view></router-view>
  </v-app>
</template>


<script>
import Navbar from "@/components/NavbarComponent";

export default {
  name: 'App',
  components:{
    Navbar
  },

};
</script>
