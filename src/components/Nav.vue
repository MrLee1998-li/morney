<template>
  <nav class="nav">
    <router-link class="item" to="/money" active-class="selected">
      <Icons name="money" />
      Money
    </router-link>
    <router-link class="item" to="/labels" active-class="selected">
      <Icons name="labels" />
      Labels</router-link
    >
    <router-link class="item" to="/statistics" active-class="selected">
      <Icons name="statistics" />
      Statistics</router-link
    >
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>

<style lang="scss" scoped>
 @import '~@/assets/style/helper.scss';
.nav {
  display: flex;
  @extend %outterShadow;
  > .item {
    width: 33.3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  .selected {
    color: $color-highlight;
  }
}
</style>