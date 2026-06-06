export const delay = (ms = 250) => new Promise<void>((r) => setTimeout(r, ms))
