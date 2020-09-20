import React, { Component } from 'react';
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export class RotatingLogo extends Component {
  componentDidMount() {
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create lights
    var light = new THREE.PointLight(0xEEEEEE);
    light.position.set(20, 0, 20);
    scene.add(light);
    var lightAmb = new THREE.AmbientLight(0x777777);
    scene.add(lightAmb);

    let renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0xf88379, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 5;

    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshLambertMaterial({
      color: 0xff00ff,
      emissive: 0x121212
    });
    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    var loader = new GLTFLoader();
    loader.load( './logo-wip.gltf', function ( gltf ) {
      scene.add( gltf.scene );
    }, undefined, function ( error ) {
      console.error( error );
    } );


    /*
    var loader = new THREE.ObjectLoader();
    loader.load(
      // resource URL
      "logo-obj.obj",

      // onLoad callback
      // Here the loaded data is assumed to be an object
      function ( obj ) {
        // Add the loaded object to the scene
        scene.add( obj );
      },

      // onProgress callback
      function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },

      // onError callback
      function ( err ) {
        console.error( 'An error happened' );
      }
    );
    // Alternatively, to parse a previously loaded JSON structure
    var object = loader.parse( data );

    scene.add( object );
    */


    let animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.y += 0.01;
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
