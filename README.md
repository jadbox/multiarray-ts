# MultiArray-ts

A Zig inspired TypeScript project to create a compact MultiArray and retrieve elements by index.

```typescript
import {type MultiArray} from 'multiarray-ts';

type Example = { id: number; name: string; age: number };
const data: MultiArray<Example> = {
  id: [1, 2, 3],
  name: ["Alice", "Bob", "Charlie"],
  age: [25, 30, 35],
};
const proxy = multiIndex(data, 1);
console.log(proxy.name); // Bob
```