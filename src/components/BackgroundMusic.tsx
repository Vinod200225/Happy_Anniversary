import { Music, Volume2, VolumeX } from 'lucide-react'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

// Soft generated romantic instrumental using WebAudio (no asset required).
// You can swap in your own audio file by setting the audioSrc prop.
interface Props {
  audioSrc?: string
}

export interface BackgroundMusicHandle {
  play: () => void
}

const BackgroundMusic = forwardRef<BackgroundMusicHandle, Props>(function BackgroundMusic(
  { audioSrc },
  ref,
) {
  const [enabled, setEnabled] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const oscNodesRef = useRef<{ stop: () => void } | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    return () => {
      oscNodesRef.current?.stop()
      ctxRef.current?.close().catch(() => {})
    }
  }, [])

  function startGenerated() {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext
    const ctx = new Ctx()
    ctxRef.current = ctx

    const master = ctx.createGain()
    master.gain.value = 0.0
    master.connect(ctx.destination)

    // Soft pad — two detuned sine oscillators
    const o1 = ctx.createOscillator()
    const o2 = ctx.createOscillator()
    const o3 = ctx.createOscillator()
    o1.type = 'sine'
    o2.type = 'sine'
    o3.type = 'triangle'
    o1.frequency.value = 220 // A3
    o2.frequency.value = 277.18 // C#4
    o3.frequency.value = 329.63 // E4
    o2.detune.value = 6
    o3.detune.value = -4

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 900
    filter.Q.value = 0.7

    const padGain = ctx.createGain()
    padGain.gain.value = 0.18

    o1.connect(filter)
    o2.connect(filter)
    o3.connect(filter)
    filter.connect(padGain)
    padGain.connect(master)

    // Slow LFO on filter for warmth
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value = 0.08
    lfoGain.gain.value = 120
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)

    o1.start()
    o2.start()
    o3.start()
    lfo.start()

    master.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 1.6)

    oscNodesRef.current = {
      stop: () => {
        try {
          master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
          setTimeout(() => {
            o1.stop()
            o2.stop()
            o3.stop()
            lfo.stop()
            ctx.close().catch(() => {})
          }, 700)
        } catch {}
      },
    }
  }

  function startPlayback() {
    if (audioSrc) {
      if (!audioRef.current) {
        const a = new Audio(audioSrc)
        a.loop = true
        a.volume = 0.35
        audioRef.current = a
      }
      audioRef.current.play().catch(() => {
        alert("Tap once more — most browsers need a click before playing audio.")
      })
    } else {
      startGenerated()
    }
    setEnabled(true)
  }

  function stopPlayback() {
    if (audioSrc && audioRef.current) {
      audioRef.current.pause()
    } else {
      oscNodesRef.current?.stop()
      oscNodesRef.current = null
    }
    setEnabled(false)
  }

  function toggle() {
    if (enabled) stopPlayback()
    else startPlayback()
  }

  useImperativeHandle(ref, () => ({
    play: () => {
      if (!enabled) startPlayback()
    },
  }))

  return (
    <button
      onClick={toggle}
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 inline-flex items-center gap-2 bg-white/90 hover:bg-white text-rose-700 font-sans text-xs font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-lg ring-1 ring-rose-200 backdrop-blur transition"
      aria-label={enabled ? 'Mute background music' : 'Play background music'}
      title={enabled ? 'Mute background music' : 'Play soft music'}
    >
      {enabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
      <Music size={14} />
      <span className="hidden sm:inline">{enabled ? 'Playing' : 'Soft music'}</span>
    </button>
  )
})

export default BackgroundMusic
