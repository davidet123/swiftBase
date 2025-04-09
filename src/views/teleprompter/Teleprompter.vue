<template>
  <v-row>
    <v-col class="tp-text">
      Teleprompter
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <TeleprompterText />
    </v-col>
  </v-row>
</template>

<script setup>
import TeleprompterText from '@/components/teleprompter/TeleprompterText.vue';




</script>

<style scoped>
.tp-text {
  position: absolute;
  top: 0;
  left: 50%;
}

</style>