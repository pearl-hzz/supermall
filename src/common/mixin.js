import {
  debounce
} from "common/utils";
// mixin  混入
export const itemListenerMixmin = {
  data() {
    return {
      itemListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // 防抖
    this.newRefresh = debounce(this.$refs.scroll.refresh, 200);
    //监听图片加载
    this.itemListener = () => {
      this.newRefresh()
    }
    // 开启scroll刷新监听
    this.$bus.$on("imgLoad", this.itemListener);
  },
}
import BackTop from "components/content/backtop/BackTop";
export const backTopMixmin = {
  data(){
    return {
      isShow: false,
    }
  },
  methods:{
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
  },
  components:{
    BackTop
  }
}
