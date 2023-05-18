<script lang="ts">
  import { onDestroy } from "svelte";
  import { MeshBuilder, Node } from "@babylonjs/core";
  import { getFlowCartContext } from "./FlowCartProvider.svelte";
  import { getBabylonContext } from "./Babylon.svelte";

  export let parent: Node;

  const { teleportation, scene } = getBabylonContext();
  const { assets } = getFlowCartContext();
  const refs: Node[] = [];

  const room = assets
    .getTransformNodeById("QuestionRoom")
    .clone("answerRoom", parent);
  room.scaling.set(1, 1, -1);
  refs.push(room);

  const blockEnd = MeshBuilder.CreatePlane(
    "blockEnd",
    { width: 5, height: 2.5 },
    scene
  );
  blockEnd.setParent(parent);
  blockEnd.rotation.set(0, Math.PI / 2, 0);
  blockEnd.position.set(4.999, 1.25, 2.5);
  blockEnd.checkCollisions = true;
  refs.push(blockEnd);
  if (teleportation) {
    const target = MeshBuilder.CreateGround(
      "teleportTarget",
      { width: 5, height: 5 },
      scene
    );
    target.setParent(room);
    target.position.set(2.5, 0, -2.5);
    target.isVisible = false;
    teleportation.addFloorMesh(target);
    onDestroy(() => {
      teleportation.removeFloorMesh(target);
    });
  }
  onDestroy(() => {
    refs.forEach((ref) => ref.dispose());
  });
</script>

<slot />
