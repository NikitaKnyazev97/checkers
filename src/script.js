import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const square = new THREE.BoxGeometry( 1, 0.1, 1 );

// Materials


const lightsquare = new THREE.MeshBasicMaterial( { color: 0xE0C4A8 } );
const darksquare = new THREE.MeshBasicMaterial( { color: 0x6A4236 });

const piece = new THREE.CylinderGeometry( 0.4, 0.4, 0.1, 100);
const darkPiece = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
const whitePiece = new THREE.MeshBasicMaterial( {color: 0xFAF0DB } );

var cylinder;


// Mesh
//const cube = new THREE.Mesh(geometry,darksquare)
//cube.position.set(0, 0, 0);
//scene.add(cube)
var cube, board, pieceColor;
 board = new THREE.Group();
 
  let squareNumber = 1;
  for (let x = 0; x < 8; x++) {
    for (let z = 0; z < 8; z++) {
      let cube;
      if ((z % 2 + x % 2) % 2 == 0) {
        cube = new THREE.Mesh(square, darksquare);
        //cyl = new THREE.Mesh(piece, x % 2 == 0 ? lightsquare : darksquare);
         
         if (x < 3){
         	cylinder = new THREE.Mesh( piece, whitePiece );
         	cylinder.position.set(x, 0.1, z);
         	scene.add( cylinder );
	}
	else if (x >= 5){
		cylinder = new THREE.Mesh( piece, darkPiece );
         	cylinder.position.set(x, 0.1, z);
         	scene.add( cylinder );
	}
         	
      }
      else {
        cube = new THREE.Mesh(square, lightsquare);
     
      }
 
      cube.position.set(x, 0, z);
      board.add(cube);
    }
  }
 
  scene.add(board);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 5
camera.position.z = -11
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true
  //controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
