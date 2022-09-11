import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.z = 30;

document.body.appendChild( renderer.domElement );

const torus = new THREE.Mesh( 
  new THREE.TorusGeometry( 15, 3, 16, 100 ),
  new THREE.MeshStandardMaterial( { color: 0xffff00 } ) 
);
scene.add( torus );

const pointLight = new THREE.PointLight( 0xffffff );
pointLight.position.set( 5, 5, 5 );

const ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( pointLight, ambientLight );

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('/space.jpg');
scene.background = spaceTexture;

const heheTexture = new THREE.TextureLoader().load('./hehe.png');

const hehe = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: heheTexture})
);

scene.add(hehe);

const cubo = new THREE.Mesh(
  new THREE.BoxGeometry(.2, .2, .2),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

scene.add(cubo);

cubo.position.z = 20;
cubo.position.setX(-10);

const cubo2 = new THREE.Mesh(
  new THREE.BoxGeometry(.2, .2, .2),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);

scene.add(cubo2);

cubo2.position.z = 20;
cubo2.position.setX(10);

const cuboraro = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: "#dadada", wireframe: true, transparent: true})
);

scene.add(cuboraro);

cuboraro.position.z = 20;
cuboraro.position.setX(-10);

const cuboraro2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({color: "#dadada", wireframe: true, transparent: true})
);

scene.add(cuboraro2);

cuboraro2.position.z = 20;
cuboraro2.position.setX(10);

const jupiterTexture = new THREE.TextureLoader().load('./jupiter.jpg');

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture
  })
);

scene.add(jupiter);

jupiter.position.z = -30;
jupiter.position.y = 30;
jupiter.position.x = 30;

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ 
    map: moonTexture,
    normalMap: normalTexture
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);


function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  hehe.rotation.y += 0.01;
  hehe.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
  
}

document.body.onscroll = moveCamera;

function animate() {
	requestAnimationFrame( animate );
  
  torus.rotation.x += 0.05;
  torus.rotation.y += 0.05;

  cubo.rotation.x += 0.005;
  cubo.rotation.y += 0.005;

  cuboraro.rotation.x -= 0.005;
  cuboraro.rotation.y -= 0.005;

  cubo2.rotation.x += 0.005;
  cubo2.rotation.y += 0.005;

  cuboraro2.rotation.x -= 0.005;
  cuboraro2.rotation.y -= 0.005;

  jupiter.rotation.y += 0.001;
  

  controls.update();
  
	renderer.render( scene, camera );
}
animate();