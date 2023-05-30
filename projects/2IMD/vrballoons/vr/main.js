import * as THREE from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';


let camera, scene, renderer, controls;
let vrDisplay, vrFrameData;

let controller1, controller2;
let controllerGrip1, controllerGrip2;

let balloon;
let balloonDirection = 1;
let balloonSpeed = 0.005;
let balloonXOffset = 0; // Initial horizontal offset
let balloonYOffset = 0; // Initial vertical offset

let activeDarts = [];

let stand;

let dart;
let direction = new THREE.Vector3();
const dartSpeed = 0.1;

//sideassets
let croissant;
let barrel;
let dartboard;

let yoda;
let yodaDirection = 1;
let yodaSpeed = 0.005;
let yodaXOffset = 0; // Initial horizontal offset
let yodaYOffset = 0; // Initial vertical offset
//sideassets

init();
animate();

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x87ceeb);
	camera = new THREE.PerspectiveCamera(
		80,
		window.innerWidth / window.innerHeight,
		0.1,
		10
	);
	camera.position.set(0, 1.2, 0.3);

	scene.add(new THREE.HemisphereLight(0x808080, 0x606060));

	const light = new THREE.DirectionalLight(0xffffff);
	light.position.set(0, 6, 0);
	light.castShadow = true;
	light.shadow.camera.top = 2;
	light.shadow.camera.bottom = -2;
	light.shadow.camera.right = 2;
	light.shadow.camera.left = -2;
	light.shadow.mapSize.set(4096, 4096);
	scene.add(light);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	renderer.gammaOutput = true; // Enable gamma correction

	document.body.appendChild(renderer.domElement);
	document.body.appendChild(VRButton.createButton(renderer));

	controls = new OrbitControls(camera, renderer.domElement);
	controls.target.set(0, 1.6, 0);
	controls.update();

	navigator.xr.isSessionSupported('immersive-vr', { optionalFeatures: ['local-floor'] }).then((supported) => {
		if (supported) {
			renderer.xr.enabled = true;
			renderer.xr.setReferenceSpaceType('local-floor');
			renderer.xr.requestSession('immersive-vr', { optionalFeatures: ['local-floor'] }).then((session) => {
				vrDisplay = session.display;
				vrFrameData = new VRFrameData();
				renderer.xr.setSession(session);

			});
		}
	});
	loadStand();
	loadBalloonModel(2);
	loadDartModel("blue");
	loadDartModel("red");
	loadCroissant(0, 0, 1);
	loadCroissant(1, 0.2, -1.5);
	loadCroissant(-1, -0.2, 2);
	//barrier
	loadBarrel(3.3, 1.3, 0.8, 2, 1);
	loadBarrel(3.3, 0.55, 1.5, 3, 1.5);

	loadBarrel(3.3, 2.6, 0.8, 3, 1);
	loadBarrel(3.3, 1.55, 1.1, 3, 2);

	loadBarrel(-3.3, 1.3, 0.8, 3, 1);
	loadBarrel(-3.3, 0.55, 1.5, 3, 1.5);


	loadBarrel(-3.3, 2.6, 0.8, 3, 1);
	loadBarrel(-3.3, 1.55, 1.1, 3, 2);

	//dartboards
	loadDartboard(0, -4, 1, 180);
	loadDartboard(1.07, -4, 1, 180);
	loadDartboard(-1.07, -4, 1, 180);

	//salesperson
	loadYoda(0, -1, -0.1, 180);






	//controllers_________________________________________________________ 

	let isDartInMotion = false;

	function onSelectStart() {
		if (!isDartInMotion) {
			isDartInMotion = true;
			shootDart();
		}
		// shootDart();
		this.userData.isSelecting = true;
	}

	function onSelectEnd() {
		this.userData.isSelecting = false;
	}

	controller1 = renderer.xr.getController(0);
	controller1.addEventListener('selectstart', onSelectStart);
	controller1.addEventListener('selectend', onSelectEnd);
	controller1.addEventListener('connected', function (event) {
		this.add(buildController(event.data));
	});
	controller1.addEventListener('disconnected', function () {
		this.remove(this.children[0]);
	});
	scene.add(controller1);

	controller2 = renderer.xr.getController(1);
	controller2.addEventListener('selectstart', onSelectStart);
	controller2.addEventListener('selectend', onSelectEnd);
	controller2.addEventListener('connected', function (event) {
		this.add(buildController(event.data));
	});
	controller2.addEventListener('disconnected', function () {
		this.remove(this.children[0]);
	});
	scene.add(controller2);

	const controllerModelFactory = new XRControllerModelFactory();

	controllerGrip1 = renderer.xr.getControllerGrip(0);
	controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1));
	scene.add(controllerGrip1);

	controllerGrip2 = renderer.xr.getControllerGrip(1);
	controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2));
	scene.add(controllerGrip2);
	//______________________________________________________________________

	window.addEventListener('resize', onWindowResize, false);


	// renderer.domElement.addEventListener('click', shootDart);
	// renderer.xr.addEventListener('selectstart', shootDart);
}

