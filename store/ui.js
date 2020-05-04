export const state = () => ({
    log: {
        status: ''
    }
})
  
export const mutations = {
    Log(state, data){
        state.log.status = data;
    }
}