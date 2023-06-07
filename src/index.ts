import * as THREE from 'three';
import { TextureLoader } from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let model1;

const break1 = 992;
const break2 = 768;
const break3 = 480;

function getzoomshift() {
  if (window.innerWidth < break3) {
    return 2;
  }
  if (window.innerWidth < break2) {
    return 3;
  }
  if (window.innerWidth < break1) {
    return 3;
  }
  return 3;
}

function getyshift() {
  if (window.innerWidth < break3) {
    return -1;
  }
  if (window.innerWidth < break2) {
    return -0.5525;
  }
  if (window.innerWidth < break1) {
    return -0.5525;
  }
  return -0.5525;
}

let currentTime = 0;

const bumpTexture = new THREE.TextureLoader().load(
  'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/647e3b2d20158b64a0528928_bumpmap.jpg'
);

window.Webflow ||= [];
window.Webflow.push(() => {
  // console.log('hello');
  init3D();
});

function init3D() {
  // select container
  const viewport1 = document.querySelector('[data-3d="c"]');
  const parentElement1 = viewport1.parentElement; // Get the parent element for viewport1

  // console.log(viewport1);
  // console.log(parentElement1);

  // setting up scene

  const scene1 = new THREE.Scene();

  // setting up camera
  const aspectRatio1 = parentElement1.clientWidth / parentElement1.clientHeight;
  const camera = new THREE.PerspectiveCamera(75, aspectRatio1, 0.1, 1000);

  camera.updateProjectionMatrix(); // Must call after changing properties of the camera

  camera.position.set(0, 0.5, getzoomshift());

  // Add lights

  const pointLight1 = new THREE.PointLight(0xb4bcc6, 1);
  const pointLight2 = new THREE.PointLight(0x924abc, 0.25);
  const pointLight3 = new THREE.PointLight(0x924abc, 0.2);
  const pointLight4 = new THREE.PointLight(0xfffefa, 0.1);

  pointLight1.position.set(0.25, 2, 3);
  pointLight1.distance = 5;
  pointLight1.lookAt(0, 0, 0);
  scene1.add(pointLight1);

  pointLight2.position.set(-3, -1, -0.2);
  pointLight2.distance = 5;
  pointLight2.lookAt(0, 0, 0);
  scene1.add(pointLight2);

  pointLight3.position.set(-3, -1.25, -0.2);
  pointLight3.distance = 5;
  pointLight3.lookAt(0, 0, 0);
  scene1.add(pointLight3);

  pointLight4.position.set(-3, -1.5, -0.2);
  pointLight4.distance = 5;
  pointLight4.lookAt(0, 0, 0);
  scene1.add(pointLight4);

  // const sphereSize1 = 0.5;
  // const sphereSize2 = 0.5;
  // const sphereSize3 = 0.5;
  // const sphereSize4 = 0.5;
  // const pointLightHelper1 = new THREE.PointLightHelper(pointLight1, sphereSize1);
  // const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, sphereSize2);
  // const pointLightHelper3 = new THREE.PointLightHelper(pointLight3, sphereSize3);
  // const pointLightHelper4 = new THREE.PointLightHelper(pointLight4, sphereSize4);
  // scene1.add(pointLightHelper1);
  // scene1.add(pointLightHelper2);
  // scene1.add(pointLightHelper3);
  // scene1.add(pointLightHelper4);

  // setting up renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  // console.log(renderer);

  renderer.setSize(parentElement1.clientWidth, parentElement1.clientHeight);
  viewport1.appendChild(renderer.domElement);

  // Update renderer size on window resize
  window.addEventListener('resize', () => {
    renderer.setSize(parentElement1.clientWidth, parentElement1.clientHeight);
    camera.aspect = parentElement1.clientWidth / parentElement1.clientHeight;
    camera.updateProjectionMatrix();
  });

  // Add controls
  // const controls1 = new OrbitControls(camera, renderer.domElement);
  // controls1.enableDamping = true;

  // Add axes to the scene
  // const axesHelper1 = new THREE.AxesHelper(6);
  // scene1.add(axesHelper1);

  // animation setup
  const clock = new THREE.Clock();
  let mixer = null;

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    currentTime += delta;
    if (mixer !== null) {
      mixer.update(delta);
    }
    // controls1.update();

    renderer.render(scene1, camera);
  }

  animate();

  // --- load 3d async
  const assets = load();
  assets.then((data) => {
    model1 = data.model1.scene;
    const { animations } = data.model1;
    // console.log(animations);

    const { texture } = data;

    const newMaterial = new THREE.MeshStandardMaterial({
      metalness: 0.2,
      roughness: 0.5,
      // map: texturefile,
    });

    // newMaterial.normalMap = normalTexture;
    newMaterial.bumpMap = bumpTexture;
    newMaterial.bumpScale = 0.125;

    model1.traverse((node) => {
      if (node.isMesh) {
        node.material = newMaterial;
        node.material.needsUpdate = true;
        // console.log(node.material);
        // console.log('textureChange');
      }
    });

    // Position the model1

    model1.translateY(getyshift());
    model1.translateX(0);

    // controls1.update();

    // initialize mixer after model1 is loaded
    mixer = new THREE.AnimationMixer(model1);
    animations.forEach((animation) => {
      const action = mixer.clipAction(animation);
      action.play();
    });

    scene1.add(model1);
    // console.log('Model 1: ', model1);
  });
}

/* Loader Functions */
async function load() {
  model1 = await loadModel(
    'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/647f927c9792f31aa8bd32ad_XReg-VASPindex-MainViusalsV4.glb.txt'
  );

  const texture = await loadTexture(
    'https://uploads-ssl.webflow.com/646283aaab5c997eb0483d18/6463925c61d09e9e0d0a1415_VASPnet-MainTextureV4.png'
  );
  return { model1, texture };
}
const textureLoader = new THREE.TextureLoader();
const modelLoader = new GLTFLoader();

function loadTexture(url) {
  return new Promise((resolve) => {
    textureLoader.load(url, (data) => {
      data.needsUpdate = true;
      data.flipY = false;

      resolve(data);
    });
  });
}

function loadModel(url, id) {
  return new Promise((resolve, reject) => {
    modelLoader.load(url, (gltf) => {
      // console.log(gltf);
      const { scene } = gltf;
      const { animations } = gltf;
      resolve({ scene, animations });
    });
  });
}
