import axios from "axios";

export default {
    state: {
        quotes: {},
        pageNumber:0,
    },
    getters: {
        getAllQuotes(state) {
            return state.quotes.data
        }
    },
    mutations: {
        setCurrentPage(state, data){
            state.quotes.current_page = data
        },
        setQuotes(state, data) {
            state.quotes = data
        },
    },

    actions: {
        fetchQuotes(context, pageNumber) {
            axios.get('http://127.0.0.1:8000/api/quotes?page='+pageNumber,{headers:
                    {
                        'Content-Type': 'application/json',
                        'charset':'UTF-8',
                    }}).then(response =>
                context.commit('setQuotes', response.data))
        }
    },

}