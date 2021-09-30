import { endpoint } from "./config.json";

export interface IndexEntry {
  name: string;
  type: "file" | "directory";
  mtime: string;
  size: number;
}

export type DirectoryIndex = IndexEntry[];

export interface IndexResponse {
  body: DirectoryIndex | string | Error;
  ok: boolean;
}

export async function index(path: string): Promise<IndexResponse> {
  const failure = (error: string | Error) => ({ body: error, ok: false });
  const success = (index: DirectoryIndex) => ({ body: index, ok: true });
  try {
    const response = await fetch(endpoint + path);
    if (!response.ok) {
      return failure(await response.text());
    }
    const contentType = response.headers.get("Content-Type");
    if (contentType !== "application/json") {
      return failure("Specified URL does not represent a directory!");
    }
    return success((await response.json()) as DirectoryIndex);
  } catch (e) {
    return failure(e);
  }
}
