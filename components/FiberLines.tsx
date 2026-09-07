"use client";

import { useReducedMotion } from "framer-motion";
import s from "./fiberLines.module.css";

/* Routes traced over the baked-in cables of the 2099×1294 hero image.
   Purple bundle flows down-left; teal bundle flows down-right. */
const PURPLE = "M 1090 668 C 880 830, 560 1010, 70 1272";
const TEAL = "M 1290 645 C 1520 770, 1790 910, 2060 1078";

const DUR = 2.6;
const BEGINS = [0, 0.65, 1.3, 1.95]; // staggered → continuous stream of 4 pulses

function Pulse({ path, glow, core, begin }: { path: string; glow: string; core: string; begin: number }) {
  return (
    <g opacity={0}>
      <circle cx={0} cy={0} r={16} fill={glow} opacity={0.55} filter="url(#flPulseGlow)" />
      <circle cx={0} cy={0} r={6} fill={core} />
      <animateMotion dur={`${DUR}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} rotate="0" />
      <animate
        attributeName="opacity"
        dur={`${DUR}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        values="0;1;1;0"
        keyTimes="0;0.12;0.85;1"
      />
    </g>
  );
}

export default function FiberLines() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <svg className={s.svg} viewBox="0 0 2099 1294" fill="none" aria-hidden="true">
      <defs>
        <filter id="flPulseGlow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* Flowing "data current" along each cable bundle */}
      <path d={PURPLE} className={`${s.flowGlow} ${s.flowGlowP}`} />
      <path d={TEAL} className={`${s.flowGlow} ${s.flowGlowT}`} />
      <path d={PURPLE} className={`${s.flow} ${s.flowP}`} />
      <path d={TEAL} className={`${s.flow} ${s.flowT}`} />

      {/* Discrete light pulses riding the same routes */}
      {BEGINS.map((b, i) => (
        <Pulse key={`p${i}`} path={PURPLE} glow="#b07bff" core="#f3e9ff" begin={b} />
      ))}
      {BEGINS.map((b, i) => (
        <Pulse key={`t${i}`} path={TEAL} glow="#3ce8e8" core="#e6ffff" begin={b} />
      ))}
    </svg>
  );
}
