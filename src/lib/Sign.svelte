<script lang="ts">
  import {
    Color3,
    DynamicTexture,
    Mesh,
    MeshBuilder,
    StandardMaterial,
  } from "@babylonjs/core";

  import { getContext } from "svelte";
  import type { BabylonContext } from "./Babylon.svelte";

  export let mesh: Mesh;
  export let text: string;
  export let color: string = "white";
  export let background: string;

  const { scene } = getContext<BabylonContext>("Babylon");

  const sign = MeshBuilder.CreatePlane(
    "sign",
    { width: 2, height: 0.3 },
    scene
  );
  sign.position.set(4.99, 2.1, 2.5);
  sign.rotation.set(0, 0.5 * Math.PI, 0);

  const textureGround = new DynamicTexture(
    "dynamic texture",
    { width: 1024, height: 128 },
    scene,
    true
  );

  const material = new StandardMaterial("MatRoomQuestion", scene);
  material.diffuseColor = new Color3(0, 0, 0);
  material.specularColor = new Color3(0, 0, 0);
  material.ambientColor = new Color3(0, 0, 0);
  material.emissiveTexture = textureGround;
  sign.material = material;

  const font = "bold 44px monospace";
  textureGround.drawText(text, 70, 80, font, color, background, true, true);
  mesh.addChild(sign);
</script>

<slot />
