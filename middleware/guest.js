export default function ({ store, redirect}) {
    if(process.server){
        if(store.state.auth.now) return redirect('/desktop');  
        redirect('/');  
    }
}