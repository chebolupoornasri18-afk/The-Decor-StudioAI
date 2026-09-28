import React from 'react';

interface KolamProps {
  className?: string;
  size?: number;
  opacity?: number;
  strokeWidth?: number;
  color?: string;
}

/**
 * Sacred Padmam (Lotus Kolam)
 * Symmetrical 8-petal blooming lotus with central bindu and ornamental curling outer arches
 */
export const LotusKolam: React.FC<KolamProps> = ({
  className = '',
  size = 48,
  opacity = 0.9,
  strokeWidth = 1.5,
  color = '#FFFFFF',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Central Bindu and Core */}
      <circle cx="50" cy="50" r="3.5" fill={color} />
      <circle cx="50" cy="50" r="8" stroke={color} strokeWidth={strokeWidth} />
      
      {/* 4 Cardinal Lotus Petals */}
      <path
        d="M50 42 C45 32 35 25 50 14 C65 25 55 32 50 42 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 58 C45 68 35 75 50 86 C65 75 55 68 50 58 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 50 C32 45 25 35 14 50 C25 65 32 55 42 50 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M58 50 C68 45 75 35 86 50 C75 65 68 55 58 50 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 4 Diagonal Lotus Petals */}
      <g transform="rotate(45 50 50)">
        <path
          d="M50 42 C46 34 38 28 50 18 C62 28 54 34 50 42 Z"
          stroke={color}
          strokeWidth={strokeWidth * 0.9}
          strokeLinecap="round"
        />
        <path
          d="M50 58 C46 66 38 72 50 82 C62 72 54 66 50 58 Z"
          stroke={color}
          strokeWidth={strokeWidth * 0.9}
          strokeLinecap="round"
        />
        <path
          d="M42 50 C34 46 28 38 18 50 C28 62 34 54 42 50 Z"
          stroke={color}
          strokeWidth={strokeWidth * 0.9}
          strokeLinecap="round"
        />
        <path
          d="M58 50 C66 46 72 38 82 50 C72 62 66 54 58 50 Z"
          stroke={color}
          strokeWidth={strokeWidth * 0.9}
          strokeLinecap="round"
        />
      </g>

      {/* Outer Connecting Kolam Arches and Dewdrops */}
      <path
        d="M32 24 C40 18 60 18 68 24 M76 32 C82 40 82 60 76 68 M68 76 C60 82 40 82 32 76 M24 68 C18 60 18 40 24 32"
        stroke={color}
        strokeWidth={strokeWidth * 0.8}
        strokeDasharray="2 3"
      />
      <circle cx="50" cy="10" r="1.8" fill={color} />
      <circle cx="50" cy="90" r="1.8" fill={color} />
      <circle cx="10" cy="50" r="1.8" fill={color} />
      <circle cx="90" cy="50" r="1.8" fill={color} />
    </svg>
  );
};

/**
 * Traditional Sikku Kolam (Braided Endless Loop)
 * South Indian interlaced ribbon lines moving gracefully around pulli (dots)
 */
export const SikkuKolam: React.FC<KolamProps> = ({
  className = '',
  size = 64,
  opacity = 0.85,
  strokeWidth = 1.4,
  color = '#FFFFFF',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Traditional Dots (Pulli) Matrix */}
      {[25, 50, 75].map((x) =>
        [25, 50, 75].map((y) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill={color} />
        ))
      )}
      <circle cx="50" cy="12" r="1.8" fill={color} />
      <circle cx="50" cy="88" r="1.8" fill={color} />
      <circle cx="12" cy="50" r="1.8" fill={color} />
      <circle cx="88" cy="50" r="1.8" fill={color} />

      {/* Continuous Loop Curves encircling the dots */}
      <path
        d="M50 20 C60 20 65 35 50 35 C35 35 40 20 50 20 Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M50 80 C60 80 65 65 50 65 C35 65 40 80 50 80 Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M20 50 C20 60 35 65 35 50 C35 35 20 40 20 50 Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M80 50 C80 60 65 65 65 50 C65 35 80 40 80 50 Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />

      {/* Diamond Interlace Weave */}
      <path
        d="M50 10 Q70 30 90 50 Q70 70 50 90 Q30 70 10 50 Q30 30 50 10 Z"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <path
        d="M32 32 C38 20 62 20 68 32 C80 38 80 62 68 68 C62 80 38 80 32 68 C20 62 20 38 32 32 Z"
        stroke={color}
        strokeWidth={strokeWidth * 0.9}
        strokeLinecap="round"
      />
    </svg>
  );
};

/**
 * Grand Circular Mandala Kolam
 * Intricate festival pattern for hero backdrop and section focal points
 */
