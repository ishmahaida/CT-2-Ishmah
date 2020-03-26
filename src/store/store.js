import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
  state:{
    user:{},
    cart:[],
    product:[],
    filterProduct:[],
  },

  getters:{
    user(state){
      return state.user
    },
    product(state){
      return state.product
    },
    filterProduct(state){
      return state.filterProduct
    },
    cart(state){
      return state.cart
    },
    total(state){
      var sum
      if(state.cart){
        sum = state.cart.reduce(function (total, currentValue) {
          return total + currentValue.total;
      }, 0);
      }else{
        sum = 0
      }
      return sum
    }
  },

  mutations:{
    SET_USER(state,payload){
      state.user = payload
    },
    SET_PRODUCT(state, payload){
      state.product = payload
    },
    FILTER_PRODUCT(state, payload){
      if(payload){
        var filtered =  state.product.filter(function(v) {
          return v.category == payload;
        });
        state.filterProduct = filtered
      }else{
        state.filterProduct = []
      }
    },
    addCart(state, payload){
      var temp
      temp =  state.product.filter(function(v) {
        return v.id == payload;
      })
      var key = temp[0].id
      var name = temp[0].name
      var price = temp[0].price
      if(state.cart.map(function(e) { return e.key; }).indexOf(payload) == -1){
        state.cart.push({"key":key, "name": name, "price": price, "amount":1, "total": price})
      }else{
        return
      }
    },
    addAmount(state,payload){
      state.cart[payload].amount++
      state.cart[payload].total = state.cart[payload].price * state.cart[payload].amount
    },
    decAmount(state,payload){
      if(state.cart[payload].amount > 1){
        state.cart[payload].amount--
        state.cart[payload].total = state.cart[payload].price * state.cart[payload].amount
      }
    },
    deleteBuy(state,payload){
      state.cart.splice(payload, 1)
    },
    clearCart(state){
      state.cart = []
    } 
  },

  actions:{
    fetchData ({commit}) {
      axios
        .get('http://localhost:3000/products')
        .then(r => r.data)
        .then(result => {
          commit('SET_PRODUCT', result)
        })
    },
    fectUser({commit}){
      axios
        .get('http://localhost:3000/user')
        .then(r => r.data)
        .then(result => {
          commit('SET_USER', result)
        })      
    }
  }
})