<script lang="ts">
  import FlowCart from "$lib/FlowCart.svelte";
  import Question from "$lib/Question.svelte";
  import type { QuestionNode } from "$lib/Question.svelte";

  const node: QuestionNode = {
    question: "Werk voor een klant?",
    yes: {
      question: "Werk voor een lopend traject?",
      no: { question: "Werkt bestaande klant?" },
    },
    no: {
      question: "Intern project?",
      no: {
        question: "Verlof / verzuim?",
        no: { question: "Stage gerelateerd?" },
      },
    },
  };
</script>

<FlowCart>
  <Question {node} />
</FlowCart>
<slot />
