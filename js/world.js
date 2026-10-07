import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


/* =========================================================
   WORLD SYSTEM
========================================================= */

export function createWorld(scene) {

    const world = {};


    /* =====================================================
       GROUND
    ===================================================== */

    const groundGeometry =
        new THREE.PlaneGeometry(
            300,
            300
        );

    const groundMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x65a83d
        });

    world.ground =
        new THREE.Mesh(
            groundGeometry,
            groundMaterial
        );

    world.ground.rotation.x =
        -Math.PI / 2;

    world.ground.receiveShadow = true;

    scene.add(world.ground);


    /* =====================================================
       MAIN ROAD
    ===================================================== */

    const roadGeometry =
        new THREE.PlaneGeometry(
            24,
            300
        );

    const roadMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x303030
        });

    world.road =
        new THREE.Mesh(
            roadGeometry,
            roadMaterial
        );

    world.road.rotation.x =
        -Math.PI / 2;

    world.road.position.y =
        0.02;

    scene.add(world.road);


    /* =====================================================
       ROAD CENTER LINES
    ===================================================== */

    const lineMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xffffff
        });


    for (
        let z = -140;
        z <= 140;
        z += 12
    ) {

        const lineGeometry =
            new THREE.PlaneGeometry(
                0.5,
                6
            );

        const line =
            new THREE.Mesh(
                lineGeometry,
                lineMaterial
            );

        line.rotation.x =
            -Math.PI / 2;

        line.position.set(
            0,
            0.04,
            z
        );

        scene.add(line);
    }


    /* =====================================================
       BUILDING FUNCTION
    ===================================================== */

    function createBuilding(
        x,
        z,
        width,
        height,
        depth,
        color
    ) {

        const buildingGeometry =
            new THREE.BoxGeometry(
                width,
                height,
                depth
            );


        const buildingMaterial =
            new THREE.MeshStandardMaterial({
                color: color
            });


        const building =
            new THREE.Mesh(
                buildingGeometry,
                buildingMaterial
            );


        building.position.set(
            x,
            height / 2,
            z
        );


        building.castShadow = true;

        building.receiveShadow = true;


        scene.add(building);


        return building;
    }


    /* =====================================================
       CITY BUILDINGS
    ===================================================== */

    createBuilding(
        -30,
        -25,
        14,
        10,
        16,
        0xb86545
    );


    createBuilding(
        30,
        -45,
        16,
        14,
        18,
        0x777777
    );


    createBuilding(
        -30,
        25,
        15,
        12,
        18,
        0xd29a45
    );


    createBuilding(
        30,
        35,
        18,
        16,
        20,
        0x6f78a0
    );


    createBuilding(
        -30,
        65,
        15,
        9,
        17,
        0x985a4b
    );


    createBuilding(
        30,
        75,
        17,
        13,
        20,
        0x858585
    );


    /* =====================================================
       STREET LIGHTS
    ===================================================== */

    function createStreetLight(
        x,
        z
    ) {

        const poleGeometry =
            new THREE.CylinderGeometry(
                0.08,
                0.08,
                5,
                8
            );

        const poleMaterial =
            new THREE.MeshStandardMaterial({
                color: 0x202020
            });

        const pole =
            new THREE.Mesh(
                poleGeometry,
                poleMaterial
            );

        pole.position.set(
            x,
            2.5,
            z
        );

        pole.castShadow = true;

        scene.add(pole);


        const lightGeometry =
            new THREE.SphereGeometry(
                0.25,
                8,
                8
            );

        const lightMaterial =
            new THREE.MeshBasicMaterial({
                color: 0xffdd88
            });

        const lamp =
            new THREE.Mesh(
                lightGeometry,
                lightMaterial
            );

        lamp.position.set(
            x,
            5.1,
            z
        );

        scene.add(lamp);
    }


    for (
        let z = -120;
        z <= 120;
        z += 25
    ) {

        createStreetLight(
            -15,
            z
        );

        createStreetLight(
            15,
            z
        );
    }


    /* =====================================================
       BILLBOARD
    ===================================================== */

    const billboardPostGeometry =
        new THREE.BoxGeometry(
            0.5,
            7,
            0.5
        );

    const billboardPostMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x202020
        });


    const billboardPost =
        new THREE.Mesh(
            billboardPostGeometry,
            billboardPostMaterial
        );

    billboardPost.position.set(
        8,
        3.5,
        -15
    );

    billboardPost.castShadow = true;

    scene.add(
        billboardPost
    );


    const billboardGeometry =
        new THREE.BoxGeometry(
            12,
            5,
            0.4
        );

    const billboardMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x171717
        });


    const billboard =
        new THREE.Mesh(
            billboardGeometry,
            billboardMaterial
        );

    billboard.position.set(
        8,
        7,
        -15
    );

    billboard.castShadow = true;

    scene.add(
        billboard
    );


    /* =====================================================
       WORLD DATA
    ===================================================== */

    world.spawnPoint =
        new THREE.Vector3(
            0,
            0,
            10
        );


    world.cityName =
        "9ja City";


    world.country =
        "Nigeria";


    return world;
}
