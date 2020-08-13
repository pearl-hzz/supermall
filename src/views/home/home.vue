<template>
  <div class="home">
    <nav-bar class="navHome">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="titlesH"
      class="tabControl1"
      @tabClick="tabClick"
      v-show="isTabFixed"
      ref="tabControl1"
    />
    <scroll
      class="content"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banner" @swiperImgLoad="swiperImgLoad" />
      <home-recomment :recomments="recommend" />
      <feature-view />
      <tab-control :titles="titlesH" @tabClick="tabClick" ref="tabControl" />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShow" />
  </div>
</template>


<script>
import HomeSwiper from "./component/homeSwiper";
import HomeRecomment from "./component/homeRecomment";
import FeatureView from "./component/FeatureView";
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/common/tabcontrol/TabControl";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";
import GoodsList from "components/content/goods/GoodsList";
import {itemListenerMixmin} from "common/mixin";
import { getDataList, getHomedata } from "network/home";
export default {
  name: "home",
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    HomeRecomment,
    FeatureView,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins: [itemListenerMixmin],
  data() {
    return {
      banner: null,
      recommend: null,
      titlesH: [
        { title: "流行", type: "pop" },
        { title: "新款", type: "new" },
        { title: "精选", type: "sell" },
      ],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getDataList();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  destroyed() {
    // console.log("homexiohui");
  },
  activated() {
    // 如果安装了1.15.*版本的better-scroll，页面跳转记录位置再重置，会不起效果

    // 进入的时候重新赋值
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 可能滚动出问题，最好重新刷新
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 离开的时候记录位置
    // console.log("deactivated");
    this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$off("imgLoad", this.itemListener)
    // console.warn(this.saveY);
  },
  methods: {
    getDataList() {
      getDataList().then((res) => {
        if (res.returnCode === "SUCCESS") {
          this.banner = res.data.banner.list;
          this.recommend = res.data.recommend.list;
        }
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomedata(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
    tabClick(type, index) {
      this.currentType = type;
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControl1.currentIndex = index;
    },
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 判断到顶部是否显示
      this.isShow = -position.y > 1000;
      // 判断controlTab是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
  },
};
</script>

<style scoped >
.home {
  /* vh viewport height */
  height: 100vh;
  position: relative;
}
.tabControl1 {
  position: relative;
  z-index: 3;
}
.navHome {
  background-color: var(--color-tint);
  color: #fff;
  /* scroll 是局部滚动，头部现在不需要定位 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4; */
}
/* 移动端兼容性比较好，ie等不友好，因为这个属性比较新 */
/* .tabControl {
  position: sticky; 
  top: 44px;
  z-index: 3;
} */
/* 方案1 */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
/* 方案2 */
/* .content{
  height: cals(100%-93px);
  margin-top: 44px;
  overflow: hidden;
} */
</style>
