export const ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
]

export async function getLocalAudioStream(): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({ audio: true })
}

export type CallPeerCallbacks = {
  onIceCandidate: (candidate: RTCIceCandidate) => void
  onRemoteStream: (stream: MediaStream) => void
}

export function createCallPeerConnection(
  localStream: MediaStream | null,
  callbacks: CallPeerCallbacks,
): RTCPeerConnection {
  const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS })

  if (localStream) {
    for (const track of localStream.getTracks()) pc.addTrack(track, localStream)
  } else {
    pc.addTransceiver('audio', { direction: 'recvonly' })
  }

  pc.onicecandidate = (e) => {
    if (e.candidate) callbacks.onIceCandidate(e.candidate)
  }

  pc.ontrack = (e) => {
    if (e.streams[0]) callbacks.onRemoteStream(e.streams[0])
  }

  return pc
}

// Buffers ICE candidates that arrive before the remote description is set,
// then flushes them once setRemoteDescription resolves.
export class PendingIceQueue {
  private queue: RTCIceCandidateInit[] = []
  private ready = false

  add(pc: RTCPeerConnection, candidate: RTCIceCandidateInit) {
    if (this.ready) {
      void pc.addIceCandidate(candidate)
    } else {
      this.queue.push(candidate)
    }
  }

  flush(pc: RTCPeerConnection) {
    this.ready = true
    for (const candidate of this.queue) void pc.addIceCandidate(candidate)
    this.queue = []
  }
}
