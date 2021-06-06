<template>
  <div>
    <div>About</div>
    <Contact />
    <Suspense>
      <template #default>
        <LargeComponent />
      </template>
      <template #fallback>
        Waitng...
      </template>
    </Suspense>
  </div>
</template>
<script lang="ts">
import { defineAsyncComponent } from 'vue';
import Contact from './Contact.vue';
// import LargeComponent from './LargeComponent';
const LargeComponent = defineAsyncComponent({
  loader: () => import(
    /* webpackChunkName: "largecomponent" */
    /* webpackPreload: true */
    './LargeComponent.vue'
  ),
});

export default {
  components: {
    Contact,
    LargeComponent,
  }
}
</script>
