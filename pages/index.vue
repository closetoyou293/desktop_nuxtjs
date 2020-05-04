<template>
    <div class="Login BG" :style="{'background-image' : `url('${Theme.background}') !important`}">
        <v-card class="pa-5" width="350" tile flat color="box">
            <v-card-title class="headline font-weight-light mb-2">
                {{isSignup ? 'Đăng Ký' : 'Đăng Nhập'}}
            </v-card-title>
            <v-card-text>
                <v-alert v-if="Status" border="left" dense outlined type="error" color="main" class="mb-6 subtitle-2">{{Status}}</v-alert>
                
                <v-form>
                    <v-text-field v-model="Username" dense class="From-Input" label="Tài Khoản" name="login" type="text" append-icon="person" color="main" flat solo background-color="input" />
                    <v-text-field v-model="Password" dense class="From-Input" label="Mật Khẩu" name="password" type="password" append-icon="lock" color="main" flat solo background-color="input" />
                    <v-text-field v-if="isSignup" v-model="Email" dense class="From-Input" label="Email" name="email" type="email" append-icon="email" color="main" flat solo background-color="input" />
                    
                    <v-btn class="From-Button" v-if="!isSignup" block depressed smail tile @click="Login()" :loading="Loading" :disabled="Loading">Đăng Nhập</v-btn>
                    <v-btn class="From-Button" v-else block depressed smail tile @click="Signup()" :loading="Loading" :disabled="Loading">Đăng Ký</v-btn>
                </v-form>

                <a class="From-Link d-block mt-2 font-weight-light" @click="Change()">
                    {{isSignup ? 'Đã có tài khoản?' : 'Chưa có tài khoản?'}}
                </a>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
export default {
    layout: 'login',
    middleware: ['guest', 'reset'],
    data() {
        return {
            Username: 'admin',
            Password: '123456',
            Email: '',
            Loading: false,
            isSignup: false,
            Status: ''
        }
    },
    computed: {
        Theme(){ return this.$store.state.theme; }
    },
    methods: {
        Change(){
            this.isSignup = !this.isSignup   
        },
        async Login(){
            this.Loading = true;

            let Login = await this.$axios.$post('/auth/login', {
                username: this.Username,
                password: this.Password
            });

            if(!Login.err) return this.Done()

            this.Loading = false;
            this.Password = '';

            this.$UI.Message(Login.status); 
        },
        async Signup(){
            this.Loading = true;

            let Signup = await this.$axios.$post('/auth/signup', {
                username: this.Username,
                password: this.Password,
                email: this.Email
            });

            if(!Signup.err) return this.Done()

            this.Loading = false;
            this.Password = '';

            this.$UI.Message(Signup.status); 
        },
        Done(){
            this.$axios.$get('/auth')
            .then(User => {
                this.$store.commit('auth/Login', User.data);
                this.$store.commit('theme/Save', User.data.setting.theme);
                this.$router.push('/desktop');
            })
        }
    }
}
</script>

<style lang="scss">
    .Login {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    
        .From-Input {
            border-radius: 0px !important;
        }
        .From-Button {
            background: var(--v-main-base) !important;
            color: #ffffff !important;
        }
        .From-Link {
            color: var(--v-main-base) !important;
            text-decoration: none;
            position: relative;
        }
    }
</style>