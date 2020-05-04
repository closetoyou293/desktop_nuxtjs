<template>
    <div class="App-Setting-Theme">
        <v-card-title class="pb-2 font-weight-regular">Giao Diện</v-card-title>

        <div class="d-flex pl-4">
            <div class="d-flex flex-column align-self-center mr-2">
                <span class="font-weight-light">Nền tối</span>
            </div>
            <div class="ml-auto ma-0">
                <v-switch height="0" color="main" flat dense inset v-model="Dark" @change="ChangeDark"></v-switch>
            </div>
        </div>

        <div class="d-flex pl-4">
            <div class="d-flex flex-column align-self-center mr-2">
                <span class="font-weight-light">Hiệu ứng</span>
            </div>
            <div class="ml-auto ma-0">
                <v-switch height="0" color="main" flat dense inset v-model="Effect" @change="ChangeEffect"></v-switch>
            </div>
        </div>

        <div class="d-flex px-4 pb-2 mt-1">
            <div class="d-flex flex-column align-self-center mr-2">
                <span class="font-weight-light">Màu sắc</span>
            </div>
            <div class="ml-auto ma-0">
                <v-btn color="main" icon small @click="MenuColor = true">
                    <v-icon>color_lens</v-icon>
                </v-btn>
            </div>

            <v-dialog persistent v-model="MenuColor" max-width="290">
                <v-card>
                    <v-color-picker flat hide-inputs v-model="Color"></v-color-picker>

                    <v-card-actions>
                        <v-btn color="main" small text @click="ChangeColor">Thay đổi</v-btn>
                        <v-btn small text @click="MenuColor = false">Hủy</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>

        <div class="d-flex px-4 pb-2">
            <div class="d-flex flex-column align-self-center mr-2">
                <span class="font-weight-light">Hình nền</span>
            </div>
            <div class="ml-auto ma-0">
                <v-btn color="main" icon small @click="ChangeBackground">
                    <v-icon>image</v-icon>
                </v-btn>
            </div>
        </div>

        <div class="pa-4">
            <v-btn color="main white--text" tile depressed block small :loading="Loading" :disabled="Loading" @click="SaveTheme()">Lưu Giao Diện</v-btn>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            Dark: false,
            Color: '',
            Effect: false,
            Background: '',
            //Dialog
            MenuColor: false,
            MenuBG: false,
            //Orther
            Loading: false,
            Status: '',
        }
    },
    mounted(){
        this.Dark = this.$GetTheme.dark
        this.Color = this.$GetTheme.color
        this.Effect = this.$GetTheme.effect
        this.Background = this.$GetTheme.background
    },
    methods: {
        ChangeDark(){
            this.$store.commit('theme/Save', {dark: this.Dark});
            this.$Theme.Dark(this.$vuetify, this.Dark);
            //this.$vuetify.theme.dark = !this.$vuetify.theme.dark
        },
        ChangeEffect(){
            this.$store.commit('theme/Save', {effect: this.Effect});
        },
        ChangeColor(){
            this.MenuColor = false;

            this.$store.commit('theme/Save', {color: this.Color});
            this.$Theme.Color(this.$vuetify, this.Color);
        },
        ChangeBackground(){
            let Text = '/image/bg2.png'
            this.Background = this.Background == Text ? '/image/bg1.png' : Text

            this.$store.commit('theme/Save', {background: this.Background});
            this.$Theme.Background(this.$store, this.Background);
        },
        //Save
        async SaveTheme(){
            this.Loading = true;
            let Save = await this.$axios.$post('/setting/save/theme', this.$GetTheme);

            this.Loading = false;

            if(Save.err) return this.$UI.Message(Save.status);
            this.$UI.Message('Lưu giao diện thành công');
        }
    }
}
</script>