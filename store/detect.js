export const state = () => ({
    is_Mobile: null,
    is_Tablet: null,
    is_PC: null
})
  
export const mutations = {
    set_Detect(state, data) {
        state.is_Mobile = data.is_Mobile;
        state.is_Tablet = data.is_Tablet;
        state.is_PC = data.is_PC;
    }
}