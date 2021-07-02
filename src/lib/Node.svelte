<script lang="ts">
  import type { Mesh } from "@babylonjs/core";
  import AnswerNode from "./AnswerNode.svelte";
  import QuestionNode from "./QuestionNode.svelte";
  import type { AnswerData, FlowCartData, QuestionData } from "./types";

  export let data: FlowCartData;

  export let id: string;
  export let x = 0;
  export let z = 0;
  export let parent: Mesh | undefined = undefined;

  $: question = asQuestion(data);
  $: answer = asAnswer(data);

  function asQuestion(data: FlowCartData): QuestionData | undefined {
    const question = data as any as QuestionData;
    if (typeof question.question === "undefined") {
      return undefined;
    }
    return question;
  }

  function asAnswer(data: FlowCartData): AnswerData | undefined {
    const answer = data as any as AnswerData;
    if (typeof answer.answer === "undefined") {
      return undefined;
    }
    return answer;
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
{#if answer}
  <AnswerNode
    answer={answer.answer}
    color={answer.color}
    {id}
    {x}
    {z}
    {parent}
  />
{/if}
