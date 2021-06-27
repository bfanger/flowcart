<script lang="ts">
  import type { Mesh } from "@babylonjs/core";
  import QuestionNode from "./QuestionNode.svelte";
  import type { FlowCartData, QuestionData } from "./types";

  export let data: FlowCartData;

  export let id: string;
  export let x = 0;
  export let z = 0;
  export let parent: Mesh | undefined = undefined;

  $: question = asQuestion(data);

  function asQuestion(data: FlowCartData): QuestionData | undefined {
    const question = data as any as QuestionData;
    if (typeof question.question === "undefined") {
      return undefined;
    }
    return question;
  }
</script>

{#if question}
  <QuestionNode
    question={question.question}
    yes={question.yes}
    no={question.no}
    {id}
    {x}
    {z}
    {parent}
  />
{/if}
