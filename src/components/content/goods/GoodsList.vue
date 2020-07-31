<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.acm" :goodsItem="item" class="goodsItem"/>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
  data() {
    return {};
  },
  created() {},
  watch: {},
  computed: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 2px;
    }

</style>
