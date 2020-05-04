import Vue from 'vue'

//Danh sách App Mặc Định
export const List = {
    'Lock': {
        icon: 'lock', title: 'Bảo mật', id: 'A-Lock', config: {
            zoom: true, mini: true, close: true
        }
    },
    'Game': {
        icon: 'games', title: 'Game', id: 'A-Game', config: {
            zoom: false, mini: true, close: true
        }
    },
}

//SetList
export function SetList(store){
    store.commit('appicon/SetList', List)
}

//Open
export function Open(AppData, store){
    store.commit('box/add', AppData);
}