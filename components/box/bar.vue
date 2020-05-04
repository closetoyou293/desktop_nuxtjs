<template>
    <div class="d-flex">
        <v-system-bar height="30" class="Box_Bar flex-grow-1 flex-shrink-0 " id="Box_Bar" @mousedown="$Drag.BoxStart($event)" color="grey white--text" ref="BarDrag">
            <span id="BoxBar_Title" class="font-weight-light text-uppercase">{{AppInfo.title}}</span>
        </v-system-bar>

        <div class="BoxBar_Button flex-grow-0 flex-shrink-1"> 
            <v-icon v-if="Mini" @click="$Box.ZoomOut($event, $store, AppInfo.id)">remove</v-icon>
            <v-icon v-if="Zoom" @click="$Box.ZoomIn($event, AppInfo.id)">check_box_outline_blank</v-icon>
            <v-icon v-if="Close" @click="$Box.Close($event, $store, AppInfo.id)">close</v-icon>
        </div>
    </div>
</template>

<script>
export default {
    props: ['AppInfo'],
    computed:{
        Mini(){ return this.AppInfo.config.mini },
        Zoom(){ return this.AppInfo.config.zoom },
        Close(){ return this.AppInfo.config.close }
    },
    mounted(){
        this.Setting();
    },
    methods: {
        Setting(){
            $(this.$refs.BarDrag.$el)[0].isBarDrag = true;
        }
    }
}
</script>

<style lang="scss">
    .BoxBar_Button {
        height: 30px;
        line-height: 27px;
        padding: 0 5px;
        text-align: center;
        border-right: 5px solid  var(--v-bar_icon-base);
        background: var(--v-grey-base);

        .v-icon {
            cursor: pointer;
            font-size: 16px;
            color: var(--v-bar_icon-base);
            filter: contrast(150%);
        }
    }

    .Box_Bar {
        padding: 0 10px 0 15px;
        
        #BoxBar_Title {
            height: 100%;
            line-height: 33px;
            color: var(--v-bar_text-base);
            cursor: default;
        }

        &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 30px;
            background: var(--v-bar_icon-base);
        }
    }
</style>