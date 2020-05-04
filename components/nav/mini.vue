<template>
    <v-list dense subheader>
        <v-tooltip right v-for="(boxMini, key) in ListBoxMini" :key="key">
            <template v-slot:activator="{ on }">
                <v-list-item :id="'M-'+boxMini.id" v-on="on" @click="$Box.ZoomInByMini($event, $store, boxMini.id)">
                    <v-list-item-icon class="mx-0">
                        <v-icon>{{ boxMini.icon }}</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </template>
            
            <span>{{ boxMini.title }}</span>
        </v-tooltip>
    </v-list>
</template>

<script>
export default {
    computed: {
        ListBoxMini(){
            return this.$store.state.box.ListMini;
        }
    }
}
</script>