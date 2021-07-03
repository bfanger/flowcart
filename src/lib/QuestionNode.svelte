<script lang="ts">
  import QuestionRoom from "$lib/QuestionRoom.svelte";
  import Sign from "$lib/Sign.svelte";
  import NodeComponent from "$lib/Node.svelte";
  import type { FlowCartData, Choice } from "./types";
  import { onDestroy } from "svelte";
  import { Node, TransformNode } from "@babylonjs/core";
  import { getBabylonContext } from "./Babylon.svelte";

  export let question: string;
  export let yes: FlowCartData | undefined = undefined;
  export let no: FlowCartData | undefined = undefined;
  export let parent: Node = undefined;
  export let id: string;

  export let x = 0;
  export let z = 0;

  let choice: Choice = "UNKNOWN";

  const { scene } = getBabylonContext();

  const node = new TransformNode(id, scene);
  if (parent) {
    node.setParent(parent);
  }

  node.position.set(x, 0, z);

  onDestroy(() => {
    node.dispose();
  });
</script>

<QuestionRoom
  parent={node}
  {choice}
  on:yes={() => {
    choice = "YES";
  }}
  on:no={() => {
    choice = "NO";
  }}
/>
<Sign parent={node} text={question} background="#5631E8" />

{#if yes && choice === "YES"}
  <NodeComponent id="yes" data={yes} x={5} z={-1.45} parent={node} />
{/if}
{#if no && choice === "NO"}
  <NodeComponent id="no" data={no} x={5} z={+1.45} parent={node} />
{/if}
