<script context="module" lang="ts">
  import { Node, MeshBuilder, Scene, AbstractMesh } from "@babylonjs/core";

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

  const refs: Node[] = [];
  SceneLoader.Append("/", "flow-cart.glb", scene, (assets) => {
    context.assets = assets;
    refs.push(assets.getMeshByID("__root__") as AbstractMesh);

    const walls = assets.getMeshByID("QuestionRoom_primitive0") as AbstractMesh;
    walls.checkCollisions = true;

    const blockStart = MeshBuilder.CreatePlane(
      "blockStart",
      { width: 1.4, height: 2 },
      scene,
    );
    blockStart.position.set(0.14, 1, 2.5);
    blockStart.rotation.set(0, Math.PI / -2, 0);
    blockStart.rotationQuaternion = null;
    blockStart.checkCollisions = true;
    refs.push(blockStart);

    assets.lights.forEach((light) => {
      light.intensity *= 0.3;
    });
    ready = true;
  });

  onDestroy(() => {
    refs.forEach((ref) => ref.dispose());
  });
</script>

{#if ready}
  <slot />
{/if}
