<script lang="ts">
  import { Engine, SceneLoader } from "@babylonjs/core";
  import "@babylonjs/loaders";
  import { getContext } from "svelte";
  import { get } from "svelte/store";
  import type { BabylonContext } from "./Babylon.svelte";

  let ready = false;
  const context = getContext<BabylonContext>("Babylon");
  const { scene, engine } = get(context);
  SceneLoader.Append("/", "flow-cart.glb", scene, (room) => {
    console.log("load", room);
    room.lights.forEach((light) => {
      light.intensity *= 0.3;
    });

    ready = true;
  });
</script>

{#if ready}
  <slot />
{/if}
