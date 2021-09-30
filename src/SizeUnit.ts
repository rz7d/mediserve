export const UNIT = ["bytes", "KB", "MB", "GB", "TB"];

export function formatBytes(bytes: number, fp: number = 2): string {
  let i = 0;
  while (bytes >= 1024) {
    bytes /= 1024;
    ++i;
  }
  return `${bytes.toFixed(fp)} ${UNIT[i]}`;
}
