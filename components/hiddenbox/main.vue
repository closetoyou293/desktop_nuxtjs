<template>
    <div class="HiddenBox flex-column" ref="HiddenBox">
        <HiddenBoxItem v-for="i in nCount" :key="i" :id="i"></HiddenBoxItem>
    </div>
</template>

<script>
import HiddenBoxItem from '~/components/hiddenbox/item.vue'
export default {
    components: {
        HiddenBoxItem: HiddenBoxItem
    },
    data() {
        return {
            nCount: 0
        }
    },
    methods: {
        Create(){
            $(this.$refs.HiddenBox).css({ "max-height": window.innerHeight});
            
            let maxW = Math.floor((window.innerWidth - 55) / 75);
            let maxH = Math.floor((window.innerHeight - 10) / 75);
            this.nCount = maxW * maxH;

            return new Promise(resolve => resolve());
        }
    },
    mounted(){
        this.Create().then(() => this.$App.SetList(this.$store));
    }
}
</script>

<style lang="scss">
    .HiddenBox {
        width: 100%;
        height: 100%;
        padding: 5px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
</style>