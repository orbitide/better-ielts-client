// Polls the stream's volume level and reports a normalized 0-1 value via onLevel.
// Uses setInterval rather than requestAnimationFrame to keep React re-renders manageable.
export function startAudioLevelMeter(stream: MediaStream, onLevel: (level: number) => void): () => void {
  const ctx = new AudioContext()
  const source = ctx.createMediaStreamSource(stream)
  const analyser = ctx.createAnalyser()
  analyser.fftSize = 256
  source.connect(analyser)

  const data = new Uint8Array(analyser.frequencyBinCount)
  const interval = setInterval(() => {
    analyser.getByteFrequencyData(data)
    const average = data.reduce((sum, value) => sum + value, 0) / data.length
    onLevel(average / 255)
  }, 50)

  return () => {
    clearInterval(interval)
    source.disconnect()
    void ctx.close()
  }
}
