<template>
    <App id="App-Setting" width="350px">
        <template v-slot:Main>
            <APPSettingTheme></APPSettingTheme>
        </template>
    </App>
</template>

<script>
import APPSettingTheme from '~/app/setting/theme.vue'
export default {
    props: ['AppInfo'],
    components: {'APPSettingTheme' : APPSettingTheme},
    mounted(){
        this.$Box.Set(this.AppInfo.id);
    }
}
</script>