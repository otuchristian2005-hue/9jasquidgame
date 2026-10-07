import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


export function createPlayer(scene, spawnPoint) {

    const player = new THREE.Group();

    player.name = "Player";


    /* =========================
       MATERIALS
    ========================= */

    const skinMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x6b3f2a,
            roughness: 0.8
        });


    const hoodieMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x17151d,
            roughness: 0.75
        });


    const purpleMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x7b2cff,
            roughness: 0.65
        });


    const pantsMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111116,
            roughness: 0.85
        });


    const whiteMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xf2f2f2,
            roughness: 0.7
        });


    const shoePurpleMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x6f2cff,
            roughness: 0.6
        });


    const hairMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x090706,
            roughness: 1
        });


    const metalMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xd7d7d7,
            metalness: 0.8,
            roughness: 0.25
        });


    /* =========================
       BODY
    ========================= */

    const body =
        new THREE.Mesh(
            new THREE.CapsuleGeometry(
                0.48,
                0.75,
                8,
                16
            ),
            hoodieMaterial
        );

    body.position.y = 1.65;

    body.scale.set(
        0.95,
        1.05,
        0.65
    );

    body.castShadow = true;

    player.add(body);


    /* =========================
       WHITE SHIRT UNDER HOODIE
    ========================= */

    const shirt =
        new THREE.Mesh(
            new THREE.CylinderGeometry(
                0.43,
                0.43,
                0.18,
                16
            ),
            whiteMaterial
        );

    shirt.position.y = 1.27;

    player.add(shirt);


    /* =========================
       HEAD
    ========================= */

    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.38,
                24,
                24
            ),
            skinMaterial
        );

    head.position.y = 2.55;

    head.scale.set(
        0.92,
        1.05,
        0.9
    );

    head.castShadow = true;

    player.add(head);


    /* =========================
       HAIR
    ========================= */

    const hair =
        new THREE.Group();

    hair.position.set(
        0,
        2.82,
        0
    );


    for (
        let i = 0;
        i < 16;
        i++
    ) {

        const curl =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.13,
                    8,
                    8
                ),
                hairMaterial
            );

        const angle =
            (i / 16) *
            Math.PI * 2;

        const radius =
            0.28 +
            Math.random() * 0.08;

        curl.position.set(
            Math.cos(angle) * radius,
            Math.random() * 0.14,
            Math.sin(angle) * radius
        );

        curl.castShadow = true;

        hair.add(curl);
    }


    const topHair =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.31,
                12,
                12
            ),
            hairMaterial
        );

    topHair.position.y = 0.05;

    hair.add(topHair);

    player.add(hair);


    /* =========================
       EYES
    ========================= */

    const eyeMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111111,
            roughness: 0.4
        });


    const leftEye =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.035,
                8,
                8
            ),
            eyeMaterial
        );

    leftEye.position.set(
        -0.13,
        2.57,
        0.35
    );


    const rightEye =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.035,
                8,
                8
            ),
            eyeMaterial
        );

    rightEye.position.set(
        0.13,
        2.57,
        0.35
    );

    player.add(
        leftEye,
        rightEye
    );


    /* =========================
       HOOD
    ========================= */

    const hood =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.39,
                0.08,
                8,
                20,
                Math.PI
            ),
            hoodieMaterial
        );

    hood.rotation.x =
        Math.PI / 2;

    hood.position.set(
        0,
        2.25,
        -0.05
    );

    player.add(hood);


    /* =========================
       ARMS
    ========================= */

    function createArm(x) {

        const arm =
            new THREE.Group();

        arm.position.set(
            x,
            1.72,
            0
        );


        const sleeve =
            new THREE.Mesh(
                new THREE.CapsuleGeometry(
                    0.14,
                    0.55,
                    6,
                    12
                ),
                hoodieMaterial
            );

        sleeve.rotation.z =
            x > 0
                ? -0.15
                : 0.15;

        sleeve.castShadow = true;

        arm.add(sleeve);


        const hand =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    0.14,
                    12,
                    12
                ),
                skinMaterial
            );

        hand.position.y =
            -0.42;

        hand.castShadow = true;

        arm.add(hand);


        player.add(arm);

        return arm;
    }


    const leftArm =
        createArm(-0.62);

    const rightArm =
        createArm(0.62);


    /* =========================
       LEGS
    ========================= */

    function createLeg(x) {

        const leg =
            new THREE.Group();

        leg.position.set(
            x,
            0.95,
            0
        );


        const pants =
            new THREE.Mesh(
                new THREE.CapsuleGeometry(
                    0.18,
                    0.62,
                    6,
                    12
                ),
                pantsMaterial
            );

        pants.castShadow = true;

        leg.add(pants);


        /* Cargo pocket */

        const pocket =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.18,
                    0.25,
                    0.05
                ),
                purpleMaterial
            );

        pocket.position.set(
            x > 0 ? -0.18 : 0.18,
            0,
            0.17
        );

        leg.add(pocket);


        player.add(leg);

        return leg;
    }


    const leftLeg =
        createLeg(-0.25);

    const rightLeg =
        createLeg(0.25);


    /* =========================
       SNEAKERS
    ========================= */

    function createShoe(x) {

        const shoe =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.34,
                    0.18,
                    0.58
                ),
                shoePurpleMaterial
            );

        shoe.position.set(
            x,
            0.42,
            0.10
        );

        shoe.castShadow = true;

        player.add(shoe);


        const sole =
            new THREE.Mesh(
                new THREE.BoxGeometry(
                    0.36,
                    0.07,
                    0.61
                ),
                whiteMaterial
            );

        sole.position.set(
            x,
            0.32,
            0.10
        );

        player.add(sole);
    }


    createShoe(-0.25);
    createShoe(0.25);


    /* =========================
       BACKPACK
    ========================= */

    const backpack =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.62,
                0.75,
                0.25
            ),
            hoodieMaterial
        );

    backpack.position.set(
        0,
        1.65,
        -0.48
    );

    backpack.castShadow = true;

    player.add(backpack);


    /* Backpack purple detail */

    const backpackDetail =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.22,
                0.16,
                0.03
            ),
            purpleMaterial
        );

    backpackDetail.position.set(
        0,
        1.65,
        -0.62
    );

    player.add(
        backpackDetail
    );


    /* =========================
       NECKLACE
    ========================= */

    const necklace =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                0.16,
                0.015,
                6,
                20
            ),
            metalMaterial
        );

    necklace.rotation.x =
        Math.PI / 2;

    necklace.position.set(
        0,
        2.29,
        0.18
    );

    player.add(
        necklace
    );


    /* =========================
       PURPLE SLEEVE DETAILS
    ========================= */

    const leftStripe =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.035,
                0.4,
                0.03
            ),
            purpleMaterial
        );

    leftStripe.position.set(
        -0.73,
        1.72,
        0.13
    );


    const rightStripe =
        leftStripe.clone();

    rightStripe.position.x =
        0.73;

    player.add(
        leftStripe,
        rightStripe
    );


    /* =========================
       PLAYER DATA
    ========================= */

    player.userData = {

        speed: 0.08,

        jumpStrength: 0.22,

        gravity: 0.012,

        verticalVelocity: 0,

        isJumping: false,

        leftArm,

        rightArm,

        leftLeg,

        rightLeg,

        walkTime: 0

    };


    /* =========================
       SPAWN
    ========================= */

    if (spawnPoint) {

        player.position.copy(
            spawnPoint
        );

    } else {

        player.position.set(
            0,
            0,
            10
        );

    }


    scene.add(player);


    return player;
}


