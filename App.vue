<template>
  <div>
    <nav>
      <router-link :to="{ name: 'Home' }">Home</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>
<script lang="ts">
import { onMounted } from 'vue';
import Logger from './logger.js';

export default {
  setup() {
    onMounted(() => {
      let DI = performance && performance.getEntriesByType('navigation') && performance.getEntriesByType('navigation')[0]

      if (DI) {
        DI = DI.domInteractive;
      }

      Logger('DI', DI);

      const observer = new PerformanceObserver(list => {
        let TTI = list && list.getEntries() &&
            list.getEntries().find(({name, entryType}) => entryType === 'mark' && name === 'tti');

        if (TTI) {
          TTI = TTI.startTime;
        }

        Logger('TTI', TTI);
      });

      observer.observe({entryTypes: ['mark']});
      performance.mark('tti');

      document.addEventListener('readystatechange', () => {
        let FCP = performance && performance.getEntriesByType('paint') &&
            performance.getEntriesByType('paint').find(({name}) => name === 'first-contentful-paint');

        if (FCP) {
          FCP = FCP.startTime;
        }

        Logger('FCP', FCP);
      })
    });
  },
}
</script>
<style scoped>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  nav {
    display: flex;
    justify-content: space-around;
    width: 100px;
  }

  main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
