<template>
  <div class='flex items-center justify-center bg-gray-500 h-screen'>
    <div class='border w-1/2 rounded-md bg-white p-4'>
      <div>Pay Now</div>
      <div class='flex w-full justify-between w-full border-b' v-for='(index,key) in cart' :key='key'>
        <span>{{index.total}} Rp</span>
        <span>{{index.name}} x {{index.amount}}</span>
      </div>
      <br/>
      <div class='flex w-full justify-end'>
        TOTAL : Rp {{total}} 
      </div>
      <button class='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mt-4' type='submit' @click='pay'>Pay Now</button>
    </div>
  </div>
</template>S

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name:'payment',
  mounted(){
    if(this.cart.length == 0){
      this.$router.push('/page-buyer')
    }
  },
  computed:{
    ...mapGetters([
      'cart',
      'total',
    ])
  },
  methods:{
    ...mapMutations([
      'clearCart'
    ]),
    pay(){
      this.clearCart()
      this.$store.commit("FILTER_PRODUCT")
      this.$router.push('/page-buyer')
    }
  }
}
</script>

<style>

</style>