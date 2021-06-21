<script lang="ts">
  import {
    Color3,
    DynamicTexture,
    Mesh,
    MeshBuilder,
    StandardMaterial,
    Vector3,
  } from "@babylonjs/core";

  import { getContext, onMount } from "svelte";
  import type { BabylonContext } from "./Babylon.svelte";
  import type { FlowCartContext } from "./FlowCart.svelte";

  export let id: string;
  export let question: string;
  export let x: number = 0;
  export let z: number = 0;

  console.log("id", id);

  const { scene } = getContext<BabylonContext>("Babylon");
  const { assets } = getContext<FlowCartContext>("FlowCart");

  onMount(() => {
    const room = new Mesh("room_" + id, scene);
    const sign = MeshBuilder.CreatePlane(
      "question",
      { width: 2, height: 0.3 },
      scene
    );
    sign.position.set(4.99, 2.1, -2.5);
    sign.rotation.set(0, 0.5 * Math.PI, 0);
    room.addChild(sign);

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
    textureGround.drawText(
      question,
      70,
      80,
      font,
      "white",
      "purple",
      true,
      true
    );
    assets.getMeshByID("Floor").clone("floor", room);
    assets.getMeshByID("Room").clone("walls", room);
    assets.getMeshByID("Ceiling").clone("ceiling", room);

    const lights = [
      assets.getTransformNodeByID("Light").clone("light", room),
      assets.getTransformNodeByID("LightYes").clone("yes", room),
      assets.getTransformNodeByID("LightNo").clone("no", room),
    ];
    lights.forEach((node) => {
      node.getChildren().forEach((subnode) => {
        subnode.getChildren().forEach((lightNode) => {
          // scene.addLight(lightNode as PointLight);
        });
      });
    });
    room.translate(new Vector3(1, 0, 0), x);
    room.translate(new Vector3(0, 0, 1), z);

    return function onDestroy() {
      room.dispose();
    };
  });
</script>

<slot />
