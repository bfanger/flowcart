<script lang="ts">
  import AnswerRoom from "./AnswerRoom.svelte";
  import Sign from "./Sign.svelte";
  import { onDestroy } from "svelte";
  import { TransformNode, Node } from "@babylonjs/core";
  import { getBabylonContext } from "./Babylon.svelte";

  export let answer: string;
  export let color: string;
  export let textColor = "#2F263F";
  export let parent: Node | undefined;
  export let id: string;

  export let x = 0;
  export let z = 0;

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

<AnswerRoom parent={node} />

<Sign
  parent={node}
  text={answer}
  color={textColor}
  background={color}
  big
  checkCollisions
/>
