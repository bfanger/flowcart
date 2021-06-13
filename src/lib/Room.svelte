<script lang="ts">
  import {
    Color3,
    DynamicTexture,
    MeshBuilder,
    StandardMaterial,
    Vector3,
  } from "@babylonjs/core";

  import { getContext } from "svelte";
  import { get } from "svelte/store";
  import type { BabylonContext } from "./Babylon.svelte";

  export let question: string;
  const context = getContext<BabylonContext>("Babylon");
  const { scene } = get(context);

  const sign = MeshBuilder.CreatePlane(
    "question",
    { width: 2, height: 0.3 },
    scene
  );
  sign.position.set(-4.99, 2.1, -2.5);
  sign.rotation.set(0, -0.5 * Math.PI, 0);

  var textureResolution = 512;
  var textureGround = new DynamicTexture(
    "dynamic texture",
    { width: 1024, height: 128 },
    scene,
    true
  );
  var textureContext = textureGround.getContext();

  var material = new StandardMaterial("Mat", scene);
  material.diffuseColor = new Color3(0, 0, 0);
  material.specularColor = new Color3(0, 0, 0);
  material.ambientColor = new Color3(0, 0, 0);
  material.emissiveTexture = textureGround;
  sign.material = material;

  var font = "bold 44px monospace";
  textureGround.drawText(question, 70, 80, font, "white", "purple", true, true);
</script>
