<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./cartCom/CartList";
import CartBottomBar from "./cartCom/CartBottomBar";

import { mapGetters } from "vuex";
// 将store中getters映射到局部计算属性

export default {
  name: "shopCar",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 常用写法
    // cartLength(){
    //   return this.$store.state.cartList.length
    // }
    //   将getters中的方法直接转换为计算属性,有两种语法
    // ...mapGetters(["cartLength", "cartList"]),
    ...mapGetters({
      cartLength: "cartLength",
      cartList: "cartList"
    }),
  },
};
</script>

<style scoped>
.cart {
  /*height: 100vh;*/
  position: relative;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
