<template>
    <div class="UILog text-center" v-if="$">
        <span></span>
    </div>
</template>

<style lang="scss">
    .UILog {
        transition: all 0.5s;
        opacity: 0;
    }
    .UILogHide {
        transform: translate(30px, 0);
        opacity: 0;
    }
    .UILogShow {
        transform: translate(-30px, 0);
        opacity: 1;
    }
</style>