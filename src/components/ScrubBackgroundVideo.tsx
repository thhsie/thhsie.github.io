import { useEffect, useRef } from "react";

export function ScrubBackgroundVideo() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl") || (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) {
      console.warn("WebGL not supported, falling back to static background.");
      return;
    }

    // Vertex shader source
    const vsSource = `
      attribute vec2 position;
      varying vec2 v_uv;
      void main() {
        v_uv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader source
    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      varying vec2 v_uv;

      // Premium lilac-tinted iridescent spectrum palette
      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.4, 0.65);
        vec3 b = vec3(0.5, 0.4, 0.55);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.1, 0.38, 0.68);
        return a + b * cos(6.28318 * (c * t + d));
      }

      mat2 rot2d(float a) {
        float c = cos(a), s = sin(a);
        return mat2(c, -s, s, c);
      }

      // Smooth liquid displacement for the elegant organic orb
      float displacement(vec3 p, float time, vec2 mouse) {
        vec3 q = p;
        q.xy *= rot2d(time * 0.12 + mouse.x * 0.15);
        q.yz *= rot2d(time * 0.08 + mouse.y * 0.15);
        
        float d = 0.0;
        d += sin(q.x * 2.0 + time) * cos(q.y * 2.0 + time) * 0.22;
        d += sin(q.y * 4.0 - time * 1.3) * cos(q.z * 4.0 + time * 1.1) * 0.10;
        d += sin(q.z * 8.0 + time * 1.8) * 0.05;
        return d;
      }

      float map(vec3 p, float time, vec2 mouse) {
        // Position of the iridescent body
        vec3 center = vec3(0.28, -0.15, 0.0);
        
        if (u_resolution.x < 1024.0) {
          center = vec3(0.0, -0.18, 0.0);
        } else {
          // Subtle mouse response drift
          center += vec3(mouse.x * 0.12, mouse.y * 0.08, 0.0);
        }
        
        // Base sphere/egg shape for the body
        float d = length(p - center) - 1.25;
        
        // Liquid displacement
        float disp = displacement(p, time, mouse);
        return d - disp;
      }

      vec3 calcNormal(vec3 p, float time, vec2 mouse) {
        vec2 e = vec2(0.002, 0.0);
        return normalize(vec3(
          map(p + e.xyy, time, mouse) - map(p - e.xyy, time, mouse),
          map(p + e.yxy, time, mouse) - map(p - e.yxy, time, mouse),
          map(p + e.yyx, time, mouse) - map(p - e.yyx, time, mouse)
        ));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Soft gradient lilac/lavender background matching the original elite brand color
        vec3 bgTop = vec3(0.914, 0.902, 0.941);     // Elegant lilac tone
        vec3 bgBottom = vec3(0.965, 0.957, 0.976);  // Light warm pearl tone
        vec3 bgCol = mix(bgBottom, bgTop, uv.y + uv.x * 0.08);
        
        vec3 ro = vec3(0.0, 0.0, -3.5);
        vec3 rd = normalize(vec3(p, 1.45));
        
        float t = 0.0;
        float maxT = 6.0;
        bool hit = false;
        vec3 pos = vec3(0.0);
        
        // Precise raymarching loop
        for (int i = 0; i < 42; i++) {
          pos = ro + rd * t;
          float d = map(pos, u_time, u_mouse);
          if (d < 0.0015) {
            hit = true;
            break;
          }
          t += d;
          if (t > maxT) break;
        }
        
        vec3 finalColor = bgCol;
        
        if (hit) {
          vec3 n = calcNormal(pos, u_time, u_mouse);
          
          // Two-point elite studio lighting configuration
          vec3 lDir1 = normalize(vec3(1.6, 2.8, -2.2));
          vec3 lDir2 = normalize(vec3(-2.2, 1.2, -1.5));
          
          // Light reflections
          lDir1.xy *= rot2d(u_mouse.x * 0.15);
          lDir2.xy *= rot2d(-u_mouse.x * 0.1);
          
          float diffuse = max(dot(n, lDir1), 0.0) * 0.4 + 0.6;
          vec3 rDir = reflect(rd, n);
          
          // Environment reflections mapping (gives the high end liquid obsidian glass vibe)
          vec3 env = mix(bgCol, vec3(1.0), rDir.y * 0.5 + 0.5);
          env += vec3(0.10, 0.14, 0.22) * pow(max(0.0, rDir.x), 3.0);
          env += vec3(0.22, 0.10, 0.12) * pow(max(0.0, -rDir.x), 3.0);
          
          // Dynamic iridescence band calculation based on angle of incidence (fresnel)
          float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.4);
          vec3 irisCol = palette(fresnel * 0.62 + n.y * 0.28 + dot(n, lDir1) * 0.15 + u_time * 0.06);
          
          // Dark obsidian glossy core material
          vec3 materialCore = vec3(0.04, 0.05, 0.07);
          
          // Ultra sharp specular highlight
          vec3 h1 = normalize(lDir1 - rd);
          float spec1 = pow(max(dot(n, h1), 0.0), 160.0);
          vec3 specCol1 = vec3(1.0, 0.98, 1.0) * spec1 * 2.8;

          // Soft ambient rim specular highlight
          vec3 h2 = normalize(lDir2 - rd);
          float spec2 = pow(max(dot(n, h2), 0.0), 45.0);
          vec3 specCol2 = vec3(0.5, 0.7, 1.0) * spec2 * 1.1;
          
          // Composite final glossy glass color
          finalColor = mix(materialCore, env, 0.42);
          finalColor += irisCol * (fresnel * 1.8 + 0.18);
          finalColor += specCol1 + specCol2;
          
          // Smooth depth fog transition
          finalColor = mix(finalColor, bgCol, pow(t / maxT, 3.2) * 0.12);
        }
        
        // Soft elegant vignette
        float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
        finalColor = mix(bgCol, finalColor, vignette * 0.35 + 0.65);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Helper to compile shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up vertex buffers
    const vertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");

    // Mouse tracking variables
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      // Map screen coordinates to -1.0 to 1.0 range
      targetX = (e.clientX / window.innerWidth) * 2.0 - 1.0;
      targetY = (e.clientY / window.innerHeight) * -2.0 + 1.0;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle resize
    const resize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      // Crisp but highly performant resolution
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener("resize", resize);
    resize();

    // Render loop
    const startTime = performance.now();
    let animationFrameId: number;

    const render = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      
      // Interpolate mouse smoothly for professional damping kinetic feel
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.08;

      // Beautiful slower kinetic time scale for smooth luxury fluid motion
      const isMobile = window.innerWidth < 1024;
      let shaderTime = elapsed * 0.35;
      
      if (isMobile) {
        // Beautiful oscillating ping-pong motion
        shaderTime = (Math.sin(elapsed * 0.9) * 0.5 + 0.5) * 1.5;
      }

      gl.useProgram(program);

      // Set uniforms
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, shaderTime);
      gl.uniform2f(mouseLoc, currentX, currentY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup resources to prevent leaks and maximize battery life
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);

      gl.deleteBuffer(buffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[#FAF9FC]">
      {/* Premium translucent overlay filter so text remains highly readable on mobile while showing the lilac gradient */}
      <div className="absolute inset-0 bg-[#FAF9FC]/78 sm:bg-[#FAF9FC]/68 lg:bg-transparent backdrop-blur-[1px] lg:backdrop-blur-none z-[1] pointer-events-none transition-all duration-300" />
      
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover opacity-95"
      />
    </div>
  );
}
