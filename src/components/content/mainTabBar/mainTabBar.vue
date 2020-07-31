<template>
    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="~assets/img/tabBar/home2.png" alt />
        <img slot="item-icon-active" src="~assets/img/tabBar/home1.png" alt />
        <div slot="item-name">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/class">
        <img slot="item-icon" src="~assets/img/tabBar/class2.png" alt />
        <img slot="item-icon-active" src="~assets/img/tabBar/class1.png" alt />
        <div slot="item-name">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/shopCar">
        <img slot="item-icon" src="~assets/img/tabBar/shopCar2.png" alt />
        <img slot="item-icon-active" src="~assets/img/tabBar/shopCar1.png" alt />
        <div slot="item-name">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/my">
        <img slot="item-icon" src="~assets/img/tabBar/man2.png" alt />
        <img slot="item-icon-active" src="~assets/img/tabBar/man1.png" alt />
        <div slot="item-name">个人中心</div>
      </tab-bar-item>
    </tab-bar>
</template>
<script>
import TabBar from "components/common/tabBar/TabBar";
import TabBarItem from "components/common/tabBar/tabBarItem";
export default {
  name: "mainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
</style>
