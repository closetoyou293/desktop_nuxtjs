<template>
    <App id="App-Power">
        <template v-slot:Main>
            <v-card-text class="text-center pa-2">
                <v-btn color="main" dark block depressed tile @click="Power()">Đăng Xuất</v-btn>
            </v-card-text>
        </template>
    </App>
</template>

<script>
export default {
    props: ['AppInfo'],
    mounted(){
        this.$Box.Set(this.AppInfo.id);
    },
    methods: {
        async Power(){
            let Logout = await this.$axios.$get('/auth/logout');
            if(Logout.err) return false

            this.$store.commit('auth/Logout');
            this.$store.commit('theme/Reset');
            this.$Theme.Setup(this.$vuetify, this.$store);
            this.$router.push('/');
        }
    }
}
</script>