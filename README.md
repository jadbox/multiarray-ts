# MultiArray-ts

A Zig inspired TypeScript project to create a compact MultiArray and retrieve elements by index.

```typescript
import {type MultiArray, getIndex, removeObjectAtIndex, replaceObjectAtIndex, addObject} from 'multiarray-ts';

type Example = { id: number; name: string; age: number };
const data: MultiArray<Example> = {
  id: [1, 2, 3],
  name: ["Alice", "Bob", "Charlie"],
  age: [25, 30, 35],
};

// Fetch
const proxy = getIndex(data, 1);
console.log(proxy.name); // Bob

// Add
addObject(data, {id: 5, name: "Eve", age: 22});

// Remove
removeObjectAtIndex(data, 1);

// Replace
replaceObjectAtIndex(data, {id: 4, name: "David", age: 40}, 0);
```