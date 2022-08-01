<template>
  <v-app>
    <v-container >
      <h1 class="mt-10
      text-center mb-5">Все цитаты</h1>
      <v-row
          justify="center">
        <v-col
            cols="12"
            md="6"
            v-for="quote in $store.getters.getAllQuotes"
            :key="quote.id"
        >
          <v-card
              elevation="7"
              outlined
              class="pa-2 rounded-lg"
          >
            <v-card-title>
              {{ quote.quote_author }}
            </v-card-title>
            <v-card-subtitle>
              {{ quote.quote_text }}
            </v-card-subtitle>
            <v-chip
                v-for="tag in quote.tags"
                :key="tag.id"
                color="blue"
                outlined
                class="ma-1">
              {{ tag.tag_name }}
            </v-chip>

          </v-card>
        </v-col>

      </v-row>
    </v-container>
    <PaginateComponent
    store="quotes"
    collection="quotes"
    ></PaginateComponent>
  </v-app>

</template>

<script>
import PaginateComponent from "@/components/PaginateComponent";
export default {

  name: 'HomeView',

  components:{
    PaginateComponent,
  },
  mounted() {
    this.$store.dispatch('fetchQuotes',0)
  },
}

</script>
#TODO Сделать обработку ошибок