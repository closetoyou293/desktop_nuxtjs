//Main
export function Save(Type, Id, Data){
    let dataLocalstorage = JSON.parse(localStorage.getItem(Type));
    let Main = dataLocalstorage ? dataLocalstorage : {};

    Main[Id] = Data;
    localStorage.setItem(Type, JSON.stringify(Main));
}
export function Get(Type, Id){
    let dataLocalstorage = JSON.parse(localStorage.getItem(Type));
    let Main = dataLocalstorage ? dataLocalstorage : {}

    if(!Id) return Main
    return Main[Id] ? Main[Id] : null
}
export function Remove(Type, Id){
    let dataLocalstorage = JSON.parse(localStorage.getItem(Type));
    if(!dataLocalstorage) return false

    let Main = dataLocalstorage;
    delete Main[Id];

    localStorage.setItem(Type, JSON.stringify(Main));
}
export function Reset(Type){
    localStorage.removeItem(Type);
}