<script context="module" lang="ts">
  import type { AbstractMesh, Scene } from "@babylonjs/core";

  export type FlowCartContext = {
    assets: Scene;
  };
</script>

<script lang="ts">
  import { SceneLoader } from "@babylonjs/core";
  import "@babylonjs/loaders";
  import { getContext, onMount, setContext } from "svelte";
  import type { BabylonContext } from "./Babylon.svelte";

  let ready = false;

  const { scene } = getContext<BabylonContext>("Babylon");

  const context: FlowCartContext = { assets: undefined as any };

  setContext("FlowCart", context);

  onMount(() => {
    let ref: AbstractMesh;
    SceneLoader.Append("/", "flow-cart.glb", scene, (assets) => {
      context.assets = assets;
      ref = assets.getMeshByID("__root__");

      assets.lights.forEach((light) => {
        light.intensity *= 0.3;
      });
      ready = true;
    });

    return function onDestroy() {
      ref.dispose();
    };
  });
</script>

{#if ready}
  <slot />
{/if}
