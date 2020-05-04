export default async function (context) {
    if(process.client){
        context.store.commit('box/reset') 
    }
}