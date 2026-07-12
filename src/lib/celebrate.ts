// A short, happy "ta-da" using the Web Audio API (no sound files needed, so it
// works fully offline) plus a vibration. Both degrade gracefully: vibration is
// a no-op on iOS, and audio is wrapped in try/catch.
let ctx: AudioContext | null = null

export function celebrate() {
  // Vibration (Android/Chrome; iOS Safari ignores it).
  try {
    navigator.vibrate?.([90, 50, 90, 50, 180])
  } catch {
    /* ignore */
  }

  // Little ascending fanfare: C5 – E5 – G5 – C6.
  try {
    const AudioCtor =
      window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AudioCtor) return
    ctx = ctx ?? new AudioCtor()
    if (ctx.state === 'suspended') void ctx.resume()
    const now = ctx.currentTime
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((freq, i) => {
      const osc = ctx!.createOscillator()
      const gain = ctx!.createGain()
      osc.type = 'triangle'
      osc.frequency.value = freq
      const t = now + i * 0.12
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.exponentialRampToValueAtTime(0.25, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22)
      osc.connect(gain)
      gain.connect(ctx!.destination)
      osc.start(t)
      osc.stop(t + 0.24)
    })
  } catch {
    /* ignore */
  }
}
