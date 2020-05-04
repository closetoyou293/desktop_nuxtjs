export default async function (context) {
    if(process.server){
        if(!context.req.session._id) return false;

        let User = await context.app.$axios.$get('/auth');
        if(User.err) return context.store.commit('auth/Logout');

        context.store.commit('auth/Login', User.data);    
        context.store.commit('theme/Save', User.data.setting.theme); 
    }
}