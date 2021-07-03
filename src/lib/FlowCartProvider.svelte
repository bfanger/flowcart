<script context="module" lang="ts">
  import type { AbstractMesh, Scene } from "@babylonjs/core";

  type FlowCartContext = {
    assets: Scene;
  };
  export function getFlowCartContext() {
    return getContext<FlowCartContext>("FlowCart");
  }
</script>

<script lang="ts">
  import { SceneLoader } from "@babylonjs/core";
  import "@babylonjs/loaders";
  import { getContext, onDestroy, setContext } from "svelte";
  import { getBabylonContext } from "./Babylon.svelte";

  let ready = false;

  const { scene } = getBabylonContext();

  const context: FlowCartContext = { assets: undefined as any };

  setContext("FlowCart", context);

  let ref: AbstractMesh;
  SceneLoader.Append("/", "flow-cart.glb", scene, (assets) => {
    context.assets = assets;
    ref = assets.getMeshByID("__root__");

    assets.lights.forEach((light) => {
      light.intensity *= 0.3;
    });
    ready = true;
  });

  onDestroy(() => {
    ref.dispose();
  });
</script>

{#if ready}
  <slot />
{/if}
