<template>
    <App id="App-None" width="auto" height="auto">
        <template v-slot:Main>
            <div class="pa-4">
                Ứng dụng này chưa được đăng ký
            </div>
        </template>
    </App>
</template>

<script>
import App from '~/components/box/app'
export default {
    props: ['AppInfo'],
    components: {
        'App': App
    },
    mounted(){
        this.$Box.Set(this.AppInfo.id);
    },
    methods: {
    }
}
</script>