import { expect, test, describe } from "bun:test";
import { beforeEach, afterEach } from "bun:test";
import {
  type MultiArray,
  getIndex,
  removeObjectAtIndex,
  replaceObjectAtIndex,
  addObject,
} from "../index";

describe("MultiArray-ts", () => {
  type TestType = { id: number; name: string; age: number };

  let testData: MultiArray<TestType>;

  beforeEach(() => {
    // Reset test data before each test
    testData = {
      id: [1, 2, 3],
      name: ["Alice", "Bob", "Charlie"],
      age: [25, 30, 35],
    };
  });

  test("getIndex retrieves correct element", () => {
    const element = getIndex(testData, 1);

    expect(element.id).toBe(2);
    expect(element.name).toBe("Bob");
    expect(element.age).toBe(30);
  });

  test("removeObjectAtIndex removes element at specified index", () => {
    removeObjectAtIndex(testData, 1);

    expect(testData.id).toEqual([1, 3]);
    expect(testData.name).toEqual(["Alice", "Charlie"]);
    expect(testData.age).toEqual([25, 35]);
    expect(testData.id.length).toBe(2);
  });

  test("replaceObjectAtIndex replaces element at specified index", () => {
    replaceObjectAtIndex(testData, { id: 4, name: "David", age: 40 }, 1);

    expect(testData.id[1]).toBe(4);
    expect(testData.name[1]).toBe("David");
    expect(testData.age[1]).toBe(40);
    expect(testData.id.length).toBe(3);
  });

  test("addObject appends element to the end", () => {
    addObject(testData, { id: 4, name: "David", age: 40 });

    expect(testData.id).toEqual([1, 2, 3, 4]);
    expect(testData.name).toEqual(["Alice", "Bob", "Charlie", "David"]);
    expect(testData.age).toEqual([25, 30, 35, 40]);
    expect(testData.id.length).toBe(4);
  });
});
