<template>
  <layout>
    <div class="tags">
      <router-link
        class="tag"
        v-for="tag in tags"
        :key="tag.id"
        :to="`/labels/edit/${tag.id}`"
      >
        <span>{{ tag.name }}</span>
        <Icons name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button @click.native="createTag">新建标签</Button>
    </div>
  </layout>
</template>

<script lang="ts">
import { Component} from "vue-property-decorator";
import Button from "../components/Button.vue";
import TagHelper from '@/mixins/tagHelper'
import { mixins } from "vue-class-component";
@Component({
  components: { Button },
})
export default class Labels extends mixins(TagHelper) {
  get tags(){
    return this.$store.state.tagList;
  }
  created() {
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 24px;
      height: 24px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  height: 40px;
  padding: 0 16px;
  border: none;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>