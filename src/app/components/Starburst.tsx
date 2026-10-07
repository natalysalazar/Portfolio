"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

const Starburst: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      console.warn("WebGL unavailable, skipping Starburst", e);
      return;
    }
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(45, 1, 1, 500);
    const scene = new THREE.Scene();
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const directions = [
      [10, 5, 30], [10, 13, 20], [6, 20, 15], [18, 30, 40],
      [-4, 30, 10], [-10, 10, 40], [-30, -3, 30], [-20, -10, 0],
      [-15, -20, 0], [-8, -35, 0], [70, 0, 0], [40, -8, 10],
      [15, -40, 0], [12, -20, 0],
    ];

    const group = new THREE.Group();
    const geometries: THREE.BufferGeometry[] = [];
    directions.forEach(([x, y, z]) => {
      const origin = new THREE.Vector3(0, 0, 0);
      const g1 = new THREE.BufferGeometry().setFromPoints([origin, new THREE.Vector3(x, y, z)]);
      const g2 = new THREE.BufferGeometry().setFromPoints([origin, new THREE.Vector3(-x, -y, -z)]);
      geometries.push(g1, g2);
      group.add(new THREE.Line(g1, material), new THREE.Line(g2, material));
    });
    scene.add(group);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.04, 0.4, 0));
    composer.addPass(new OutputPass());

    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const layout = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;

      renderer.setSize(w, h, false); // canvas CSS size is handled by the stylesheet
      composer.setSize(w, h);
      camera.aspect = w / h;

      if (mobileQuery.matches) {
        // centered and pulled back so the starburst looks smaller
        camera.position.set(0, 0, 210);
        camera.lookAt(0, 0, 0);
      } else {
        camera.position.set(0, 0, 120);
        camera.lookAt(-40, 0, 0);
      }
      camera.updateProjectionMatrix();
    };

    layout();
    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(container);
    mobileQuery.addEventListener("change", layout);

    renderer.setAnimationLoop((time: number) => {
      group.rotation.x = time / 6000;
      group.rotation.y = time / 5000;
      group.rotation.z = time / 5000;
      composer.render();
    });

    return () => {
      resizeObserver.disconnect();
      mobileQuery.removeEventListener("change", layout);
      renderer.setAnimationLoop(null);
      geometries.forEach((g) => g.dispose());
      material.dispose();
      composer.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="starburst" />;
};

export default Starburst;