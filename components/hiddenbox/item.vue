<template>
    <div ref="HiddenBoxItem" :id="'HB-'+id" class="HiddenBoxItem" @mouseleave="Hide($event)">
        <v-icon>add</v-icon>
    </div>
</template>

<script>
export default {
    props: ['id'],
    methods: {
        Create(){
            $(this.$refs.HiddenBoxItem)[0].isHiddenBox = true;
        },
        Hide(e){
            e.preventDefault();
            if(!$(e.target)[0].isShow) return false

            $(e.target).css({"opacity": 0});
            $(e.target)[0].isShow = false;
        },
    },
    mounted(){
        this.Create();
    }
}
</script>

<style lang="scss">
    .HiddenBoxItem {
        width: 75px;
        height: 75px;
        border: 1px dashed var(--v-main-base);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 0;
        opacity: 0;

        .v-icon {
            color: #ffffff;
        }
    }
</style>