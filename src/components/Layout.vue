<template>
  <div class="layout-wrapper" :class="classPrefix&&`${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix&&`${classPrefix}-content`">
      <slot></slot>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props:['classPrefix']
});
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;

  height: 100vh;
  flex-direction: column;
}
.content {
  overflow: auto;
  flex-grow: 1;

}
</style>