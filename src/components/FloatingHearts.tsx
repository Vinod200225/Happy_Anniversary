import { useMemo } from 'react'
import { Heart } from 'lucide-react'

interface FloatingHeartsProps {
  count?: number
  className?: string
}

export default function FloatingHearts({ count = 18, className = '' }: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 8,
        size: 14 + Math.random() * 22,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    [count],
  )

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: '-40px',
            animation: `floatUp ${h.duration}s ${h.delay}s linear infinite`,
            opacity: h.opacity,
          }}
        >
          <Heart
            size={h.size}
            className="text-rose-400"
            fill="currentColor"
            strokeWidth={1}
          />
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          50% {
            transform: translateY(-50vh) translateX(20px) rotate(15deg);
          }
          90% { opacity: 0.4; }
          100% {
            transform: translateY(-110vh) translateX(-20px) rotate(-15deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
