<template lang="html">
    <div v-if="loading" class="loading-page">
        <div class="loading-circular">
            <v-progress-circular :size="70" :width="7" class="Loading" indeterminate></v-progress-circular>
            <p>Đang tải</p>
        </div>
    </div>    
</template>

<script>
export default {
    data: () => ({
        loading: false,
    }),
    methods: {
        start () {
            this.loading = true
        },
        finish () {
            this.loading = false  
        }
    }
}
</script>

<style lang="scss">
.loading-page {
    z-index: 99999;
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    justify-content: center;
    align-items: center;
    align-content: center;
}
.loading-circular {
    text-align: center;

    p {
        margin-top: 10px;
        font-size: 20px;
        font-family: "Roboto", sans-serif;
        line-height: 1.5;
        color: #ffffff;
    }
}
.Loading {
    .v-progress-circular__overlay {
        color: var(--v-main-base);
    }
}
</style>