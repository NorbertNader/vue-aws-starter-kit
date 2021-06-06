<template>
  <div>
    <label for="name">Name</label>
    <input type="text" id="name" />
    <label for="email">Email</label>
    <input type="text" id="email" />
    <label for="msq">Message</label>
    <textarea id="msq" />
    <button @click="onClick">Send</button>
  </div>
</template>
<script lang="ts">
export default {
  setup() {
    const onClick = () => {
      console.log('clicked the button!');
    }

    return {
      onClick
    }
  }
}
</script>
<style scoped>
div {
  display: flex;
  flex-direction: column;
}

textarea {
  margin: 0px;
  height: 100px;
  width: 150px;
}
</style>
