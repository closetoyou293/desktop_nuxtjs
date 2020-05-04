<template>
    <v-list dense subheader class="pa-0">
        <v-tooltip right>
            <template v-slot:activator="{ on }">
                <v-list-item link v-on="on" @click="$App.Open(Setting, $store)">
                    <v-list-item-icon class="mx-0">
                        <v-icon>{{Setting.icon}}</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </template>
            <span>Cài Đặt</span>
        </v-tooltip>

        <v-list-item link @click="$App.Open(Power, $store)">
            <v-list-item-icon class="mx-0">
                <v-icon>{{Power.icon}}</v-icon>
            </v-list-item-icon>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    data() {
        return {
            Setting: {
                icon: "settings", title: "Cài Đặt", id: "A-Setting",
                config: {
                    zoom: true, mini: true, close: true
                }
            },
            Power: {
                icon: "power_settings_new", title: "Nguồn", color: "error", id: "A-Power",
                config: {
                    zoom: false, mini: false, close: true
                }
            },
        }
    },
}
</script>