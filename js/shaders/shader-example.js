var container;
var camera, scene, renderer;
var uniforms, material, mesh;

let width = 400;
let height = 400;

init();
var startTime = Date.now();
animate();


function init() {
    container = document.getElementById('container');
    
    camera = new THREE.Camera();
    camera.position.z = 1;
    
    scene = new THREE.Scene();
    
    uniforms = {
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() }
    };
    uniforms.resolution.value.x = width;
    uniforms.resolution.value.y = height;
    
    material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);
    
    renderer = new THREE.WebGLRenderer();
    container.appendChild(renderer.domElement);
    renderer.setSize(width, height);
}


function animate() {
    requestAnimationFrame(animate);
    render();
}


function render() {
    var elapsedMilliseconds = Date.now() - startTime;
    var elapsedSeconds = elapsedMilliseconds / 1000.;
    uniforms.time.value = 60. * elapsedSeconds;
    renderer.render(scene, camera);
}