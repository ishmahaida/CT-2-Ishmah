<template>
  <div class=' flex flex-row h-screen'>
    <div class='w-4/6'>
      <app-header></app-header>
      <div class='w-full justify-center flex flex-row flex-wrap'>
        <div class='w-1/5 flex flex-col flex-grow p-4 border m-2' v-for='(item,index) in (!filterProduct.length? product:filterProduct)' :key='index'>
          <img :src="item.image" class='w-5/6 mx-auto flex-grow'>
          <div class='flex flex-col justify-end'>
            <div class='flex flex-col mt-4'>
              <span class='text-xl text-black-500'>Price : {{item.price}}</span>
              <span>Name : {{item.name}}</span>
              <span>Category : {{item.category}}</span>
            </div>
            <button class='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mt-4' type='submit' @click='addCart(item.id)'>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
    <div class='w-2/6 bg-gray-200 h-screen'>
      <div class='items-center justify-between flex p-4 w-full'>
        <h1 class='text-3xl italic'>Checkout</h1>
        <div>
          
          <button class='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mx-2' type='submit' @click='clearCart'>Delete</button>
        </div>
      </div>
      <div class='w-full'>
        <div class='flex flex-col justify-between' v-for='(index,key) in cart' :key='key'>
          <div>
            <span class='p-2 w-full flex'>{{index.name}}</span>
            <div class='flex flex-row'>
              <span class='p-2 w-1/2 flex'>PRICE : {{index.price}} x {{index.amount}}</span>
              <span class='p-2 w-1/2 flex'>TOTAL : {{index.total}}</span>
            </div>
          </div>
          <div class='w-full flex justify-end'>
            <button class='bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-2 rounded mt-4' type='submit' @click='addAmount(key)'>+</button>_  
            <button class='bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-2 rounded mt-4' type='submit' @click='decAmount(key)'>-</button>_  
            <router-link class='bg-green-600 hover:bg-green-600 text-white font-bold py-2 px-2 rounded mt-4' type='submit' to='/payment'>Total Payment</router-link>
          </div>
        </div>
      </div>
      <div class="w-full text-3xl flex justify-between my-4 p-2 border-b-4 border-black">
        <span>Total</span>
        <span>{{total}}</span>
      </div>      
    </div>
  </div>  
</template>

<script>
import Header from '../components/Header.vue'
import {mapGetters, mapMutations, mapActions} from 'vuex'
export default {
  name: 'Page_Buyer',
  components: {
    appHeader: Header
  },
  mounted(){
    if(localStorage.getItem('userinfo') !== null){
      this.$store.dispatch('fectUser')
    }else{
      this.$router.push('/')
    }
    this.fetchData()
  },
  watch:{
    product(){
      if(this.category){
        this.$store.commit("FILTER_PRODUCT",this.category)
      }  
    },
    category(val){
      this.$store.commit("FILTER_PRODUCT",val)
    }
  },
  computed:{
    ...mapGetters([
      'product',
      'filterProduct',
      'cart',
      'total',
      'user'
    ]),
    category(){
      return this.$route.params.category  
    }
  },
  methods:{
    ...mapActions([
      'fetchData'
    ]),
    ...mapMutations([
      'addCart',
      'addAmount',
      'decAmount',
      'clearCart',
      'deleteBuy'
    ]),
  }
}
</script>

<style>

</style>