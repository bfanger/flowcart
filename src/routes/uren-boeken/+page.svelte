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
    question: "Did you work on a specific project?",
    yes: {
      question: "Do you have access to the project in QICS?",
      yes: {
        answer: "Book on project with the relevant article & clear description",
        color: red,
      },
      no: {
        answer: "Ask the projectmanager to add you to a project",
        color: black,
      },
    },
    no: {
      question: "Is the work for an existing client?",
      yes: {
        question:
          "Can you divide your spent hours over the different customer projects?",
        yes: {
          answer:
            "Book on project with the relevant article & clear description",
          color: red,
        },
        no: {
          answer: "Book Client investment project with a clear description",
          color: red,
        },
      },
      no: {
        question: "Are you trying to land new business for a (new) client?",
        yes: {
          question: "Is the sales activity upsell for an existing project?",
          yes: {
            answer:
              "See if you can book your hours on the existing project, if in doubt, ask the relevant project manager",
            color: red,
          },
          no: {
            answer: "Book Sales / Client investment with a clear description",
            color: yellow,
          },
        },
        no: {
          question: "Is your work related to an internship?",
          yes: {
            answer:
              "Book Internship with the relevant article & clear description",
            color: red,
          },
          no: {
            question:
              "Is your work related to making Triple, colleagues or yourself better?",
            yes: {
              answer:
                "Book Triple professionalisation with the relevant article & clear description",
              color: yellow,
            },
            no: {
              question: "Is your work related to a Triple event or meeting?",
              yes: {
                answer: "Book Triple events & meetings",
                color: green,
              },
              no: {
                question: "Leave or sick leave",
                yes: {
                  answer: "Book Leave with a clear description",
                  color: yellow,
                },
                no: {
                  answer: "Book Last resort with a clear description",
                  color: green,
                },
              },
            },
          },
        },
      },
    },
  };
</script>

<Babylon>
  <FlowCartProvider>
    <Node id="flowcart" {data} />
  </FlowCartProvider>
</Babylon>
<slot />
