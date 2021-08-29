let scene, camera, render, vortexParticles = [] ;
const colorVortex = 0xa82b22;
initScene();
function initScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight,1 , 1000);
    camera.position.z = 500;
    scene.add(camera);

    sceneLigth = new THREE.DirectionalLight(0x00d5ff,0.5);
    sceneLigth.position.set(0,0,1000);
    scene.add(sceneLigth);

    vortexLigth = new THREE.PointLight(colorVortex,30,500,1.7);
    vortexLigth.position.set(0,0,100)
    scene.add(vortexLigth);

    render = new THREE.WebGLRenderer();
    render.setClearColor(0x969696,1);
    render.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(render.domElement);
    vortex();
}

function vortex() {
    let loader = new THREE.TextureLoader();
    loader.load('smoke.png',(texture) => {
        let vortexGeometry = new THREE.PlaneBufferGeometry(350,350);
        let vortexMaterial = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true
        });
        


        for (let index = 0; index < 800 ; index++) {
            let t = Math.random()*10;
            let a = Math.random()*10;
            let x = a + Math.cos(t);
            let y = a*Math.tan(t) + Math.sin(t);
            let particle = new THREE.Mesh(vortexGeometry,vortexMaterial);
            particle.position.set(
                x,
                y,
                Math.PI,
                // 0.5 * index * Math.sin(4 * index * Math.PI/180),
                // 0.5 * index * Math.cos(4 * index * Math.PI/180),
            );
            particle.rotation.z = Math.random()*360;
            vortexParticles.push(particle);
            scene.add(particle);
        }
        clock = new THREE.Clock();
        animation();
    });
}

function animation() {
    let delta = clock.getDelta();
    vortexParticles.forEach(p => {
        console.log()
        p.rotation.z -= delta * 1.5;
    });

    render.render(scene,camera);
    requestAnimationFrame(animation);

}

