<script lang="ts">
  import Babylon from "$lib/Babylon.svelte";
  import FlowCartProvider from "$lib/FlowCartProvider.svelte";
  import Node from "$lib/Node.svelte";
  import type { FlowCartData } from "$lib/types";

  const red = "#ff4f68";
  const green = "#2af9c9";
  const yellow = "#ffd833";
  const black = "#06023e";

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
            color: red,
          },
          no: {
            answer:
              "Boek op project met juiste indirecte artikel en duidelijke omschrijving",
            color: green,
          },
        },
        no: { answer: "Vraag toegang aan PM", color: green },
      },
      no: {
        question: "Werkt bestaande klant?",
        yes: {
          answer: "Boek klantinvestering met een duidelijke omschrijving",
          color: yellow,
        },
        no: {
          answer:
            "Boek sales activiteiten (nieuwe klanten) met een duidelijke omschrijving",
          color: yellow,
        },
      },
    },
    no: {
      question: "Intern project?",
      yes: {
        question: "Toegang tot project in QICS?",
        yes: {
          answer:
            "Boek op project met juiste artikel en duidelijke omschrijving",
          color: red,
        },
        no: { answer: "Vraag toegang aan PM", color: green },
      },
      no: {
        question: "Verlof / verzuim?",
        yes: { answer: "Boek op juiste interne projectpost", color: yellow },
        no: {
          question: "Stage gerelateerd?",
          yes: { answer: "Boek op juiste stagepost", color: red },
          no: {
            question: "Meeting niet klant?",
            yes: {
              answer:
                "Book Meeting (niet klant) met een duidelijke omschrijving",
              color: green,
            },
            no: {
              question: "Team of eigen performance verbeteren?",
              yes: {
                question: "Interne performance verbeteren?",
                yes: {
                  answer:
                    "Boek Professionalisering met een duidelijke omschrijving",
                  color: yellow,
                },
                no: {
                  answer:
                    "Boek conferenties / cursus met een duidelijke omschrijving",
                  color: red,
                },
              },
              no: {
                answer:
                  "Kan nergens anders op? Boek Diversen met een duidelijke omschrijving",
                color: black,
                textColor: "white",
              },
            },
          },
        },
      },
    },
  };
</script>

<Babylon depth={8}>
  <FlowCartProvider>
    <Node id="flowcart" {data} />
  </FlowCartProvider>
</Babylon>
<slot />
