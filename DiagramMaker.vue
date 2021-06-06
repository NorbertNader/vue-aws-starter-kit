<template>
  <div style="{ position: relative; width: 700px; height: 700px; }">
    <div ref="root" />
  </div>
</template>
<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { DiagramMaker } from 'diagram-maker';

export default {
  setup() {
    const root = ref(null);

    let diagramMaker = null;

    const myAwesomeEventListener = () => {
      console.log('I am such an awesome event listener!');
    }

    onMounted(() => {
      diagramMaker = new DiagramMaker(
          root.value,
          {
            renderCallbacks: {
              node: (node, container) => {
                const newDiv = document.createElement('div');
                const newContent = document.createTextNode(node.id);
                newDiv.appendChild(newContent);
                newDiv.classList.add('example-node');
                if (node.diagramMakerData.selected) {
                  newDiv.classList.add('selected');
                }
                container.innerHTML = '';
                container.appendChild(newDiv);
                container.addEventListener('click', myAwesomeEventListener);
              },
              // Example destroy callback that removes the event listener
              destroy: (container) => {
                container.removeEventListener('click', myAwesomeEventListener);
              }
            },
          },
          {
            initialData: {
              nodes: {
                'test': {
                  id: 'test',
                  diagramMakerData: {
                    position: { x: 0, y: 0 },
                    size: { width: 20, height: 20 },
                    selected: true,
                  }
                }
              }
            },
          },
      );
    });

    onUnmounted(() => {
      diagramMaker.destroy();
    });

    return {
      root,
    };
  },
}
</script>