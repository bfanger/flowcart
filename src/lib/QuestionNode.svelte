<script lang="ts">
  import QuestionRoom from "$lib/QuestionRoom.svelte";
  import Sign from "$lib/Sign.svelte";
  import Node from "$lib/Node.svelte";
  import type { FlowCartData } from "./types";
  import { getContext, onMount } from "svelte";
  import type { BabylonContext } from "./Babylon.svelte";
  import { Mesh, Vector3 } from "@babylonjs/core";

  export let question: string;
  export let yes: FlowCartData | undefined = undefined;
  export let no: FlowCartData | undefined = undefined;
  export let parent: Mesh = undefined;
  export let id: string;

  export let x = 0;
  export let z = 0;

  const { scene } = getContext<BabylonContext>("Babylon");

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

<QuestionRoom {mesh} />
<Sign {mesh} text={question} background="#5631E8" />

{#if yes}
  <Node id="yes" data={yes} x={5} z={-1.45} parent={mesh} />
{/if}
{#if no}
  <Node id="no" data={no} x={5} z={1.45} parent={mesh} />
{/if}
