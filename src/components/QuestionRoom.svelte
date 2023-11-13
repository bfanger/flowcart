<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import {
    ActionManager,
    ExecuteCodeAction,
    Node,
    Animation,
    AbstractMesh,
    MeshBuilder,
    TransformNode,
  } from "@babylonjs/core";
  import { getFlowCartContext } from "./FlowCartProvider.svelte";
  import { getBabylonContext } from "./Babylon.svelte";
  import type { Choice } from "../types";

  export let parent: Node;
  export let choice: Choice;

  let prevChoice = choice;
  $: animateDoors(prevChoice, choice);

  const { scene, teleportation } = getBabylonContext();
  const { assets } = getFlowCartContext();
  const dispatch = createEventDispatcher();
  const refs: Node[] = [];

  const room = assets
    .getTransformNodeById("QuestionRoom")
    .clone("room", parent);
  room.scaling.set(1, 1, -1);
  refs.push(room);

  const yes = assets.getTransformNodeById("Yes").clone("yes", room);
  yes.getChildMeshes().forEach((door, index) => {
    door.rotation = door.rotationQuaternion.toEulerAngles();
    door.rotationQuaternion = null;
    door.actionManager = new ActionManager(scene);
    door.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => dispatch("yes")),
    );
    addDoorAnimation(door, index === 0);
  });

  const no = assets.getTransformNodeById("No").clone("no", room);
  no.getChildMeshes().forEach((door, index) => {
    door.rotation = door.rotationQuaternion.toEulerAngles();
    door.rotationQuaternion = null;
    door.actionManager = new ActionManager(scene);
    door.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => dispatch("no")),
    );
    addDoorAnimation(door, index === 0);
  });

  const blockYes = createBlockage("blockYes", yes);
  const blockNo = createBlockage("blockYes", no);

  function createBlockage(id: string, yesOrNo: TransformNode) {
    const plane = MeshBuilder.CreatePlane(id, { width: 1.4, height: 2 }, scene);
    plane.setParent(yesOrNo);
    plane.position.set(-0.14, 1, 0);
    plane.rotation.set(0, Math.PI / 2, 0);
    plane.rotationQuaternion = null;
    plane.checkCollisions = true;
    plane.isVisible = false;
    refs.push(plane);
    return plane;
  }

  function addDoorAnimation(door: AbstractMesh, left: boolean) {
    const animation = new Animation(
      "door" + (left ? "Left" : "Right"),
      "rotation.y",
      10,
      Animation.ANIMATIONTYPE_FLOAT,
    );
    animation.setKeys([
      { frame: 0, value: 0 },
      { frame: 5, value: 0.6 * Math.PI * (left ? -1 : 1) },
      { frame: 10, value: 0 },
    ]);

    door.animations.push(animation);
  }

  function animateDoors(from: Choice, to: Choice) {
    if (from === to) {
      return;
    }
    prevChoice = to;
    const [yesLeft, yesRight] = yes.getChildMeshes();
    const [noLeft, noRight] = no.getChildMeshes();

    if (to === "YES") {
      scene.beginAnimation(yesLeft, 0, 5);
      scene.beginAnimation(yesRight, 0, 5);
      blockYes.checkCollisions = false;
      if (from === "NO") {
        scene.beginAnimation(noLeft, 9, 10);
        scene.beginAnimation(noRight, 9, 10);
        blockNo.checkCollisions = true;
      }
    }
    if (to === "NO") {
      scene.beginAnimation(noLeft, 0, 5);
      scene.beginAnimation(noRight, 0, 5);
      blockNo.checkCollisions = false;
      if (from === "YES") {
        scene.beginAnimation(yesLeft, 9, 10);
        scene.beginAnimation(yesRight, 9, 10);
        blockYes.checkCollisions = true;
      }
    }
  }

  if (teleportation) {
    const target = MeshBuilder.CreateGround(
      "teleportTarget",
      { width: 5, height: 5 },
      scene,
    );
    target.setParent(room);
    target.position.set(2.5, 0, -2.5);
    target.isVisible = false;
    refs.push(target);
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
