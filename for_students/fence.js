import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class fence extends GrObject {
    constructor() {
        let group = new T.Group();
        super(`Fence`, group);
        this.fence = group;
        let poleg = new T.CylinderGeometry(.2,.2, 8);
        let topg = new T.CylinderGeometry(.01, .2, .5);
        let topgateg = new T.BoxGeometry(.2, .2,10);
        let midgateg = new T.BoxGeometry(.1, 3.5, .1);
        this.top = new T.Mesh(topg, new T.MeshStandardMaterial({ color: "#444444" }));
        this.pole = new T.Mesh(poleg, new T.MeshStandardMaterial({ color: "#444444" }));
        this.topgate = new T.Mesh(topgateg, new T.MeshStandardMaterial({ color: "#444444" }));
        this.midgate = new T.Mesh(midgateg, new T.MeshStandardMaterial({ color: "#444444" }));
        this.fence.add(this.pole);
        this.pole.add(this.top);
        this.top.translateY(4.25);
        for (let i = 1; i< 40; i++) {
            this.fence.add(this.pole.clone().translateZ(.5*i));
        }
        for (let i = 1; i< 12; i++) {
            this.fence.add(this.pole.clone().translateZ(-.5*i));
        }
        this.topgate.translateZ(-10.5);
        this.fence.add(this.topgate);
        this.fence.add(this.topgate.clone().translateY(-3.5));
        this.midgate.position.set(0,-1.75,-5.5);
        for (let i = 0; i<50; i++) {
            this.fence.add(this.midgate.clone().translateZ(-.2*i));
        }
        for (let i = 1; i< 10; i++) {
            this.fence.add(this.pole.clone().translateZ(-.5*i-15));
        }
        this.fence.position.set(-3, 4,0);
    }
}