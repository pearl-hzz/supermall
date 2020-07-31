<template>
  <div class="tabControl">
    <div
      v-for="(item,index) in titles"
      :key="item.type"
      class="titleItem"
      :class="{active: index === currentIndex}"
      @click="itemClick(index,item.type)"
    >
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  created() {},
  watch: {},
  computed: {},
  mounted() {},
  methods: {
      itemClick(index,type){
          this.currentIndex = index;
          this.$emit('tabClick', type, index)
      }
  },
};
</script>

<style scoped>
.tabControl {
  display: flex;
  text-align: center;
  background-color: #fff;
  height: 40px;
  line-height: 40px;
}
.titleItem {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.titleItem span {
  padding: 4px 8px;
}
.active span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>
