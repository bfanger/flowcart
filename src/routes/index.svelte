<script lang="ts">
  import background from "../assets/mine-cave.jpg";
</script>

<div class="background" style="background-image: url('{background}')">
  <div class="panel">
    <h1>Welkom bij FlowCart</h1>
    <p>Een VR experiment door Bob Fanger</p>
    <a class="button" href="/uren-boeken">Start</a>
  </div>
</div>
<slot />

<style>
  .background {
    width: 100%;
    height: 100%;
    background: #060201 top left;
    background-size: cover;
    color: white;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .panel {
    padding: 20px;
    min-width: 40%;
    min-height: 40%;
    font: 20px sans-serif;
    text-align: center;
    text-shadow: black 0 0 14px;
  }
  h1 {
    font-size: 50px;
  }
  .button {
    display: inline-block;
    font-size: 40px;
    font-weight: bolder;
    background: #ff4f68;
    color: white;
    border-radius: 35px;
    padding: 10px 40px;
    text-shadow: none;
    text-decoration: none;
    box-shadow: #9e3242 0 0 10px 0px;
  }
</style>
