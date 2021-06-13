<script lang="ts">
  import FlowCart from "$lib/FlowCart.svelte";

  import Room from "$lib/Room.svelte";
</script>

<FlowCart>
  <Room question="Werk voor een klant?" />
</FlowCart>
<slot />
