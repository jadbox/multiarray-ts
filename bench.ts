import { run, bench, boxplot, summary, barplot } from "mitata";
import {
  type MultiArray,
  getIndex,
  removeObjectAtIndex,
  replaceObjectAtIndex,
  addObject,
} from "./index";
import { heapStats } from "bun:jsc";

// function fibonacci(n: number): number {
//   if (n <= 1) return n;
//   return fibonacci(n - 1) + fibonacci(n - 2);
// }

// bench("fibonacci(40)", () => fibonacci(40));

// boxplot(() => {
//   summary(() => {
//     bench("Array.from($size)", function* (state: any) {
//       const size = state.get("size");
//       yield () => fibonacci(size);
//     }).range("size", 1, 20);
//   });
// });

const NUM: number = 100;
function vanillaArrayOfObjectsBench(state: number) {
  const data: { id: number; name: string; aged: boolean }[] = new Array(
    NUM * state
  );
  for (let i = 0; i < NUM * state; i++) {
    data.push({ id: i, name: `Name${i}`, aged: i % 2 == 0 });
  }
  //console.log((heapStats().heapSize / 1024 / 1024).toFixed(4) + " MB");

  return data.length;
  //  console.log(data);
}

function multiArrayBench(state: number) {
  const data: MultiArray<{ id: number; name: string; aged: boolean }> = {
    id: new Array<number>(NUM * state),
    name: new Array<string>(NUM * state),
    aged: new Array<boolean>(NUM * state),
  };
  for (let i = 0; i < NUM * state; i++) {
    data.id[i] = i;
    data.name[i] = `Name${i}`;
    data.aged[i] = i % 2 == 0;
    // replaceObjectAtIndex(data, { id: i, name: `Name${i}`, age: i });
  }

  //console.log((heapStats().heapSize / 1024 / 1024).toFixed(4) + " MB");
  // console.log(data);

  return data.id.length;
}

barplot(() => {
  bench("Vanilla Array of Objects", function* (s: any) {
    yield () => vanillaArrayOfObjectsBench(Number(s.get("size")));
  })
    .range("size", 400, 400)
    // .args([{ size: NUM }])
    .gc("inner");

  bench("MultiArray", function* (s: any) {
    yield () => multiArrayBench(Number(s.get("size")));
  })
    .range("size", 400, 400)
    //.range("size", 1, 1)
    //.args([{ size: NUM }])
    .gc("inner");
});

await run();
