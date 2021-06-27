<script lang="ts">
  import { getContext } from "svelte";
  import type { Mesh } from "@babylonjs/core";
  import type { FlowCartContext } from "./FlowCartProvider.svelte";

  export let mesh: Mesh;

  const { assets } = getContext<FlowCartContext>("FlowCart");

  const room = assets.getMeshByID("Room").clone("walls", mesh);
  const rails = assets.getTransformNodeByID("Rails").clone("rails", mesh);

  room.scaling.set(1, 1, -1);
  rails.scaling.set(1, 1, -1);
</script>

<slot />
