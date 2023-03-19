<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="time">
        <Icons class="icon" name="calendar" /><input @input='onValueChanged($event.target.value)' :value="day(time)" class="data"  type="date"  />
      </button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent" class="x">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import dayjs from "dayjs";
@Component
export default class NumberPad extends Vue {
  @Prop() readonly value!: number;
    @Prop() readonly time!: string;
  output = "0";
  day(time:string){
    return dayjs(time).format('YYYY-MM-DD');
  }
  onValueChanged(value:string){
    this.$emit('update:time',new Date(value).toISOString());
  }
  inputContent(event: MouseEvent) {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent as string;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf(".") >= 0) {
      if (input === ".") {
        return;
      }
    }
    this.output += input;
  }
  remove() {
    if (this.output.length === 1) {
      this.output = "0";
    } else {
      this.output = this.output.slice(0, -1);
    }
  }
  clear() {
    this.output = "0";
  }
  ok() {
    const number = parseFloat(this.output);
    this.$emit("update:value", number);
    this.$emit("submit", number);
    this.output = "0";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
@import "~@/assets/style/reset.scss";
.numberPad {
  .output {
    @extend %innerShadow;
    @extend %clearFix;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    height: 72px;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: none;
      &.ok {
        float: right;
      }
      &.zero {
        width: 50%;
      }
      $bg: #f2f2f2;
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4% * 2);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4% * 3);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4% * 4);
      }
      &:nth-child(12),
      &:nth-child(14) {
        background: darken($bg, 4% * 5);
      }
    }
    > .x {
      $bg: #f2f2f2;
      background: darken($bg, 4% * 6);

}
    .time {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    .icon {
      width: 100%;
      height: 50%;
    }
    .data {
      width: 100%;
      $bg: #f2f2f2;
      height: 50%;
      border: none;
      background: darken($bg, 4% * 6);
    }
  }
}
</style>