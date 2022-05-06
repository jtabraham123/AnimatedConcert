// @ts-check

import { person } from "../for_students/person.js";
import {art} from "./art.js";
import { stage } from "./stage.js";
import { drone } from "./drone.js";
import {fence} from "./fence.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { Color, RGB_ETC1_Format } from "../libs/CS559-Three/build/three.module.js";

export function main2(world) {
    world.add(new person({tshirt: "#FF0000", x: 10, y:.85, z:1, shorts: "#458900", skin: "#8d5524", fan:true}));
    world.add(new person({tshirt: "#48007F", x: 12, y:.85, z:1, shorts:"#0F03FF", skin: "#c68642", fan:true}));
    world.add(new person({tshirt: "#07110A", x: 11, y:.85, z:4, shorts:"#48007F", skin: "#f1c27d", fan:true}));
    world.add(new person({tshirt: "#0A0B0F", x: 10, y:.85, z:4, shorts:"#0099FF", skin: "#8d5524", fan:true}));
    world.add(new person({tshirt: "#0099FF", x: 15, y:.85, z:3, shorts:"#0A0B0F", skin: "#c68642", fan:true}));
    world.add(new person({tshirt: "#0099FF", x: 13, y:.85, z:2, shorts:"#330F0F", skin: "#8d5524", fan:true}));
    world.add(new person({tshirt: "#0A0B0F", x: 9, y:.85, z:4, shorts:"#4809FF", skin: "#c68642", fan:true}));
    world.add(new person({tshirt: "#FF0000", x: 7, y:.85, z:3, shorts:"#07110A", skin: "#c68642", fan:true}));
    world.add(new person({tshirt: "#48007F", x: 6, y:.85, z:5, shorts:"#10FF11", skin: "#e0ac69", fan:true}));
    world.add(new person({tshirt: "#07110A", x: 10, y:1.85, z:15, shorts:"#FF9011", skin: "#e0ac69", rot: Math.PI,
    playing:true}));
    world.add(new person({tshirt: "#111111", x: -5, y:.85*1.5, z:-11, shorts:"#0000FF", skin: "#8d5524", rot: -Math.PI/2, security:true}));
    world.add(new person({tshirt: "#111111", x: -5, y:.85*1.5, z:-13, shorts:"#0000FF", skin: "#ffdbac", rot: -Math.PI/2, security:true}));
    world.add(new person({tshirt: "#111111", x: -5, y:.85*1.5, z:-9, shorts:"#0000FF", skin: "#c68642", rot: -Math.PI/2, security:true}));
    world.add(new art({circles:3}));
    world.add(new stage());
    world.add(new drone());
    world.add(new fence());
    /** @type {T.Object3D} */ let guitar;
    /** @type {OBJLoader} */ const guitarload = new OBJLoader();
    guitarload.load('./guitar2.obj', function (obj) {
        guitar = obj;
        // Set the position and scale of the object
        obj.position.set(10, 1.5, 15.25);
        obj.rotateY(Math.PI/2);
        obj.rotateZ(-Math.PI/2);
        obj.rotateY(Math.PI/20);
        obj.rotateZ(Math.PI/20);
        obj.translateX(.1);
        obj.translateZ(-.2);
        obj.scale.set(.3,.3,.3);
        world.scene.add(obj);
        (obj.children[0]).material.color.set("#FF0000");
        (obj.children[1]).material.color.set("black");
      });
      let map = new T.CubeTextureLoader().setPath( './images/' ).load([
        'Park_Right.png',
        'Park_Left.png',
        'Park_Top.png',
        'Park_Front.png',
        'Park_Back.png',
        'Park_Bottom.png'
    ]);
    world.scene.background = map;
}