export default {
 addBook({ commit }, payload) {
  this.$axios.$post('http://localhost:3001/books', payload).then((res) => {
      console.log(res)
    })

  }

}
