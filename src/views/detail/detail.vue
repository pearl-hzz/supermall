<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recomment" :goods="recomments" />
    </scroll>
    <detail-bottom-bar class="bottomBar" @addCart="addToCart" />
    <back-top @click.native="backTopClick" v-show="isShow" />
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import detailNavBar from "./detailCom/detailNavBar";
import detailSwiper from "./detailCom/detailSwiper";
import detailBaseInfo from "./detailCom/detailBaseInfo";
import detailShopInfo from "./detailCom/detailShopInfo";
import detailGoodsInfo from "./detailCom/detailGoodsInfo";
import detailParamInfo from "./detailCom/detailParamInfo";
import detailBottomBar from "./detailCom/detailBottomBar";
import detailCommentInfo from "./detailCom/detailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import { debounce } from "common/utils";
import {
  getDetail,
  Goods,
  GoodsParam,
  Shop,
  getRecommend,
} from "network/detail";
import { itemListenerMixmin, backTopMixmin} from "common/mixin";
import {mapActions} from 'vuex'
export default {
  name: "detail",
  mixins: [itemListenerMixmin,backTopMixmin],
  data() {
    return {
      iid: null,
      topImages: null,
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recomments: [],
      themeTopYs: [0, 100, 100, 1000],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    detailGoodsInfo,
    detailParamInfo,
    detailBottomBar,
    detailCommentInfo,
    GoodsList,
    Scroll,
  },
  created() {
    this.iid = this.$route.params.iid;
    // 获取商品详情数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      //   console.log(data);
      //顶部轮播图图片
      this.topImages = data.itemInfo.topImages;
      //商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //商店信息
      this.shop = new Shop(data.shopInfo);
      //商品详细信息
      this.detailInfo = data.detailInfo;
      //参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //评论信息
      if (data.rate.Crate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //3、请求推荐数据
    getRecommend().then((res) => {
      // console.warn(res);
      this.recomments = res.data.list;
    });
    this.getThemeTopY = debounce(() => {
      // 1created:dom还未被渲染出来
      // 2mounted:
      // 3此处赋值值还是不对，所以需要做等图片加载完后做赋值处理
      // 4nextClick，值还是不对，原因是根据最新的数据，对应的dom已经被渲染出来，但图片还没有加载完
      // 只有当图片加载完成之后拿到的值才是对的
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recomment.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // this.$refs.scroll.refresh();
      // 从混入中取得
      this.newRefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 0);
    },
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      // positionY和主题中的值进行对比：[0,7938,9129,9452]
      for (let i = 0; i < length - 1; i++) {
        // 方法一：普通做法
        // 则if里面的条件为：
        // this.currentIndex !== i &&
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i]));
        // 方法二：hack
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.isShow = -position.y > 1000;
    },
    addToCart(){
      // console.log("shopcar")
      // 1.获取需要加入购物车的信息
      const product = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.realPrice,
        iid: this.iid,
        realPrice: this.goods.realPrice
      }
      // vuex中的actions方法映射
      this.addCart(product).then(res => {
        this.$toast.show('已加入购物车')
      })
      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res)
      // })
    }
  },
  destroyed() {
    this.$bus.$off("imgLoad", this.itemListener);
  },
};
</script>

<style scoped>
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
/* 底部的首页导航栏脱离了标准流浮在上面，该页面不需要展示，做以下处理覆盖 */
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
  background-color: #fff;
}
/* .bottomBar{

} */
</style>
