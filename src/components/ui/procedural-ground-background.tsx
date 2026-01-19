"use client";

import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

/**
 * ProceduralGroundBackground
 * A WebGL 2D background featuring topographic neon lines and sand-ripple movement.
 * Optimized for performance using fragment shaders.
 * Customized with "Greenish" theme: Deep Charcoal Base, Shopify Green Accent, Neon Lime Lines.
 */

interface ProceduralGroundBackgroundProps {
  className?: string;
}

const ProceduralGroundBackground: React.FC<ProceduralGroundBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationRef = useRef<number>(0);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const locationsRef = useRef<any>(null);

  // 1. Setup WebGL (Run once)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;
    glRef.current = gl;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                   mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        
        // Ground Perspective Simulation
        float depth = 1.0 / (uv.y + 1.15);
        vec2 gridUv = vec2(uv.x * depth, depth + u_time * 0.15);
        
        // Layered Procedural Noise for Terrain
        float n = noise(gridUv * 3.5);
        float ripples = sin(gridUv.y * 18.0 + n * 8.0 + u_time * 0.5);
        
        // Neon Topographic Lines
        float topoLine = smoothstep(0.03, 0.0, abs(ripples));
        
        // Color Palette - Greenish Theme
        vec3 baseColor = vec3(0.016, 0.016, 0.016); // Deep Charcoal (#040404)
        vec3 accentColor = vec3(0.0, 0.502, 0.376); // Shopify Green (#008060)
        vec3 neonColor = vec3(0.678, 1.0, 0.184);   // Neon Lime (#ADFF2F)
        
        // Composite
        vec3 finalColor = mix(baseColor, accentColor, n * 0.4); 
        finalColor += topoLine * neonColor * depth * 0.4;
        
        // Horizon Fog / Fade
        float fade = smoothstep(0.1, -1.0, uv.y);
        finalColor *= (1.0 - length(uv) * 0.45) * (1.0 - fade);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1
    ]), gl.STATIC_DRAW);

    const posAttrib = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttrib);
    gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

    locationsRef.current = {
      time: gl.getUniformLocation(program, "u_time"),
      resolution: gl.getUniformLocation(program, "u_resolution")
    };
  }, []);

  // 2. Visibility Observer
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, { threshold: 0 }); // Trigger as soon as any part is visible

    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  // 3. Animation Loop (Only runs when visible)
  useEffect(() => {
    if (!isVisible || !glRef.current || !programRef.current) {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        return;
    }

    const gl = glRef.current;
    
    const render = (time: number) => {
      const { innerWidth: width, innerHeight: height } = window;
      if (canvasRef.current && (canvasRef.current.width !== width || canvasRef.current.height !== height)) {
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.useProgram(programRef.current);
      gl.uniform1f(locationsRef.current.time, time * 0.001);
      gl.uniform2f(locationsRef.current.resolution, width, height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 w-full h-full z-0 overflow-hidden", className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
        style={{ filter: 'contrast(1.1) brightness(0.9)' }}
      />
    </div>
  );
};

export default ProceduralGroundBackground;
