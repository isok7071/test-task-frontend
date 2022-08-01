<template>
  <div class="text-center">
    <v-pagination
        class="ma-5"
        v-model="currentPage"
        :length='lastPage'
        :total-visible="4"
    ></v-pagination>
  </div>
</template>

<script>
export default {
  props: ['store', 'collection'],
  watch:{
    currentPage(newVal){
      this.paginatePage(newVal);
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.$store.state[this.store][this.collection].current_page;
      },
      set(value){
        this.$store.commit( 'setCurrentPage', value);
      },
    },
    lastPage: {
      get() {
        return this.$store.state[this.store][this.collection].last_page;
      }
    }
  },
  methods:{
    paginatePage(pageNumber){
      this.$store.dispatch('fetchQuotes', pageNumber);
    },
  },
}
</script>