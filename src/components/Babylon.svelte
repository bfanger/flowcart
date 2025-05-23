<script context="module" lang="ts">
  import {
    Engine,
    HemisphericLight,
    Scene,
    UniversalCamera,
    Vector3,
    WebXRMotionControllerTeleportation,
  } from "@babylonjs/core";
  import { getContext, onMount, setContext } from "svelte";

  type BabylonContext = {
    engine: Engine;
    scene: Scene;
    teleportation?: WebXRMotionControllerTeleportation;
  };
  export function getBabylonContext() {
    return getContext<BabylonContext>("Babylon");
  }
</script>

<script lang="ts">
  export let debug = false;

  let canvas: HTMLCanvasElement;
  let ready = false;

  const vr = true;
  const gravity = true;
  const collisionsEnabled = true;
  const context: BabylonContext = {} as any; // The context wil be set when the <slot /> is rendered
  setContext("Babylon", context);

  onMount(() => {
    const engine = (context.engine = new Engine(canvas));
    const scene = (context.scene = new Scene(engine));
    if (gravity) {
      scene.gravity = new Vector3(0, -9.81 / 60, 0);
    }
    scene.collisionsEnabled = collisionsEnabled;

    let promise: Promise<void>;
    const camera = new UniversalCamera(
      "camera",
      new Vector3(1, 1.5, 2.5),
      scene,
    );
    camera.setTarget(new Vector3(5, 1.5, 2.5));
    camera.attachControl();
    camera.keysUp.push(87); // w
    camera.keysDown.push(83); // a
    camera.keysLeft.push(65); // s
    camera.keysRight.push(68); // d
    camera.speed = 0.2;
    camera.minZ = 0.05;
    camera.ellipsoid = new Vector3(0.1, 0.5, 0.1);
    camera.ellipsoidOffset = new Vector3(0, -0.5, 0);
    camera.checkCollisions = true;
    camera.applyGravity = gravity;

    scene.lights.push(new HemisphericLight("sun", new Vector3(0, 0, 0), scene));

    if (vr) {
      promise = scene
        .createDefaultXRExperienceAsync({
          floorMeshes: [],
        })
        .then(({ teleportation }) => {
          context.teleportation = teleportation;
          return undefined;
        });
    } else {
      promise = Promise.resolve();
    }
    void promise.then(() => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  $: ready && void toggleInspector(debug);

  async function toggleInspector(enabled: boolean) {
    if (enabled) {
      await import("@babylonjs/inspector");
      await context.scene.debugLayer.show();
    } else {
      context.scene.debugLayer.hide();
    }
  }
  $: style = debug ? "" : "width: 100vw; height: 100vh";
</script>

{#if ready}
  <slot />
{:else}
  <h1>Bezig met laden...</h1>
{/if}
<canvas bind:this={canvas} {style}></canvas>

<style>
  h1 {
    font: bold 20px sans-serif;
    padding: 20px;
    text-align: center;
    background: #333;
    color: white;
  }
  canvas {
    display: block;
    outline: none;
  }
</style>
