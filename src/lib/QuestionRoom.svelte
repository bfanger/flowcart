<script lang="ts">
  import { createEventDispatcher, onDestroy } from "svelte";
  import {
    ActionManager,
    ExecuteCodeAction,
    Node,
    Animation,
    AbstractMesh,
    MeshBuilder,
    Color3,
    StandardMaterial,
    Vector3,
    TransformNode,
  } from "@babylonjs/core";
  import { getFlowCartContext } from "./FlowCartProvider.svelte";
  import { getBabylonContext } from "./Babylon.svelte";
  import type { Choice } from "./types";

  export let parent: Node;
  export let choice: Choice;
  let prevChoice = choice;
  $: animateDoors(prevChoice, choice);

  const { scene } = getBabylonContext();
  const { assets } = getFlowCartContext();
  const dispatch = createEventDispatcher();

  const room = assets
    .getTransformNodeByID("QuestionRoom")
    .clone("room", parent);
  room.scaling.set(1, 1, -1);

  const yes = assets.getTransformNodeByID("Yes").clone("yes", room);
  yes.getChildMeshes().forEach((door, index) => {
    door.rotation = door.rotationQuaternion.toEulerAngles();
    door.rotationQuaternion = null;
    door.actionManager = new ActionManager(scene);
    door.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => dispatch("yes"))
    );
    addDoorAnimation(door, index === 0);
  });

  const no = assets.getTransformNodeByID("No").clone("no", room);
  no.getChildMeshes().forEach((door, index) => {
    door.rotation = door.rotationQuaternion.toEulerAngles();
    door.rotationQuaternion = null;
    door.actionManager = new ActionManager(scene);
    door.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => dispatch("no"))
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
    return plane;
  }

  function addDoorAnimation(door: AbstractMesh, left: boolean) {
    const animation = new Animation(
      "door" + (left ? "Left" : "Right"),
      "rotation.y",
      10,
      Animation.ANIMATIONTYPE_FLOAT
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

  onDestroy(() => {
    no.dispose();
    yes.dispose();
  });
</script>

<slot />
