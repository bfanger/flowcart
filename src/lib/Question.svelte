<script context="module" lang="ts">
  export type QuestionNode = {
    question: string;
    yes?: QuestionNode;
    no?: QuestionNode;
  };
</script>

<script lang="ts">
  import Room from "$lib/Room.svelte";

  export let node: QuestionNode;
  export let id: string = "root";

  export let x = 0;
  export let z = 0;

  console.log(node.yes);
</script>

<Room {id} question={node.question} {x} {z}>
  {#if node.yes}
    <svelte:self id={id + "yes"} node={node.yes} x={x + 5} z={z - 1.1} />
  {/if}
  {#if node.no}
    <svelte:self id={id + "no"} node={node.no} x={x + 5} z={z + 1.1} />
  {/if}
</Room>}
