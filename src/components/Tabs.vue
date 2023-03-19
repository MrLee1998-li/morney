<template>
    <ul class="tabs"   :class="{[`${classPrefix}-tabs`]:classPrefix}">
      <li v-for="data in dataSource" 
      :key="data.value"
      :class="liClass(data)"
      class="tabs-item"
      @click="select(data)"
      >{{data.text}}</li>
    </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
type DateSourceItem={text:string,value:string}

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array })
  dataSource!: DateSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;
  select(item:DateSourceItem){
      this.$emit('update:value',item.value)
  }
  liClass(data:DateSourceItem){
    return {selected:data.value===this.value,
       [`${this.classPrefix}-tabs-item`]: this.classPrefix,
      }}
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;
   &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>