/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
uniform int circles;
uniform vec3 light;
uniform vec3 dark;

void main()
{
    float r = .5/float(circles);
    float dx = v_uv.x - .5;
    float dy = v_uv.y - .5;
    float d = pow(dx, 2.0) + pow(dy, 2.0);
    float r2 = pow(r, 2.0);
    float a = 1.0;
    int i= 0;
    for (; i<circles; i++) {
        float res = pow(a, 2.0)*r2;
        if (d/res <= 1.0) {
            break;
        }
        a += 1.0;
    }
    float dc = mod(float(i), 2.0);
    gl_FragColor = vec4(mix(dark,light,dc), 1.);
}