export default {
  addCategory({commit,dispatch}, title) {
    this.$axios.$post('http://localhost:3001/categories', {
      title: title
    }).then(async (res) => {
      const categories =await dispatch('getCategoryFromAPI')
        commit('setCategories',categories )
    })
  },

   getCategoryFromAPI() {
    return  fetch('http://localhost:3001/categories').then(res => res.json())
  },

  deleteCategory({ commit,dispatch }, payload) {
    this.$axios.$delete('http://localhost:3001/categories/' + payload).then(async (res) => {
      const categories =await dispatch('getCategoryFromAPI')
      commit('setCategories',categories )
    })
  },
  updateCategory({commit,dispatch},category){
    this.$axios.$put('http://localhost:3001/categories/'+category.id,{
      title:category.title,
    }).then(async (res) => {
      const categories =await dispatch('getCategoryFromAPI')
      commit('setCategories',categories )
    })
  }
}
