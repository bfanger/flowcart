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
  import type { Writable } from "svelte/store";
  export type BabylonContext = Writable<{
    engine: Engine;
    scene: Scene;
  }>;
</script>

<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { writable } from "svelte/store";

  export let debug = false;

  let canvas: HTMLCanvasElement;
  let ready = false;
  let scene: Scene;

  const context: BabylonContext = writable(undefined as any);
  setContext("Babylon", context);

  onMount(() => {
    const engine = new Engine(canvas);
    scene = new Scene(engine);

    const ground = MeshBuilder.CreateGround("ground", {
      width: 10,
      height: 10,
    });
    ground.position.set(-5, -0.001, -5);
    const groundMaterial = new StandardMaterial("ground", scene);
    groundMaterial.diffuseColor = new Color3(0.01, 0.01, 0.01);
    ground.material = groundMaterial;
    const vr = true;

    let promise: Promise<void>;
    const camera = new FlyCamera("Camera", new Vector3(-1, 1.5, -2.5), scene);
    camera.setTarget(new Vector3(-4, 1.5, -2.5));
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
      $context = { engine, scene };
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
      scene.debugLayer.show();
    } else {
      scene.debugLayer.hide();
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
