<template lang="html">
  <v-app>
    <v-content>
      <v-container app class="fill-height pa-0" fluid>
        <nuxt />
      </v-container>
    </v-content>

    <Nav></Nav>
  </v-app>
</template>

<script>
import Nav from '~/components/nav/main.vue';
export default {
  components: {
    Nav: Nav
  },
  mounted(){
    this.$ClientData.Reset('BoxPostion');
  },
}
</script>