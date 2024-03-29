<template>
  <div class="x">
    <layout>
      <Tabs
        classPrefix="type"
        :dataSource="recordTypeList"
        :value.sync="type"
      />
      <ol v-if="result.length>0">
        <li v-for="(group, index) in result" :key="index">
          <h3 class="title">
            {{ beautify(group.title) }} <span>￥{{ group.total }}</span>
          </h3>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span>{{ tagString(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span>￥{{ item.amount }} </span>
            </li>
          </ol>
        </li>
      </ol>
      <div v-else class="noResult">
        暂无相关记录
      </div>
    </layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "../components/Tabs.vue";
import intervalList from "../constants/intervalList";
import recordTypeList from "../constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  tagString(tags: Tag[]) {
    let arr = tags.map((item) => item.name);
    return tags.length === 0 ? "无" : arr.join(",");
  }
  beautify(time: string) {
    const now = dayjs();
    const day = dayjs(time);
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  get recordList() {
    return this.$store.state.recordList;
  }
  get result() {
    const recordList: RecordItem[] = this.recordList;

    type HashTableValue = { title: string; items: RecordItem[] };
    const newList = clone(recordList)
      .filter((i) => i.type === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
    if (newList.length === 0) {
      return [];
    }
    const groupList = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        total: 0,
        items: [newList[0]],
      },
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = groupList[groupList.length - 1];
      if (dayjs(current.createdAt).isSame(last.title, "day")) {
        last.items.push(current);
      } else {
        groupList.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          total: 0,
          items: [current],
        });
      }
    }
    groupList.forEach((item) => {
      item.total = item.items.reduce((sum, item) => (sum += item.amount), 0);
    });
    return groupList;
  }
  created() {
    this.$store.commit("fecth");
  }
  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
.noResult{
  padding: 16px;
  text-align: center;
  
}
::v-deep {
  .interval-tabs-item {
    height: 48px;
  }
  .type-tabs-item {
    background: #c4c4c4;
    &.selected {
      background: white;
    }
    &::after {
      display: none;
    }
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>