/* ==================================
   PLAYER ANIMATION
================================== */

export function animatePlayer(
    player,
    moving,
    delta
) {

    if (!player) return;


    const data =
        player.userData;


    if (moving) {

        data.walkTime +=
            delta * 8;

        const swing =
            Math.sin(
                data.walkTime
            ) * 0.55;

        data.leftArm.rotation.x =
            swing;

        data.rightArm.rotation.x =
            -swing;

        data.leftLeg.rotation.x =
            -swing;

        data.rightLeg.rotation.x =
            swing;

    } else {

        data.leftArm.rotation.x *=
            0.85;

        data.rightArm.rotation.x *=
            0.85;

        data.leftLeg.rotation.x *=
            0.85;

        data.rightLeg.rotation.x *=
            0.85;

    }


    /* =========================
       JUMP PHYSICS
    ========================= */

    if (data.isJumping) {

        data.verticalVelocity -=
            data.gravity;

        player.position.y +=
            data.verticalVelocity;


        if (
            player.position.y <= 0
        ) {

            player.position.y = 0;

            data.verticalVelocity = 0;

            data.isJumping = false;

        }

    }

}


export function jumpPlayer(
    player
) {

    if (!player) return;


    const data =
        player.userData;


    if (!data.isJumping) {

        data.verticalVelocity =
            data.jumpStrength;

        data.isJumping = true;

    }

}
