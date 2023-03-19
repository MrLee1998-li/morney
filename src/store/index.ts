import clone from '@/lib/clone';
import createId from '@/lib/idCreator';
import router from '@/router';
import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: {} as Tag
  },
  getters: {
  },
  mutations: {
    fecth(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem('recordList') || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);
      state.recordList?.push(record2);
      store.commit('save');
      window.alert('已保存');
    },
    save(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem('tagList') || "[]"
      );
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name)
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复')
      } else {
        const id = createId().toString();
        state.tagList.push({ id: id, name: name });
        store.commit('saveTags');
      }

    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    updateTag(state, payload: Tag) {
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(payload.id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(payload.name) >= 0) {
          window.alert('标签名重复')
        } else {
          const tag = state.tagList.filter(item => item.id === payload.id)[0];
          tag.name = payload.name;
          store.commit('saveTags');
          return 'success';
        }
      } else {
        window.alert('未找到标签')
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        };
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败')
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
export default store;
