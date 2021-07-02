<script lang="ts">
  import QuestionRoom from "$lib/QuestionRoom.svelte";
  import Sign from "$lib/Sign.svelte";
  import Node from "$lib/Node.svelte";
  import type { FlowCartData, Choice } from "./types";
  import { onMount } from "svelte";
  import { Mesh, Vector3 } from "@babylonjs/core";
  import { getBabylonContext } from "./Babylon.svelte";

  export let question: string;
  export let yes: FlowCartData | undefined = undefined;
  export let no: FlowCartData | undefined = undefined;
  export let parent: Mesh = undefined;
  export let id: string;

  export let x = 0;
  export let z = 0;

  let choice: Choice = "UNKNOWN";

  const { scene } = getBabylonContext();

  const mesh = new Mesh(id, scene);
  if (parent) {
    parent.addChild(mesh);
  }
  onMount(() => {
    mesh.translate(new Vector3(1, 0, 0), x);
    mesh.translate(new Vector3(0, 0, -1), z);

    return function onDestroy() {
      mesh.dispose();
    };
  });
</script>

<QuestionRoom
  {mesh}
  {choice}
  on:yes={() => {
    choice = "YES";
  }}
  on:no={() => {
    choice = "NO";
  }}
/>
<Sign {mesh} text={question} background="#5631E8" />

{#if yes && choice === "YES"}
  <Node id="yes" data={yes} x={x + 5} z={z + 1.45} parent={mesh} />
{/if}
{#if no && choice === "NO"}
  <Node id="no" data={no} x={x + 5} z={z - 1.45} parent={mesh} />
{/if}
