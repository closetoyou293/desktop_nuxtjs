<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="8" class="text-center Error">
                <h1 class="Error_Title Color_Title">{{error.statusCode}}</h1>
                <p class="Error_Sub ">{{error.message}}</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: ['error'],
    head () {
        return {
            title: this.error.statusCode,
            meta: [
                { hid: 'description', name: 'description', content: this.error.message }
            ]
        }
    },
}
</script>

<style lang="scss">
    .Error {
        height: 100%;
        .Error_Title {
            display: block;
            font-size: 100px;
            font-weight: 400;
            color: #455A64;
        }

        .Error_Sub {
            font-size: 28px;
            font-weight: 100;
        }
    }
</style>

