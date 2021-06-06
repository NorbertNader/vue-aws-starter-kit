<template>
  <div>
    <DiagramMaker />
  </div>
</template>
<script lang="ts">
import DiagramMaker from './DiagramMaker.vue';

export default {
  async setup() {
    const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

    await wait(8000);
  },
  components: {
    DiagramMaker
  }
}
</script>
