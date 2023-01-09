<script lang="ts">
  import {
    Color3,
    DynamicTexture,
    Node,
    MeshBuilder,
    StandardMaterial,
  } from "@babylonjs/core";
  import { onDestroy } from "svelte";
  import { getBabylonContext } from "./Babylon.svelte";

  export let parent: Node;
  export let text: string;
  export let color: string = "white";
  export let background: string;
  export let big: boolean = false;
  export let checkCollisions: boolean = false;
  const { scene } = getBabylonContext();

  const sign = MeshBuilder.CreatePlane(
    "sign",
    { width: big ? 4 : 2.2, height: big ? 1 : 0.3 },
    scene
  );
  sign.setParent(parent);
  sign.checkCollisions = checkCollisions;
  sign.position.set(4.99, big ? 1.2 : 2.1, 2.5);
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

  const font = "bold 42px monospace";
  const lines = text.split("\n");
  if (lines.length === 1) {
    textureGround.drawText(text, 64, 80, font, color, background, true, true);
  } else {
    lines.forEach((line, i) => {
      textureGround.drawText(
        line,
        64,
        54 + i * 44,
        font,
        color,
        i === 0 ? background : null,
        true,
        true
      );
    });
  }

  onDestroy(() => {
    sign.dispose();
  });
</script>

<slot />
