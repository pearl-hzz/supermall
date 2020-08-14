<template>
  <div id="check-button" :class="{'check': isChecked}">
    {{isChecked}}
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  #check-button img{
    border-radius: 50%;
    border: 1px solid #aaa;
    align-items: center;
    justify-content: center;
  }

   .check {
    background-color: var(--color-high-text);
    border-radius: 50%;
  }

  /* #check-button{
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .check{
    background-color: var(--color-high-text);
    border-color: var(--color-high-text);
  } */
</style>
