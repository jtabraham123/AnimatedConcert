import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class stage extends GrObject {
    constructor() {
        let group = new T.Group();
        super(`Stage`, group);
        let bottomg = new T.BoxGeometry(12, 1, 5);
        this.bottom = new T.Mesh(bottomg, new T.MeshStandardMaterial({ color: "#964B00"}));
        this.stage = group;
        this.stage.add(this.bottom);
        let backg = new T.BoxGeometry(12, 10, .5);
        this.back = new T.Mesh(backg, new T.MeshStandardMaterial({ color: "#654321"}));
        this.stage.add(this.back);
        this.back.position.set(0, 4.5,2.75);
        let poleg = new T.CylinderGeometry(.2, .2, 9);
        this.pole1 = new T.Mesh(poleg, new T.MeshStandardMaterial({ color: "#964B00"}));
        this.pole2 = new T.Mesh(poleg, new T.MeshStandardMaterial({ color: "#964B00"}));
        this.stage.add(this.pole1);
        this.stage.add(this.pole2);
        this.pole1.position.set(5.5,5,-2);
        this.pole2.position.set(-5.5,5,-2);
        let topg = new T.BoxGeometry(12, .5, 5.5);
        this.top = new T.Mesh(topg, new T.MeshStandardMaterial({ color: "#654321"}));
        this.stage.add(this.top);
        this.top.position.set(0,9.75,.25);
        this.stage.position.set(10,.5,15);
    }
}