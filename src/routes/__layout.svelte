<script lang="ts">
  import Babylon from "$lib/Babylon.svelte";
</script>

<Babylon><slot /></Babylon>

<style>
  :global(html),
  :global(body) {
    height: 100%;
    padding: 0;
    margin: 0;
  }
  :global(svelte-app) {
    display: block;
    height: 100%;
  }
</style>
