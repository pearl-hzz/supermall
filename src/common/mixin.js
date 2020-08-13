import {
  debounce
} from "common/utils";
import { mixin } from "vue/types/umd";

// mixin  混入
export const itemListenerMixmin = {
  data() {
    return {
      itemListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    //监听图片加载
    this.itemListener = () => {
      refresh()
    }
    this.$bus.$on("imgLoad", this.itemListener);
  },
}
