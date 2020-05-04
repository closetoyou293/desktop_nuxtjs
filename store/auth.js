export const state = () => ({
    now: false,
    id: null,
    profile: null,
})
  
export const mutations = {
    Login(state, User){
        state.now = true;
        state.id = User._id;
        state.profile = User.profile;
    },
    Logout(state){
        state.now = false;
    }
}