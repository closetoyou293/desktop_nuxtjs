<template>
    <v-navigation-drawer class="Nav_App" app permanent stateless hide-overlay mini-variant mini-variant-width="45" color="nav">
        <v-list dense subheader class="pa-0 Menu">
            <v-list-item>
                <v-list-item-icon>
                    <v-icon color="main">dashboard</v-icon>
                </v-list-item-icon>
            </v-list-item>
            <v-divider></v-divider>
        </v-list>

        <NavMini></NavMini>

        <template v-slot:append>
            <v-divider></v-divider>

            <NavBottom></NavBottom>
        </template>
    </v-navigation-drawer>
</template>

<script>
import NavMini from '~/components/nav/mini.vue'
import NavBottom from '~/components/nav/bottom.vue'
export default {
    components: {
        NavMini: NavMini,
        NavBottom: NavBottom
    }
}
</script>

<style scoped lang="scss">
    .Nav_App {
        .v-navigation-drawer__content {
            overflow: hidden;
        }

        .Menu {
            .v-icon {
                filter: contrast(150%);
            }
            
        }
    }
</style>