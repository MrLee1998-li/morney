<template>
      <div>
      <label class="notes">
        <span class="name">{{fieldName}}</span>
        <input :value="value"  @input='onValueChanged($event.target.value)'
          type="text" :placeholder="placeholder" />
      </label>
    </div>
</template>

<script lang="ts">
  import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
   @Prop({default:''})readonly value!:string
   @Prop({required:true}) fieldName!:string;
    @Prop() placeholder?:string;
  onValueChanged(value:string){
    this.$emit('update:value',value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: block;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }
  input {
    padding: 16px 16px 16px 0px;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>