<template>
  <div class>
    <nav-bar>
      <div slot="left" class="backIcon" @click='backPre'>
          <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="title-item"
          @click="titleClick(index)"
          :class="{activeClass: index === currentIndex}"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "detailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar,
  },
  created() {},
  watch: {},
  computed: {},
  mounted() {},
  methods: {
      titleClick(index){
          this.currentIndex = index
          this.$emit('titleClick',index)
      },
      backPre(){
          this.$router.back()
      }
  },
};
</script>

<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.activeClass{
    color: var(--color-high-text);
}
.backIcon img{
    margin: 10px 0 0 10px;
}
</style>