// Shooting stand dimensions
const standWidth = 4;
const standHeight = 2;
const standDepth = 2;

//TEXTURES_______________________________________________________________
const textureLoader = new THREE.TextureLoader();
//grass texture for the floor
const stone = textureLoader.load('textures/stones.jpg');
stone.repeat.set(1, 1);
stone.wrapS = THREE.RepeatWrapping;
//white-red texture for the missing face
const whiteRedTexture = textureLoader.load('textures/white-red_texture.jpg');
whiteRedTexture.repeat.set(3, 1);
whiteRedTexture.wrapS = THREE.RepeatWrapping;
//wood texture for the left and right wall
const woodTexture = textureLoader.load('textures/wood_texture.jpg');
woodTexture.repeat.set(1, 1);
woodTexture.wrapS = THREE.RepeatWrapping;
//______________________________________________________________________


//______________________________________________________________________
//floor
const floorGeometry = new THREE.PlaneGeometry(8, 8);
const floorMaterial = new THREE.MeshBasicMaterial({ map: stone });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);
// Create left wall
const leftWallGeometry = new THREE.BoxGeometry(standWidth / 16, standHeight * 1.5, standDepth);
const leftWallMaterial = new THREE.MeshBasicMaterial({ map: woodTexture });
const leftWall = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
leftWall.position.set(-3.41, 0.5, -2); // Adjust the position as needed
scene.add(leftWall);
// Create right wall
const rightWallGeometry = new THREE.BoxGeometry(standWidth / 16, standHeight * 1.5, standDepth);
const rightWallMaterial = new THREE.MeshBasicMaterial({ map: woodTexture });
const rightWall = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
rightWall.position.set(3.41, 0.5, -2); // Adjust the position as needed
scene.add(rightWall);


//baloon_______________________________________________________________
function loadBalloonModel(x) {
	const loader = new GLTFLoader();
	loader.load('assets/balloon/scene.gltf', function (gltf) {
		const newBalloon = gltf.scene;
		newBalloon.scale.set(0.005, 0.005, 0.005);
		newBalloon.position.set(x, 0, -3.5); // Adjust the position as needed 

		// Update the reference to the new balloon
		balloon = newBalloon;
		scene.add(balloon);
		// Restart the animation
		animate();
	});
}
function loadStand() {
	const loader = new GLTFLoader();
	loader.load('assets/stand/stand.gltf', function (gltf) {
		const newStand = gltf.scene;
		newStand.scale.set(0.4, 0.4, 0.4);
		newStand.position.set(0, 0, 0); // Adjust the position as needed 

		// Update the reference to the new balloon
		stand = newStand;
		scene.add(stand);
	});
}

// let isBalloonRemoved = false;

function animateBalloon() {
	if (balloon) {
		// Update the horizontal position
		balloonXOffset += balloonDirection * balloonSpeed;

		// Reverse the direction when reaching the left or right boundary
		if (balloonXOffset <= -3.41 || balloonXOffset >= 3.41) {
			balloonDirection *= -1;
		}

		// Calculate the vertical position offset using a sine wave
		const time = performance.now() * 0.001; // Convert time to seconds
		balloonYOffset = Math.sin(time * 2) * 0.1; // Adjust the amplitude and speed as needed

		// Set the balloon's position
		balloon.position.x = balloonXOffset;
		balloon.position.y = balloonYOffset;
	}
}
function animateJoda() {
	if (yoda) {
		// Update the horizontal position
		yodaXOffset += yodaDirection * yodaSpeed;

		// Reverse the direction when reaching the left or right boundary
		if (yodaXOffset <= -3.41 || yodaXOffset >= 3.41) {
			yodaDirection *= -1;
			yoda.rotation.y += 3.14;
		}

		// Calculate the vertical position offset using a sine wave
		const time = performance.now() * 0.001; // Convert time to seconds

		// Set the balloon's position
		yoda.position.x = yodaXOffset;
		yoda.position.y = yodaYOffset;
	}
}


