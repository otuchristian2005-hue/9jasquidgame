import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

import { createWorld } from "./world.js";

import {
    createPlayer,
    animatePlayer
} from "./player.js";


/* =========================
   GAME
========================= */

const game = {};


/* =========================
   SCENE
========================= */

game.scene =
    new THREE.Scene();

game.scene.background =
    new THREE.Color(0x87ceeb);


/* =========================
   CAMERA
========================= */

game.camera =
    new THREE.PerspectiveCamera(
        60,
        window.innerWidth /
        window.innerHeight,
        0.1,
        1000
    );


/* =========================
   RENDERER
========================= */

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


/* =========================
   LIGHTING
========================= */

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

game.scene.add(
    sunlight
);


/* =========================
   WORLD
========================= */

game.world =
    createWorld(
        game.scene
    );


/* =========================
   LOADING SCREEN
========================= */

const loadingProgress =
    document.getElementById(
        "loading-progress"
    );


if (loadingProgress) {

    loadingProgress.style.width =
        "50%";

}


/* =========================
   PLAYER
========================= */

createPlayer(
    game.scene,
    game.world.spawnPoint
)
.then(
    (player) => {

        game.player =
            player;


        /* Move loading bar */

        if (loadingProgress) {

            loadingProgress.style.width =
                "100%";

        }


        /* =========================
           CAMERA
        ========================= */

        game.camera.position.set(
            0,
            5,
            18
        );


        game.camera.lookAt(
            game.player.position.x,
            game.player.position.y + 1.2,
            game.player.position.z
        );


        /* =========================
           REMOVE LOADING SCREEN
        ========================= */

        setTimeout(
            () => {

                const loadingScreen =
                    document.getElementById(
                        "loading-screen"
                    );


                if (loadingScreen) {

                    loadingScreen.style.opacity =
                        "0";

                    loadingScreen.style.transition =
                        "opacity 0.5s ease";


                    setTimeout(
                        () => {

                            loadingScreen.remove();

                        },
                        500
                    );

                }

            },
            500
        );

    }
)
.catch(
    (error) => {

        console.error(
            "PLAYER ERROR:",
            error
        );

    }
);


/* =========================
   RESIZE
========================= */

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


/* =========================
   GAME LOOP
========================= */

const clock =
    new THREE.Clock();


function gameLoop() {

    requestAnimationFrame(
        gameLoop
    );


    const delta =
        clock.getDelta();


    if (game.player) {

        animatePlayer(
            game.player,
            false,
            delta
        );

    }


    game.renderer.render(
        game.scene,
        game.camera
    );

}


gameLoop();


/* =========================
   GLOBAL GAME
========================= */

window.game =
    game;
