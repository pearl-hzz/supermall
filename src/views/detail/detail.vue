<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recomments"/>
    </scroll>
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
import { getDetail, Goods, GoodsParam, Shop, getRecommend} from "network/detail";
import {itemListenerMixmin} from "common/mixin";
export default {
  name: "detail",
  mixins: [itemListenerMixmin],
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
      themeTopYs: [],
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
      getRecommend().then(res => {
        console.log(res);
        console.warn(res)
        this.recomments = res.data.list;
      });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
    },
  },
  destroyed() {
    this.$bus.$off("imgLoad", this.itemListener)
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
</style>
