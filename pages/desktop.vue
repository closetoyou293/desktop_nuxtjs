<template>
    <div class="Main BG" 
    :style="{'background-image' : `url('${$store.state.theme.background}') !important`}" 
    @mousemove="$Drag.Run($event)" @mouseup="$Drag.End()">
        <!--Hidden Box-->
        <HiddenBox></HiddenBox>

        <!--AppIcon-->
        <AppIcon v-for="(app, key, index) in ListAppIcon" :key="key" :AppInfo="app" :AppIndex="index"></AppIcon>

        <!--Box App-->
        <Box v-for="(box, key) in ListBox" :key="key" :AppInfo="box">
            <!--List App-->
            <template v-slot:AppList>
                <APPSetting :AppInfo="box" v-if="box.id == 'A-Setting'"></APPSetting>
                <APPPower :AppInfo="box" v-else-if="box.id == 'A-Power'"></APPPower>
                <APPGame :AppInfo="box" v-else-if="box.id == 'A-Game'"></APPGame>

                <!--App None-->
                <APPNone :AppInfo="box" v-else></APPNone>
            </template>
        </Box>
    </div>
</template>
 
<script>
import Box from '~/components/box/main.vue';
import AppIcon from '~/components/appicon/main.vue'
import HiddenBox from '~/components/hiddenbox/main.vue'

export default {
    layout: 'desktop',
    components: {
        Box: Box,
        AppIcon: AppIcon,
        HiddenBox: HiddenBox
    },
    middleware: ['guest', 'reset'],
    computed: {
        Profile(){
            return this.$store.state.auth.profile; 
        },
        ListAppIcon(){
            return this.$store.state.appicon.List;
        },
        ListBox(){
            return this.$store.state.box.List;
        }
    },
    mounted() {
        setTimeout(() => {
            this.$Theme.Setup(this.$vuetify, this.$store);
        }, 100);
    },
}
</script>

<style lang="scss">
    .Main {
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>