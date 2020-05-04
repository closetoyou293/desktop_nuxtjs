<template>
    <v-card class="Box" :id="AppInfo.id" :data-id="AppInfo.id" tile flat ref="Box">
        <!--Bar-->
        <Bar :AppInfo="AppInfo"></Bar>

        <slot name="AppList"></slot>
    </v-card>
</template>

<script>
import Bar from '~/components/box/bar.vue';
export default {
    props: ['AppInfo'],
    components: {
        Bar: Bar,
    }
}
</script>

<style lang="scss">
    .Box {
        position: absolute;
        overflow: hidden;
        z-index: 2;
        height: 0px;
        transform: scale3d(0, 1, 1);
        transition: transform 0.5s;
    }

    .Z-index {
        z-index: 1000 !important;
    }
</style>