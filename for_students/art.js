import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

export class art extends GrObject {
    constructor(params = {}) {
        let group = new T.Group();
        super(`Artwork`, group);
        let coneg = new T.CylinderGeometry(.5, 1, 4);
        this.cone = new T.Mesh(coneg, new T.MeshStandardMaterial({ color: "yellow"}));
        this.art = group;
        this.art.add(this.cone);
        let sphereg = new T.SphereGeometry(1.5);
        this.circles = params.circles;
        let shaderMat = shaderMaterial("./art.vs", "./art.fs", {
          side: T.DoubleSide,
            uniforms: {circles: {value: this.circles},
            light: { value: new T.Vector3(0, 0, 0) },
            dark: { value: new T.Vector3(1, 1, 0) },
          }});
        this.sphere = new T.Mesh(sphereg, shaderMat);
        this.sphere.position.set(0,3.5,0);
        this.art.add(this.sphere);
        this.art.position.set(0,2,0);
        this.time = 0;
    }
    stepWorld(delta) {
        let deltaSlowed = delta / 200;
        this.sphere.material.needsUpdate = false;
        this.time += deltaSlowed;
        this.sphere.rotateY(deltaSlowed);
        this.sphere.rotateX(deltaSlowed/20);
        this.sphere.rotateZ(deltaSlowed/10);
        if (Math.floor(this.time/10) >= 1) {
            this.circles++;
            this.sphere.material = shaderMaterial("./art.vs", "./art.fs", {
              side: T.DoubleSide,
                uniforms: {circles: {value: this.circles},
                light: { value: new T.Vector3(0, 0, 0) },
                dark: { value: new T.Vector3(1, 1, 0) },
              }});
            this.time = 0;
        }
        if(this.circles >= 16) {
          this.circles = 3;
        }
    }
}