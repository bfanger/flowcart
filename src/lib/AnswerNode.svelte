<script lang="ts">
  import AnswerRoom from "$lib/AnswerRoom.svelte";
  import Sign from "$lib/Sign.svelte";
  import { onMount } from "svelte";
  import { Mesh, Vector3 } from "@babylonjs/core";
  import { getBabylonContext } from "./Babylon.svelte";

  export let answer: string;
  export let color: string;
  export let parent: Mesh = undefined;
  export let id: string;

  export let x = 0;
  export let z = 0;

  const textColor = "#2F263F";
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

<AnswerRoom {mesh} />

<Sign {mesh} text={answer} color={textColor} background={color} big />
