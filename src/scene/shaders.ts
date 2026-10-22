/**
 * GLSL sources for the scene.
 *
 * Every custom material ends with the standard three.js `tonemapping_fragment`
 * and `colorspace_fragment` chunks so that the renderer's ACES filmic tone
 * mapping and sRGB output conversion are applied exactly like they are for
 * built-in materials.
 */

/* ------------------------------------------------------------------ *
 * Noise — Ashima Arts simplex noise (public domain)
 * ------------------------------------------------------------------ */
const SIMPLEX = /* glsl */ `
vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x - floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy,y.xy);
  vec4 b1 = vec4(x.zw,y.zw);

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p){
  float total = 0.0;
  float amp = 0.5;
  for(int i = 0; i < 4; i++){
    total += amp * snoise(p);
    p *= 2.03;
    amp *= 0.5;
  }
  return total;
}
`

/* ------------------------------------------------------------------ *
 * Core — displaced sphere with fresnel rim and emissive bands
 * ------------------------------------------------------------------ */

export const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uPhase;
uniform float uScroll;

varying vec3 vNormalW;
varying vec3 vViewDir;
varying float vNoise;
varying vec3 vPosW;

${SIMPLEX}

void main(){
  vec3 p = position;
  vec3 n = normal;

  float t = uTime * 0.13 + uPhase * 1.7;
  vec3 q = p * 1.62 + vec3(t, -t * 0.72, uScroll * 2.6 + t * 0.45);

  float d = fbm(q);
  float d2 = fbm(q * 2.15 + 17.0);
  float disp = d * 0.30 + d2 * 0.11;

  vNoise = d;

  vec3 displaced = p + n * disp * uAmp;

  vec4 wp = modelMatrix * vec4(displaced, 1.0);
  vPosW = wp.xyz;
  vNormalW = normalize(mat3(modelMatrix) * n);
  vViewDir = normalize(cameraPosition - wp.xyz);

  gl_Position = projectionMatrix * viewMatrix * wp;
}
`

export const coreFragment = /* glsl */ `
uniform vec3 uAccent;
uniform vec3 uAccent2;
uniform float uTime;
uniform float uIntensity;
uniform float uPulse;

varying vec3 vNormalW;
varying vec3 vViewDir;
varying float vNoise;
varying vec3 vPosW;

