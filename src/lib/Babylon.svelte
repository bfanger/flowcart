<script context="module" lang="ts">
  import {
    Scene,
    Engine,
    Vector3,
    FlyCamera,
    MeshBuilder,
    StandardMaterial,
    Color3,
  } from "@babylonjs/core";

  export type BabylonContext = {
    engine: Engine;
    scene: Scene;
  };
</script>

<script lang="ts">
  import { onMount, setContext } from "svelte";

  export let debug = false;
  export let depth = 4;

  let canvas: HTMLCanvasElement;
  let ready = false;

  const context: BabylonContext = {} as any;
  setContext("Babylon", context);

  onMount(() => {
    const engine = (context.engine = new Engine(canvas));
    const scene = (context.scene = new Scene(engine));

    const ground = MeshBuilder.CreateGround("ground", {
      width: 5 * depth,
      height: 5 + depth * 1.35,
    });
    ground.position.set(depth * 5 - 10, -0.001, depth * -1.35 + 1.35);
    const groundMaterial = new StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = new Color3(0.01, 0.01, 0.01);
    ground.material = groundMaterial;
    const vr = true;

    let promise: Promise<void>;
    const camera = new FlyCamera("Camera", new Vector3(1, 1.5, 2.5), scene);
    camera.setTarget(new Vector3(5, 1.5, 2.5));
    camera.attachControl();

    if (vr) {
      promise = scene
        .createDefaultXRExperienceAsync({
          floorMeshes: [ground],
        })
        .then(() => undefined);
    } else {
      promise = Promise.resolve();
    }
    promise.then(() => {
      ready = true;
      engine.runRenderLoop(() => {
        scene.render();
      });
    });

    function onResize() {
      engine.resize();
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      scene.dispose();
      engine.dispose();
    };
  });

  $: ready && toggleInspector(debug);
  async function toggleInspector(enabled: boolean) {
    if (enabled) {
      await import("@babylonjs/inspector");
      context.scene.debugLayer.show();
    } else {
      context.scene.debugLayer.hide();
    }
  }
</script>

{#if ready}
  <slot />
{:else}
  <h1>Bezig met laden...</h1>
{/if}
<canvas bind:this={canvas} />

<style>
  h1 {
    font: bold 20px sans-serif;
  }
  canvas {
    width: 100%;
    height: 100%;
    outline: none;
  }
</style>
