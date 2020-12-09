import React, { Component } from 'react';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Group } from 'three';

export class RotatingLogo extends Component {
  componentDidMount() {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create lights
    let light = new THREE.PointLight(0xEEEEEE);
    light.position.set(20, 0, 20);
    scene.add(light);
    let lightAmb = new THREE.AmbientLight(0x777777);
    scene.add(lightAmb);

    let renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 5;

    let logo: Group;
    let loader = new GLTFLoader();
    let pivot = new THREE.Group();
    pivot.position.set(0.0, 0.0, 0);
    loader.load('logo-wip.gltf', function (gltf: GLTF) {
      logo = gltf.scene;
      /*
      let newMaterial = new THREE.MeshStandardMaterial({color: 0x008C9A});
      */
      logo.position.set(-0.75, -0.75, 0);
      pivot.add(logo);
      scene.add(pivot);
    }, undefined, function (error: any) {
      console.error(error);
    });

    let animate = function () {
      requestAnimationFrame(animate);
      if (pivot) pivot.rotation.y += 0.02;
      renderer.render(scene, camera);
    };
    animate();
  }
  render() {
    return (
      <div />
    )
  }
}
