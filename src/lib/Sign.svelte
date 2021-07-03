<script lang="ts">
  import {
    Color3,
    DynamicTexture,
    Node,
    MeshBuilder,
    StandardMaterial,
  } from "@babylonjs/core";

  import { getBabylonContext } from "./Babylon.svelte";

  export let parent: Node;
  export let text: string;
  export let color: string = "white";
  export let background: string;
  export let big: boolean = false;

  const { scene } = getBabylonContext();

  const sign = MeshBuilder.CreatePlane(
    "sign",
    { width: big ? 4 : 2, height: big ? 1 : 0.3 },
    scene
  );
  sign.setParent(parent);
  sign.position.set(4.99, big ? 1 : 2.1, 2.5);
  sign.rotation.set(0, 0.5 * Math.PI, 0);

  const textureGround = new DynamicTexture(
    "dynamic texture",
    { width: big ? 2048 : 1024, height: big ? 256 : 128 },
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
</script>

<slot />
