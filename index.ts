// MultiArray-ts NPM Package
// TypeScript lib to create a compact MultiArray and retrieve elements by index

export type MultiArray<T> = { [K in keyof T]: Array<T[K]> };

export function getIndex<T extends object>(
  MultiArray: MultiArray<T>,
  index: number
): T {
  return new Proxy({} as T, {
    get(_, prop: string) {
      const array = MultiArray[prop as keyof T];
      if (array) {
        return array[index];
      }
      return undefined;
    },
    has(_, prop: string) {
      const array = MultiArray[prop as keyof T];
      return array !== undefined;
    },
  });
}

export function removeObjectAtIndex<T extends object>(
  MultiArray: MultiArray<T>,
  index: number
): void {
  for (const key in MultiArray) {
    if (Array.isArray(MultiArray[key])) {
      MultiArray[key].splice(index, 1);
    }
  }
}

export function replaceObjectAtIndex<T extends object>(
  MultiArray: MultiArray<T>,
  obj: T,
  index: number
): void {
  for (const key in obj) {
    if (Array.isArray(MultiArray[key])) {
      MultiArray[key][index] = obj[key];
    }
  }
}

export function addObject<T extends object>(
  MultiArray: MultiArray<T>,
  obj: T
): void {
  for (const key in obj) {
    if (Array.isArray(MultiArray[key])) {
      MultiArray[key].push(obj[key]);
    }
  }
}
