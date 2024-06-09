 // Create scene
 const scene = new THREE.Scene();
      
 // Create camera
 const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
 camera.position.z = 10; // Adjusted camera position

 // Create renderer
 const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.globe-canvas'), alpha: true }); // Set alpha to true for transparent background
 renderer.setSize(700, 700); // Adjusted canvas size

 // Create Earth globe
 const geometry = new THREE.SphereGeometry(1, 64, 64); // Adjusted globe size and segments
 const textureLoader = new THREE.TextureLoader();
 const texture = textureLoader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg');
 const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
 const earth = new THREE.Mesh(geometry, material);
 earth.scale.set(3, 3, 3); // Adjusted scale of the mesh
 scene.add(earth);

 // Animation function
 function animate() {
   requestAnimationFrame(animate);
   earth.rotation.y += 0.005; // Rotate the globe
   renderer.render(scene, camera);
 }

 animate();