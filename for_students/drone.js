import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

export class drone extends GrObject {
    constructor(params = {}) {
        let group = new T.Group();
        super(`Drone`, group);
        this.drone = group;
        this.drone.position.set(-10,-1.75,5);
        let coneGeom = new T.ConeGeometry(.5, 2, 16);
        let body = new T.CylinderGeometry(.5, .5, 2, 16);
        let camg = new T.BoxGeometry(.3,.3,.3);
        let arm = new T.CylinderGeometry(.1, .1, 2, 16);
        let handle = new T.CylinderGeometry(.1,.1, .7, 16);
        let prop = new T.CylinderGeometry(.05,.05, 2, 16);
        let tempMaterial = new T.MeshStandardMaterial({ color: "#444444" });
        let greenMaterial = new T.MeshStandardMaterial({ color: "#FF0000" });
        this.front = new T.Mesh(coneGeom, tempMaterial);
        this.bodyMesh = new T.Mesh(body, tempMaterial);
        this.armMesh = new T.Mesh(arm, tempMaterial);
        this.cam = new T.Mesh(camg, tempMaterial);
        this.handleMesh = new T.Mesh(handle, tempMaterial);
        this.propMesh = new T.Mesh(prop, greenMaterial);
        this.arm2 = this.armMesh.clone();
        this.arm3 = this.armMesh.clone();
        this.arm4 = this.armMesh.clone();
        this.handle2 = this.handleMesh.clone();
        this.handle3 = this.handleMesh.clone();
        this.handle4 = this.handleMesh.clone();
        this.prop2 = this.propMesh.clone();
        this.prop3 = this.propMesh.clone();
        this.prop4 = this.propMesh.clone();
        this.drone.add(this.front);
        this.front.scale.set(0.5, 0.5, 0.5);
        this.front.rotation.set(Math.PI/2,0,0);
        this.front.position.y = 2;
        this.front.add(this.bodyMesh);
        this.front.add(this.cam);
        this.cam.rotateX(-Math.PI/2);
        this.rideable = this.cam;
        this.bodyMesh.position.y = -2;
        this.bodyMesh.add(this.armMesh);
        this.armMesh.position.x = 1;
        this.armMesh.position.y = -1;
        this.armMesh.rotation.set(0,0,Math.PI/4);
        this.bodyMesh.add(this.arm2);
        this.arm2.rotation.set(0,0,-Math.PI/4);
        this.arm2.position.y = 1.5;
        this.arm2.position.x = 1;
        this.arm2.add(this.arm3);
        this.arm3.rotation.set(0,0,Math.PI/2);
        this.arm3.position.x = -1.5;
        this.arm3.position.y = -1.4;
        this.armMesh.add(this.arm4);
        this.arm4.rotation.set(0,0,-Math.PI/2);
        this.arm4.position.x = -1.5;
        this.arm4.position.y = 1.4;
        this.armMesh.add(this.handleMesh);
        this.handleMesh.rotation.set(-Math.PI/2,0,0);
        this.handleMesh.position.y = -1;
        this.handleMesh.position.z = -.3;
        this.arm2.add(this.handle2);
        this.handle2.rotation.set(-Math.PI/2,0,0);
        this.handle2.position.y = 1;
        this.handle2.position.z = -.3;
        this.arm3.add(this.handle3);
        this.handle3.rotation.set(-Math.PI/2,0,0);
        this.handle3.position.y = 1;
        this.handle3.position.z = -.3;
        this.arm4.add(this.handle4);
        this.handle4.rotation.set(-Math.PI/2,0,0);
        this.handle4.position.y = -1;
        this.handle4.position.z = -.3;
        this.handleMesh.add(this.propMesh);
        this.propMesh.rotation.set(Math.PI/2,0,0);
        this.propMesh.position.y = .35;
        this.handle2.add(this.prop2);
        this.prop2.rotation.set(Math.PI/2,0,0);
        this.prop2.position.y = .35;
        this.handle3.add(this.prop3);
        this.prop3.rotation.set(Math.PI/2,0,0);
        this.prop3.position.y = .35;
        this.handle4.add(this.prop4);
        this.prop4.rotation.set(Math.PI/2,0,0);
        this.prop4.position.y = .35;
        this.state = 0;
        this.timespent = 0;
        this.run = 0;
    }
    stepWorld(delta) {
        let deltaSlowed = delta/100;
        this.propMesh.rotateZ(deltaSlowed*2);
        this.prop2.rotateZ(deltaSlowed*2);
        this.prop3.rotateZ(deltaSlowed*2);
        this.prop4.rotateZ(deltaSlowed*2);
        this.sat = 0;
        switch (this.state) {
            case 0:
                if (this.drone.position.y <= 4.5) {
                    this.drone.translateY(deltaSlowed/3);
                }
                else {
                    this.sat++;
                }
                if (this.drone.rotation.y >=0) {
                    this.drone.rotateY(deltaSlowed/10);
                }
                else {
                    this.sat++;
                }
                if (this.sat == 2) {
                    this.state = 1;
                }
                break;
            case 1:
                if (this.drone.position.z >= -10) {
                    this.drone.translateZ(deltaSlowed/3);
                }
                else {
                    if (this.drone.rotation.y <= Math.PI/2.1) {
                        this.drone.rotateY(-deltaSlowed/10);
                    }
                    else {this.sat = 1;}
                }
                if (this.sat == 1) {
                    this.state = 2;
                }
                break;
            case 2:
                if (this.drone.position.x <=10) {
                    this.drone.translateZ(deltaSlowed/3);
                }
                else {
                    if (this.drone.rotation.y >= 0) {
                        this.drone.rotateY(-deltaSlowed/10);
                    }
                    else {
                        this.state = 3;
                    }
                }
                break;
            case 3:
                console.log(this.drone.position.x);
                if (this.drone.rotation.y>=-Math.PI/8) {
                    this.drone.rotateY(-deltaSlowed/10);
                }
                else {
                    if (this.drone.position.z <=4) {
                        this.drone.translateZ(deltaSlowed/3);
                    }
                    else {
                        this.state = 4;
                    }
                }
                break;
            case 4:
                if (this.drone.rotation.y <= Math.PI/6.5) {
                    this.drone.rotateY(deltaSlowed/10);
                }
                else {
                    if (this.drone.rotation.x <= Math.PI/10) {
                        this.drone.rotateX(deltaSlowed/10);
                    }
                    else {
                        this.timespent += deltaSlowed;
                    }
                    if (this.timespent >= 100) {
                        this.state = 5;
                        this.timespent = 0;
                    }
                }
                break;
            case 5:
                if (this.drone.rotation.x > 0) {
                    this.drone.rotateX(-deltaSlowed/10);
                }
                else {
                    //set to proper rotation so it doesnt head toward stage
                    this.run++;
                    if (this.run == 1) {
                        this.drone.rotation.set(0,Math.PI/6.5,0);
                    }
                    if (this.drone.rotation.y <= Math.PI/2.1) {
                        this.drone.rotateY(deltaSlowed/10);
                    }
                    else {
                        this.drone.rotation.set(0,Math.PI/2,0);
                        this.state = 6;
                        this.run = 0;
                    }
                }
                break;
            case 6:
                if (this.drone.position.x <= 14.85) {
                    this.drone.translateZ(deltaSlowed/3);
                }
                else {
                    if (this.drone.rotation.y >= -Math.PI/6) {
                        this.drone.rotateY(-deltaSlowed/10);
                    }
                    else {
                        if (this.drone.rotation.x <= Math.PI/10) {
                            this.drone.rotateX(deltaSlowed/10);
                        }
                        else {
                            this.timespent += deltaSlowed;
                        }
                        if (this.timespent >= 100) {
                            this.state = 7;
                            this.timespent = 0;
                        }
                    }
                }
                break;
            case 7:
                if (this.drone.rotation.x > 0) {
                    this.drone.rotateX(-deltaSlowed/10);
                }
                else {
                    this.run++;
                    if (this.run == 1) {
                        this.drone.rotation.set(0,-Math.PI/6,0);
                    }
                    if (this.drone.rotation.y >= -Math.PI/2.1) {
                        this.drone.rotateY(-deltaSlowed/10);
                    }
                    else {
                        this.drone.rotation.set(0,-Math.PI/2,0);
                        if (this.drone.position.x >= 3.45) {
                            this.drone.translateZ(deltaSlowed/3);
                        }
                        else {
                            this.run = 0;
                            this.state = 4;
                        }
                    }
                }
        }
    }
}