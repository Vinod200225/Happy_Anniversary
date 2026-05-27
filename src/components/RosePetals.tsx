import { useMemo } from 'react'

interface RosePetalsProps {
  count?: number
}

// Tiny svg petal shape — kept inline so we don't depend on an asset.
function PetalSvg({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <path
        d="M16 2 C 22 8, 28 14, 22 24 C 18 30, 14 30, 10 24 C 4 14, 10 8, 16 2 Z"
        fill={color}
        opacity="0.9"
      />
      <path
        d="M16 6 C 20 10, 24 16, 18 22"
        stroke="rgba(122, 29, 44, 0.25)"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  )
}

export default function RosePetals({ count = 14 }: RosePetalsProps) {
  const petals = useMemo(() => {
    const colors = ['#fda4af', '#fb7185', '#f9a8b4', '#fecdd3', '#e7506f']
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: -Math.random() * 12,
      duration: 14 + Math.random() * 10,
      size: 14 + Math.random() * 16,
      drift: (Math.random() - 0.5) * 80,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotateSpeed: (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 360),
    }))
  }, [count])

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden>
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-40px',
            animation: `petalFall ${p.duration}s ${p.delay}s linear infinite`,
            ['--drift' as string]: `${p.drift}px`,
            ['--rotate' as string]: `${p.rotateSpeed}deg`,
          } as React.CSSProperties}
        >
          <PetalSvg size={p.size} color={p.color} />
        </div>
      ))}
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% { opacity: 0.85; }
          50% {
            transform: translateY(50vh) translateX(calc(var(--drift) * 0.5)) rotate(calc(var(--rotate) * 0.5));
          }
          95% { opacity: 0.7; }
          100% {
            transform: translateY(110vh) translateX(var(--drift)) rotate(var(--rotate));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
