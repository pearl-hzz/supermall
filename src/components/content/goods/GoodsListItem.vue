<template>
  <div class="goodsItem" @click="goodsClick">
    <img alt='' @load="imgLoad" v-lazy='showImage'/>
    <div class="goodsInfo">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  watch: {},
  computed: {
    showImage(){
      return this.goodsItem.show.img || this.goodsItem.image
    }
  },
  mounted() {},
  methods: {
    imgLoad() {
        // 向事件总线发射一个事件，方便在home中获取这个事件，采取bus
      this.$bus.$emit("imgLoad");
    },
    goodsClick(){
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
};
</script>

<style scoped>
.goodsItem {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}
.goodsItem img {
  width: 100%;
  border-radius: 5px;
}
.goodsInfo {
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
  overflow: hidden;
  font-size: 12px;
}
.goodsInfo p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goodsInfo .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goodsInfo .collect {
  position: relative;
}
.goodsInfo .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
