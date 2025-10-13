// src/utils/health.ts
let ready = false;

export function isReady(): boolean {
  return ready;
}

export function setReady(value: boolean) {
  ready = value;
}
