import Vue from 'vue'

export const state = () => ({
    List : {},
})
  
export const mutations = {
    SetList(state, List){
        state.List = List
    },
}