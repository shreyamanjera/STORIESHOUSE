/* eslint-disable react/no-unknown-property */
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import styles from "./Lanyard.module.css";

extend({ MeshLineGeometry, MeshLineMaterial });

const BLANK_PIXEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  frontImage,
  backImage,
  title,
  imageFit = "cover",
  lanyardImage = "/lanyard/lanyard.png",
  lanyardWidth = 1
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return <div className={styles.wrapper}>
    <Canvas camera={{ position, fov: 20 }} dpr={[1, isMobile ? 1 : 1.5]} gl={{ alpha: true, antialias: true }} onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}>
      <ambientLight intensity={Math.PI} />
      <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
        <Band isMobile={isMobile} frontImage={frontImage} backImage={backImage} title={title} imageFit={imageFit} lanyardImage={lanyardImage} lanyardWidth={lanyardWidth} />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
      </Environment>
    </Canvas>
  </div>;
}

function Band({ isMobile, frontImage, backImage, title, imageFit, lanyardImage, lanyardWidth }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const { nodes, materials } = useGLTF("/lanyard/card.glb");
  const bandTexture = useTexture(lanyardImage);
  const frontTexture = useTexture(frontImage || BLANK_PIXEL);
  const backTexture = useTexture(backImage || BLANK_PIXEL);
  const [dragged, setDragged] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;
    const baseImage = baseMap.image;
    const canvas = document.createElement("canvas");
    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    const context = canvas.getContext("2d");
    if (!context) return baseMap;
    context.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    const drawFitted = (image, rect) => {
      const rx = rect.x * canvas.width;
      const ry = rect.y * canvas.height;
      const rw = rect.w * canvas.width;
      const rh = rect.h * canvas.height;
      const scale = (imageFit === "contain" ? Math.min : Math.max)(rw / image.width, rh / image.height);
      const dw = image.width * scale;
      const dh = image.height * scale;
      context.save();
      context.beginPath();
      context.rect(rx, ry, rw, rh);
      context.clip();
      context.drawImage(image, rx + (rw - dw) / 2, ry + (rh - dh) / 2, dw, dh);
      context.restore();
    };
    const drawTitle = (rect) => {
      if (!title) return;
      const rx = rect.x * canvas.width;
      const ry = rect.y * canvas.height;
      const rw = rect.w * canvas.width;
      const size = Math.round(rw * 0.075);
      const paddingX = Math.round(size * 0.65);
      const paddingY = Math.round(size * 0.45);
      context.save();
      context.font = `600 ${size}px Arial, sans-serif`;
      const labelWidth = context.measureText(title).width + paddingX * 2;
      context.fillStyle = "rgba(92, 7, 22, 0.84)";
      context.fillRect(rx + rw * 0.08, ry + rw * 0.08, labelWidth, size + paddingY * 2);
      context.fillStyle = "#ffffff";
      context.textBaseline = "middle";
      context.fillText(title, rx + rw * 0.08 + paddingX, ry + rw * 0.08 + (size + paddingY * 2) / 2);
      context.restore();
    };
    if (frontImage && frontTexture.image) drawFitted(frontTexture.image, FRONT_UV_RECT);
    if (backImage && backTexture.image) drawFitted(backTexture.image, BACK_UV_RECT);
    drawTitle(FRONT_UV_RECT);
    drawTitle(BACK_UV_RECT);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.flipY = baseMap.flipY;
    texture.anisotropy = 8;
    return texture;
  }, [backImage, backTexture, frontImage, frontTexture, imageFit, materials.base.map, title]);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (!hovered) return undefined;
    document.body.style.cursor = dragged ? "grabbing" : "grab";
    return () => { document.body.style.cursor = "auto"; };
  }, [dragged, hovered]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (!fixed.current || !j1.current || !j2.current || !j3.current || !card.current) return;
    [j1, j2].forEach((ref) => {
      if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
      const distance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
      ref.current.lerped.lerp(ref.current.translation(), delta * (distance * 50));
    });
    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2.current.lerped);
    curve.points[2].copy(j1.current.lerped);
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());
    card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
  });

  curve.curveType = "chordal";
  bandTexture.wrapS = bandTexture.wrapT = THREE.RepeatWrapping;
  const bodyProps = { colliders: false, angularDamping: 4, linearDamping: 4, canSleep: true };

  return <>
    <group position={[0, 4, 0]}>
      <RigidBody ref={fixed} {...bodyProps} type="fixed" />
      <RigidBody position={[0.5, 0, 0]} ref={j1} {...bodyProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[1, 0, 0]} ref={j2} {...bodyProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[1.5, 0, 0]} ref={j3} {...bodyProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[2, 0, 0]} ref={card} {...bodyProps} type={dragged ? "kinematicPosition" : "dynamic"}>
        <CuboidCollider args={[0.8, 1.125, 0.01]} />
        <group scale={2.25} position={[0, -1.2, -0.05]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)} onPointerUp={(event) => { event.target.releasePointerCapture(event.pointerId); setDragged(false); }} onPointerDown={(event) => { event.target.setPointerCapture(event.pointerId); setDragged(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation()))); }}>
          <mesh geometry={nodes.card.geometry}><meshPhysicalMaterial map={cardMap} map-anisotropy={8} clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} /></mesh>
          <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
          <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
        </group>
      </RigidBody>
    </group>
    <mesh ref={band}><meshLineGeometry /><meshLineMaterial color="white" depthTest={false} resolution={[1000, 1000]} useMap map={bandTexture} repeat={[-4, 1]} lineWidth={lanyardWidth} /></mesh>
  </>;
}
