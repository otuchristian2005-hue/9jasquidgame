import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { createWorld } from "./world.js";


const game = {};

game.scene = new THREE.Scene();

game.scene.background =
    new THREE.Color(0x87ceeb);


game.camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
        window.innerHeight,
        0.1,
        1000
    );


game.renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: "high-performance"
    });


game.renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

game.renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

game.renderer.shadowMap.enabled = true;

document.body.appendChild(
    game.renderer.domElement
);


/* LIGHTING */

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        1.5
    );

game.scene.add(ambientLight);


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

game.scene.add(sunlight);


/* WORLD */

game.world =
    createWorld(game.scene);


/* CAMERA */

game.camera.position.set(
    0,
    6,
    18
);

game.camera.lookAt(
    game.world.spawnPoint
);


/* RESIZE */

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


/* LOADING */

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


/* GAME LOOP */

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


window.game = game;
