<script lang="ts">
  import Babylon from "$lib/Babylon.svelte";
  import FlowCartProvider from "$lib/FlowCartProvider.svelte";
  import Node from "$lib/Node.svelte";
  import type { FlowCartData } from "$lib/types";

  const debug = false;
  const data: FlowCartData = {
    question: "Werk voor een klant?",
    yes: {
      question: "Werk voor een lopend traject?",
      yes: {
        question: "Toegang tot project in QICS?",
        yes: {
          question: "Facturabele uren?",
          yes: {
            answer:
              "Boek op project met juiste artikel en duidelijke omschrijving",
          },
        },
      },
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

<Babylon {debug}>
  <FlowCartProvider depth={4}>
    <Node id="flowcart" {data} />
  </FlowCartProvider>
</Babylon>
<slot />