export const CircularMandalaKolam: React.FC<KolamProps> = ({
  className = '',
  size = 320,
  opacity = 0.2,
  strokeWidth = 1.2,
  color = '#FFFFFF',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      <circle cx="150" cy="150" r="142" stroke={color} strokeWidth={strokeWidth} strokeDasharray="3 4" />
      <circle cx="150" cy="150" r="132" stroke={color} strokeWidth={strokeWidth * 1.2} />
      <circle cx="150" cy="150" r="110" stroke={color} strokeWidth={strokeWidth * 0.8} />
      <circle cx="150" cy="150" r="85" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="150" cy="150" r="55" stroke={color} strokeWidth={strokeWidth} strokeDasharray="2 3" />
      <circle cx="150" cy="150" r="28" stroke={color} strokeWidth={strokeWidth} />
      <circle cx="150" cy="150" r="8" fill={color} />

      {/* 16 Radial Floral Petals */}
      {Array.from({ length: 16 }).map((_, i) => (
        <g key={i} transform={`rotate(${i * 22.5} 150 150)`}>
          <path
            d="M150 122 C143 100 143 85 150 65 C157 85 157 100 150 122 Z"
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle cx="150" cy="62" r="2.5" fill={color} />
          {/* Outer crown arch */}
          <path
            d="M142 30 Q150 18 158 30"
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <circle cx="150" cy="16" r="1.8" fill={color} />
        </g>
      ))}

      {/* Inner 8 Lotus Petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={`inner-${i}`} transform={`rotate(${i * 45 + 11.25} 150 150)`}>
          <path
            d="M150 142 C144 135 142 125 150 115 C158 125 156 135 150 142 Z"
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle cx="150" cy="112" r="1.5" fill={color} />
        </g>
      ))}

      {/* Braided wavy border ring */}
      <path
        d="M150 20 C155 25 160 25 165 20 C170 25 175 25 180 20"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

/**
 * Kolam Corner Ornament
 * Designed to frame corners of luxury containers, cards, and section edges
 */
export const KolamCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
  opacity?: number;
  color?: string;
}> = ({
  position = 'top-left',
  className = '',
  size = 72,
  opacity = 0.5,
  color = '#FFFFFF',
}) => {
  const getRotation = () => {
    switch (position) {
      case 'top-right':
        return 'rotate(90deg)';
      case 'bottom-right':
        return 'rotate(180deg)';
      case 'bottom-left':
        return 'rotate(270deg)';
      default:
        return 'rotate(0deg)';
    }
  };

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: getRotation(), opacity }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Right angle border frame */}
        <path
          d="M0 0 L75 0 M0 0 L0 75"
          stroke={color}
          strokeWidth="1.2"
        />
        <path
          d="M0 6 L65 6 M6 0 L6 65"
          stroke={color}
          strokeWidth="0.8"
          strokeDasharray="2 3"
        />
        {/* Corner Lotus flourish */}
        <path
          d="M12 12 Q28 12 36 24 Q48 36 48 52 Q36 48 24 36 Q12 28 12 12 Z"
          stroke={color}
          strokeWidth="1.2"
        />
        <path
          d="M20 20 C28 20 32 26 34 34 C26 32 20 28 20 20 Z"
          stroke={color}
          strokeWidth="1"
        />
        <circle cx="18" cy="18" r="2.5" fill={color} />
        <circle cx="36" cy="36" r="2" fill={color} />
        {/* Trailing sikku curve */}
        <path
          d="M6 50 C16 46 22 56 32 50 C40 44 46 44 54 36 C58 26 50 18 52 6"
          stroke={color}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <circle cx="52" cy="6" r="1.5" fill={color} />
        <circle cx="6" cy="50" r="1.5" fill={color} />
      </svg>
    </div>
  );
};

/**
 * Kolam Border Divider
 * Elegant horizontal divider with central lotus medallion and delicate looped vines
 */
export const KolamBorderDivider: React.FC<{
  className?: string;
  color?: string;
  opacity?: number;
}> = ({
  className = '',
  color = '#FFFFFF',
  opacity = 0.45,
}) => {
  return (
    <div
      className={`flex items-center justify-center w-full max-w-xl mx-auto py-4 select-none pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Left flowing kolam vine */}
      <svg className="flex-1 h-6" viewBox="0 0 200 24" fill="none">
        <path
          d="M0 12 L70 12 M70 12 C80 6 90 6 100 12 C110 18 120 18 130 12 C140 6 150 6 160 12 C170 18 180 18 190 12 L200 12"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="85" cy="8" r="1.5" fill={color} />
        <circle cx="115" cy="16" r="1.5" fill={color} />
        <circle cx="145" cy="8" r="1.5" fill={color} />
        <circle cx="175" cy="16" r="1.5" fill={color} />
      </svg>

      {/* Center Lotus Kolam Medallion */}
      <div className="px-3 shrink-0">
        <LotusKolam size={32} color={color} opacity={1} strokeWidth={1.3} />
      </div>

      {/* Right flowing kolam vine */}
      <svg className="flex-1 h-6 transform scale-x-[-1]" viewBox="0 0 200 24" fill="none">
        <path
          d="M0 12 L70 12 M70 12 C80 6 90 6 100 12 C110 18 120 18 130 12 C140 6 150 6 160 12 C170 18 180 18 190 12 L200 12"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <circle cx="85" cy="8" r="1.5" fill={color} />
        <circle cx="115" cy="16" r="1.5" fill={color} />
        <circle cx="145" cy="8" r="1.5" fill={color} />
        <circle cx="175" cy="16" r="1.5" fill={color} />
      </svg>
    </div>
  );
};
