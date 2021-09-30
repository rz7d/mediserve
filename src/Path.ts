export class Path {
  private _names: string[];

  constructor(names: string[]) {
    this._names = names;
  }

  get name(): string {
    return this._names[this._names.length - 1];
  }

  get names(): string[] {
    return this._names;
  }

  parent(): Path {
    return new Path(parent(this._names));
  }

  canonicalize(): Path {
    return new Path(canonicalize(this._names));
  }

  stringify(): string {
    return stringify(this._names);
  }

  resolve(other: string): Path {
    return new Path([...this._names, other]);
  }

  concat(other: Path): Path {
    return new Path([...this._names, ...other._names]);
  }

  isEmpty(): boolean {
    return this._names.length === 0;
  }

  toUri(baseUri?: string): string {
    return (baseUri ?? "") + this.stringify();
  }
}

type Pathy = string[];

function parent(path: Pathy): Pathy {
  const copy = [...path];
  copy.pop();
  return copy;
}

function canonicalize(path: Pathy): Pathy {
  const canonicalNames = [];
  for (const name of path) {
    switch (name) {
      case "..":
        canonicalNames.pop();
        break;
      case ".":
        break;
      case "/":
        canonicalNames.splice(0);
        break;
      default:
        canonicalNames.push(name);
    }
  }
  return canonicalNames;
}

function stringify(path: Pathy): string {
  let string = "";
  for (const name of path) {
    string += "/" + name;
  }
  return string;
}

export function parse(expression: string): Path {
  return new Path(expression.split(/[/\\]/).filter((name) => name.length));
}

const EMPTY = new Path([]);

export function empty(): Path {
  return EMPTY;
}

export function of(names?: string[]): Path {
  if (!names || names.length === 0) {
    return EMPTY;
  }
  return new Path(names);
}
