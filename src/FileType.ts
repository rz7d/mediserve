// ファイルの種類を表す union 型です。
export type FileType =
  | "text"
  | "image"
  | "audio"
  | "video"
  | "folder"
  | "unknown";

const EXTENSION_DICTIONARY: { [extension: string]: FileType } = {
  ".txt": "text",
  ".js": "text",
  ".css": "text",
  ".json": "text",
  ".ico": "image",
  ".gif": "image",
  ".png": "image",
  ".png_small": "image",
  ".png_large": "image",
  ".png_orig": "image",
  ".jpg": "image",
  ".jpg_small": "image",
  ".jpg_large": "image",
  ".jpg_orig": "image",
  ".jpeg": "image",
  ".jfif": "image",
  ".webp": "image",
  ".bmp": "image",
  ".mp4": "video",
  ".ts": "video",
  ".mov": "video",
  ".mkv": "video",
  ".webm": "video",
  ".flv": "video",
  ".m4a": "audio",
  ".mp3": "audio",
  ".wav": "audio",
  ".wma": "audio",
  ".opus": "audio",
  ".ogg": "audio",
  ".aac": "audio",
  ".flac": "audio",
  ".mid": "audio",
};

export function typeFromExtension(name: string): FileType {
  for (const extension of Object.keys(EXTENSION_DICTIONARY)) {
    if (name.endsWith(extension)) {
      return EXTENSION_DICTIONARY[extension];
    }
  }
  return "unknown";
}
