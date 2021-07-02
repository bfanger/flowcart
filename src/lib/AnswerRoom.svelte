<script lang="ts">
  import { onDestroy } from "svelte";
  import type { Mesh } from "@babylonjs/core";
  import { getFlowCartContext } from "./FlowCartProvider.svelte";
  import { getBabylonContext } from "./Babylon.svelte";

  export let mesh: Mesh;

  const { assets } = getFlowCartContext();

  const room = assets.getTransformNodeByID("QuestionRoom").clone("room", mesh);
  room.scaling.set(1, 1, -1);

  onDestroy(() => {
    room.dispose();
  });
</script>

<slot />