//dart_________________________________________________________________
function loadDartModel(color) {
	return new Promise((resolve, reject) => {
		const loader = new GLTFLoader();

		loader.load(`assets/darts/${color}/scene.gltf`, function (gltf) {
			const dart = gltf.scene;

			dart.scale.set(0.01, 0.01, 0.01);

			dart.traverse(function (child) {
				if (child.isMesh) {
					child.castShadow = true;
				}
			});

			resolve(dart);
		}, undefined, reject);
	});
}

function shootDart() {
	const controller = controller1;

	loadDartModel("red")
		.then((loadedDart) => {
			const dart = loadedDart;
			dart.position.copy(controller.position);
			dart.quaternion.copy(controller.quaternion);
			dart.velocity = new THREE.Vector3();
			dart.velocity.x = -dartSpeed;
			dart.velocity.applyQuaternion(controller.quaternion);

			scene.add(dart);
			activeDarts.push({ dart, controller });
		})
		.catch((error) => {
			console.error(error);
		});
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
}

function handleController(controller) {

	if (controller.userData.isSelecting) {

		const object = room.children[count++];

		object.position.copy(controller.position);
		object.userData.velocity.x = (Math.random() - 0.5) * 3;
		object.userData.velocity.y = (Math.random() - 0.5) * 3;
		object.userData.velocity.z = (Math.random() - 9);
		object.userData.velocity.applyQuaternion(controller.quaternion);

		if (count === scene.children.length) count = 0;

	}

}

//sideassets
function loadCroissant(y, x, r) {
	const loader = new GLTFLoader();
	loader.load('assets/croissant/scene.gltf', function (gltf) {
		const newCroissant = gltf.scene;
		newCroissant.scale.set(1, 1, 1);
		newCroissant.position.set(y, 0.4, x); // Adjust the position as needed 
		//rotation
		newCroissant.rotation.y = Math.PI / r;

		// Update the reference to the new croissant
		croissant = newCroissant;
		scene.add(croissant);
	});
}
function loadBarrel(y, x, h, r, rx) {
	const loader = new GLTFLoader();
	loader.load('assets/barrel/scene.gltf', function (gltf) {
		const newBarrel = gltf.scene;
		newBarrel.scale.set(1, 1, 1);
		newBarrel.position.set(y, h, x); // Adjust the position as needed 
		//rotation
		newBarrel.rotation.y = Math.PI / r;
		//siderotation
		newBarrel.rotation.x = Math.PI / rx;

		// Update the reference to the new barrel
		barrel = newBarrel;
		scene.add(barrel);
	});
}
function loadDartboard(y, x, h, r) {
	const loader = new GLTFLoader();
	loader.load('assets/dartboard/scene.gltf', function (gltf) {
		const newBoard = gltf.scene;
		newBoard.scale.set(1, 1, 1);
		newBoard.position.set(y, h, x); // Adjust the position as needed 
		//rotation
		newBoard.rotation.y = Math.PI / r;

		// Update the reference to the new barrel
		dartboard = newBoard;
		scene.add(dartboard);
	});
}
function loadYoda(y, x, h, r) {
	const loader = new GLTFLoader();
	loader.load('assets/yoda/scene.gltf', function (gltf) {
		const newYoda = gltf.scene;
		newYoda.scale.set(0.015, 0.015, 0.015);
		newYoda.position.set(y, h, x); // Adjust the position as needed 
		//rotation
		newYoda.rotation.y = Math.PI / r;

		// Update the reference to the new barrel
		yoda = newYoda;
		yoda.rotation.y = 1.5708;
		scene.add(yoda);
		animate();
	});
}
//sideassets


function animate() {
	// renderer.setAnimationLoop(render);
	renderer.setAnimationLoop(() => {
		render();
		animateBalloon();
		// handleController( controller1 );
		// handleController( controller2 );
	});
}

function render() {

	//controllers_________________________________________________________
	handleController(controller1);
	handleController(controller2);
	//____________________________________________________________________

	const delta = vrFrameData ? vrFrameData.deltaTime : 0.01;

	activeDarts.forEach((activeDart) => {
		const { dart, controller } = activeDart;

		dart.position.addScaledVector(dart.velocity, delta);
		if (balloon) {
			if (dart.position.distanceTo(balloon.position) < 0.1) {
				scene.remove(dart);
				activeDarts.splice(activeDarts.indexOf(activeDart), 1);
				console.log('Dart hit the balloon!');
			}
		}


		if (dart.position.y < 0 || Math.abs(dart.position.x) > 3 || Math.abs(dart.position.z) > 3) {
			scene.remove(dart);
			activeDarts.splice(activeDarts.indexOf(activeDart), 1);
			console.log('Dart went out of bounds!');
			isDartInMotion = false;
		}
	});

	animateBalloon();
	animateJoda();

	renderer.render(scene, camera);
}
