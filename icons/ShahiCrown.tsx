import React from 'react';
import { IconProps } from "../utils/types";

const ShahiCrown: React.FC<IconProps> = ({ size = 24, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Crown Gradient */}
        <linearGradient id="crownGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700">
            <animate attributeName="stop-color" values="#FFD700; #FFA500; #FFD700" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#FFA500">
            <animate attributeName="stop-color" values="#FFA500; #FFD700; #FFA500" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>

        {/* Sparks Gradient */}
        <linearGradient id="sparksGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
          <stop offset="50%" stopColor="rgba(255, 255, 255, 1)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>

        {/* Glow Filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Crown Body */}
      <path
        d="M150 50C150 50 180 100 240 100C300 100 300 50 300 50L270 200H30L0 50C0 50 0 100 60 100C120 100 150 50 150 50Z"
        fill="url(#crownGradient)"
        stroke="#FFA500"
        strokeWidth="2"
        filter="url(#glow)"
      >
        <animate attributeName="d" 
          values="
            M150 50C150 50 180 100 240 100C300 100 300 50 300 50L270 200H30L0 50C0 50 0 100 60 100C120 100 150 50 150 50Z;
            M150 60C150 60 180 110 240 110C300 110 300 60 300 60L270 210H30L0 60C0 60 0 110 60 110C120 110 150 60 150 60Z;
            M150 50C150 50 180 100 240 100C300 100 300 50 300 50L270 200H30L0 50C0 50 0 100 60 100C120 100 150 50 150 50Z"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      {/* Crown Base */}
      <path
        d="M30 220H270V250H30V220Z"
        fill="url(#crownGradient)"
        stroke="#FFA500"
        strokeWidth="2"
        filter="url(#glow)"
      />

      {/* Jewels */}
      <circle cx="150" cy="30" r="10" fill="#FF0000" filter="url(#glow)">
        <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="30" cy="50" r="10" fill="#0000FF" filter="url(#glow)">
        <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="270" cy="50" r="10" fill="#00FF00" filter="url(#glow)">
        <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Sparks */}
      <g>
        <path d="M0 50 L300 50" stroke="url(#sparksGradient)" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 300;20 300;0 300" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M30 220 L270 220" stroke="url(#sparksGradient)" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 240;20 240;0 240" dur="2s" repeatCount="indefinite" begin="1s" />
        </path>
      </g>
    </svg>
  );
};

export default ShahiCrown;