import Vue from 'vue'

export function Setup(vuetify, store){
    let theme = store.state.theme;
    Vue.prototype.$GetTheme = store.state.theme;

    Color(vuetify, theme.color);
    Dark(vuetify, theme.dark);
    Background(store, theme.background);
    Effect(store, theme.effect);
}
export const Color = function(vuetify, value){
    vuetify.theme.themes.dark.main.base = value;
    vuetify.theme.themes.dark.bar_icon.base = value;
    
    vuetify.theme.themes.light.main.base = value;
    vuetify.theme.themes.light.bar_icon.base = value;
}
export const Dark = function(vuetify, value){
    vuetify.theme.dark = value;
}
export const Background = function(store, value){
    store.commit('theme/Save', {background: value});
}
export const Effect = function(store, value){
    store.commit('theme/Save', {effect: value});
}