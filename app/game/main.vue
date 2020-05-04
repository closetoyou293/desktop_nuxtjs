<template>
    <App id="App-Game" width="450px" height="300px">
        <template v-slot:Main>
            <div id="GameScreen"></div>
        </template>
    </App>
</template>

<script>
import Box from '~/components/box/main.vue';
export default {
    props: ['AppInfo'],
    data() {
        return {
            Game: null
        }
    },
    mounted(){
        this.Game = this.$Game();
        this.$Box.Set(this.AppInfo.id);
        this.$UI.Message('Nhấn trái phải để điều khiển nhân vật di chuyển qua lại'); 

        let Box = $('#'+this.AppInfo.id);
        //Box[0].onClose = this.onClose;
    },
    methods: {
        onClose(){
            this.Game.scene.scenes[1].Socket.emit('CloseSocket', true);
            this.Game = null;
        }
    }
}
</script>

<style lang="scss">
    #GameScreen {
        width: 100%;
        height: 100%;
    }
</style>