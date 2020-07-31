<template>
  <div>
    个人中心
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  methods: {
  },
  filters: {
    formatPrice(money) {
      return "￥" + money.toFixed(2);
    },
  },
};
</script>

<style scoped>

</style>
