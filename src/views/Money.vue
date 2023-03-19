<template>
  <layout classPrefix="layout">
    <NumberPad :time.sync="record.createdAt"  :value.sync="record.amount" @submit="saveRecordItem" />
    <Tabs :dataSource="recordTypeList" :value.sync="record.type" />
    <Notes
      fieldName="备注"
      :value.sync="record.notes"
      placeholder="在这里输入备注"
    />
    <Tags :selectedTags.sync="record.tags"
     />
  </layout>
</template>

<script lang="ts">
import Vue from "vue";
import NumberPad from "@/components/money/NumberPad.vue";
import Notes from "@/components/money/Notes.vue";
import Tags from "@/components/money/Tags.vue";
import { Component } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import Tabs from '../components/Tabs.vue';
import dayjs from "dayjs";
@Component({
  components: {
    NumberPad,
    Notes,
    Tags,
    Tabs
  }
})
export default class Money extends Vue {
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 10 ,createdAt:dayjs().toISOString()};
 get recordList() {
    return this.$store.state.recordList;
  }
    recordTypeList=recordTypeList;
  created() {
    this.$store.commit("fecth");
  }
  saveRecordItem() {
    if(!this.record.tags||this.record.tags.length===0){
      window.alert('请至少选择一个标签');
      return;
    }
    this.$store.commit("createRecord", this.record);
    this.record.notes='';
    this.record.tags=[];
  }
}
</script>


<style lang="scss" >
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>


<style lang="scss" scoped>
</style>