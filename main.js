import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// gogoasa

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xb8ed46 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lumini

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);




// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// imagine la cub

const cubulTexture = new THREE.TextureLoader().load('aaa.png');

const cubul = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: cubulTexture }));

scene.add(cubul);

// Planeta

const planetaTexture = new THREE.TextureLoader().load('planeta.png');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const torusTexture = new THREE.TextureLoader().load('')

const planeta = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: planetaTexture,
    normalMap: normalTexture,
  })
);

scene.add(planeta);

planeta.position.z = 30;
planeta.position.setX(-10);

cubul.position.z = -5;
cubul.position.x = -29;

torus.position.z = -6;
torus.position.x = -1;
// Scroll la animatie

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  planeta.rotation.x += 0.05;
  planeta.rotation.y += 0.075;
  planeta.rotation.z += 0.05;

  cubul.rotation.y += 0.04;
  cubul.rotation.z += 0.08;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

  torus.rotation.x = t * -0.01;
  torus.rotation.z = t * -0.001;
  torus.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Loop la animatie ,controale de rotire

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  planeta.rotation.x += 0.005;
  cubul.rotation.x += 0.005;
  // controls.update();

  renderer.render(scene, camera);
}

animate();
