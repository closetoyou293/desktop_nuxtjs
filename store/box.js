import Vue from 'vue'

export const state = () => ({
    List : {},
    ListMini : {}
})
  
export const mutations = {
    add(state, newBox){
        Vue.set(state.List, newBox.id , newBox);
    },
    remove(state, id){
        Vue.delete(state.List, id);
    },
    addMini(state, newBox){
        Vue.set(state.ListMini, newBox.id , newBox);
    },
    removeMini(state, id){
        Vue.delete(state.ListMini, id);
    },
    reset(state){
        state.List = {}
        state.ListMini = {}
    }
}