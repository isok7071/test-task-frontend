<template>
  <v-container fluid>
    <v-app-bar
        elevation="6"
        outlined
        rounded

        hide-on-scroll
    >
      <v-row justify="center">
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
              <v-icon
                  x-large
              >
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Создать цитату</span>
            </v-card-title>
            <v-form ref="form" v-model="valid">
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12">
                      <v-text-field
                          v-model="author"
                          :rules="authorRules"
                          label="Автор цитаты*"
                          :counter="200"
                          required
                          :error-messages='author_pattern()'
                      ></v-text-field>
                    </v-col>

                    <v-col
                        cols="12"
                    >
                      <v-textarea
                          label="Текст цитаты*"
                          hint="Например: Случайности не случайны"
                          persistent-hint
                          required

                          v-model="quote_text"
                          :rules="quote_textRules"
                          :counter="255"
                          :error-messages='quote_text_pattern()'
                      ></v-textarea>
                    </v-col>
                  </v-row>

                </v-container>
                <v-select v-model="selected_values"
                          :items="tags"
                          label="Выбрать теги*"
                          item-value="id"
                          item-text="tag_name"
                          multiple
                          v-on:input="limiter"
                          chips
                          required
                          :rules="selectRules"
                >

                </v-select>
                <small>*Обязательно для заполнения</small>
              </v-card-text>

              <v-col class="d-flex justify-center align-center">
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                  >
                    Закрыть окно
                  </v-btn>
                </v-card-actions>
                <v-btn
                    color="success darken-1"
                    text
                    type="submit"
                    @click="submit"
                >
                  Добавить
                </v-btn>
              </v-col>
            </v-form>
          </v-card>
        </v-dialog>
      </v-row>
    </v-app-bar>

    <v-alert
        class="pa-5 ma-5"
        :value="alert"
        color="blue"
        dark
        icon="mdi-success"
        transition="scale-transition"
    >
      Ваша цитата успешно опубликована!
    </v-alert>
  </v-container>


</template>


<script>
import axios from "axios";

export default {
  name: "NavbarComponent",
  data: () => ({
    alert: false,
    valid: false,
    author: '',
    authorRules: [
      v => !!v || 'Автор обязателен для заполнения',
      v => v.length <= 200 || 'Поле должно быть не больше 200 символов',
    ],
    quote_text: '',
    quote_textRules: [
      v => !!v || 'Текст цитаты обязателен для заполнения',
      v => v.length <= 255 || 'Поле должно быть не больше 255 символов',
    ],
    selectRules: [
      (v) => !!v || "Небходимо добавить как минимум один тэг",
      (v) => v.length > 0 || "Небходимо добавить как минимум один тэг",

    ],
    dialog: false,
    tags: [],
    selected_values: [],

  }),

  mounted() {
    this.fetchTags()
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        let form_data;
        form_data = {
          'quote_author': this.author,
          'quote_text': this.quote_text,
          'tags': this.selected_values,
          'created_at': Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"}),
          'updated_at': Date().toLocaleString("en-US", {timeZone: "Europe/Moscow"}),
        }
        axios.post('https://test-task-backend-napopravky.herokuapp.com/quotes/add', form_data, {
          headers:
              {
                'Content-Type': 'application/json',
                'charset': 'UTF-8',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers':'*',
              }
        }).then((response) => {
          if (response.status) {
            this.dialog = false;
            this.alert = true;

            setTimeout(function () {
                  window.location.reload()
                }
                , 1000);
          } else {
            this.dialog = false;
            window.location.reload()
          }
        });
      }
    },
    fetchTags() {
      axios.get('https://test-task-backend-napopravky.herokuapp.com/api/tags', {
        headers:
            {
              'Content-Type': 'application/json',
              'charset': 'UTF-8',
            }
      }).then(response => this.tags = response.data)

    },
    quote_text_pattern() {
      if (!RegExp(/^[А-Яа-я.,A-Za-z?\s]{0,255}$/).test(this.quote_text)) {
        return 'Поле может содержать только буквы(латиница, кириллица) и знаки пунктуации';
      }
    },
    author_pattern() {
      if (!RegExp(/^[А-Яа-я.,A-Za-z?\s]{0,255}$/).test(this.author)) {
        return 'Поле может содержать только буквы(латиница, кириллица) и знаки пунктуации';
      }
    },
    //Limit selected values
    limiter(e) {
      if (e.length > 3) {
        e.pop()
      }
    }
  },


}
</script>

<style scoped>

</style>