import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js'

//STANDARD SETUP
    const scene = new THREE.Scene(); //nieuwe 3D scene aanmaken

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //360deg POV , resolution, what is and what isn't visible

    camera.position.setZ(30); //verplaats camera op Z-as

    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg'),
    });// bring 3D objects to the scene

    renderer.setPixelRatio( window.devicePixelRatio);
    renderer.setSize ( window.innerWidth, window.innerHeight);//grootte van canvas (in dit geval full screen)

    renderer.render( scene, camera); //commando om objecten te renderen
//BACKGROUND
    const spaceTexture = new THREE.TextureLoader().load('space.jpg');
    scene.background = spaceTexture;
    //load a background image

//HELPERS
    /*const gridHelper = new THREE.GridHelper(200, 50);
       scene.add(gridHelper)*/

//OBJECTS
    const geometry = new THREE.IcosahedronGeometry(10, 3, 16, 100)//build in 3D vormen
    const earthTexture = new THREE.TextureLoader().load('earth.jpg');
    const material = new THREE.MeshStandardMaterial({map: earthTexture});
    const torus = new THREE.Mesh( geometry, material);// link mat aan vorm.

    scene.add(torus) //voeg object toe aan de scene;

    //random generation for multiple objects
        function addStar(){
            const geometry = new THREE.SphereGeometry(0.25, 24, 24);
            const material = new THREE.MeshStandardMaterial ({ color:0xffffff})
            const star = new THREE.Mesh (geometry, material);

            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );//genereren van random posities aan de scene

            star.position.set(x, y, z);//genereren van random positie's voor sterren
            scene.add(star)//sterren toevoegen aan de scene
        }
        Array(200).fill().forEach(addStar)//generating stars

    //TEXTURE MAPPING
    const zachTexture = new THREE.TextureLoader().load('zach.png');
        // aanmaken van de texture
        const zach = new THREE.Mesh(//maken van een object
            new THREE.BoxGeometry(3,3,3),
            new THREE.MeshBasicMaterial({ map:zachTexture})
        );
            zach.position.z += 25;
            zach.position.y += 10;
            zach.rotation.x += 5;
            zach.rotation.z += 5;//basis positie/rotatie van een object aanpassen
            
            scene.add(zach);
        //texture + height mapping 
        const MoonTexture = new THREE.TextureLoader().load('moon.jpg');//kleur
        const normalTexture = new THREE.TextureLoader().load('normal.jpg');
    //height map
        const moon = new THREE.Mesh(
            new THREE.SphereGeometry(3, 32,32),
            new THREE.MeshStandardMaterial( {
                map: MoonTexture,
                normalMap: normalTexture
            })
        );
        moon.position.z += 25;
        moon.position.y += 10;
        scene.add(moon);
    
//LIGHTS

    const pointlight = new THREE.PointLight(0xffffff)//pointlight = lightbulb
    pointlight.position.set(15,15,35)

    //const ambientLight = new THREE.AmbientLight(0xffffff);

    scene.add(pointlight)

//ORBITCONTROLS
function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.001;//infinite animation's
    torus.rotation.y += 0.001;
    torus.rotation.z += 0.001;

    renderer.render( scene, camera);
}
//SCROLL Animatie

function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    torus.position.z = 0.05
    camera.position.y = t * 0.01
    camera.position.x = t * 0.005
    if (t == -1641) {
        document.querySelector("main").style.visibility = "hidden";
        document.title ="Z W 🌍" //change docu.title
      }
    else{
        document.querySelector("main").style.visibility = "visible";
        document.title ="Zach's World 🌍" // change docu. title
    }
}

document.body.onscroll = moveCamera
animate()

