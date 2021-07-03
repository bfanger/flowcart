<script lang="ts">
  import { onDestroy } from "svelte";
  import type { Node } from "@babylonjs/core";
  import { getFlowCartContext } from "./FlowCartProvider.svelte";

  export let parent: Node;

  const { assets } = getFlowCartContext();

  const room = assets
    .getTransformNodeByID("QuestionRoom")
    .clone("answerRoom", parent);
  room.scaling.set(1, 1, -1);

  onDestroy(() => {
    room.dispose();
  });
</script>

<slot />
