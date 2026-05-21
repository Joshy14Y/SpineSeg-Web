export function toDataUrl(base64: string, type: string = 'image/png'): string {
  return `data:${type};base64,${base64}`;
}