void main(){
  float ndv = clamp(dot(normalize(vNormalW), normalize(vViewDir)), 0.0, 1.0);
  float fres = pow(1.0 - ndv, 2.7);
  float bands = smoothstep(0.06, 0.72, abs(vNoise));

  vec3 base = mix(vec3(0.020, 0.026, 0.034), uAccent * 0.16, bands);
  vec3 tint = mix(uAccent, uAccent2, fres * 0.65);

  float energy = fres * 1.75 + bands * 0.62 + uPulse * 0.25;

  vec3 color = base + tint * energy * uIntensity;

  // faint horizontal scan, reads as an instrument display
  float scan = sin(vPosW.y * 46.0 - uTime * 2.4) * 0.5 + 0.5;
  color += uAccent * scan * 0.035 * fres;

  gl_FragColor = vec4(color, 1.0);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

/* ------------------------------------------------------------------ *
 * Grid floor
 * ------------------------------------------------------------------ */

export const gridVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vPosW;

void main(){
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vPosW = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`

export const gridFragment = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uAccent;
uniform float uTime;
uniform float uScroll;

varying vec2 vUv;
varying vec3 vPosW;

float gridLine(vec2 p, float scale){
  vec2 coord = p / scale;
  vec2 w = max(fwidth(coord), vec2(1e-5));
  vec2 grid = abs(fract(coord - 0.5) - 0.5) / w;
  float line = min(grid.x, grid.y);
  // Once a cell is smaller than a pixel the pattern can no longer be resolved
  // and the whole floor turns into a solid sheet — so fade it out instead.
  float resolvable = 1.0 - smoothstep(0.35, 1.10, max(w.x, w.y));
  return (1.0 - min(line, 1.0)) * resolvable;
}

void main(){
  vec2 p = vPosW.xz;

  float fine = gridLine(p, 1.0);
  float coarse = gridLine(p, 5.0);

  float radius = length(p);
  float fade = smoothstep(34.0, 6.0, radius);
  float horizon = smoothstep(40.0, 0.0, radius);

  // pulse ring travelling outward, driven by scroll
  float wave = sin(radius * 0.55 - uTime * 1.1 - uScroll * 6.0) * 0.5 + 0.5;
  float pulse = pow(wave, 8.0) * smoothstep(26.0, 2.0, radius);

  // Radar sweep: a rotating wedge that trails behind the beam, fading with
  // distance. It is the cheapest possible way to make the floor read as a
  // live operations display rather than a decorative grid.
  float ang = atan(p.y, p.x);
  float sweep = mod(uTime * 0.5, 6.2831853);
  float d = mod(ang - sweep + 3.14159265, 6.2831853) - 3.14159265;
  float trail = pow(max(0.0, 1.0 - abs(d + 0.62) / 1.2), 2.2);
  trail *= smoothstep(30.0, 2.5, radius) * horizon;

  float alpha = (fine * 0.20 + coarse * 0.45) * fade + pulse * 0.30 + trail * 0.20;
  alpha *= horizon;

  vec3 color = mix(uColor, uAccent, pulse * 0.8 + coarse * 0.25 + trail * 0.7);

  gl_FragColor = vec4(color, clamp(alpha, 0.0, 1.0));

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

/* ------------------------------------------------------------------ *
 * Motes — GPU-animated particle field
 * ------------------------------------------------------------------ */

export const motesVertex = /* glsl */ `
attribute float aSeed;
attribute float aScale;

uniform float uTime;
uniform float uSize;
uniform float uScroll;

varying float vAlpha;

void main(){
  vec3 p = position;

  float seed = aSeed * 6.2831853;
  float speed = 0.05 + aSeed * 0.10;
  float t = uTime * speed + seed;

  float c = cos(t);
  float s = sin(t);
  p.xz = mat2(c, -s, s, c) * p.xz;

  p.y += sin(uTime * 0.32 + seed * 3.1) * 0.30;
  p.y += uScroll * 1.4;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = clamp(uSize * aScale * (260.0 / max(0.001, -mv.z)), 1.0, 14.0);

  vAlpha = (0.20 + aScale * 0.80) * smoothstep(26.0, 4.0, length(p));
}
`

export const motesFragment = /* glsl */ `
uniform vec3 uAccent;

varying float vAlpha;

void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.05, d);
  a *= a;

  gl_FragColor = vec4(uAccent, a * vAlpha * 0.42);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

/* ------------------------------------------------------------------ *
 * Halo — additive glow sprite behind the core
 * ------------------------------------------------------------------ */

export const haloVertex = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const haloFragment = /* glsl */ `
uniform vec3 uAccent;
uniform float uTime;
uniform float uIntensity;

varying vec2 vUv;

void main(){
  vec2 p = vUv - 0.5;
  float r = length(p) * 2.0;
  float core = smoothstep(1.0, 0.0, r);
  core = pow(core, 2.6);
  float ring = smoothstep(0.62, 0.58, r) * smoothstep(0.44, 0.52, r);
  float breathe = 0.88 + sin(uTime * 0.9) * 0.12;

  float a = core * 0.55 + ring * 0.28;
  vec3 color = mix(uAccent, vec3(1.0), core * 0.35);

  gl_FragColor = vec4(color * a * breathe * uIntensity, a * breathe);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

/* ------------------------------------------------------------------ *
 * Rings - instrument bezel with tick marks and a sweeping emitter
 * ------------------------------------------------------------------ */

export const ringVertex = /* glsl */ `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const ringFragment = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uAccent;
uniform float uPhase;
uniform float uOpacity;

varying vec2 vUv;

void main(){
  float u = vUv.x;

  // Tick marks around the circumference. fwidth fades them out once the
  // spacing drops below a pixel so the ring never shimmers.
  float coord = u * 128.0;
  float fw = fwidth(coord);
  float dash = smoothstep(0.55, 0.93, fract(coord)) * (1.0 - smoothstep(0.10, 0.40, fw));

  // A comet head chasing around the ring, with a soft tail behind it.
  float d = fract(u - uPhase);
  float head = pow(1.0 - d, 28.0);
  float glow = pow(1.0 - d, 4.5) * 0.32;

  float a = (0.32 + dash * 0.60 + head * 2.0 + glow) * uOpacity;
  vec3 col = mix(uBase, uAccent, clamp(head * 1.5 + dash * 0.40 + glow, 0.0, 1.0));

  gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`

/* Trail arc behind an orbiting packet. `vUv.x` is 0 at the head. */
export const trailFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;

varying vec2 vUv;

void main(){
  float f = pow(1.0 - vUv.x, 2.4);
  gl_FragColor = vec4(uColor * f * 2.0, f * uOpacity);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`
