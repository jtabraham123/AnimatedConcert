// @ts-check


import * as T from "../libs/CS559-Three/build/three.module.js";
import { GrObject } from "../libs/CS559-Framework/GrObject.js";

let personcount = 0;
export class person extends GrObject {
    constructor(params = {}) {
        let group = new T.Group();
        super(`Person-${++personcount}`, group);
        this.person = group;
        let bodygeom = new T.BoxGeometry(.4, .6, .2);
        this.body = new T.Mesh(bodygeom, new T.MeshStandardMaterial({ color: params.tshirt}));
        this.person.add(this.body);
        let waistg = new T.BoxGeometry(.4, .1, .2);
        this.waist = new T.Mesh(waistg, new T.MeshStandardMaterial({ color: params.shorts}));
        this.body.add(this.waist);
        this.waist.position.set(0, -.35,0);
        let legg = new T.CylinderGeometry(.07, .07, .5, 7);
        this.leg1 = new T.Mesh(legg, new T.MeshStandardMaterial({ color: params.shorts}));
        this.leg2 = new T.Mesh(legg, new T.MeshStandardMaterial({ color: params.shorts}));
        this.body.add(this.leg1);
        this.body.add(this.leg2);
        this.leg1.position.set(.1,-.5,0);
        this.leg2.position.set(-.1,-.5,0);
        let shoeg = new T.BoxGeometry(.1, .1, .2);
        this.shoe1 = new T.Mesh(shoeg ,new T.MeshStandardMaterial({ color: "black"}));
        this.shoe2 = new T.Mesh(shoeg ,new T.MeshStandardMaterial({ color: "black"}));
        this.leg1.add(this.shoe1);
        this.leg2.add(this.shoe2);
        this.shoe1.position.set(0,-.3,.05);
        this.shoe2.position.set(0,-.3,.05);
        let upperarmg = new T.CylinderGeometry(.06, .06, .4, 7);
        this.upperarm1 = new T.Mesh(upperarmg, new T.MeshStandardMaterial({ color: params.tshirt}));
        this.upperarm2 = new T.Mesh(upperarmg, new T.MeshStandardMaterial({ color: params.tshirt}));
        this.body.add(this.upperarm1);
        this.body.add(this.upperarm2);
        this.upperarm1.position.set(.3,.1,0);
        this.upperarm2.position.set(-.3,.1,0);
        this.upperarm1.rotation.set(0,0,Math.PI/4);
        this.upperarm2.rotation.set(0,0,-Math.PI/4);
        let lowerarmg = new T.CylinderGeometry(.06, .06, .25, 7);
        this.lowerarm1 = new T.Mesh(lowerarmg, new T.MeshStandardMaterial({ color: params.skin}));
        this.lowerarm2 = new T.Mesh(lowerarmg, new T.MeshStandardMaterial({ color: params.skin}));
        this.upperarm1.add(this.lowerarm1);
        this.upperarm2.add(this.lowerarm2);
        this.lowerarm1.position.set(0,-.325,0);
        this.lowerarm2.position.set(0,-.325,0);
        let neckg = new T.CylinderGeometry(.08, .08, .1, 7);
        this.neck = new T.Mesh(neckg, new T.MeshStandardMaterial({ color: params.skin}));
        this.body.add(this.neck);
        this.neck.position.set(0, .35,0);
        let headg = new T.SphereGeometry(.15);
        this.head = new T.Mesh(headg, new T.MeshStandardMaterial({ color: params.skin}));
        this.neck.add(this.head);
        this.head.position.set(0, .13,0);
        this.x = params.x;
        this.y = params.y;
        this.z = params.z;
        if (params.security) {
            this.person.scale.set(1.5,1.5,1.5);
        }
        this.person.position.set(params.x, params.y, params.z);
        if (params.rot) {
        this.person.rotation.set(0,params.rot,0);
        }
        this.playing = params.playing;
        this.fan = params.fan;
        if (params.playing) {
            this.upperarm1.rotateX(-Math.PI/8);
            this.upperarm2.rotateZ(Math.PI/8);
            this.upperarm2.rotateX(-Math.PI/6);
            this.upperarm2.translateX(.1);
        }
        this.counter = 0;
        this.run = 0;
        this.run2 = 0;
        this.action1 = 0;
        this.action2 = 0;
        this.waydown = false;
        this.counter2 = 0;
    }
    stepWorld(delta) {
        if(this.playing) {
            let deltaSlowed = delta / 200;
            let action = Math.random();
            if (action <.5) {
                if (this.counter < .5) {
                this.upperarm1.translateX(deltaSlowed/10);
                this.lowerarm1.translateX(deltaSlowed/30);
                this.lowerarm1.rotateZ(deltaSlowed/5);
                this.lowerarm1.translateX(deltaSlowed/30);
                this.lowerarm2.rotateZ(deltaSlowed/2);
                this.counter += deltaSlowed;
                }
            }
            else {
                if (this.counter > -.5) {
                this.upperarm1.translateX(-deltaSlowed/10);
                this.lowerarm1.translateX(-deltaSlowed/30);
                this.lowerarm1.rotateZ(-deltaSlowed/5);
                this.lowerarm1.translateX(-deltaSlowed/30);
                this.lowerarm2.rotateZ(-deltaSlowed/2);
                this.counter -= deltaSlowed;
                }
            }
        }
        if (this.fan) {
            //after a certain amount of time reset run to 0 (for inactive fans)
            let deltaSlowed = delta / 1000;
            if (this.run == 0) {
                // jump 3 times
                this.action1 = Math.random();
                this.run++;
            }
            if (this.run2 == 0) {
                //put hands up
                this.action2 = Math.random();
                this.run2++;
            }
            if (this.action1 > .5) {
                //do action
                if(this.person.position.y >= 1.85) {
                    this.waydown =true;
                    this.run++;
                }
                if (this.person.position.y < 1.85 && !this.waydown) {
                    this.person.translateY(deltaSlowed*1.5);
                }
                if (this.waydown && this.person.position.y > .85) {
                    this.person.translateY(-deltaSlowed*1.5);
                }
                if (this.person.position.y < .85) {
                    this.person.position.set(this.x, this.y, this.z);
                    this.waydown = false;
                }
                if (this.run >= 3 && this.person.position.y == this.y) {
                    this.run =0;
                }
            }
            else {
                //wait it out till we retry for an action (increase timer/counter)
                this.counter += deltaSlowed;
                if (this.counter >= 5) {
                    this.run = 0;
                    this.counter = 0;
                }
            }
            if (this.action2 > .7) {
                // raise arms
                if (this.upperarm1.rotation.z < 3*Math.PI/4 && this.run2 < 2) {
                    this.upperarm1.rotateZ(deltaSlowed);
                    this.upperarm1.translateY(-deltaSlowed/40);
                    this.upperarm1.translateX(deltaSlowed/6);
                }
                if (this.upperarm2.rotation.z > -3*Math.PI/4 && this.run2 < 2) {
                    this.upperarm2.rotateZ(-deltaSlowed);
                    this.upperarm2.translateY(deltaSlowed/40);
                    this.upperarm2.translateX(-deltaSlowed/6);
                }
                // put arms down after awhile
                if (this.upperarm1.rotation.z >= 3*Math.PI/4) {
                    this.counter2 += deltaSlowed;
                }
                if (this.counter2 >= 12) {
                    this.run2++;
                    this.counter2 = 0;
                }
                if (this.upperarm1.rotation.z > Math.PI/4 && this.run2 == 2) {
                    this.upperarm1.rotateZ(-deltaSlowed);
                    this.upperarm1.translateY(deltaSlowed/40);
                    this.upperarm1.translateX(-deltaSlowed/6);
                }
                if (this.upperarm2.rotation.z < -Math.PI/4 && this.run2 == 2) {
                    this.upperarm2.rotateZ(deltaSlowed);
                    this.upperarm2.translateY(-deltaSlowed/40);
                    this.upperarm2.translateX(deltaSlowed/6);
                }
                //set to original position and exit
                if (this.upperarm1.rotation.z <= Math.PI/4) {
                    this.upperarm1.rotation.set(0,0,Math.PI/4);
                    this.upperarm1.position.set(.3,.1,0);
                    this.upperarm2.rotation.set(0,0,-Math.PI/4);
                    this.upperarm2.position.set(-.3,.1,0);
                    this.run2 = 0;
                }
            }
            else {
                this.counter2 += deltaSlowed;
                if (this.counter2 >= 5) {
                    this.run2 = 0;
                    this.counter2 = 0;
                }
            }
        }
    }
}