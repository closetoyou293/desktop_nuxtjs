<template>
    <div class="AppIcon" :id="'AI-'+AppInfo.id">
        <v-avatar color="main" size="45" :class="(Theme.effect) ? 'AppIconEffect' : ''">
            <v-icon ref="AppIconDrag" @dblclick="$App.Open(AppInfo, $store)" 
            @contextmenu="$Drag.AppIconStart($event)"
            >{{AppInfo.icon}}</v-icon>
        </v-avatar>
        <p class="body-2 ma-0 mt-1 font-weight-light">{{AppInfo.title}}</p>
    </div>
</template>

<script>
export default {
    props: ['AppInfo', 'AppIndex'],
    mounted(){
        this.Setting()
    },
    computed: {
        Theme(){
            return this.$store.state.theme;
        }
    },
    methods: {
        Setting(){
            $(this.$refs.AppIconDrag.$el)[0].isAppIconDrag = true;

            this.SetPostion()
        },
        SetPostion(){
            let AI =  $("#AI-"+this.AppInfo.id);
            let oldPostion = this.$ClientData.Get('AppIconPostion', "AI-"+this.AppInfo.id);
            let HB = $("#HB-"+(this.AppIndex + 1)); 

            let positionNew = {
                top: oldPostion ? oldPostion.top : HB[0].offsetTop,
                left: oldPostion ? oldPostion.left : HB[0].offsetLeft,
                in: oldPostion ? oldPostion.in : "HB-"+(this.AppIndex + 1)
            }

            AI.animate({
                width: 75+"px",
                height: 75+"px",
                top: positionNew.top,
                left: positionNew.left
            })

            this.$ClientData.Save('AppIconPostion', AI[0].id, positionNew);
        },
    },
}
</script>

<style lang="scss">
    .AppIcon {
        position: absolute;
        width: 0px;
        height: 0px;
        top: 0;
        left: 0;
        padding: 4px 2px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        z-index: 1;

        .AppIconEffect {
            box-shadow: 0 0 5px var(--v-main-base), 0 0 15px var(--v-main-base) !important;
        }

        p {
            color: rgb(255, 255, 255);
        }

        .v-icon {
            color: #fff !important;
            cursor: pointer;
        }
    }
</style>