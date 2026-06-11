import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from '@microsoft/signalr'
import type {
  MatchFoundPayload,
  TopicChangedPayload,
  PartnerLeftPayload,
  CallEndedPayload,
  QueueCountChangedPayload,
} from '@/lib/types/call'

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000').replace(/\/$/, '')

let connection: HubConnection | null = null
let startPromise: Promise<void> | null = null

function getConnection(): HubConnection {
  if (!connection) {
    connection = new HubConnectionBuilder()
      .withUrl(`${API_URL}/hubs/call`, { withCredentials: true })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build()
  }
  return connection
}

export async function ensureCallConnection(): Promise<HubConnection> {
  const conn = getConnection()
  if (conn.state === HubConnectionState.Connected) return conn
  if (!startPromise) {
    startPromise = conn.start().catch((err) => {
      startPromise = null
      throw err
    })
  }
  await startPromise
  return conn
}

// ─── Client → server methods ────────────────────────────────────────────────

export async function joinQueue(topicIds: string[]): Promise<void> {
  const conn = await ensureCallConnection()
  await conn.invoke('JoinQueue', { topicIds })
}

export async function leaveQueue(): Promise<void> {
  if (connection?.state === HubConnectionState.Connected) {
    await connection.invoke('LeaveQueue')
  }
}

export async function nextTopic(sessionId: string): Promise<void> {
  const conn = await ensureCallConnection()
  await conn.invoke('NextTopic', sessionId)
}

export async function endCall(sessionId: string): Promise<void> {
  const conn = await ensureCallConnection()
  await conn.invoke('EndCall', sessionId)
}

// ─── Server → client event subscriptions ────────────────────────────────────

export function onMatchFound(handler: (payload: MatchFoundPayload) => void) {
  const conn = getConnection()
  conn.on('MatchFound', handler)
  return () => conn.off('MatchFound', handler)
}

export function onNoMatchFound(handler: () => void) {
  const conn = getConnection()
  conn.on('NoMatchFound', handler)
  return () => conn.off('NoMatchFound', handler)
}

export function onTopicChanged(handler: (payload: TopicChangedPayload) => void) {
  const conn = getConnection()
  conn.on('TopicChanged', handler)
  return () => conn.off('TopicChanged', handler)
}

export function onPartnerLeft(handler: (payload: PartnerLeftPayload) => void) {
  const conn = getConnection()
  conn.on('PartnerLeft', handler)
  return () => conn.off('PartnerLeft', handler)
}

export function onCallEnded(handler: (payload: CallEndedPayload) => void) {
  const conn = getConnection()
  conn.on('CallEnded', handler)
  return () => conn.off('CallEnded', handler)
}

export function onQueueCountChanged(handler: (payload: QueueCountChangedPayload) => void) {
  const conn = getConnection()
  conn.on('QueueCountChanged', handler)
  return () => conn.off('QueueCountChanged', handler)
}
