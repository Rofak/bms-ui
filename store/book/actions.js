export default {
 addBook({ commit }, payload) {
  this.$axios.$post('http://localhost:3001/books', payload,{
    headers:{
      'Authorization':this.$auth.strategy.token.get()
    }
  }).then((res) => {
      console.log(res)
    })

  }

}
