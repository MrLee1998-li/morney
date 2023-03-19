<template>
  <layout>
    <div class="navBar">
      <Icons class="leftIcon" name="left" @click.native="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <Notes
        :value="tag.name"
        @update:value="updateTag"
        fieldName="标签名"
        placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button @click.native="remove">删除标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Notes from "../components/money/Notes.vue";
import Button from "../components/Button.vue";
@Component({
  components: { Notes, Button },
})
export default class EditLabel extends Vue {
  get tag() {
    return this.$store.state.currentTag;
  }
  created() {
     this.$store.commit("fetchTags");
    this.$store.commit("setCurrentTag", this.$route.params.id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  updateTag(name: string) {
    if (this.tag) {
      this.$store.commit("updateTag", { id: this.tag.id, name });
    }
  }
  remove() {
    if (this.tag) {
      this.$store.commit("removeTag", this.tag.id);
    }
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
  }
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.form-wrapper {
  background: white;
  margin-top: 8px;
}
.button-wrapper {
  padding: 16px;
  text-align: center;
  margin-top: 44-16px;
}
</style>