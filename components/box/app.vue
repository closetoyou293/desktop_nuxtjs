<template>
    <div class="App" :style="{'width': width? width: 'auto', 'height': height? height: 'auto'}">
        <slot name="Main"></slot>
    </div>
</template>

<script>
export default {
    props: ['width', 'height']
}
</script>

<style lang="scss">
    .App {
        overflow-y: auto;
        background: var(--v-box-base);

        &::-webkit-scrollbar {
            width: 5.1px;
            display: inherit !important;
        }
        &::-webkit-scrollbar-track {
            background: var(--v-box-base);
        }
        &::-webkit-scrollbar-thumb {
            background: #888;
        }
        &::-webkit-scrollbar-thumb:hover {
            background: var(--v-main-base);
        }
    }

    .Max-Box {
        width: 100% !important;
        height: 100% !important;
        max-height: calc(100% - 30px) !important;
        margin-bottom: 10px;
    }
</style>