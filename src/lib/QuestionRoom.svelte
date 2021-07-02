<script lang="ts">
  import { tweened } from "svelte/motion";
  import { createEventDispatcher, onDestroy } from "svelte";
  import { ActionManager, ExecuteCodeAction, Mesh } from "@babylonjs/core";
  import { getFlowCartContext } from "./FlowCartProvider.svelte";
  import { getBabylonContext } from "./Babylon.svelte";
  import type { Choice } from "./types";

  export let mesh: Mesh;
  export let choice: Choice;

  const { scene } = getBabylonContext();
  const { assets } = getFlowCartContext();
  const dispatch = createEventDispatcher();

  const yesAngle = tweened(0);
  const noAngle = tweened(0);
  $: yesAngle.set(choice === "YES" ? 0.6 * Math.PI : 0, {
    duration: choice === "YES" ? 500 : 0,
  });
  $: noAngle.set(choice === "NO" ? 0.6 * Math.PI : 0, {
    duration: choice === "NO" ? 500 : 0,
  });

  const room = assets.getTransformNodeByID("QuestionRoom").clone("room", mesh);
  room.scaling.set(1, 1, -1);

  const yes = assets.getTransformNodeByID("Yes").clone("yes", room);
  yes.getChildMeshes().forEach((door) => {
    door.actionManager = new ActionManager(scene);
    door.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => dispatch("yes"))
    );
  });
  yes.getChildMeshes()[0].rotationQuaternion = null;
  yes.getChildMeshes()[1].rotationQuaternion = null;
  $: yes.getChildMeshes()[0].rotation.set(0, $yesAngle * -1, 0);
  $: yes.getChildMeshes()[1].rotation.set(0, $yesAngle, Math.PI * 1);

  const no = assets.getTransformNodeByID("No").clone("no", room);
  no.getChildMeshes().forEach((door) => {
    door.actionManager = new ActionManager(scene);
    door.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickTrigger, () => dispatch("no"))
    );
  });
  no.getChildMeshes()[0].rotationQuaternion = null;
  no.getChildMeshes()[1].rotationQuaternion = null;
  $: no.getChildMeshes()[0].rotation.set(0, $noAngle * -1, 0);
  $: no.getChildMeshes()[1].rotation.set(0, $noAngle, Math.PI * 1);

  onDestroy(() => {
    no.dispose();
    yes.dispose();
  });
</script>

<slot />
