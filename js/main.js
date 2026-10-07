import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


/* =========================================================
   GAME CORE
========================================================= */

const game = {};


/* =========================================================
   SCENE
========================================================= */

game.scene = new THREE.Scene();

game.scene.background =
    new THREE.Color(0x87ceeb);


/* =========================================================
   CAMERA
========================================================= */

game.camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
        window.innerHeight,
        0.1,
        1000
    );

game.camera.position.set(
    0,
    6,
    10
);


/* =========================================================
   RENDERER
========================================================= */

game.renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance"
    });


game.renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


game.renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


game.renderer.shadowMap.enabled = true;


document.body.appendChild(
    game.renderer.domElement
);


/* =========================================================
   LIGHTING
========================================================= */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.5
    );

game.scene.add(
    ambientLight
);


const sunlight =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );


sunlight.position.set(
    40,
    60,
    30
);


sunlight.castShadow = true;


sunlight.shadow.mapSize.width = 1024;
sunlight.shadow.mapSize.height = 1024;


game.scene.add(
    sunlight
);


/* =========================================================
   TEMPORARY TEST GROUND
========================================================= */

const groundGeometry =
    new THREE.PlaneGeometry(
        200,
        200
    );


const groundMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x65a83d
    });


const ground =
    new THREE.Mesh(
        groundGeometry,
        groundMaterial
    );


ground.rotation.x =
    -Math.PI / 2;


ground.receiveShadow = true;


game.scene.add(
    ground
);


/* =========================================================
   TEMPORARY TEST PLAYER
========================================================= */

const playerGeometry =
    new THREE.BoxGeometry(
        1.5,
        2,
        1
    );


const playerMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x7627d9
    });


game.player =
    new THREE.Mesh(
        playerGeometry,
        playerMaterial
    );


game.player.position.set(
    0,
    1,
    0
);


game.player.castShadow = true;


game.scene.add(
    game.player
);


/* =========================================================
   LOADING SCREEN
========================================================= */

const loadingProgress =
    document.getElementById(
        "loading-progress"
    );


if (loadingProgress) {

    loadingProgress.style.width =
        "100%";
}


setTimeout(() => {

    const loadingScreen =
        document.getElementById(
            "loading-screen"
        );

    if (loadingScreen) {

        loadingScreen.style.opacity =
            "0";

        loadingScreen.style.transition =
            "opacity 0.5s ease";

        setTimeout(() => {

            loadingScreen.remove();

        }, 500);
    }

}, 700);


/* =========================================================
   RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        game.camera.aspect =
            window.innerWidth /
            window.innerHeight;


        game.camera.updateProjectionMatrix();


        game.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);


/* =========================================================
   GAME LOOP
========================================================= */

function gameLoop() {

    requestAnimationFrame(
        gameLoop
    );


    game.renderer.render(
        game.scene,
        game.camera
    );

}


gameLoop();


/* =========================================================
   GLOBAL GAME OBJECT
========================================================= */

window.game = game;
