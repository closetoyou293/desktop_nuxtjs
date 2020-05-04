export const state = () => ({
    dark: true,
    color: '#efbb35',
    background: '/image/bg1.png',
    effect: true
})
  
export const mutations = {
    Save(state, Theme){
        Object.assign(state, Theme);
    },
    Reset(state){
        Object.assign(state, {
            dark: true,
            color: '#efbb35',
            background: '/image/bg1.png',
            effect: true
        });
    }
}